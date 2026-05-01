import { Footer } from './Footer';
import { motion } from 'framer-motion';
import { Link2, Copy, Check, Twitter, Send, Share2 } from 'lucide-react';
import { useState } from 'react';
import { useTransaction } from '../Wallet/context/TransactionContext';

export function ShareLink() {
  const { currentAccount } = useTransaction();
  const [copied, setCopied] = useState(false);

  const referralCode = currentAccount ? `VLT-${currentAccount.substring(2, 8).toUpperCase()}` : 'CONNECT-WALLET';
  const referralLink = `https://vaulta.app/ref/${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[--bg-primary] min-h-screen pt-32 pb-16 px-4 flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center max-w-4xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[--brand]/30 bg-[--brand]/10 text-[--brand] text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Share2 size={14} /> Affiliate Portal
          </div>
          <h1 className="text-2xl md:text-5xl md:text-7xl font-black text-[--text-primary] tracking-tighter mb-4">
            Invite & <span className="text-[--brand]">Earn.</span>
          </h1>
          <p className="text-[--text-muted] text-xl font-medium max-w-xl mx-auto">
            Share your unique link to bring friends to Vaulta. You'll both earn exclusive VLT rewards on their first transaction.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-[--surface] border border-[--border] rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[--brand]/10 blur-[80px] rounded-full pointer-events-none" />
          
          <h3 className="text-[--text-primary] text-2xl font-black mb-6">Your Referral Link</h3>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 bg-[--bg-primary] border border-[--border] rounded-2xl flex items-center px-6 py-4">
               <Link2 size={20} className="text-[--text-muted]/50 mr-4" />
               <span className="text-[--text-primary] font-medium truncate flex-1">{referralLink}</span>
            </div>
            <button 
              onClick={handleCopy}
              className={`px-8 py-4 rounded-2xl font-black text-white transition-all flex items-center justify-center gap-2 ${copied ? 'bg-green-500 hover:bg-green-600' : 'bg-[--brand] hover:brightness-110'}`}
            >
              {copied ? <><Check size={20} /> Copied!</> : <><Copy size={20} /> Copy Link</>}
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 border-t border-[--border] pt-8">
             <button className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 font-black transition-colors">
                <Twitter size={20} /> Share on Twitter
             </button>
             <button className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-[#0088cc]/10 text-[#0088cc] hover:bg-[#0088cc]/20 font-black transition-colors">
                <Send size={20} /> Send via Telegram
             </button>
          </div>
        </motion.div>
      </div>
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
}
