import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, HeadphonesIcon } from "lucide-react";

interface Message {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  text: string;
}

export function ContactSupport() {
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
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'bot', text: "I've received your query. Our team will get back to you shortly, or you can check our documentation in the meantime." }]);
    }, 1500);
  };

  return (
    <div className="bg-[--bg-primary] min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-4xl h-[700px] bg-[--surface] border border-[--border] rounded-[3rem] overflow-hidden flex flex-col shadow-2xl backdrop-blur-xl">
        
        {/* Chat Header */}
        <div className="p-8 border-b border-[--border] bg-[--surface] flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[--brand] rounded-2xl flex items-center justify-center shadow-lg shadow-[--brand]/20">
              <Bot size={24} className="text-[--text-primary]" />
            </div>
            <div>
              <h2 className="text-[--text-primary] font-black text-xl tracking-tight">Vaulta Assistant</h2>
              <p className="text-green-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Online & Ready
              </p>
            </div>
          </div>
          <button className="p-3 bg-[--surface] hover:bg-white/10 rounded-xl transition-all border border-[--border] text-[--text-muted] hover:text-[--text-primary]">
            <HeadphonesIcon size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth"
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                msg.sender === 'user' ? 'bg-white/10 text-[--text-primary]' : 'bg-[--brand]/20 text-[--brand]'
              }`}>
                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              <div className={`p-4 rounded-2xl max-w-[70%] text-sm font-medium leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-[--brand] text-[--text-primary] rounded-br-sm shadow-xl shadow-[--brand]/10' 
                  : 'bg-[--surface] border border-[--border] text-white/80 rounded-bl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-[--text-muted]/40 text-xs font-bold uppercase tracking-widest animate-pulse ml-11">
              Assistant is typing...
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-8 bg-[--surface] border-t border-[--border]">
          <div className="relative flex items-center gap-3">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="How can we help you today?"
              className="flex-1 bg-[--surface] border border-[--border] rounded-2xl px-6 py-4 text-[--text-primary] text-sm focus:border-[--brand] outline-none transition-all placeholder:text-[--text-muted]/40"
            />
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="p-4 bg-[--brand] hover:bg-[--brand-dim] text-[--text-primary] rounded-2xl transition-all disabled:opacity-30 disabled:grayscale shadow-lg shadow-[--brand]/20 active:scale-95"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-center text-[--text-muted]/10 text-[10px] font-bold uppercase tracking-[0.2em] mt-6">
            Powered by Vaulta AI Intelligence
          </p>
        </div>
        
      </div>
    </div>
  );
}
