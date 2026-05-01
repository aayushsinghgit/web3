import { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Skeleton } from './Skeleton';
import { motion, useScroll, useTransform } from 'framer-motion';

interface CoinPrice { usd: number; usd_24h_change: number; }
interface PricesData { bitcoin: CoinPrice; ethereum: CoinPrice; solana: CoinPrice; }

const COINS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
];

export function Exchange() {
  const [prices, setPrices] = useState<PricesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [swapAmount, setSwapAmount] = useState('');
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true');
        const data = await res.json();
        setPrices(data);
      } catch { /* silently fail */ }
      finally { setLoading(false); }
    };
    fetchPrices();
  }, []);

  const ethPrice = prices?.ethereum?.usd || 0;
  const swapResult = swapAmount && ethPrice ? (parseFloat(swapAmount) * ethPrice).toFixed(2) : '';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <section ref={containerRef} className="py-20 px-4 bg-[--bg-primary] relative overflow-hidden">
      {/* Background Orbs with Parallax */}
      <motion.div style={{ y: y1 }} className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[--brand]/5 blur-[120px] rounded-full -z-10" />
      <motion.div style={{ y: y2 }} className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[--brand]/10 border border-[--brand]/20 text-[--brand] text-[10px] font-black uppercase tracking-[0.2em] mb-6">
             <div className="w-1.5 h-1.5 bg-[--brand] rounded-full animate-pulse" /> Live Market Data
           </div>
           <h2 className="text-3xl md:text-6xl md:text-8xl font-black text-[--text-primary] mb-8 tracking-tighter leading-[0.85]">
              Real-time <br /> <span className="text-[--text-muted]/40">Liquidity.</span>
           </h2>
           <p className="text-[--text-muted] text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              Swap assets at guaranteed market rates. No middlemen, no sign-ups, just pure decentralized execution.
           </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          {COINS.map(coin => {
            const price = prices?.[coin.id as keyof PricesData];
            const change = price?.usd_24h_change ?? 0;
            const isUp = change >= 0;
            return (
              <motion.div key={coin.id} variants={itemVariants} className="bg-[--surface] border border-[--border] backdrop-blur-xl rounded-[2.5rem] p-10 hover:bg-white/[0.05] hover:border-[--border] transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                   <p className="text-[--text-primary] text-4xl md:text-8xl font-black">{coin.symbol[0]}</p>
                </div>
                
                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div>
                    <p className="text-[--text-muted]/40 text-[10px] uppercase tracking-[0.3em] font-black mb-1">{coin.name}</p>
                    <p className="text-[--text-primary] font-black text-4xl tracking-tighter group-hover:text-[--brand] transition-colors">{coin.symbol}</p>
                  </div>
                  <span className={`flex items-center gap-1.5 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${isUp ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {Math.abs(change).toFixed(2)}%
                  </span>
                </div>

                <div className="relative z-10">
                  {loading ? <Skeleton className="h-10 w-40 rounded-xl" /> : (
                    <p className="text-[--text-primary] text-4xl font-black tracking-tight tabular-nums">
                      ${price?.usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '—'}
                    </p>
                  )}
                  <p className="text-[--text-muted]/10 text-[10px] font-black uppercase tracking-widest mt-2">24h USD Performance</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Improved Swap Calculator */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
          className="bg-[--surface] border border-[--border] rounded-[3.5rem] p-10 md:p-12 max-w-4xl mx-auto relative group overflow-hidden"
        >
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-[--brand]/10 blur-[100px] rounded-full group-hover:bg-[--brand]/20 transition-all" />
           
           <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
              <div>
                 <h3 className="text-[--text-primary] text-3xl font-black mb-4 tracking-tighter">Swap Engine</h3>
                 <p className="text-[--text-muted] leading-relaxed font-medium mb-8">Instantly calculate rates for the global market. Verified by Vaulta Guardian.</p>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[--text-muted]/40 font-black text-[10px] uppercase tracking-widest">
                       <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Live Market Execution
                    </div>
                    <div className="flex items-center gap-3 text-[--text-muted]/40 font-black text-[10px] uppercase tracking-widest">
                       <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Zero Slippage Mode
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="bg-[--bg-primary] border border-[--border] rounded-3xl p-6 hover:border-[--brand]/30 transition-all">
                    <label className="text-[--text-muted]/40 text-[10px] font-black uppercase tracking-widest mb-3 block">You have (ETH)</label>
                    <input 
                      type="number" 
                      value={swapAmount} 
                      onChange={e => setSwapAmount(e.target.value)} 
                      placeholder="0.00" 
                      className="bg-transparent text-[--text-primary] text-3xl font-black outline-none w-full placeholder:text-[--text-muted]/20 tabular-nums" 
                    />
                 </div>

                 <div className="flex justify-center -my-10 relative z-20">
                    <div className="w-10 h-10 bg-[--surface] border border-[--border] rounded-xl flex items-center justify-center text-[--text-muted]/40">
                       <ArrowRight size={18} />
                    </div>
                 </div>

                 <div className="bg-[--brand]/10 border border-[--brand]/20 rounded-3xl p-6">
                    <label className="text-[--brand]/40 text-[10px] font-black uppercase tracking-widest mb-3 block">Estimated (USD)</label>
                    <div className="text-[--brand] text-3xl font-black tabular-nums">
                       {swapResult ? `$${parseFloat(swapResult).toLocaleString()}` : '—'}
                    </div>
                 </div>

                 <p className="text-[--text-muted]/10 text-[10px] font-black uppercase tracking-widest text-center">
                    Rate: 1 ETH = ${ethPrice.toLocaleString()} USD
                 </p>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}

