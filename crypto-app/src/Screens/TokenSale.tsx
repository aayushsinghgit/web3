import { useState } from 'react';
import { useTransaction } from '../Wallet/context/TransactionContext';
import { Star, Check, Wallet, Play } from 'lucide-react';
import { CountdownTimer } from '../Components/CountdownTimer';
import { Footer } from './Footer';
import { motion } from 'framer-motion';

export function TokenSale() {
  const { currentAccount, connectWallet } = useTransaction();
  const [payAmount, setPayAmount] = useState('');
  const price = 0.25;
  const receiveAmount = payAmount ? (parseFloat(payAmount) / price).toFixed(0) : '0';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <div className="bg-[--bg-primary] min-h-screen relative overflow-hidden flex flex-col">
      
      {/* Top Blend Gradient */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[--bg-primary] via-[--bg-primary]/50 to-transparent z-20 pointer-events-none" />

      {/* Wavy Background Elements with subtle motion */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
        className="absolute top-0 left-0 w-full h-[600px] pointer-events-none"
      >
        <svg viewBox="0 0 1440 320" className="w-full h-full">
           <path fill="var(--brand)" fillOpacity="0.5" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
           <path fill="var(--brand)" fillOpacity="0.2" d="M0,64L60,101.3C120,139,240,213,360,224C480,235,600,181,720,149.3C840,117,960,107,1080,128C1200,149,1320,203,1380,229.3L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
      </motion.div>

      <div className="flex-1 max-w-7xl mx-auto px-4 md:px-6 w-full flex flex-col justify-center pt-32 md:pt-48 pb-20 z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center"
        >
          {/* Left Side */}
          <div>
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-6 md:mb-10">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse" />
              Phase 01 Live
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-3xl sm:text-5xl md:text-8xl font-black text-[--text-primary] mb-6 md:mb-10 tracking-tighter leading-[0.85]">
              VLT Token <br /> <span className="text-[--brand]">For Land Sale.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-2xl max-w-lg mb-10 md:mb-16 leading-relaxed font-medium text-[--text-muted]">
              Join the future of decentralized real estate. Secure your stake in the global ecosystem with VLT tokens. <span className="text-[--text-primary]">Limited supply available.</span>
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-8">
               <button className="w-full sm:w-auto px-5 md:px-10 py-6 bg-[--brand] text-white font-black rounded-3xl hover:brightness-110 active:scale-95 transition-all text-lg border border-[--brand]/20 shadow-none">
                  Buy VLT Now
               </button>
               <button className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-full border border-[--border] flex items-center justify-center bg-[--surface] group-hover:bg-[--surface-hover] transition-all duration-300">
                     <Play className="text-[--text-primary] fill-[--text-primary] ml-1 transition-colors" size={20} />
                  </div>
                  <span className="text-[--text-muted] font-black uppercase tracking-[0.2em] text-[10px] group-hover:text-[--text-primary] transition-colors">How to buy</span>
               </button>
            </motion.div>
          </div>

          {/* Right Side: Countdown */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] as any }}
            className="flex justify-center items-center relative"
          >
             {/* Decorative Background for Timer */}
             <div className="absolute inset-0 bg-[--brand]/5 blur-[120px] rounded-full scale-150 animate-pulse" />
             <CountdownTimer />
          </motion.div>
        </motion.div>

        {/* Purchase Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-20 md:mt-40 max-w-5xl mx-auto w-full bg-[--surface] border border-[--border] rounded-[2rem] md:rounded-[4rem] p-8 md:p-20 backdrop-blur-2xl relative group overflow-hidden"
          >
           <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[--brand]/5 to-transparent pointer-events-none" />
           <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center relative z-10">
              <div>
                <h2 className="text-[--text-primary] text-2xl md:text-5xl font-black mb-4 md:mb-6 tracking-tighter">Secure your VLT</h2>
                <p className="text-[--text-muted] text-base md:text-lg mb-8 md:mb-12 leading-relaxed font-medium">Exchange your assets for VLT instantly at a guaranteed fixed rate.</p>
                <div className="space-y-6">
                   <div className="flex items-center gap-4 text-green-500 font-black text-base">
                      <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                        <Check size={14} />
                      </div>
                      Fixed Price: $0.25
                   </div>
                   <div className="flex items-center gap-4 text-[--text-muted] font-black text-base">
                      <div className="w-6 h-6 rounded-full bg-[--surface] border border-[--border] flex items-center justify-center">
                        <Star size={14} />
                      </div>
                      Early Access Benefits
                   </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="relative group/input">
                  <input 
                    type="number" 
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    placeholder="Enter amount (USD)"
                    className="w-full bg-[--bg-primary] border border-[--border] rounded-2xl md:rounded-3xl px-6 md:px-8 py-5 md:py-7 text-[--text-primary] text-xl md:text-3xl font-black outline-none focus:border-[--brand] transition-all placeholder:text-[--text-muted]/20 tabular-nums"
                  />
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[--text-muted]/40 font-black tracking-widest text-xs uppercase">USD</div>
                </div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-[--brand] rounded-3xl p-8 flex justify-between items-center border border-[--border] overflow-hidden relative"
                >
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
                    <div className="relative z-10">
                      <p className="text-white/60 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2">You Receive</p>
                      <p className="text-white text-2xl md:text-4xl font-black tabular-nums">{receiveAmount} VLT</p>
                    </div>
                   <button 
                    onClick={currentAccount ? () => {} : connectWallet}
                    className="p-5 bg-white/10 hover:bg-white/20 rounded-2xl transition-all text-white border border-white/10 relative z-10"
                   >
                     <Wallet size={28} />
                   </button>
                </motion.div>

                {currentAccount && payAmount && (
                  <motion.button 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full py-7 bg-[--brand] text-white font-black rounded-3xl hover:brightness-110 active:scale-95 transition-all text-xl"
                  >
                    Purchase Tokens
                  </motion.button>
                )}
              </div>
           </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

