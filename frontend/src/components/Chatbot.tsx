import { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import { aiApi } from "../api";
import { AIChatResponse } from "../types";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<AIChatResponse[]>([
    {
      user: "Hello",
      ai: "Hi there! I am HieraSync AI. How can I assist you with department workflows today?"
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Optimistic UI update
    setMessages(prev => [...prev, { user: userMessage, ai: "..." }]);
    setLoading(true);

    try {
      const response = await aiApi.chat({ message: userMessage });
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = response;
        return newMsgs;
      });
    } catch (error) {
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { user: userMessage, ai: "Sorry, I encountered an error. Please try again." };
        return newMsgs;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl z-50"
      >
        {open ? <FaTimes size={22} /> : <FaRobot size={22} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-100 flex flex-col h-[500px]">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shrink-0">
            <h2 className="text-xl font-bold flex items-center gap-2">
              🤖 HieraSync AI Assistant
            </h2>
            <p className="text-sm text-blue-100 mt-1">
              AIML Department Support
            </p>
          </div>

          <div className="p-4 space-y-4 flex-1 overflow-y-auto bg-slate-50">
            {messages.map((msg, index) => (
              <div key={index} className="flex flex-col gap-3">
                <div className="self-end bg-blue-600 text-white rounded-2xl rounded-tr-none px-4 py-2 max-w-[85%] shadow-sm">
                  {msg.user}
                </div>
                <div className="self-start bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-tl-none px-4 py-2 max-w-[85%] shadow-sm flex gap-2">
                  <span className="mt-1">🤖</span>
                  <span className={msg.ai === "..." ? "animate-pulse" : ""}>{msg.ai}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-3 bg-white shrink-0">
            <input
              placeholder="Ask HieraSync AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="w-full border rounded-xl p-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              disabled={loading}
            />
          </div>
        </div>
      )}
    </>
  );
}