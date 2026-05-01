import { useState, useEffect } from 'react';
import { PlusCircle, RefreshCw, TrendingUp, TrendingDown, Trash2 } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from './Skeleton';
import toast from 'react-hot-toast';

interface Holding { id: string; symbol: string; amount: number; }

const COIN_IDS: Record<string, string> = {
  bitcoin: 'BTC', ethereum: 'ETH', solana: 'SOL',
  cardano: 'ADA', polkadot: 'DOT', chainlink: 'LINK',
};
const COLORS = ['#6C63FF', '#22C55E', '#F59E0B', '#EF4444', '#06B6D4', '#8B5CF6'];

export function Portfolio() {
  const [holdings, setHoldings] = useState<Holding[]>(() => {
    try { return JSON.parse(localStorage.getItem('vaulta_holdings') || '[]'); } catch { return []; }
  });
  const [prices, setPrices] = useState<Record<string, { usd: number; usd_24h_change: number }>>({});
  const [loading, setLoading] = useState(true);
  const [newCoin, setNewCoin] = useState('bitcoin');
  const [newAmount, setNewAmount] = useState('');

  const saveHoldings = (h: Holding[]) => {
    setHoldings(h);
    localStorage.setItem('vaulta_holdings', JSON.stringify(h));
  };

  const fetchPrices = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${Object.keys(COIN_IDS).join(',')}&vs_currencies=usd&include_24hr_change=true`);
      const data = await res.json();
      setPrices(data);
      toast.success('Prices updated');
    } catch { toast.error('Could not fetch prices'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPrices(); }, []);

  const addHolding = () => {
    if (!newAmount || parseFloat(newAmount) <= 0) return;
    const exists = holdings.find(h => h.id === newCoin);
    if (exists) {
      saveHoldings(holdings.map(h => h.id === newCoin ? { ...h, amount: h.amount + parseFloat(newAmount) } : h));
    } else {
      saveHoldings([...holdings, { id: newCoin, symbol: COIN_IDS[newCoin], amount: parseFloat(newAmount) }]);
    }
    setNewAmount('');
  };

  const totalValue = holdings.reduce((sum, h) => sum + h.amount * (prices[h.id]?.usd || 0), 0);
  const pieData = holdings.filter(h => prices[h.id]).map(h => ({ name: h.symbol, value: h.amount * (prices[h.id]?.usd || 0) }));

  return (
    <div className="bg-[--surface] border border-[--border] backdrop-blur-sm rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[--text-muted] text-xs uppercase tracking-widest mb-1 font-bold">Total Portfolio Value</p>
          <p className="text-[--brand] text-4xl font-black tracking-tighter">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        <button onClick={fetchPrices} className="flex items-center gap-2 text-[--text-muted] hover:text-[--text-primary] text-[10px] font-black uppercase tracking-widest border border-[--border] rounded-xl px-4 py-2 transition-all hover:bg-[--surface]">
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {pieData.length > 0 && (
        <div className="h-48 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                {pieData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#0d0d14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#F0EFFF' }}
                formatter={(val: any) => [`$${Number(val).toLocaleString(undefined, { maximumFractionDigits: 2 })}`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="space-y-2 mb-8">
        {loading && !holdings.length && [...Array(3)].map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
        {holdings.map((h, i) => {
          const price = prices[h.id];
          const value = h.amount * (price?.usd || 0);
          const change = price?.usd_24h_change ?? 0;
          const isUp = change >= 0;
          return (
            <div key={h.id} className="flex items-center gap-3 bg-[--surface] hover:bg-white/[0.08] border border-[--border] rounded-2xl p-4 transition-all group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shrink-0"
                style={{ background: COLORS[i % COLORS.length] + '20', color: COLORS[i % COLORS.length], border: `1px solid ${COLORS[i % COLORS.length]}30` }}>
                {h.symbol.slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[--text-primary] font-bold text-sm tracking-tight">{h.symbol}</div>
                <div className="text-[--text-muted]/70 text-[10px] uppercase font-bold tracking-widest">{h.amount.toLocaleString()} coins</div>
              </div>
              <div className="text-right">
                {loading ? <Skeleton className="h-4 w-20 mb-1" /> : (
                  <div className="text-[--text-primary] font-black text-sm tracking-tight">${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                )}
                <span className={`text-[10px] font-bold flex items-center justify-end gap-0.5 ${isUp ? 'text-green-400' : 'text-red-400'}`}>
                  {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {Math.abs(change).toFixed(2)}%
                </span>
              </div>
              <button onClick={() => saveHoldings(holdings.filter(x => x.id !== h.id))} className="p-2 text-[--text-muted]/10 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all ml-2 opacity-0 group-hover:opacity-100">
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="border-t border-[--border] pt-6">
        <p className="text-[--text-muted] text-[10px] uppercase tracking-widest font-black mb-4">Add New Asset</p>
        <div className="flex gap-3">
          <select value={newCoin} onChange={e => setNewCoin(e.target.value)} className="bg-[--surface] border border-[--border] rounded-xl flex-1 px-4 py-2.5 text-sm text-[--text-primary] focus:border-[--brand] outline-none transition-colors">
            {Object.entries(COIN_IDS).map(([id, sym]) => (
              <option key={id} value={id} className="bg-[#0d0d14]">{sym} — {id.toUpperCase()}</option>
            ))}
          </select>
          <input type="number" value={newAmount} onChange={e => setNewAmount(e.target.value)} placeholder="0.00" className="bg-[--surface] border border-[--border] rounded-xl w-32 px-4 py-2.5 text-sm text-[--text-primary] placeholder:text-[--text-muted]/40 focus:border-[--brand] outline-none transition-colors" />
          <button onClick={addHolding} className="px-5 py-2.5 bg-[--brand] hover:bg-[--brand-dim] text-[--text-primary] rounded-xl text-sm font-bold flex items-center gap-2 transition-all active:scale-95">
            <PlusCircle size={16} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
