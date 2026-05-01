import { Footer } from './Footer';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, ChevronRight, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000/api';

export function Rankings() {
  const [rankings, setRankings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const res = await fetch(`${API_BASE}/referrals/rankings`);
        const data = await res.json();
        setRankings(data);
      } catch (err) {
        console.error("Failed to fetch rankings:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRankings();
  }, []);

  return (
    <div className="bg-[--bg-primary] min-h-screen pt-32 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Trophy size={14} /> Global Leaderboard
          </div>
          <h1 className="text-2xl md:text-5xl md:text-7xl font-black text-[--text-primary] tracking-tighter mb-4">
            Top <span className="text-yellow-500">Performers.</span>
          </h1>
          <p className="text-[--text-muted] text-xl font-medium max-w-xl mx-auto">
            See how you stack up against the best in the Vaulta ecosystem. Top 10 earn a share of the monthly protocol revenue.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[--surface] border border-[--border] rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          <div className="p-8 border-b border-[--border] flex justify-between items-center bg-[--bg-primary]/50">
             <h3 className="text-[--text-primary] font-black text-xl">Current Season: Alpha</h3>
             <div className="text-[--text-muted]/40 text-xs font-black uppercase tracking-widest">Ends in 12 Days</div>
          </div>
          
          <div className="p-4 sm:p-8">
            <div className="grid grid-cols-12 gap-4 text-[--text-muted]/40 text-[10px] font-black uppercase tracking-widest px-6 pb-4">
               <div className="col-span-2">Rank</div>
               <div className="col-span-4">Address</div>
               <div className="col-span-3 hidden sm:block">Volume Generated</div>
               <div className="col-span-3 text-right">Referrals</div>
            </div>

            <div className="space-y-3">
               {isLoading ? (
                 <div className="py-20 flex flex-col items-center justify-center text-[--text-muted]">
                    <Loader2 size={40} className="animate-spin mb-4 text-[--brand]" />
                    <p className="font-black uppercase tracking-widest text-[10px]">Updating Rankings...</p>
                 </div>
               ) : rankings.length > 0 ? (
                 rankings.map((user, i) => (
                   <div key={i} className="grid grid-cols-12 gap-4 items-center bg-[--bg-primary] border border-[--border] rounded-2xl px-6 py-5 hover:border-[--brand]/50 transition-all group">
                      <div className="col-span-2 flex items-center">
                         {i === 0 ? <Trophy className="text-yellow-500" size={24} /> : 
                          i === 1 ? <Medal className="text-gray-400" size={24} /> :
                          i === 2 ? <Medal className="text-amber-600" size={24} /> :
                          <span className="text-[--text-muted] font-black text-lg w-6 text-center">{i + 1}</span>}
                      </div>
                      <div className="col-span-8 sm:col-span-4 flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-[--surface] border border-[--border] flex items-center justify-center">
                            <Star size={12} className="text-[--text-muted]/40 group-hover:text-[--brand] transition-colors" />
                         </div>
                         <span className="text-[--text-primary] font-bold truncate">{user.referrer_address}</span>
                      </div>
                      <div className="col-span-3 hidden sm:flex items-center text-[--text-muted] font-medium">
                         ${(user.count * 120.5).toLocaleString()} Vol
                      </div>
                      <div className="col-span-2 sm:col-span-3 flex items-center justify-end">
                         <div className="flex items-center gap-2">
                            <span className="text-[--text-primary] font-black text-lg">{user.count}</span>
                            <ChevronRight size={16} className="text-[--text-muted]/20 group-hover:text-[--brand] group-hover:translate-x-1 transition-all" />
                         </div>
                      </div>
                   </div>
                 ))
               ) : (
                 <div className="py-20 text-center text-[--text-muted]">
                    <p className="font-black uppercase tracking-widest text-xs">No rankings yet. Start referring!</p>
                 </div>
               )}
            </div>
          </div>
        </motion.div>
      </div>
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
}
