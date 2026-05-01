import { ArrowRight, Eye, Shield, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from './Footer';
import content from '../data/content.json';

export function Vision() {
  const { vision } = content;
  
  return (
    <div className="bg-[--bg-primary] min-h-screen pt-24 overflow-hidden relative">
      
      {/* Immersive Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
         <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[--brand]/10 blur-[150px] rounded-full animate-pulse" />
         <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[--brand]/10 border border-[--brand]/20 text-[--brand] text-[10px] font-black uppercase tracking-[0.4em] mb-12">
            <Eye size={14} /> {vision.tagline}
          </div>
          <h1 className="text-4xl md:text-7xl md:text-[9rem] font-black text-[--text-primary] mb-12 tracking-tighter leading-[0.8]">
             {vision.title.split('belongs')[0]} <br /> <span className="text-[--text-primary]/20">belongs {vision.title.split('belongs')[1]}</span>
          </h1>
          <p className="text-[--text-muted] text-xl md:text-2xl leading-relaxed mb-16 max-w-3xl mx-auto font-medium">
            {vision.subtitle}
          </p>
          <Link to="/referral" className="inline-flex items-center gap-3 px-5 md:px-10 py-5 bg-[--surface] border border-[--border] text-[--text-primary] font-black rounded-2xl hover:bg-[--surface-hover] transition-all group">
             Join Referral Program
             <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Vision Pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
           {vision.pillars.map((p, i) => (
             <div key={i} className="bg-[--surface] border border-[--border] rounded-[3.5rem] p-6 md:p-12 hover:bg-[--surface-hover] transition-all group">
                <div className="w-16 h-16 bg-[--brand]/10 rounded-2xl flex items-center justify-center text-[--brand] mb-8 group-hover:scale-110 transition-transform">
                   {i === 0 ? <Globe /> : i === 1 ? <Shield /> : <Zap />}
                </div>
                <h3 className="text-[--text-primary] text-3xl font-black mb-6 tracking-tight">{p.title}</h3>
                <p className="text-[--text-muted] text-lg leading-relaxed font-medium">{p.desc}</p>
             </div>
           ))}
        </div>

        {/* Manifesto Section */}
        <div className="bg-[--surface] border border-[--border] rounded-[4rem] p-6 md:p-12 md:p-12 mb-20 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[--brand]/5 to-transparent pointer-events-none" />
           <div className="max-w-3xl relative z-10">
              <h2 className="text-[--text-primary] text-2xl md:text-5xl md:text-6xl font-black mb-12 tracking-tighter">{vision.manifestoTitle}</h2>
              <div className="space-y-8 text-[--text-muted] text-lg md:text-xl leading-relaxed font-medium">
                 {vision.manifesto.map((m, i) => <p key={i}>{m}</p>)}
              </div>
              <div className="mt-16">
                 <Link to="/about" className="inline-flex items-center gap-4 px-6 md:px-12 py-6 bg-[--text-primary] text-[--bg-primary] font-black rounded-2xl hover:scale-105 transition-all">
                    {vision.cta} <ArrowRight size={20} />
                 </Link>
              </div>
           </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
