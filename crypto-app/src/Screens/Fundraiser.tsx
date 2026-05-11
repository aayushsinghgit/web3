import { useRef, useState, useEffect } from 'react';
import { Heart, Users, Globe, ArrowRight, Loader2 } from 'lucide-react';
import { Footer } from './Footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FundraiserModal } from '../Components/FundraiserModal';
import { useTransaction } from '../Wallet/context/TransactionContext';

export function Fundraiser() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const { getFundraisers, currentAccount } = useTransaction();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onChainProjects, setOnChainProjects] = useState<any[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetch = async () => {
      setIsLoadingProjects(true);
      const data = await getFundraisers();
      setOnChainProjects(data);
      setIsLoadingProjects(false);
    };
    if (currentAccount) fetch();
    else setIsLoadingProjects(false);
  }, [currentAccount]);

  const projects = [
    { title: "Clean Water Initiative", goal: "50", totalRaised: "32.5", days: 12, img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800" },
    { title: "Tech for Education", goal: "10", totalRaised: "8.1", days: 4, img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800" },
    { title: "Animal Sanctuary", goal: "25", totalRaised: "12.0", days: 22, img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800" },
  ];

  // Combine static and dynamic projects
  const allProjects = [...onChainProjects, ...projects];

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
    <div ref={containerRef} className="bg-[--bg-primary] min-h-screen pt-10 md:pt-12 pb-20 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Hero */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center mb-10 md:mb-20"
        >
          <div>
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[--brand]/30 bg-[--brand]/10 text-[--brand] text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-6 md:mb-10">
              <Heart size={14} /> Community Fund
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl md:text-9xl font-black text-[--text-primary] mb-6 md:mb-10 tracking-tighter leading-[0.8]">
              Lift up a <br /> <span className="text-[--text-muted]/40">Friend.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-[--text-muted] text-lg md:text-2xl max-w-lg mb-10 md:mb-16 leading-relaxed font-medium">
              Vaulta Fundraiser allows you to launch community projects or personal drives directly on-chain. Transparent, secure, and boundary-less.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 md:px-10 py-6 bg-[--brand] text-white font-black rounded-[2rem] transition-all hover:scale-105 active:scale-95 text-lg"
              >
                Start a Fundraiser
              </button>
              <button
                onClick={scrollToHowItWorks}
                className="px-5 md:px-10 py-6 bg-[--surface] border border-[--border] text-[--text-primary] font-black rounded-[2rem] hover:bg-[--surface-hover] transition-all text-lg"
              >
                How it Works
              </button>
            </motion.div>
          </div>
          <motion.div
            style={{ y: y1 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-10 bg-[--brand]/20 blur-[120px] rounded-full opacity-30 animate-pulse" />
            <div className="relative aspect-square rounded-[2rem] md:rounded-[4.5rem] overflow-hidden border border-[--border] group">
              <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[2s]" alt="Fundraiser" />
              <div className="absolute inset-0 bg-gradient-to-t from-[--bg-primary] via-transparent to-transparent flex items-end p-6 md:p-12">
                <div className="flex items-center gap-6 md:gap-10">
                  <motion.div style={{ y: y2 }}>
                    <p className="text-[--text-primary] text-2xl md:text-5xl font-black tracking-tighter tabular-nums">1.2K+</p>
                    <p className="text-[--text-muted] text-[10px] font-black uppercase tracking-[0.3em] mt-2">Active Projects</p>
                  </motion.div>
                  <div className="w-px h-12 bg-[--border]" />
                  <motion.div style={{ y: y1 }}>
                    <p className="text-[--text-primary] text-2xl md:text-5xl font-black tracking-tighter tabular-nums">450 ETH</p>
                    <p className="text-[--text-muted] text-[10px] font-black uppercase tracking-[0.3em] mt-2">Total Raised</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Explore Projects */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8 mb-12 md:mb-20">
            <div>
              <h2 className="text-[--text-primary] text-2xl md:text-6xl font-black tracking-tighter mb-2 md:mb-4">Explore Projects</h2>
              <p className="text-[--text-muted] text-sm md:text-lg font-medium">Discover impactful projects verified by the community.</p>
            </div>
            <button className="flex items-center gap-3 text-[--brand] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs group">
              View All <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {isLoadingProjects ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-[--text-muted]">
                <Loader2 size={40} className="animate-spin mb-4 text-[--brand]" />
                <p className="font-black uppercase tracking-widest text-xs">Syncing with Ethereum...</p>
              </div>
            ) : allProjects.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
                className="group bg-[--surface] border border-[--border] rounded-[4rem] overflow-hidden hover:bg-[--surface-hover] transition-all duration-500"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img src={p.img || `https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" alt={p.title} />
                  <div className="absolute top-6 right-6 bg-[--bg-primary]/80 backdrop-blur-xl px-5 py-2.5 rounded-2xl text-[--text-primary] text-[10px] font-black uppercase tracking-widest border border-white/10">
                    {p.days || 'Active'} {p.days ? 'Days Left' : ''}
                  </div>
                  {p.creator && (
                    <div className="absolute bottom-6 left-6 bg-[--brand]/20 backdrop-blur-xl px-3 py-1 rounded-full text-[--brand] text-[8px] font-black uppercase tracking-widest border border-[--brand]/30">
                      On-Chain Verified
                    </div>
                  )}
                </div>
                 <div className="p-6 md:p-10">
                  <h3 className="text-[--text-primary] text-xl md:text-2xl font-black mb-6 md:mb-8 tracking-tight group-hover:text-[--brand] transition-colors line-clamp-1">{p.title}</h3>
                  <div className="space-y-6">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-[--text-muted]">Raised: <span className="text-[--brand] tabular-nums">{p.totalRaised || p.raised} ETH</span></span>
                      <span className="text-[--text-muted]">Goal: <span className="tabular-nums">{p.goal} ETH</span></span>
                    </div>
                    <div className="h-2.5 bg-[--bg-primary] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: (Math.min(100, (parseFloat(p.totalRaised || p.raised) / parseFloat(p.goal)) * 100)) + '%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[--brand] to-blue-500 rounded-full"
                      />
                    </div>
                    <button className="w-full mt-6 py-5 bg-[--bg-primary] border border-[--border] group-hover:bg-[--brand] group-hover:text-white group-hover:border-transparent text-[--text-primary] font-black rounded-2xl transition-all duration-500 text-[10px] uppercase tracking-widest">
                      Support Project
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features / Benefits */}
        <div id="how-it-works" className="mb-20 pt-10">
          <h2 className="text-[--text-primary] text-3xl md:text-6xl font-black tracking-tighter mb-12">How it Works</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-12">
            {[
              {
                title: "Social Fundraisers",
                desc: "Gather support for community projects, medical bills, or education. Directly on-chain, 100% transparent.",
                icon: <Users size={40} />,
                color: "text-[--brand]",
                bg: "bg-[--brand]/10"
              },
              {
                title: "Global Reach",
                desc: "Tap into a global network of donors. No borders, no high middleman fees, just direct support.",
                icon: <Globe size={40} />,
                color: "text-blue-400",
                bg: "bg-blue-400/10"
              }
            ].map((feature, i) => (
               <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
                className="bg-[--surface] border border-[--border] rounded-[2rem] md:rounded-[4.5rem] p-8 md:p-12 hover:bg-white/[0.05] transition-all group overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] -mr-32 -mt-32 rounded-full group-hover:bg-white/10 transition-all duration-700" />
                <div className={`w-24 h-24 ${feature.bg} ${feature.color} rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {feature.icon}
                </div>
                <h3 className="text-[--text-primary] text-4xl font-black mb-6 tracking-tighter">{feature.title}</h3>
                <p className="text-[--text-muted] text-lg mb-12 leading-relaxed font-medium">{feature.desc}</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className={`flex items-center gap-3 ${feature.color} font-black uppercase tracking-[0.3em] text-xs group/btn`}
                >
                  Start Project <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />

      <FundraiserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
