import { useRouter } from 'next/router';
import { Bot, User, Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// This is a simplified version of the ChatbotWidget component,
// adapted to live inside an iframe.
export default function ChatbotIframePage() {
    const router = useRouter();
    const { id } = router.query;
    const [config, setConfig] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);

    // Fetch config on component mount
    useEffect(() => {
      if (id) {
        fetch(`http://localhost:8000/api/widget/${id}/config`)
          .then(res => res.json())
          .then(data => {
              setConfig(data);
              setMessages(data.initialMessages.map(msg => ({ text: msg, sender: 'bot' })));
          });
      }
    }, [id]);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages]);
    
    const handleSendMessage = (e) => {
      e.preventDefault();
      if (!inputValue.trim()) return;
      const userMessage = { text: inputValue, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);
      setInputValue("");
      // TODO: Add API call to get a response from the bot
    };

    if (!config) {
        return <div className="flex h-full items-center justify-center">Loading...</div>;
    }

    return (
        <div className="flex flex-col h-screen font-sans bg-white">
            {/* Header */}
            <div style={{ backgroundColor: config.primaryColor }} className="p-4 text-white flex items-center shadow-md">
                {config.showAvatar && <Bot className="h-6 w-6 mr-3"/>}
                <h1 className="font-semibold text-lg">{config.name}</h1>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {messages.map((message, index) => (
                    <div key={index} className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {message.sender === 'bot' && config.showAvatar && <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"><Bot size={20} className="text-gray-600"/></div>}
                        <div style={{ backgroundColor: message.sender === 'user' ? config.primaryColor : null }} className={`max-w-[80%] rounded-2xl p-3 text-sm ${message.sender === 'user' ? `text-white rounded-br-none` : 'bg-gray-100 text-black rounded-bl-none'}`}>
                           {message.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 border-t bg-white">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={config.placeholder}
                        className="flex-1 p-2 border rounded-full text-sm focus:outline-none focus:ring-2"
                        style={{'--tw-ring-color': config.primaryColor}}
                    />
                    <button type="submit" style={{ backgroundColor: config.primaryColor }} className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0">
                        <Send size={20} />
                    </button>
                </form>
                 <div className="text-center text-xs text-gray-400 pt-2">
                    Powered by <a href="#" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">ChatFlow</a>
                </div>
            </div>
        </div>
    );
}
