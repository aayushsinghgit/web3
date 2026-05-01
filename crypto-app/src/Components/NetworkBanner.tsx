import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { X } from 'lucide-react';

export function NetworkBanner() {
  const [networkInfo, setNetworkInfo] = useState<{name: string, isWrong: boolean} | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkNetwork = async () => {
      // @ts-ignore
      if (!window.ethereum) return;
      try {
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const net = await provider.getNetwork();
        const wrongNetwork = net.chainId !== 1 && net.chainId !== 11155111 && net.chainId !== 31337;
        if (wrongNetwork) {
          setNetworkInfo({ name: net.name === 'unknown' ? `Chain ${net.chainId}` : net.name, isWrong: true });
        } else {
          setNetworkInfo(null);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkNetwork();
    // @ts-ignore
    if (window.ethereum) {
      // @ts-ignore
      window.ethereum.on('chainChanged', () => { setTimeout(checkNetwork, 1000) });
    }
  }, []);

  if (!networkInfo?.isWrong || dismissed) return null;

  return (
    <div className="bg-yellow-500/20 border-b border-yellow-500/30 text-yellow-200 text-sm py-2 px-4 flex justify-between items-center z-[60] relative">
      <span />
      <span className="text-center font-medium">
        You are connected to <strong>{networkInfo.name}</strong>. Switch to Sepolia for testing or Mainnet for live transactions.
      </span>
      <button onClick={() => setDismissed(true)} className="hover:bg-yellow-500/30 rounded p-1 transition opacity-80 hover:opacity-100">
        <X size={16} />
      </button>
    </div>
  );
}
