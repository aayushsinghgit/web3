import { useState, useRef } from 'react';
import { X, Sparkles, Mic, MicOff, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useTransaction } from '../Wallet/context/TransactionContext';

interface FundraiserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Extend window for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

// Uses Gemini 1.5 Flash free tier via REST API
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
// Public demo key — for production, move to a backend proxy or environment variable
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

async function generateDescriptionWithGemini(title: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    // Fallback: generate locally without API key
    return `${title} is a community-driven initiative aimed at creating lasting, positive change. By pooling resources on-chain, we can achieve transparent, borderless impact. Every ETH contributed goes directly towards our goal — tracked on the blockchain, verified by the community, and celebrated by everyone involved. Join us and help make this vision a reality.`;
  }

  const prompt = `You are an expert Web3 fundraiser copywriter. Write a compelling, passionate 2-3 sentence fundraiser description for a project titled "${title}". Focus on community impact, transparency, and decentralization. Keep it under 100 words. Return only the description, no extra text.`;

  const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.8, maxOutputTokens: 150 }
    })
  });

  if (!res.ok) throw new Error('AI generation failed');
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
}

export function FundraiserModal({ isOpen, onClose }: FundraiserModalProps) {
  const { createFundraiser } = useTransaction();
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const handleGenerateAI = async () => {
    if (!title.trim()) {
      toast.error('Enter a project title first!');
      return;
    }
    setIsGenerating(true);
    try {
      const generated = await generateDescriptionWithGemini(title.trim());
      setDescription(generated);
      toast.success('Description generated!');
    } catch {
      toast.error('AI unavailable — try typing manually.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error('Voice input not supported in this browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onerror = () => { setIsListening(false); toast.error('Voice error — try again.'); };
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join('');
      setDescription(transcript);
    };

    recognition.start();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    recognitionRef.current?.stop();
    
    try {
      await createFundraiser(title, description, goal);
      onClose();
      setTitle(''); setGoal(''); setDescription('');
    } catch (err) {
      // Error handled by context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[--surface] border border-[--border] rounded-[2.5rem] p-6 md:p-10 w-full max-w-xl relative shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[--brand]/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2.5 bg-[--bg-primary] hover:bg-white/10 rounded-full transition-all text-[--text-muted] hover:text-[--text-primary] z-10"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[--brand]/10 border border-[--brand]/20 text-[--brand] text-[10px] font-black uppercase tracking-widest mb-4">
                <Sparkles size={12} /> AI-Powered Launch
              </div>
              <h2 className="text-[--text-primary] text-3xl md:text-4xl font-black tracking-tighter">Launch Project</h2>
              <p className="text-[--text-muted] text-sm mt-1">Deploy a verified on-chain fundraiser for your cause.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              {/* Title */}
              <div>
                <label className="text-[--text-muted] text-[10px] font-black uppercase tracking-widest mb-2 block">
                  Project Title
                </label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-[--bg-primary] border border-[--border] rounded-2xl px-5 py-3.5 text-[--text-primary] font-bold outline-none focus:border-[--brand] transition-all text-sm"
                  placeholder="e.g. Clean Water Initiative"
                />
              </div>

              {/* Goal */}
              <div>
                <label className="text-[--text-muted] text-[10px] font-black uppercase tracking-widest mb-2 block">
                  Goal Amount (ETH)
                </label>
                <input
                  required
                  type="number"
                  step="0.01"
                  value={goal}
                  onChange={e => setGoal(e.target.value)}
                  className="w-full bg-[--bg-primary] border border-[--border] rounded-2xl px-5 py-3.5 text-[--text-primary] font-bold outline-none focus:border-[--brand] transition-all text-sm"
                  placeholder="50.00"
                />
              </div>

              {/* Description with AI + Voice */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[--text-muted] text-[10px] font-black uppercase tracking-widest">
                    Description
                  </label>
                  <div className="flex items-center gap-2">
                    {/* AI Generate Button */}
                    <button
                      type="button"
                      onClick={handleGenerateAI}
                      disabled={isGenerating}
                      title="Generate with AI"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[--brand]/10 hover:bg-[--brand]/20 text-[--brand] border border-[--brand]/20 transition-all text-[10px] font-black uppercase tracking-widest disabled:opacity-50"
                    >
                      {isGenerating
                        ? <Loader2 size={12} className="animate-spin" />
                        : <Sparkles size={12} />
                      }
                      {isGenerating ? 'Writing...' : 'AI Write'}
                    </button>

                    {/* Voice Input Button */}
                    <button
                      type="button"
                      onClick={handleVoiceInput}
                      title={isListening ? 'Stop listening' : 'Use voice input'}
                      className={`p-2 rounded-xl border transition-all ${
                        isListening
                          ? 'bg-red-500/20 border-red-500/40 text-red-400 animate-pulse'
                          : 'bg-[--bg-primary] border-[--border] text-[--text-muted] hover:text-[--text-primary] hover:border-[--brand]/50'
                      }`}
                    >
                      {isListening ? <MicOff size={14} /> : <Mic size={14} />}
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className={`w-full bg-[--bg-primary] border rounded-2xl px-5 py-3.5 text-[--text-primary] font-medium outline-none transition-all resize-none text-sm ${
                      isListening
                        ? 'border-red-500/50 ring-2 ring-red-500/10'
                        : 'border-[--border] focus:border-[--brand]'
                    }`}
                    placeholder={isListening ? '🎙 Listening... speak now' : 'Describe the impact of your project...'}
                  />
                  {isListening && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 bg-red-400 rounded-full animate-pulse"
                          style={{ height: `${8 + i * 4}px`, animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-[--text-muted]/40 text-[10px] mt-1.5 font-medium">
                  ✨ Type manually, click "AI Write" to auto-generate, or use the mic for voice input.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[--brand] text-white font-black rounded-2xl hover:brightness-110 active:scale-95 transition-all text-base mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3"
              >
                {isSubmitting
                  ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Deploying...</>
                  : '🚀 Deploy Contract'
                }
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
