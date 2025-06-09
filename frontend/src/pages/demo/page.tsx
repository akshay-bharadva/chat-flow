import ChatbotWidget from "@/components/chatbot-widget"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Chatbot Widget Demo</h1>
          <p className="text-xl text-gray-600">
            This is how your chatbot will appear on your website. Click the chat button to interact!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Your Website Content</h2>
            <p className="text-gray-600 mb-4">
              This represents your actual website content. The chatbot widget will appear as a floating button that
              users can click to start a conversation.
            </p>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Responsive design that works on all devices</li>
              <li>• Customizable colors and positioning</li>
              <li>• Real-time messaging interface</li>
              <li>• Typing indicators for better UX</li>
              <li>• Easy integration with any website</li>
              <li>• AI-powered responses from your data</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Demo Chatbot Widget */}
      <ChatbotWidget
        botId="demo-bot"
        position="bottom-right"
        primaryColor="#3B82F6"
        greeting="Hi! I'm a demo chatbot. Try asking me anything!"
        placeholder="Ask me anything..."
        botName="Demo Assistant"
      />
    </div>
  )
}
