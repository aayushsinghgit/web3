import { useRef } from 'react';
import { ArrowRight, Shield, Zap, Globe, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from './Footer';
import { motion, useScroll, useTransform } from 'framer-motion';

export function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <div ref={containerRef} className="bg-[--bg-primary] min-h-screen pt-10 md:pt-12 pb-20 px-4 md:px-6 overflow-hidden selection:bg-[--brand] selection:text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }}
          className="relative py-10 md:py-24 mb-10 md:mb-24 flex flex-col items-center text-center"
        >
           <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <div className="w-[700px] h-[700px] bg-[--brand]/10 blur-[180px] rounded-full animate-pulse" />
           </div>
           
           <h1 className="text-xl sm:text-3xl md:text-7xl font-black text-[--text-primary] max-w-5xl leading-[1.1] tracking-tighter mb-8 md:mb-16 italic">
             "We didn't build just another wallet. We built a bridge to the future of decentralized finance."
           </h1>
           
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4, duration: 1 }}
             className="flex flex-col items-center gap-6"
           >
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[--brand] p-1">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" alt="Founder" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="text-center">
                 <p className="text-[--text-primary] font-black text-xl">Alex Rivet</p>
                 <p className="text-[--text-muted]/40 text-[10px] font-black uppercase tracking-[0.4em] mt-1">Founder, Vaulta Core</p>
              </div>
           </motion.div>
        </motion.div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-6 md:gap-12 mb-24 items-start">
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
             className="md:sticky md:top-40 mb-10 md:mb-0"
           >
              <h2 className="text-3xl md:text-6xl font-black text-[--text-primary] tracking-tighter mb-6 md:mb-8 leading-[0.9]">Our DNA is <br /> <span className="text-[--brand]">Decentralized.</span></h2>
              <p className="text-[--text-muted] text-lg md:text-xl leading-relaxed font-medium max-w-sm">
                Vaulta is built on three core pillars that define every decision we make and every line of code we write.
              </p>
           </motion.div>
           
           <motion.div 
             variants={containerVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             className="space-y-6"
           >
              {[
                { title: "Security is Fearless", desc: "The age of seed phrases is ending. We implement MPC and hardware-level security so you never have to worry.", icon: <Shield size={32} className="text-blue-400" /> },
                { title: "UX Done Right", desc: "Clean UI, real-time alerts, and zero-knowledge proofs. Powerful but invisible complexity.", icon: <Zap size={32} className="text-orange-400" /> },
                { title: "Inside the Core", desc: "Explore our open-source architecture. Built with transparency and community trust at the center.", icon: <Globe size={32} className="text-green-400" /> }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  whileHover={{ x: 10, backgroundColor: 'var(--surface-hover)' }}
                  className="group bg-[--surface] border border-[--border] p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] transition-all flex flex-col md:flex-row items-start gap-8 md:gap-10"
                >
                   <div className="w-14 h-14 md:w-16 md:h-16 bg-[--bg-primary] border border-[--border] rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      {item.icon}
                   </div>
                   <div>
                      <h3 className="text-[--text-primary] text-2xl md:text-3xl font-black mb-4 tracking-tight">{item.title}</h3>
                      <p className="text-[--text-muted] text-base md:text-lg leading-relaxed mb-6 md:mb-8 font-medium">{item.desc}</p>
                      <button className="flex items-center gap-3 text-[--text-muted]/40 group-hover:text-[--brand] font-black text-[8px] md:text-[10px] uppercase tracking-[0.3em] transition-all">
                         Read Mission <ArrowRight size={14} className="md:w-4" />
                      </button>
                   </div>
                </motion.div>
              ))}
           </motion.div>
        </div>

        {/* Team Section */}
        <div className="mb-24">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="mb-20"
           >
              <h2 className="text-[--text-primary] text-3xl md:text-6xl font-black tracking-tighter mb-6">The Architects</h2>
              <p className="text-[--text-muted] text-xl font-medium">Meet the team behind the transition from Web2 to the Frontier.</p>
           </motion.div>
           
           <motion.div 
             variants={containerVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
           >
              {[
                { name: "Sarah Chen", role: "Head of Engineering", sym: "SC" },
                { name: "Marcus Thorne", role: "Design Principal", sym: "MT" },
                { name: "Leo Vance", role: "Blockchain Strategist", sym: "LV" },
                { name: "Elena Rossi", role: "Core Developer", sym: "ER" },
                { name: "Julian Gray", role: "Product Manager", sym: "JG" },
                { name: "Aria Kim", role: "Security Lead", sym: "AK" }
              ].map((member, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="bg-[--surface] border border-[--border] p-10 rounded-[2.5rem] hover:bg-[--surface-hover] transition-all group relative overflow-hidden"
                >
                   <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                      <div className="flex gap-4 text-[--text-muted]/40">
                         <Github size={18} className="hover:text-[--text-primary] cursor-pointer transition-colors" />
                         <Twitter size={18} className="hover:text-[--text-primary] cursor-pointer transition-colors" />
                         <Linkedin size={18} className="hover:text-[--text-primary] cursor-pointer transition-colors" />
                      </div>
                   </div>
                   <div className="w-14 h-14 bg-[--bg-primary] border border-[--border] rounded-2xl flex items-center justify-center text-[--brand] font-black text-sm mb-8 group-hover:bg-[--brand] group-hover:text-white transition-all duration-500">
                      {member.sym}
                   </div>
                   <h4 className="text-[--text-primary] text-2xl font-black mb-2 tracking-tight">{member.name}</h4>
                   <p className="text-[--text-muted]/40 text-[10px] font-black uppercase tracking-[0.3em]">{member.role}</p>
                </motion.div>
              ))}
           </motion.div>
        </div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }}
          className="relative py-20 md:py-24 bg-[--surface] border border-[--border] rounded-[3rem] md:rounded-[5rem] flex flex-col items-center text-center overflow-hidden group"
        >
           <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
              <motion.div 
                style={{ y }}
                className="text-[12rem] md:text-[25rem] font-black text-[--text-muted]/5 tracking-tighter select-none"
              >
                VAULTA
              </motion.div>
           </div>
           
           <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-[--text-primary] mb-8 md:mb-10 tracking-tighter leading-[0.9] relative z-10 px-4">
              Command Web3. <br /> Your Way.
           </h2>
           <p className="text-[--text-muted] text-base md:text-2xl mb-12 md:mb-16 max-w-2xl font-medium relative z-10 leading-relaxed px-6">
             Go beyond seed phrases. Go beyond limitations. <br /> Step into the dark with clarity.
           </p>
            <div className="flex flex-col sm:flex-row gap-6 relative z-10 w-full justify-center px-8">
               <Link to="/get-started" className="px-6 md:px-12 py-7 bg-[--brand] text-white font-black rounded-[2rem] hover:brightness-110 transition-all text-xl inline-flex justify-center items-center">
                  Get Started
               </Link>
               <Link to="/demo" className="px-6 md:px-12 py-7 bg-[--surface] border border-[--border] text-[--text-primary] font-black rounded-[2rem] hover:bg-[--surface-hover] transition-all text-xl inline-flex justify-center items-center">
                  Watch Demo
               </Link>
            </div>
         </motion.div>

      </div>
      <Footer />
    </div>
  );
}
