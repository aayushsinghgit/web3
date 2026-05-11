import { useState, useRef, useEffect } from 'react';
import { Gift, Users, Trophy, Copy, Share2, ArrowRight, Check, Loader2 } from 'lucide-react';
import { Footer } from './Footer';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTransaction } from '../Wallet/context/TransactionContext';

const API_BASE = 'http://localhost:5000/api';

export function Referral() {
  const { currentAccount } = useTransaction();
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ referrals: 0, earned: "0.00", rank: "Explorer" });
  const [isLoading, setIsLoading] = useState(true);
  
  const referralCode = currentAccount 
    ? `VLT-${currentAccount.slice(2, 6).toUpperCase()}-${currentAccount.slice(-4).toUpperCase()}`
    : "CONNECT-WALLET";

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  useEffect(() => {
    if (!currentAccount) {
      setIsLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE}/referrals/count/${currentAccount}`);
        const data = await res.json();
        const count = data.count || 0;
        
        let rank = "Explorer";
        if (count >= 20) rank = "Guardian";
        else if (count >= 5) rank = "Architect";

        setStats({
          referrals: count,
          earned: (count * 12.5).toFixed(2), // Mock $12.5 per referral
          rank: rank
        });
      } catch (err) {
        console.error("Failed to fetch referral stats:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [currentAccount]);

  const handleCopy = () => {
    if (referralCode === "CONNECT-WALLET") return;
    navigator.clipboard.writeText(window.location.origin + "/?ref=" + currentAccount);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
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
    <div ref={containerRef} className="bg-[--bg-primary] min-h-screen pt-10 md:pt-12 pb-20 px-4 overflow-hidden relative">
      
      {/* Background Orbs with Parallax */}
      <motion.div style={{ y: y1 }} className="absolute top-0 right-0 w-[800px] h-[800px] bg-[--brand]/5 blur-[150px] rounded-full -mr-40 -mt-40 animate-pulse" />
      <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full -ml-40 -mb-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Hero Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center mb-20"
        >
          <div>
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[--brand]/10 border border-[--brand]/20 text-[--brand] text-[10px] font-black uppercase tracking-[0.2em] mb-10">
              <Gift size={14} /> Referral Program
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl md:text-[9rem] font-black text-[--text-primary] mb-10 tracking-tighter leading-[0.8]">
              Share the <br /> <span className="text-[--text-muted]/40">Frontier.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-[--text-muted] text-xl md:text-2xl max-w-lg mb-16 leading-relaxed font-medium">
              Invite your friends to Vaulta and earn up to 20% of their transaction fees. No limits, no boundaries, just pure decentralized growth.
            </motion.p>
            
            <motion.div variants={itemVariants} className="bg-[--surface] border border-[--border] rounded-[2.5rem] p-10 max-w-md relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[--brand]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               <p className="text-[--text-muted]/40 text-[10px] font-black uppercase tracking-[0.3em] mb-6 relative z-10">Your Referral Code</p>
               <div className="flex items-center justify-between bg-[--bg-primary] border border-[--border] rounded-2xl p-5 relative z-10">
                  <span className="text-[--text-primary] font-black tracking-[0.3em] text-lg">{referralCode}</span>
                  <button 
                    onClick={handleCopy}
                    className="p-4 bg-[--brand] text-white rounded-xl hover:brightness-110 active:scale-95 transition-all"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
               </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] as any }}
            className="relative group"
          >
             <div className="absolute -inset-1 bg-gradient-to-r from-[--brand] to-blue-500 rounded-[5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200" />
             <div className="relative bg-[--surface] border border-[--border] rounded-[4.5rem] p-6 md:p-12 md:p-12 overflow-hidden">
                <h3 className="text-[--text-primary] text-4xl font-black mb-12 tracking-tighter">Earning Tiers</h3>
                <div className="space-y-4">
                   {[
                     { tier: "Explorer", perk: "5% Commission", req: "0-5 Referrals", color: "text-blue-400", bg: "bg-blue-400/5" },
                     { tier: "Architect", perk: "12% Commission", req: "5-20 Referrals", color: "text-[--brand]", bg: "bg-[--brand]/5" },
                     { tier: "Guardian", perk: "20% Commission", req: "20+ Referrals", color: "text-green-500", bg: "bg-green-500/5" },
                   ].map((t, i) => (
                     <motion.div 
                        key={i} 
                        whileHover={{ x: 10 }}
                        className={`flex justify-between items-center p-8 ${t.bg} border border-transparent hover:border-[--border] rounded-[2rem] transition-all`}
                     >
                        <div>
                           <p className={`text-2xl font-black ${t.color}`}>{t.tier}</p>
                           <p className="text-[--text-muted]/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2">{t.req}</p>
                        </div>
                        <span className="text-[--text-primary] font-black text-xl tabular-nums">{t.perk}</span>
                     </motion.div>
                   ))}
                </div>
             </div>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-10 mb-20"
        >
           {[
             { label: "Total Referrals", val: stats.referrals, icon: <Users size={28} /> },
             { label: "Est. Rewards", val: `$${stats.earned}`, icon: <Gift size={28} /> },
             { label: "Current Rank", val: stats.rank, icon: <Trophy size={28} /> },
           ].map((stat, i) => (
             <motion.div 
               key={i} 
               variants={itemVariants}
               whileHover={{ y: -10 }}
               className="bg-[--surface] border border-[--border] rounded-[3rem] p-6 md:p-12 hover:bg-[--surface-hover] transition-all group overflow-hidden relative"
             >
                {isLoading && (
                  <div className="absolute inset-0 bg-[--surface]/50 backdrop-blur-sm flex items-center justify-center z-10">
                    <Loader2 size={24} className="animate-spin text-[--brand]" />
                  </div>
                )}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 blur-3xl rounded-full" />
                <div className="w-16 h-16 bg-[--brand]/10 rounded-2xl flex items-center justify-center text-[--brand] mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                   {stat.icon}
                </div>
                <p className="text-[--text-muted]/40 text-[10px] font-black uppercase tracking-[0.3em] mb-3">{stat.label}</p>
                <p className="text-[--text-primary] text-2xl md:text-5xl font-black tracking-tighter tabular-nums">{stat.val}</p>
             </motion.div>
           ))}
        </motion.div>

        {/* How it works */}
        <div className="text-center mb-20">
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-[--text-primary] text-3xl md:text-6xl md:text-7xl font-black mb-16 tracking-tighter"
           >
             How to grow together.
           </motion.h2>
           <div className="grid md:grid-cols-3 gap-6 md:gap-12">
              {[
                { title: "Invite Friends", desc: "Share your unique referral link or code with your network." },
                { title: "They Transact", desc: "Your referrals start swapping and interacting with the ecosystem." },
                { title: "You Earn", desc: "Receive instant commissions in VLT tokens for every interaction." }
              ].map((step, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 1 }}
                  className="relative group"
                >
                   <motion.div 
                     style={{ y: y1 }}
                     className="text-[15rem] font-black text-[--text-muted] opacity-[0.03] dark:opacity-[0.05] absolute top-[-5rem] left-1/2 -translate-x-1/2 select-none pointer-events-none leading-none group-hover:opacity-[0.08] transition-opacity duration-1000"
                   >
                     {i + 1}
                   </motion.div>
                   <h4 className="text-[--text-primary] text-3xl font-black mb-6 relative z-10 tracking-tight">{step.title}</h4>
                   <p className="text-[--text-muted] text-lg font-medium leading-relaxed max-w-xs mx-auto relative z-10">{step.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Share Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }}
          className="bg-[--surface] border border-[--border] rounded-[5rem] p-6 md:p-12 md:p-20 flex flex-col items-center text-center relative overflow-hidden group"
        >
           <div className="absolute inset-0 bg-gradient-to-br from-[--brand]/5 via-transparent to-blue-500/5 pointer-events-none" />
           <motion.div 
             animate={{ 
               scale: [1, 1.1, 1],
               rotate: [0, 5, 0]
             }}
             transition={{ duration: 10, repeat: Infinity }}
             className="absolute -top-40 -right-40 w-96 h-96 bg-[--brand]/10 blur-[120px] rounded-full pointer-events-none" 
           />
           
           <h2 className="text-[--text-primary] text-3xl md:text-6xl md:text-8xl font-black mb-10 tracking-tighter relative z-10 leading-[0.9]">Start your <br /> network today.</h2>
           <p className="text-[--text-muted] text-xl md:text-2xl mb-16 max-w-2xl font-medium relative z-10 leading-relaxed">
             Connect with your social circle and start earning commissions in real-time. The future of finance is shared.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 relative z-10 w-full justify-center">
              <Link to="/share-link" className="flex items-center justify-center gap-4 px-6 md:px-12 py-7 bg-[--brand] text-white font-black rounded-[2rem] hover:brightness-110 active:scale-95 transition-all text-xl">
                 <Share2 size={24} /> Share Link
              </Link>
              <Link to="/rankings" className="flex items-center justify-center gap-4 px-6 md:px-12 py-7 bg-[--surface] border border-[--border] text-[--text-primary] font-black rounded-[2rem] hover:bg-[--surface-hover] transition-all text-xl">
                 View Rankings <ArrowRight size={24} />
              </Link>
           </div>
        </motion.div>

      </div>
      <Footer />
    </div>
  );
}
