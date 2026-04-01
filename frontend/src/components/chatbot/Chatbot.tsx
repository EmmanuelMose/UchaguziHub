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
        <div className="bg-white shadow-2xl rounded-2xl w-80 sm:w-96 h-[500px] flex flex-col border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="p-4 bg-blue-700 text-white flex justify-between items-center">
            <div className="flex items-center gap-2 font-semibold">
              <MessageCircle size={20} />
              <span>Help Desk</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-800 p-1 rounded">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border rounded-tl-none shadow-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="flex justify-start"><Loader2 className="animate-spin text-blue-600" size={20} /></div>}
            <div ref={chatEndRef} />
          </div>
          <div className="p-4 bg-white border-t flex gap-2">
            <input
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center gap-2 group">
          <MessageCircle size={24} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-medium">Need help?</span>
        </button>
      )}
    </div>
  );
};

export default Chatbot;