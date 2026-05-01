import { Briefcase, MapPin, Clock, ArrowRight, Zap, Shield, Users } from 'lucide-react';
import { Footer } from './Footer';
import { motion } from 'framer-motion';

export function Careers() {
  const positions = [
    { title: "Senior Protocol Engineer", dept: "Engineering", location: "Remote / Dubai", type: "Full-time" },
    { title: "Smart Contract Architect", dept: "Security", location: "Remote", type: "Full-time" },
    { title: "Product Designer (Web3)", dept: "Design", location: "Remote / London", type: "Full-time" },
    { title: "Ecosystem Growth Lead", dept: "Growth", location: "Remote / New York", type: "Full-time" },
    { title: "Security Auditor", dept: "Security", location: "Remote", type: "Contract" },
  ];

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
    <div className="bg-[--bg-primary] min-h-screen pt-24 pb-20 px-4 overflow-hidden relative">
      
      {/* Background Gradients */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-[--brand]/5 blur-[150px] rounded-full -ml-80 -mt-80" 
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full -mr-40 -mb-20" 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }}
          className="text-center mb-20"
        >
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[--brand]/10 border border-[--brand]/20 text-[--brand] text-[10px] font-black uppercase tracking-[0.3em] mb-10">
             <Briefcase size={14} /> Careers at Vaulta
           </div>
           <h1 className="text-4xl md:text-7xl md:text-[10rem] font-black text-[--text-primary] mb-10 tracking-tighter leading-[0.8]">
              Build the <br /> <span className="text-[--text-muted]/40">Invisible.</span>
           </h1>
           <p className="text-[--text-muted] text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-medium">
              We're looking for architects, dreamers, and skeptics to help us rebuild the financial infrastructure of the world.
           </p>
        </motion.div>

        {/* Culture Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-10 mb-24"
        >
           {[
             { title: "Radical Transparency", desc: "Open source is in our DNA. We build in public and trust by default.", icon: <Users size={32} /> },
             { title: "Security First", desc: "We don't ship until it's bulletproof. Excellence is our only baseline.", icon: <Shield size={32} /> },
             { title: "Infinite Growth", desc: "We invest heavily in our team's evolution. Learn fast, build faster.", icon: <Zap size={32} /> },
           ].map((c, i) => (
             <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-[--surface] border border-[--border] rounded-[4rem] p-6 md:p-12 hover:bg-[--surface-hover] transition-all group relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[--brand]/5 blur-3xl rounded-full" />
                <div className="w-20 h-20 bg-[--bg-primary] border border-[--border] rounded-3xl flex items-center justify-center text-[--brand] mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                   {c.icon}
                </div>
                <h3 className="text-[--text-primary] text-3xl font-black mb-6 tracking-tight">{c.title}</h3>
                <p className="text-[--text-muted] text-lg font-medium leading-relaxed">{c.desc}</p>
             </motion.div>
           ))}
        </motion.div>

        {/* Open Positions */}
        <div className="mb-24">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20"
           >
              <div>
                 <h2 className="text-[--text-primary] text-3xl md:text-6xl font-black tracking-tighter mb-4">Open Positions</h2>
                 <p className="text-[--text-muted]/40 font-black text-[10px] uppercase tracking-[0.3em]">Join our decentralized collective</p>
              </div>
              <button className="text-[--text-muted] hover:text-[--brand] transition-colors font-black text-xs uppercase tracking-[0.3em] border-b border-transparent hover:border-[--brand] pb-1">View All Roles</button>
           </motion.div>

           <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
           >
              {positions.map((p, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  whileHover={{ x: 10, backgroundColor: 'var(--surface-hover)' }}
                  className="bg-[--surface] border border-[--border] rounded-[3rem] p-10 flex flex-col md:flex-row justify-between items-center group transition-all cursor-pointer"
                >
                   <div className="flex flex-col md:flex-row items-center gap-10 mb-8 md:mb-0 text-center md:text-left">
                      <div className="w-16 h-16 bg-[--bg-primary] border border-[--border] rounded-2xl flex items-center justify-center text-[--text-muted]/40 font-black text-lg group-hover:text-[--brand] group-hover:border-[--brand]/30 transition-all duration-500">{p.dept[0]}</div>
                      <div>
                         <h4 className="text-[--text-primary] text-2xl font-black group-hover:text-[--brand] transition-colors tracking-tight">{p.title}</h4>
                         <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-2">
                            <span className="flex items-center gap-2 text-[--text-muted]/40 text-[10px] font-black uppercase tracking-[0.2em]">
                               <MapPin size={14} className="text-[--brand]" /> {p.location}
                            </span>
                            <span className="flex items-center gap-2 text-[--text-muted]/40 text-[10px] font-black uppercase tracking-[0.2em]">
                               <Clock size={14} className="text-blue-400" /> {p.type}
                            </span>
                         </div>
                      </div>
                   </div>
                   <button className="px-5 md:px-10 py-5 bg-[--bg-primary] border border-[--border] rounded-[1.5rem] text-[--text-primary] font-black text-xs uppercase tracking-[0.2em] group-hover:bg-[--brand] group-hover:text-white group-hover:border-transparent transition-all duration-500">
                      Apply Now
                   </button>
                </motion.div>
              ))}
           </motion.div>
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }}
          className="bg-[--surface] border border-[--border] rounded-[5rem] p-6 md:p-12 md:p-20 flex flex-col items-center text-center relative overflow-hidden group"
        >
           <div className="absolute inset-0 bg-gradient-to-br from-[--brand]/5 to-transparent pointer-events-none" />
           <h2 className="text-[--text-primary] text-3xl md:text-6xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.9] relative z-10">Don't see <br /> a fit?</h2>
           <p className="text-[--text-muted] text-xl md:text-2xl mb-16 max-w-2xl font-medium relative z-10 leading-relaxed">
             We are always looking for exceptional talent. If you have a vision for the future of finance, reach out to us at <br /><span className="text-[--text-primary] hover:text-[--brand] transition-colors cursor-pointer">careers@vaulta.io</span>
           </p>
           <button className="flex items-center gap-4 px-6 md:px-12 py-7 bg-[--brand] text-white font-black rounded-[2rem] hover:brightness-110 active:scale-95 transition-all text-xl relative z-10">
              General Application <ArrowRight size={24} />
           </button>
        </motion.div>

      </div>
      <Footer />
    </div>
  );
}
