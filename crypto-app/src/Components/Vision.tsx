import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Vision() {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as any
      }
    }
  };

  return (
    <section className="py-24 px-4 bg-[--bg-primary] flex items-center justify-center text-center overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } }
        }}
        className="max-w-4xl mx-auto"
      >
        <motion.p variants={itemVariants} className="text-[--brand] uppercase tracking-[0.4em] text-[10px] font-black mb-8">our mission</motion.p>
        <motion.h2 variants={itemVariants} className="text-3xl md:text-6xl md:text-8xl font-black text-[--text-primary] mb-10 tracking-tighter leading-[0.85]">
          Crypto that <br /> <span className="text-[--text-muted]/40">belongs to you.</span>
        </motion.h2>
        <motion.p variants={itemVariants} className="text-[--text-muted] text-xl md:text-2xl leading-relaxed mb-16 max-w-2xl mx-auto font-medium">
          We built Vaulta because crypto belongs in everyone's pocket, not just on exchange balance sheets. Self-custody should be the default, not an option.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link to="/about" className="inline-flex items-center gap-4 px-6 md:px-12 py-6 bg-[--surface] hover:bg-[--surface-hover] border border-[--border] text-[--text-primary] font-black rounded-[2rem] transition-all group">
            About Vaulta
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
