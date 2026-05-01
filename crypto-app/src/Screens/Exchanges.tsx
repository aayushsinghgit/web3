import { useState } from 'react';
import { RefreshCw, BarChart3, TrendingUp, Search, ChevronDown, Shield } from 'lucide-react';
import { Footer } from './Footer';
import { motion } from 'framer-motion';

export function Exchanges() {
  const [fromAmount, setFromAmount] = useState('1');
  const [fromToken] = useState('ETH');
  const [toToken] = useState('USDT');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any
      }
    }
  };

  return (
    <div className="bg-[--bg-primary] min-h-screen pt-20 md:pt-24 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-start mb-12 md:mb-20">
          
          {/* Left: Market Insights */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-6 md:mb-8">
              <BarChart3 size={14} /> Market Hub
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl md:text-8xl font-black text-[--text-primary] mb-6 md:mb-10 tracking-tighter leading-[0.85]">
              Swap assets <br /> <span className="text-[--text-muted]/40">without limits.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-[--text-muted] text-lg md:text-xl max-w-lg mb-10 md:mb-16 leading-relaxed font-medium">
              Experience the power of universal liquidity. Swap any token on any chain with optimized gas and zero slippage protection.
            </motion.p>

            <motion.div variants={itemVariants} className="bg-[--surface] border border-[--border] rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full" />
              <h3 className="text-[--text-primary] font-black text-[10px] md:text-sm uppercase tracking-widest mb-6 md:mb-8 flex items-center gap-2">
                <TrendingUp size={16} className="text-green-400" /> Hot Tokens
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Ethereum', symbol: 'ETH', price: '$3,420.50', change: '+2.4%' },
                  { name: 'Vaulta', symbol: 'VLT', price: '$0.25', change: '+15.2%' },
                  { name: 'Solana', symbol: 'SOL', price: '$145.10', change: '-1.1%' },
                ].map((t, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 5 }}
                    className="flex justify-between items-center p-5 bg-[--bg-primary]/30 border border-transparent hover:border-[--border] rounded-2xl transition-all"
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[--surface] border border-[--border] rounded-xl flex items-center justify-center font-black text-xs md:text-sm text-[--text-primary]">{t.symbol[0]}</div>
                      <div>
                        <p className="text-[--text-primary] font-bold text-sm md:text-base">{t.name}</p>
                        <p className="text-[--text-muted]/40 text-[8px] md:text-[10px] font-black uppercase tracking-widest mt-0.5 md:mt-1">{t.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[--text-primary] font-black text-base">{t.price}</p>
                      <p className={t.change.startsWith('+') ? 'text-green-400 text-[10px] font-bold uppercase mt-1' : 'text-red-400 text-[10px] font-bold uppercase mt-1'}>{t.change}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Swap Interface */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
            className="lg:sticky lg:top-40"
          >
            <div className="bg-[--surface] border border-[--border] rounded-[4rem] p-8 md:p-14 backdrop-blur-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[--brand]/10 blur-[100px] -mr-40 -mt-40 rounded-full group-hover:bg-[--brand]/20 transition-all duration-1000" />
              
              <div className="flex justify-between items-center mb-8 md:mb-12 relative z-10">
                <div className="flex flex-col">
                  <h2 className="text-[--text-primary] text-2xl md:text-4xl font-black tracking-tight">Swap</h2>
                  <div className="flex items-center gap-2 mt-1 md:mt-2">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[--text-muted]/40">Live Market Access</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="p-4 bg-[--surface] hover:bg-[--surface-hover] rounded-2xl text-[--text-muted] transition-all border border-[--border]">
                    <RefreshCw size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <motion.div whileHover={{ scale: 1.01 }} className="bg-[--bg-primary] border border-[--border] rounded-[2.5rem] p-8 hover:border-[--brand]/30 transition-all">
                  <div className="flex justify-between mb-6">
                    <span className="text-[--text-muted] text-[10px] font-black uppercase tracking-widest">You Pay</span>
                    <span className="text-[--text-muted]/40 text-[10px] font-black">Balance: 1.45 ETH</span>
                  </div>
                  <div className="flex justify-between items-center gap-4 md:gap-6">
                    <input 
                      type="number" 
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      className="bg-transparent text-[--text-primary] text-3xl sm:text-4xl md:text-6xl font-black outline-none w-1/2 placeholder:text-[--text-muted]/10 tabular-nums"
                      placeholder="0.0"
                    />
                    <button className="flex items-center gap-3 md:gap-4 bg-[--surface] hover:bg-[--surface-hover] px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl transition-all border border-[--border]">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm">Ξ</div>
                      <span className="text-[--text-primary] font-black text-base md:text-xl">{fromToken}</span>
                      <ChevronDown size={16} className="text-[--text-muted]/40 md:w-5" />
                    </button>
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }} className="bg-[--bg-primary] border border-[--border] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 hover:border-[--brand]/30 transition-all">
                  <div className="flex justify-between mb-4 md:mb-6">
                    <span className="text-[--text-muted] text-[8px] md:text-[10px] font-black uppercase tracking-widest">You Receive</span>
                  </div>
                  <div className="flex justify-between items-center gap-4 md:gap-6">
                    <div className="text-[--text-primary] text-3xl sm:text-4xl md:text-6xl font-black tabular-nums">{(parseFloat(fromAmount) * 3420).toLocaleString()}</div>
                    <button className="flex items-center gap-3 md:gap-4 bg-[--surface] hover:bg-[--surface-hover] px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl transition-all border border-[--border]">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm">$</div>
                      <span className="text-[--text-primary] font-black text-base md:text-xl">{toToken}</span>
                      <ChevronDown size={16} className="text-[--text-muted]/40 md:w-5" />
                    </button>
                  </div>
                </motion.div>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-[--surface] border border-[--border] rounded-3xl p-6">
                   <span className="text-[--text-muted]/40 text-[9px] font-black uppercase tracking-[0.2em] mb-2 block">Price Impact</span>
                   <span className="text-green-400 text-sm font-black">0.01%</span>
                </div>
                <div className="bg-[--surface] border border-[--border] rounded-3xl p-6">
                   <span className="text-[--text-muted]/40 text-[9px] font-black uppercase tracking-[0.2em] mb-2 block">Slippage</span>
                   <span className="text-[--text-primary] text-sm font-black">0.5% Auto</span>
                </div>
              </div>

              <button className="w-full mt-10 py-7 bg-[--brand] hover:brightness-110 text-white font-black rounded-[2.5rem] transition-all active:scale-95 text-xl relative z-10">
                Execute Swap
              </button>

              <div className="mt-8 flex items-center justify-center gap-3 opacity-30 relative z-10">
                 <Shield size={14} className="text-[--text-primary]" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-[--text-primary]">Secured by Vaulta Guardian</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Market Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-32"
        >
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
             <div>
                <h2 className="text-[--text-primary] text-3xl md:text-6xl font-black tracking-tighter mb-4">Market Overview</h2>
                <p className="text-[--text-muted] font-medium">Live performance of the global asset landscape.</p>
             </div>
             <div className="relative group w-full md:w-96">
                <input 
                  type="text" 
                  placeholder="Search market..." 
                  className="w-full bg-[--surface] border border-[--border] rounded-[2rem] px-8 py-5 text-[--text-primary] outline-none focus:border-[--brand] transition-all pl-14"
                />
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[--text-muted]/40" size={20} />
             </div>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[--surface] border border-[--border] rounded-[2rem] md:rounded-[4rem] overflow-x-auto no-scrollbar"
          >
            <div className="min-w-[800px] p-4">
            <div className="grid grid-cols-4 gap-4 p-10 border-b border-[--border] text-[10px] font-black uppercase tracking-[0.3em] text-[--text-muted]">
              <span>Token</span>
              <span>Price</span>
              <span>24h Change</span>
              <span>Market Cap</span>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Bitcoin', sym: 'BTC', price: '$65,240', change: '+1.2%', cap: '$1.28T' },
                { name: 'Ethereum', sym: 'ETH', price: '$3,420', change: '+2.4%', cap: '$410B' },
                { name: 'Solana', sym: 'SOL', price: '$145', change: '-1.1%', cap: '$64B' },
                { name: 'Vaulta', sym: 'VLT', price: '$0.25', change: '+15.2%', cap: '$6.2M' },
              ].map((m, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  whileHover={{ backgroundColor: 'var(--surface-hover)', scale: 1.005 }}
                  className="grid grid-cols-4 gap-4 p-8 rounded-[2.5rem] transition-all items-center cursor-pointer"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-[--bg-primary] border border-[--border] rounded-2xl flex items-center justify-center font-black text-sm text-[--text-primary]">{m.sym[0]}</div>
                    <span className="text-[--text-primary] font-black text-lg tracking-tight">{m.name}</span>
                  </div>
                  <span className="text-[--text-primary] font-black text-lg tabular-nums">{m.price}</span>
                  <span className={m.change.startsWith('+') ? 'text-green-400 font-black text-lg' : 'text-red-400 font-black text-lg'}>{m.change}</span>
                  <span className="text-[--text-muted] font-bold">{m.cap}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>
      <Footer />
    </div>
  );
}
