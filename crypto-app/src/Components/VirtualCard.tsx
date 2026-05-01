import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Copy, Check, Wifi } from 'lucide-react';
import { useTransaction } from '../Wallet/context/TransactionContext';
import { shortAddress } from '../Wallet/utils/shortAddress';
import toast from 'react-hot-toast';
import { Skeleton } from './Skeleton';

export function VirtualCard() {
  const { currentAccount } = useTransaction();
  const [balance, setBalance] = useState('');
  const [ethPrice, setEthPrice] = useState(0);
  const [network, setNetwork] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // @ts-ignore
      if (!window.ethereum || !currentAccount) { setLoading(false); return; }
      try {
        setLoading(true);
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const [bal, net, priceRes] = await Promise.all([
          provider.getBalance(currentAccount),
          provider.getNetwork(),
          fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'),
        ]);
        const priceData = await priceRes.json();
        setBalance(ethers.utils.formatEther(bal));
        setEthPrice(priceData.ethereum.usd);
        const netName = net.chainId === 1 ? 'Mainnet' : net.chainId === 11155111 ? 'Sepolia' : net.chainId === 31337 ? 'Local' : `Chain ${net.chainId}`;
        setNetwork(netName);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchData();
  }, [currentAccount]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentAccount);
    setCopied(true);
    toast.success('Address copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const balNum = parseFloat(balance) || 0;
  const usdValue = (balNum * ethPrice).toFixed(2);

  return (
    <div
      className="relative rounded-2xl overflow-hidden p-6 w-full group"
      style={{ 
        background: 'linear-gradient(135deg, #4F49C4 0%, #6C63FF 40%, #1a1060 100%)', 
        boxShadow: '0 25px 60px rgba(108,99,255,0.4)' 
      }}
    >
      {/* Decorative background logo */}
      <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
        <svg width="200" height="200" viewBox="0 0 256 417" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
          <path fill="#fff" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"/>
          <path fill="#fff" d="M127.962 0L0 212.32l127.962 75.639V154.158z" opacity=".8"/>
          <path fill="#fff" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.59 128.038-180.32z"/>
          <path fill="#fff" d="M127.962 416.896V312.187L0 236.586z" opacity=".8"/>
          <path fill="#fff" d="M127.961 287.958l127.96-75.637-127.96-58.162z" opacity=".6"/>
          <path fill="#fff" d="M0 212.32l127.962 75.638V154.158z" opacity=".2"/>
        </svg>
      </div>

      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 256 417" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
            <path fill="#fff" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"/>
            <path fill="#fff" d="M127.962 0L0 212.32l127.962 75.639V154.158z" opacity=".8"/>
            <path fill="#fff" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.59 128.038-180.32z"/>
            <path fill="#fff" d="M127.962 416.896V312.187L0 236.586z" opacity=".8"/>
            <path fill="#fff" d="M127.961 287.958l127.96-75.637-127.96-58.162z" opacity=".6"/>
            <path fill="#fff" d="M0 212.32l127.962 75.638V154.158z" opacity=".2"/>
          </svg>
          <div className="text-[--text-primary] font-black text-xl tracking-tight">VAULTA</div>
        </div>
        <div className="flex items-center gap-1.5">
          <Wifi size={12} className="text-white/70" />
          <span className="text-white/80 text-xs font-semibold bg-white/15 px-2 py-0.5 rounded-full uppercase tracking-tighter">{network || '—'}</span>
        </div>
      </div>

      <div className="mb-6 relative z-10">
        {loading ? (
          <><Skeleton className="h-9 w-36 mb-2" /><Skeleton className="h-5 w-24" /></>
        ) : (
          <>
            <div className="text-[--text-primary] font-black text-4xl tracking-tight">{balNum.toFixed(4)} <span className="text-white/70 text-2xl font-light">ETH</span></div>
            <div className="text-white/60 text-sm mt-1 font-medium tracking-wide">≈ ${parseFloat(usdValue).toLocaleString()} USD</div>
          </>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-white/20 pt-4 relative z-10">
        <div>
          <p className="text-[--text-muted] text-[10px] uppercase tracking-widest font-bold mb-1">Wallet Address</p>
          <p className="text-[--text-primary] font-mono text-sm tracking-wider">{currentAccount ? shortAddress(currentAccount, 6) : '—'}</p>
        </div>
        {currentAccount && (
          <button onClick={handleCopy} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 text-[--text-primary] border border-[--border]">
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}
