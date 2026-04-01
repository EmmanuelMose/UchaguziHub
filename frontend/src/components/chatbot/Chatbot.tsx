import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { ApiDomain } from '../../utils/APIDomain';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hello! I am your UchaguziHub assistant. How can I help you today?' }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => { scrollToBottom() }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);

    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const historyPayload = messages.slice(1).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await axios.post(
        `${ApiDomain}/api/chat`,
        { message: currentInput, history: historyPayload }
      );

      setMessages(prev => [...prev, { role: 'model', text: response.data.reply }]);

    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.details ||
        error?.response?.data?.error ||
        "Error connecting to service. Please try again.";

      setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-[90vw] sm:w-96 h-[600px] sm:h-[560px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300 border border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 font-semibold">
              <MessageCircle size={20} />
              <span>UchaguziHub Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:bg-white/20 rounded-lg p-1 transition-all duration-200"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-gray-100">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start animate-fadeIn">
                <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-none p-3 shadow-sm flex items-center gap-2">
                  <Loader2 size={18} className="animate-spin text-blue-600" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Ask me anything about voting..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button 
                onClick={sendMessage} 
                disabled={loading || !input.trim()}
                className={`bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2.5 rounded-xl transition-all duration-200 ${
                  loading || !input.trim() 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transform hover:scale-105'
                }`}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 flex items-center gap-2 group"
        >
          <MessageCircle size={22} className="group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-sm font-medium hidden sm:inline group-hover:translate-x-0.5 transition-transform duration-300">Need help?</span>
        </button>
      )}
    </div>
  );
};

export default Chatbot;