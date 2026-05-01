import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Send, X } from 'lucide-react';
import { useTransaction } from '../Wallet/context/TransactionContext';
import { shortAddress } from '../Wallet/utils/shortAddress';

export function PaymentCard() {
  const { sendTransaction, isLoading, currentAccount } = useTransaction();
  const [form, setForm] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
  const [ethPrice, setEthPrice] = useState(0);
  const [gasEstimate, setGasEstimate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
      .then(r => r.json()).then(d => setEthPrice(d.ethereum.usd)).catch(() => {});
  }, []);

  const usdValue = form.amount && ethPrice ? (parseFloat(form.amount) * ethPrice).toFixed(2) : '';

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.addressTo) newErrors.addressTo = 'Address is required';
    else if (!ethers.utils.isAddress(form.addressTo)) newErrors.addressTo = 'Invalid Ethereum address';
    if (!form.amount || parseFloat(form.amount) <= 0) newErrors.amount = 'Enter a valid amount';
    if (!form.keyword) newErrors.keyword = 'Keyword is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReview = async () => {
    if (!validate()) return;
    try {
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const gasPrice = await provider.getGasPrice();
      const gasCostEth = parseFloat(ethers.utils.formatEther(gasPrice.mul(21000)));
      setGasEstimate((gasCostEth * ethPrice).toFixed(4));
    } catch { setGasEstimate('~0.001'); }
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setShowModal(false);
    await sendTransaction(form.addressTo, form.amount, form.message, form.keyword);
    setForm({ addressTo: '', amount: '', keyword: '', message: '' });
  };

  const inputCls = (field: string) =>
    `glass-input w-full px-4 py-3 text-[--text-primary] placeholder:text-[--text-muted]/70 ${errors[field] ? 'border-red-500/60' : ''}`;

  return (
    <>
      <div className="bg-[--surface] border border-[--border] backdrop-blur-sm rounded-2xl p-6 w-full">
        <h3 className="text-[--text-primary] font-black text-xl mb-6 flex items-center gap-2 tracking-tight">
          <Send size={18} className="text-[--brand]" /> Send ETH
        </h3>
        <div className="space-y-5">
          <div>
            <label className="text-[--text-muted] text-[10px] uppercase tracking-widest font-bold mb-2 block">To Address</label>
            <input className={inputCls('addressTo')} placeholder="0x..." value={form.addressTo} onChange={e => setForm(f => ({ ...f, addressTo: e.target.value }))} />
            {errors.addressTo && <p className="text-red-400 text-xs mt-1 font-medium">{errors.addressTo}</p>}
          </div>
          <div>
            <label className="text-[--text-muted] text-[10px] uppercase tracking-widest font-bold mb-2 block">Amount (ETH)</label>
            <div className="relative">
              <input className={inputCls('amount')} type="number" placeholder="0.00" min="0" step="0.001" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[--text-muted]/40 font-bold text-xs">ETH</div>
            </div>
            {usdValue && <p className="text-[--brand] text-xs mt-2 font-bold">≈ ${parseFloat(usdValue).toLocaleString()} USD</p>}
            {errors.amount && <p className="text-red-400 text-xs mt-1 font-medium">{errors.amount}</p>}
          </div>
          <div>
            <label className="text-[--text-muted] text-[10px] uppercase tracking-widest font-bold mb-2 block">Keyword (GIF tag)</label>
            <input className={inputCls('keyword')} placeholder="e.g. fire, moon" value={form.keyword} onChange={e => setForm(f => ({ ...f, keyword: e.target.value }))} />
            {errors.keyword && <p className="text-red-400 text-xs mt-1 font-medium">{errors.keyword}</p>}
          </div>
          <div>
            <label className="text-[--text-muted] text-[10px] uppercase tracking-widest font-bold mb-2 block">Message (optional)</label>
            <input className="bg-[--surface] border border-[--border] rounded-xl w-full px-4 py-3 text-[--text-primary] placeholder:text-[--text-muted]/40 focus:border-[--brand] outline-none transition-colors" placeholder="What's this for?" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
          </div>
          <button onClick={handleReview} disabled={isLoading || !currentAccount}
            className="w-full py-4 bg-[--brand] hover:bg-[--brand-dim] disabled:opacity-40 disabled:cursor-not-allowed text-[--text-primary] font-black rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[--brand]/20 active:scale-[0.98]">
            {isLoading ? 'Sending...' : 'Review Transaction'}
          </button>
          {!currentAccount && <p className="text-[--text-muted]/40 text-[10px] font-bold uppercase tracking-widest text-center">Connect your wallet to send</p>}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowModal(false)} />
          <div className="bg-[#0d0d14] border border-[--border] rounded-[2rem] p-8 max-w-md w-full relative shadow-[0_0_80px_rgba(108,99,255,0.15)] animate-in zoom-in-95 duration-300">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-[--text-muted]/40 hover:text-[--text-primary] transition-colors"><X size={24} /></button>
            <div className="mb-8">
              <h3 className="text-[--text-primary] font-black text-2xl mb-1 tracking-tight">Confirm Transfer</h3>
              <p className="text-[--text-muted] text-xs font-bold uppercase tracking-widest">Double check the details</p>
            </div>
            <div className="space-y-4 mb-10">
              {[
                ['Recipient', shortAddress(form.addressTo, 8)],
                ['Amount', `${form.amount} ETH`, 'text-[--brand] font-black'],
                ['USD Value', `≈ $${parseFloat(usdValue || '0').toLocaleString()}`, 'text-white/60 font-bold'],
                ['Gas Estimate', `~$${gasEstimate}`, 'text-[--text-muted]'],
                ['Reference', form.keyword || 'None'],
              ].map(([label, val, cls]) => (
                <div key={label} className="flex justify-between items-center group">
                  <span className="text-[--text-muted]/70 text-xs font-bold uppercase tracking-widest">{label}</span>
                  <span className={`text-sm tracking-tight ${cls || 'text-[--text-primary] font-bold'}`}>{val}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setShowModal(false)} className="py-4 bg-[--surface] hover:bg-white/10 text-[--text-primary] rounded-2xl font-black text-sm transition-all border border-[--border] active:scale-95">Cancel</button>
              <button onClick={handleConfirm} className="py-4 bg-[--brand] hover:bg-[--brand-dim] text-[--text-primary] rounded-2xl font-black text-sm transition-all active:scale-95">Send Now</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
