import { Github, Twitter, Linkedin, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="w-full pt-24 pb-16 bg-transparent relative z-10">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-16 mb-16">
          
          {/* Logo & Info */}
          <motion.div variants={itemVariants} className="col-span-2">
            <div className="text-[--text-primary] font-black text-4xl mb-8 tracking-tighter">VAULTA</div>
            <p className="text-[--text-muted] text-lg max-w-xs leading-relaxed mb-10 font-medium">
              Decentralized finance redefined. Secure, beautiful, and borderless self-custody for the next billion users.
            </p>
            <div className="flex items-center gap-4">
              {[
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Github, label: 'Github' },
                { Icon: Linkedin, label: 'LinkedIn' },
              ].map(({ Icon, label }) => (
                <motion.a 
                  key={label} 
                  href="#" 
                  whileHover={{ y: -5, backgroundColor: 'var(--surface-hover)' }}
                  className="p-4 bg-[--surface] border border-[--border] rounded-2xl text-[--text-muted] hover:text-[--text-primary] transition-all"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Columns */}
          <motion.div variants={itemVariants}>
            <h4 className="text-[--text-primary] font-black text-[10px] uppercase tracking-[0.3em] mb-8">Product</h4>
            <ul className="space-y-4 text-[--text-muted] text-base font-medium">
              <li><Link to="/wallet" className="hover:text-[--brand] transition-colors">Wallet</Link></li>
              <li><Link to="/token-sale" className="hover:text-[--brand] transition-colors">Token Sale</Link></li>
              <li><Link to="/exchanges" className="hover:text-[--brand] transition-colors">Exchanges</Link></li>
              <li><Link to="/fundraiser" className="hover:text-[--brand] transition-colors">Fundraiser</Link></li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-[--text-primary] font-black text-[10px] uppercase tracking-[0.3em] mb-8">Company</h4>
            <ul className="space-y-4 text-[--text-muted] text-base font-medium">
              <li><Link to="/about" className="hover:text-[--brand] transition-colors">About Us</Link></li>
              <li><Link to="/vision" className="hover:text-[--brand] transition-colors">Vision</Link></li>
              <li><Link to="/careers" className="hover:text-[--brand] transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-[--brand] transition-colors">Blog</Link></li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="col-span-2 lg:col-span-1">
             <h4 className="text-[--text-primary] font-black text-[10px] uppercase tracking-[0.3em] mb-8">Newsletter</h4>
             <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-[--surface] border border-[--border] rounded-2xl px-6 py-5 text-[--text-primary] text-sm outline-none focus:border-[--brand] transition-all"
                />
                <button className="absolute right-6 top-1/2 -translate-y-1/2 text-[--text-muted]/40 group-hover:text-[--brand] transition-colors">
                   <Send size={18} />
                </button>
             </div>
          </motion.div>
        </div>

        <motion.div 
          variants={itemVariants}
          className="pt-12 border-t border-[--border] flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-[--text-muted]/40"
        >
          <p>© {new Date().getFullYear()} Vaulta Labs. Crafted in shadow. Secured by light.</p>
          <div className="flex flex-wrap justify-center gap-10">
             <Link to="#" className="hover:text-[--text-primary] transition-colors">Privacy Policy</Link>
             <Link to="#" className="hover:text-[--text-primary] transition-colors">Terms of Service</Link>
             <Link to="#" className="hover:text-[--text-primary] transition-colors">Cookie Policy</Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
