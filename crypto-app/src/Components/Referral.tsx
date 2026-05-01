import { Users, Zap, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function Referral() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as any
      }
    }
  };

  return (
    <section id="referral" ref={containerRef} className="py-20 px-4 bg-[--bg-primary] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Referral Hero */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center mb-20">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[--brand]/30 bg-[--brand]/10 text-[--brand] text-[10px] font-black uppercase tracking-[0.3em] mb-10">
              <Users size={14} /> Referral Program
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-6xl md:text-8xl font-black text-[--text-primary] mb-10 tracking-tighter leading-[0.85]">
              Earn rewards <br /> <span className="text-[--brand]">by inviting friends.</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-[--text-muted] text-xl mb-12 max-w-md leading-relaxed font-medium">
              Hey user, got a friend who could use a happier transaction experience? Refer them to Vaulta and we'll gift you and your friend our token.
            </motion.p>
            
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
              {[
                { text: "20% Commission", icon: <Zap size={16} /> },
                { text: "Instant Payouts", icon: <CheckCircle size={16} /> },
                { text: "Unlimited Referrals", icon: <Users size={16} /> },
                { text: "Guardian Status", icon: <Shield size={16} /> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-[--text-muted] font-bold bg-[--surface] border border-[--border] p-4 rounded-2xl group-hover:border-[--brand]/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[--brand]/5 flex items-center justify-center text-[--brand]">
                    {item.icon}
                  </div>
                  <span className="text-xs tracking-tight">{item.text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link to="/referral" className="w-full sm:w-auto px-5 md:px-10 py-5 bg-[--brand] text-white font-black rounded-[2rem] hover:brightness-110 active:scale-95 transition-all inline-flex items-center justify-center gap-3 group text-base">
                Start Inviting
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            style={{ y: y1 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={imageVariants}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-[--brand]/10 to-blue-500/5 blur-[80px] rounded-full opacity-50" />
            <div className="relative aspect-square rounded-[4rem] overflow-hidden border border-[--border]">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                alt="Team collaboration" 
                className="w-full h-full object-cover opacity-90 scale-105"
              />
              <motion.div 
                style={{ y: y2 }}
                className="absolute top-6 right-6 sm:top-10 sm:right-10 w-36 h-36 sm:w-44 sm:h-44 flex flex-col items-center justify-center bg-[#2a2a2a]/90 backdrop-blur-xl border-t border-white/10 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              >
                <p className="text-white text-4xl sm:text-5xl font-black tracking-tighter drop-shadow-md">250+</p>
                <p className="text-white/60 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mt-2">Team Members</p>
              </motion.div>
              <motion.div 
                style={{ y: y1 }}
                className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 w-36 h-36 sm:w-44 sm:h-44 flex flex-col items-center justify-center bg-[#2a2a2a]/90 backdrop-blur-xl border-t border-white/10 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              >
                <p className="text-white text-4xl sm:text-5xl font-black tracking-tighter drop-shadow-md">50+</p>
                <p className="text-white/60 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mt-2">Countries</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Why Refer Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
          className="bg-[--surface] border border-[--border] rounded-[4.5rem] p-6 md:p-12 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[--brand]/5 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="mb-20">
              <h3 className="text-[--text-primary] text-2xl md:text-5xl md:text-6xl font-black mb-8 tracking-tighter">Why refer others to Vaulta?</h3>
              <p className="text-[--text-muted] text-xl max-w-2xl leading-relaxed font-medium">
                We believe the best way to grow is together. Our program is designed to reward both the referrer and the referred, making every transaction more beneficial.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
              {[
                { title: "Instant distribution of VLT rewards", icon: <Zap size={24} /> },
                { title: "Higher tiers for active community leaders", icon: <Users size={24} /> },
                { title: "Access to exclusive governance voting weights", icon: <Shield size={24} /> },
                { title: "Priority access to upcoming fundraiser rounds", icon: <Zap size={24} /> }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="flex flex-col gap-6"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[--surface] border border-[--border] flex items-center justify-center text-[--brand] group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <p className="text-[--text-primary] font-black text-lg leading-tight tracking-tight">{item.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
