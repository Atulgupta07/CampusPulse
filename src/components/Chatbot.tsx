import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'ai', text: 'Hi, I am your AI assistant. How can I help you today?' }]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Mocked AI Response.' }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: '400px' }}
          >
            <div className="p-4 bg-gray-900 border-b border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-white flex items-center gap-2"><MessageSquare size={18} className="text-blue-400" /> AI Assistant</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-gray-900 border-t border-gray-700 flex gap-2">
              <input 
                value={input} onChange={(e) => setInput(e.target.value)} 
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                type="text" className="flex-1 bg-gray-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Type a message..." 
              />
              <button onClick={handleSend} className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition"><Send size={16} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => setIsOpen(!isOpen)} className="p-4 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 transition-transform transform hover:scale-105">
        <MessageSquare size={24} />
      </button>
    </div>
  );
}
