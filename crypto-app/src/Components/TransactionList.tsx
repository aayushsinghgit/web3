import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ArrowDownLeft, ArrowUpRight, ExternalLink, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useTransaction } from '../Wallet/context/TransactionContext';
import { shortAddress } from '../Wallet/utils/shortAddress';
import { Skeleton } from './Skeleton';

const PAGE_SIZE = 10;

export function TransactionList() {
  const { transactions, currentAccount, isLoading } = useTransaction();
  const [page, setPage] = useState(0);

  const [ethPrice, setEthPrice] = useState(0);
  const [savedCalcs, setSavedCalcs] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
      .then(r => r.json()).then(d => setEthPrice(d.ethereum.usd)).catch(() => {});
      
    try {
      const calcs = JSON.parse(localStorage.getItem('vaulta_portfolio_calcs') || '[]');
      setSavedCalcs(calcs.reverse());
    } catch {
      setSavedCalcs([]);
    }
  }, []);

  const totalPages = Math.ceil(transactions.length / PAGE_SIZE);
  const paginated = transactions.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  if (isLoading) return (
    <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}</div>
  );

  if (!transactions.length && !savedCalcs.length) return (
    <div className="bg-[--surface] border border-[--border] rounded-2xl p-6 md:p-12 text-center text-[--text-muted] backdrop-blur-sm">
      <p className="text-xl font-bold text-white/60 mb-2">No activity yet</p>
      <p className="text-sm">Your transactions or saved ROI calculations will appear here.</p>
    </div>
  );

  return (
    <div className="space-y-1">
      {paginated.map((tx: any, i: number) => {
        const isSent = tx.addressFrom?.toLowerCase() === currentAccount?.toLowerCase();
        const date = tx.timestamp ? format(new Date(tx.timestamp), "MMM d, yyyy · HH:mm") : '—';
        const counterparty = isSent ? tx.addressTo : tx.addressFrom;
        const amount = parseFloat(tx.amount);
        const usdValue = ethPrice ? (amount * ethPrice).toFixed(2) : null;

        return (
          <div key={i} className="group bg-[#0d0d14]/40 border border-[--border] px-6 py-5 flex items-center gap-5 hover:bg-[--surface] hover:border-[--border] transition-all rounded-[2rem] mb-3 backdrop-blur-md">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${isSent ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
              {isSent ? <ArrowUpRight size={24} /> : <ArrowDownLeft size={24} />}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                 <span className="text-[--text-primary] text-base font-black truncate">
                   {isSent ? `Sent to ${shortAddress(counterparty, 4)}` : `Received from ${shortAddress(counterparty, 4)}`}
                 </span>
                 <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[8px] font-black uppercase tracking-widest">
                    <CheckCircle2 size={10} /> Confirmed
                 </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[--text-muted]/70 text-[10px] font-black uppercase tracking-widest">{date}</span>
                {tx.message && (
                  <>
                    <span className="text-[--text-muted]/10 text-xs">·</span>
                    <span className="text-[--text-muted] text-[10px] font-medium truncate italic">"{tx.message}"</span>
                  </>
                )}
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className={`font-black text-xl tracking-tight ${isSent ? 'text-red-400' : 'text-green-400'}`}>
                {isSent ? '-' : '+'}{amount.toFixed(4)} <span className="text-xs opacity-50 ml-1">ETH</span>
              </div>
              {usdValue && (
                <div className="flex items-center justify-end gap-1.5 text-[--text-muted]/40 text-xs font-bold mt-0.5 uppercase tracking-tighter">
                   ≈ ${parseFloat(usdValue).toLocaleString()}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 ml-4">
               {tx.txHash && (
                 <a 
                   href={`https://etherscan.io/tx/${tx.txHash}`} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="p-3 bg-[--surface] text-[--text-muted]/40 hover:text-[--brand] hover:bg-white/10 rounded-2xl transition-all border border-[--border]"
                 >
                   <ExternalLink size={18} />
                 </a>
               )}
            </div>
          </div>
        );
      })}


      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-4">
          <button onClick={() => setPage(p => Math.max(p - 1, 0))} disabled={page === 0}
            className="flex items-center gap-1 text-sm text-white/60 hover:text-[--text-primary] disabled:opacity-30 disabled:cursor-not-allowed transition">
            <ChevronLeft size={16} /> Prev
          </button>
          <span className="text-[--text-muted] text-sm">Page {page + 1} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))} disabled={page >= totalPages - 1}
            className="flex items-center gap-1 text-sm text-white/60 hover:text-[--text-primary] disabled:opacity-30 disabled:cursor-not-allowed transition">
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}

      {savedCalcs.length > 0 && (
        <div className="mt-12">
          <h3 className="text-white text-xl font-black mb-6 tracking-tight flex items-center gap-2">
            Saved ROI Calculations <span className="px-2 py-0.5 bg-[--brand]/10 text-[--brand] text-[10px] uppercase rounded-lg border border-[--brand]/20 tracking-widest">{savedCalcs.length} Records</span>
          </h3>
          <div className="space-y-3">
            {savedCalcs.map((calc, i) => (
              <div key={i} className="group bg-[#0d0d14]/40 border border-[--border] px-6 py-5 flex items-center gap-5 hover:bg-[--surface] hover:border-[--brand]/50 transition-all rounded-[2rem] backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[--brand]/5 blur-3xl rounded-full" />
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg bg-[--brand]/10 text-[--brand] border border-[--brand]/20 font-black text-sm">
                  {calc.token?.substring(0, 3)}
                </div>
                
                <div className="flex-1 min-w-0 z-10">
                  <div className="flex items-center gap-3 mb-1">
                     <span className="text-[--text-primary] text-base font-black truncate">
                       {calc.amount} {calc.token} ROI Calculation
                     </span>
                     <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[8px] font-black uppercase tracking-widest">
                        Projected
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[--text-muted]/70 text-[10px] font-black uppercase tracking-widest">{format(new Date(calc.timestamp), "MMM d, yyyy")}</span>
                    <span className="text-[--text-muted]/10 text-xs">·</span>
                    <span className="text-[--text-muted] text-[10px] font-medium truncate italic">Buy: ${calc.buyPrice} → Sell: ${calc.sellPrice}</span>
                  </div>
                </div>

                <div className="text-right shrink-0 z-10">
                  <div className={`font-black text-xl tracking-tight ${calc.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {calc.profit >= 0 ? '+' : ''}${calc.profit.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                  <div className="flex items-center justify-end gap-1.5 text-[--text-muted]/40 text-xs font-bold mt-0.5 uppercase tracking-tighter">
                     ROI: {calc.roi.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
