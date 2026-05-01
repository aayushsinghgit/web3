import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Calendar, Tag, ArrowRight, Check } from 'lucide-react';
import { Footer } from './Footer';

export function ReturnCalculator() {
  const [token, setToken] = useState('VLT');
  const [buyPrice, setBuyPrice] = useState('0.10');
  const [sellPrice, setSellPrice] = useState('0.25');
  const [amount, setAmount] = useState('1000');
  const [buyDate, setBuyDate] = useState('2026-01-01');
  const [sellDate, setSellDate] = useState('2026-04-24');

  const profit = (parseFloat(sellPrice) - parseFloat(buyPrice)) * parseFloat(amount);
  const roi = ((parseFloat(sellPrice) - parseFloat(buyPrice)) / parseFloat(buyPrice)) * 100;

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const calcData = {
      id: Date.now().toString(),
      token,
      amount: parseFloat(amount),
      buyPrice: parseFloat(buyPrice),
      sellPrice: parseFloat(sellPrice),
      buyDate,
      sellDate,
      profit,
      roi,
      timestamp: new Date().toISOString()
    };
    
    const savedPortfolio = JSON.parse(localStorage.getItem('vaulta_portfolio_calcs') || '[]');
    savedPortfolio.push(calcData);
    localStorage.setItem('vaulta_portfolio_calcs', JSON.stringify(savedPortfolio));
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-[--bg-primary] min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-[10px] font-black uppercase tracking-widest mb-6">
              <Calculator size={14} /> Intelligence Tools
           </div>
           <h1 className="text-3xl md:text-6xl md:text-8xl font-black text-[--text-primary] mb-8 tracking-tighter leading-[0.85]">
              Track your <br /> <span className="text-[--text-muted]/40">Success.</span>
           </h1>
           <p className="text-[--text-muted] text-lg max-w-2xl mx-auto leading-relaxed">
              Calculate your historical gains or project future growth with our advanced ROI engine. Supports manual entry for any token.
           </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto">
          {/* Inputs */}
          <div className="bg-[--surface] border border-[--border] rounded-[3.5rem] p-8 md:p-12 backdrop-blur-xl">
             <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                   <div>
                      <label className="text-[--text-muted] text-[10px] font-black uppercase tracking-widest mb-3 block">Token Name</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={token}
                          onChange={(e) => setToken(e.target.value)}
                          className="w-full bg-[--surface] border border-[--border] rounded-2xl px-6 py-4 text-[--text-primary] font-bold outline-none focus:border-[--brand] transition-all pl-12"
                        />
                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-[--text-muted]/40" size={18} />
                      </div>
                   </div>
                   <div>
                      <label className="text-[--text-muted] text-[10px] font-black uppercase tracking-widest mb-3 block">Token Amount</label>
                      <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-[--surface] border border-[--border] rounded-2xl px-6 py-4 text-[--text-primary] font-bold outline-none focus:border-[--brand] transition-all"
                      />
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   <div>
                      <label className="text-[--text-muted] text-[10px] font-black uppercase tracking-widest mb-3 block">Buy Price (USD)</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={buyPrice}
                          onChange={(e) => setBuyPrice(e.target.value)}
                          className="w-full bg-[--surface] border border-[--border] rounded-2xl px-6 py-4 text-[--text-primary] font-bold outline-none focus:border-[--brand] transition-all pl-12"
                        />
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[--text-muted]/40" size={18} />
                      </div>
                   </div>
                   <div>
                      <label className="text-[--text-muted] text-[10px] font-black uppercase tracking-widest mb-3 block">Buy Date</label>
                      <div className="relative">
                        <input 
                          type="date" 
                          value={buyDate}
                          onChange={(e) => setBuyDate(e.target.value)}
                          className="w-full bg-[--surface] border border-[--border] rounded-2xl px-6 py-4 text-[--text-primary] font-bold outline-none focus:border-[--brand] transition-all pl-12"
                        />
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[--text-muted]/40" size={18} />
                      </div>
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   <div>
                      <label className="text-[--text-muted] text-[10px] font-black uppercase tracking-widest mb-3 block">Sell Price (USD)</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={sellPrice}
                          onChange={(e) => setSellPrice(e.target.value)}
                          className="w-full bg-[--surface] border border-[--border] rounded-2xl px-6 py-4 text-[--text-primary] font-bold outline-none focus:border-[--brand] transition-all pl-12"
                        />
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[--text-muted]/40" size={18} />
                      </div>
                   </div>
                   <div>
                      <label className="text-[--text-muted] text-[10px] font-black uppercase tracking-widest mb-3 block">Sell Date</label>
                      <div className="relative">
                        <input 
                          type="date" 
                          value={sellDate}
                          onChange={(e) => setSellDate(e.target.value)}
                          className="w-full bg-[--surface] border border-[--border] rounded-2xl px-6 py-4 text-[--text-primary] font-bold outline-none focus:border-[--brand] transition-all pl-12"
                        />
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[--text-muted]/40" size={18} />
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Results Card */}
          <div className="flex flex-col gap-6">
             <div className="bg-[--brand] rounded-[3rem] p-6 md:p-12 text-white shadow-2xl shadow-[--brand]/20 flex flex-col justify-center border border-white/10">
                <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Total Net Profit</p>
                <h2 className="text-3xl md:text-6xl md:text-7xl font-black tracking-tighter mb-8">${profit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h2>
                
                <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                   <div>
                      <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">ROI</p>
                      <p className="text-3xl font-black">{roi.toFixed(1)}%</p>
                   </div>
                   <div>
                      <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Status</p>
                      <p className="text-3xl font-black">{profit >= 0 ? 'Profit' : 'Loss'}</p>
                   </div>
                </div>
             </div>

             <div 
                onClick={handleSave}
                className={`bg-[--surface] border border-[--border] rounded-[2.5rem] p-8 flex items-center justify-between group cursor-pointer transition-all ${saved ? 'border-green-500/50 bg-green-500/5' : 'hover:bg-[--surface-hover]'}`}
             >
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${saved ? 'bg-green-500 text-white' : 'bg-green-500/20 text-green-500'}`}>
                      {saved ? <Check size={24} /> : <TrendingUp size={24} />}
                   </div>
                   <div>
                      <p className="text-[--text-primary] font-black text-sm">{saved ? 'Saved to Portfolio!' : 'Save to Portfolio'}</p>
                      <p className="text-[--text-muted]/40 text-[10px] font-black uppercase tracking-widest">{saved ? 'Check your dashboard' : 'Store this calculation'}</p>
                   </div>
                </div>
                {saved ? (
                   <Check size={20} className="text-green-500" />
                ) : (
                   <ArrowRight size={20} className="text-[--text-muted]/40 group-hover:translate-x-1 transition-transform" />
                )}
             </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
