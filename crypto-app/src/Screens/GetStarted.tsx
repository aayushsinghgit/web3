import { Footer } from './Footer';
import { motion } from 'framer-motion';
import { Wallet, Shield, ArrowRight, Key, Smartphone } from 'lucide-react';
import { useTransaction } from '../Wallet/context/TransactionContext';

export function GetStarted() {
  const { connectWallet, currentAccount } = useTransaction();

  return (
    <div className="bg-[--bg-primary] min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[--brand]/30 bg-[--brand]/10 text-[--brand] text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Wallet size={14} /> Onboarding
            </div>
            <h1 className="text-3xl md:text-6xl md:text-8xl font-black text-[--text-primary] tracking-tighter leading-[0.9] mb-8">
              Step into the <br /> <span className="text-[--brand]">Frontier.</span>
            </h1>
            <p className="text-[--text-muted] text-xl max-w-lg leading-relaxed font-medium mb-12">
              Create your Vaulta identity in seconds. No complex seed phrases, just enterprise-grade security backing your everyday Web3 interactions.
            </p>

            <div className="space-y-6">
              <button 
                onClick={connectWallet}
                className="w-full sm:w-auto px-5 md:px-10 py-5 bg-[--brand] hover:brightness-110 text-white font-black rounded-[2rem] transition-all flex items-center justify-between sm:justify-start gap-6 md:gap-12 group text-lg"
              >
                <span>{currentAccount ? 'Wallet Connected' : 'Connect Wallet'}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-4 text-[--text-muted] text-sm font-medium">
                <Shield size={16} className="text-green-400" />
                Audited by Top Tier Security Firms
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-gradient-to-tr from-[--brand]/20 to-purple-500/10 blur-[80px] rounded-full opacity-60" />
            
            <div className="relative bg-[--surface] border border-[--border] rounded-[3.5rem] p-10 backdrop-blur-xl shadow-2xl">
               <h3 className="text-2xl font-black text-[--text-primary] mb-8 tracking-tight">Choose your setup</h3>
               
               <div className="space-y-4">
                 {[
                   { icon: <Smartphone />, title: "Mobile App Integration", desc: "Scan QR code to sync with your phone" },
                   { icon: <Key />, title: "Hardware Wallet", desc: "Ledger or Trezor connection" },
                   { icon: <Wallet />, title: "Browser Extension", desc: "MetaMask, Phantom, or others" }
                 ].map((method, i) => (
                   <div key={i} className="flex items-center gap-6 p-6 rounded-3xl border border-[--border] hover:border-[--brand]/50 hover:bg-[--brand]/5 transition-all cursor-pointer group">
                      <div className="w-12 h-12 bg-[--bg-primary] border border-[--border] rounded-xl flex items-center justify-center text-[--text-muted] group-hover:text-[--brand] group-hover:scale-110 transition-all">
                        {method.icon}
                      </div>
                      <div>
                        <h4 className="text-[--text-primary] font-black text-lg">{method.title}</h4>
                        <p className="text-[--text-muted] text-xs font-medium mt-1">{method.desc}</p>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
