import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { Bot, User, Send } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Define types for the chat message and bot config
interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'bot';
}
interface BotConfig {
    name: string;
    greeting: string;
    placeholder: string;
    primaryColor: string;
    showAvatar: boolean;
}

const API_BASE_URL = "http://localhost:8000/api";

// This is the actual UI that will be displayed inside the iframe
export default function ChatWidgetPage() {
    const router = useRouter();
    const { botId } = router.query;

    const [config, setConfig] = useState<BotConfig | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (botId) {
            // Fetch the specific bot's configuration from your API
            fetch(`${API_BASE_URL}/chatbots/${botId}`)
                .then(res => {
                    if (!res.ok) throw new Error("Chatbot not found or not authorized.");
                    return res.json();
                })
                .then(data => {
                    setConfig({
                        name: data.name,
                        greeting: data.greeting,
                        placeholder: data.placeholder,
                        primaryColor: data.primaryColor,
                        showAvatar: data.showAvatar,
                    });
                    setMessages([{ id: 'init', text: data.greeting, sender: 'bot' }]);
                    setIsLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setIsLoading(false);
                });
        }
    }, [botId]);

    // Apply the primary color to the page
    useEffect(() => {
        if (config?.primaryColor) {
            document.documentElement.style.setProperty('--chat-primary-color', config.primaryColor);
        }
    }, [config]);


    if (isLoading) {
        return <div className="p-4"><Skeleton className="w-full h-full" /></div>;
    }

    if (error) {
        return <div className="p-4 text-red-600 font-semibold">{error}</div>;
    }

    if (!config) {
        return null;
    }

    return (
        <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', margin: 0, display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'white' }}>
            <style jsx global>{`
                :root { --chat-primary-color: ${config.primaryColor}; }
            `}</style>
            
            <div style={{ backgroundColor: config.primaryColor, color: 'white', padding: '16px', fontWeight: 'bold', flexShrink: 0 }}>
                {config.name}
            </div>

            <div style={{ flexGrow: 1, padding: '16px', overflowY: 'auto' }}>
                {messages.map(msg => (
                    <div key={msg.id} style={{ display: 'flex', gap: '8px', marginBottom: '12px', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                        {msg.sender === 'bot' && config.showAvatar && (
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Bot size={20} color={config.primaryColor} />
                            </div>
                        )}
                        <div style={{ backgroundColor: msg.sender === 'bot' ? '#f1f5f9' : config.primaryColor, color: msg.sender === 'bot' ? '#1e293b' : 'white', padding: '12px', borderRadius: '12px', maxWidth: '80%' }}>
                            {msg.text}
                        </div>
                         {msg.sender === 'user' && (
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <User size={20} color="#475569" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', padding: '12px', display: 'flex', gap: '8px', flexShrink: 0 }}>
                <input type="text" placeholder={config.placeholder} style={{ flexGrow: 1, border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
                <button style={{ backgroundColor: config.primaryColor, border: 'none', borderRadius: '6px', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Send size={20} color="white" />
                </button>
            </div>
        </div>
    );
}

// IMPORTANT: This page should not have the main dashboard layout
ChatWidgetPage.getLayout = function getLayout(page: ReactElement) {
    return page;
};