import { Briefcase, RefreshCw, Calculator, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Blockchain() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any
      }
    }
  };

  return (
    <section id="features" className="py-20 px-4 bg-[--bg-primary]">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="text-center mb-24"
        >
          <p className="text-[--brand] uppercase tracking-[0.3em] text-[10px] font-black mb-4">about our products</p>
          <h2 className="text-2xl md:text-5xl md:text-7xl font-black text-[--text-primary] mb-6 tracking-tighter leading-tight">
            We provide various solutions <br className="hidden md:block" /> to help you
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-10"
        >
          {[
            {
              title: "Fundraiser",
              desc: "Lift up a Friend, Family or even yourself. Start a free personal fundraiser today.",
              icon: <Briefcase className="text-[--text-primary]" size={28} />,
              color: "from-blue-500/20 to-indigo-500/10",
              link: "/fundraiser"
            },
            {
              title: "Exchanges",
              desc: "We have provided you the details of top 100 exchange tokens which have better score in past few trading year.",
              icon: <RefreshCw className="text-[--text-primary]" size={28} />,
              color: "from-purple-500/20 to-pink-500/10",
              link: "/exchanges"
            },
            {
              title: "Return Calculator",
              desc: "We can compute the rate of return in its simple form with only a bit of effort.",
              icon: <Calculator className="text-[--text-primary]" size={28} />,
              color: "from-orange-500/20 to-yellow-500/10",
              link: "/calculator"
            }
          ].map((feature, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Link to={feature.link} className="group relative bg-[--surface] border border-[--border] p-6 md:p-12 rounded-[3rem] hover:bg-[--surface-hover] transition-all duration-500 hover:-translate-y-2 overflow-hidden block text-left">
                <div className={`absolute -right-4 -top-4 w-32 h-32 bg-gradient-to-br ${feature.color} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="w-16 h-16 bg-[--surface] border border-[--border] rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:border-[--brand]/30 transition-all duration-500">
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-black text-[--text-primary] mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-[--text-muted] text-sm leading-relaxed mb-10">{feature.desc}</p>
                
                <div className="flex items-center gap-2 text-[--brand] font-bold text-sm group/btn uppercase tracking-widest">
                  Learn more
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
