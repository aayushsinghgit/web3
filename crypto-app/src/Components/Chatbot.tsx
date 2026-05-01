import { useState, useEffect, useRef } from 'react';
import { X, Send, Minus } from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: "Hi! I'm Vaulta Assistant. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'bot', text: "Thanks for reaching out! Our team will get back to you shortly." }]);
    }, 1500);
  };

  const VaultaLogo = ({ size = 28, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 256 417" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" className={className}>
      <path fill="currentColor" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"/>
      <path fill="currentColor" d="M127.962 0L0 212.32l127.962 75.639V154.158z" opacity=".8"/>
      <path fill="currentColor" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.59 128.038-180.32z"/>
      <path fill="currentColor" d="M127.962 416.896V312.187L0 236.586z" opacity=".8"/>
      <path fill="currentColor" d="M127.961 287.958l127.96-75.637-127.96-58.162z" opacity=".6"/>
      <path fill="currentColor" d="M0 212.32l127.962 75.638V154.158z" opacity=".2"/>
    </svg>
  );

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[1000] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-3rem)] md:w-96 h-[min(500px,70vh)] bg-[--bg-primary] border border-[--border] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 duration-300 backdrop-blur-xl">
          {/* Header */}
          <div className="p-4 md:p-6 border-b border-[--border] bg-[--surface] flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[--brand]/10 border border-[--brand]/20 rounded-xl flex items-center justify-center">
                <VaultaLogo size={16} className="text-[--brand] md:w-5 md:h-5" />
              </div>
              <div>
                <h3 className="text-[--text-primary] font-black text-xs md:text-sm tracking-tight">Vaulta Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-[6px] md:text-[8px] font-black uppercase tracking-widest">Active</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[--text-muted]/40 hover:text-[--text-primary] transition-colors">
              <Minus size={18} className="md:w-5 md:h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scroll-smooth">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`p-3 rounded-2xl text-[10px] md:text-xs font-medium leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-[--brand] text-white rounded-br-sm' 
                    : 'bg-[--surface] border border-[--border] text-[--text-primary] rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-1 ml-2">
                <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[--brand]/40 rounded-full animate-bounce" />
                <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[--brand]/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[--brand]/40 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 md:p-6 border-t border-[--border]">
            <div className="relative flex items-center gap-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Message..."
                className="flex-1 bg-[--surface] border border-[--border] rounded-xl px-4 py-2.5 md:py-3 text-[10px] md:text-xs text-[--text-primary] outline-none focus:border-[--brand] transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="p-2.5 md:p-3 bg-[--brand] hover:bg-[--brand-dim] text-white rounded-xl transition-all disabled:opacity-30"
              >
                <Send size={14} className="md:w-4 md:h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 shadow-xl ${
          isOpen ? 'bg-[--surface] text-[--text-primary] rotate-90 border border-[--border]' : 'bg-[--brand] text-white'
        }`}
      >
        {isOpen ? <X size={20} className="md:w-7 md:h-7" /> : <VaultaLogo size={24} className="animate-pulse md:w-8 md:h-8" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-green-500 border-2 md:border-4 border-[--bg-primary] rounded-full" />
        )}
      </button>
    </div>
  );
}
