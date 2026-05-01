import { Footer } from './Footer';
import { motion } from 'framer-motion';
import { Play, PlayCircle, Shield, Zap } from 'lucide-react';

export function Demo() {
  return (
    <div className="bg-[--bg-primary] min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[--brand]/30 bg-[--brand]/10 text-[--brand] text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <PlayCircle size={14} /> Product Tour
          </div>
          <h1 className="text-2xl md:text-5xl md:text-7xl font-black text-[--text-primary] tracking-tighter mb-6">
            Experience <span className="text-[--brand]">Vaulta.</span>
          </h1>
          <p className="text-[--text-muted] text-xl max-w-2xl mx-auto font-medium">
            Watch how our intuitive interface brings complex DeFi operations right to your fingertips.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
          className="relative aspect-video rounded-[3rem] overflow-hidden border border-[--border] bg-[#1a1a1a] shadow-2xl group cursor-pointer flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[--brand]/20 to-blue-500/5 opacity-50 blur-[100px]" />
          
          <video 
            src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-227-large.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700"
          />

          <div className="relative z-10 w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[--brand] transition-all duration-500">
            <Play size={40} className="ml-2" fill="currentColor" />
          </div>

          <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between z-10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <div>
               <p className="text-white font-black text-2xl tracking-tight">Vaulta Deep Dive</p>
               <p className="text-white/60 font-bold text-xs uppercase tracking-widest mt-1">12:45 • Masterclass</p>
            </div>
            <div className="w-12 h-12 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center text-white">
               <Zap size={20} />
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-24">
          {[
            { title: "One-Click Swaps", icon: <Zap size={24} />, desc: "See how we achieve millisecond finality on major DEXs." },
            { title: "Hardware Security", icon: <Shield size={24} />, desc: "Explore our multi-layer approach to cold storage integrations." },
            { title: "Portfolio Tracking", icon: <PlayCircle size={24} />, desc: "Watch the analytics engine aggregate cross-chain data." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[--surface] border border-[--border] p-8 rounded-[2rem] hover:bg-[--surface-hover] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[--bg-primary] border border-[--border] flex items-center justify-center text-[--brand] mb-6">
                {item.icon}
              </div>
              <h3 className="text-[--text-primary] font-black text-xl mb-3">{item.title}</h3>
              <p className="text-[--text-muted] font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-32">
        <Footer />
      </div>
    </div>
  );
}
