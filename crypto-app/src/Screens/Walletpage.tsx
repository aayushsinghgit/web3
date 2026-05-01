import { useState } from 'react';
import { VirtualCard } from '../Components/VirtualCard';
import { PaymentCard } from '../Components/PaymentCard';
import { TransactionList } from '../Components/TransactionList';
import { Portfolio } from '../Components/Portfolio';
import { useTransaction } from '../Wallet/context/TransactionContext';
import { Wallet, Send, PieChart, Activity } from 'lucide-react';

export function Walletpage() {
  const { currentAccount, connectWallet } = useTransaction();
  const [activeTab, setActiveTab] = useState<'send' | 'portfolio' | 'activity'>('send');

  if (!currentAccount) {
    return (
      <div className="bg-[--bg-primary] min-h-screen pt-20 px-4">
        <div className="glass-card p-6 md:p-12 text-center max-w-md mx-auto rounded-[3rem]">
          <div className="w-20 h-20 bg-[--brand]/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Wallet size={40} className="text-[--brand]" />
          </div>
          <p className="text-[--text-primary] font-black text-3xl mb-4 tracking-tighter">Connect Wallet</p>
          <p className="text-[--text-muted] text-sm mb-8 leading-relaxed">Connect MetaMask to view your balance, send ETH and track your portfolio.</p>
          <button
            onClick={connectWallet}
            className="w-full py-4 bg-[--brand] hover:bg-[--brand-dim] text-[--text-primary] font-black rounded-2xl transition-all shadow-lg shadow-[--brand]/20"
          >
            Connect MetaMask
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[--bg-primary] min-h-screen pt-20 md:pt-24 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-4 md:gap-8 border-b border-[--border] mb-8 md:mb-12 px-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'send', label: 'Send', icon: <Send size={16} /> },
            { id: 'portfolio', label: 'Portfolio', icon: <PieChart size={16} /> },
            { id: 'activity', label: 'Activity', icon: <Activity size={16} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-4 text-[10px] md:text-sm font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${activeTab === tab.id ? 'text-[--brand]' : 'text-[--text-muted] hover:text-[--text-primary]'}`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[--brand] rounded-full" />}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-7 space-y-10 md:space-y-12">
            {activeTab === 'send' && (
              <div className="animate-in fade-in slide-in-from-left duration-700">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[--brand]/10 text-[--brand] text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-4 md:mb-6">
                  Vaulta
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-[--text-primary] mb-4 md:mb-6 tracking-tighter leading-[0.9]">
                  Send crypto <br /> <span className="text-[--text-muted]/40">across the world.</span>
                </h1>
                <p className="text-[--text-muted] text-base md:text-lg max-w-md leading-relaxed">
                  Send, receive, and grow crypto directly from your wallet — no middlemen, no permissions, no waiting.
                </p>
                <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-[--border] grid grid-cols-2 gap-4 md:gap-8">
                  <div>
                    <p className="text-[--brand] text-3xl md:text-4xl font-black tracking-tighter">0.0s</p>
                    <p className="text-[--text-muted]/40 text-[8px] md:text-[10px] font-black uppercase tracking-widest mt-1">Transaction Speed</p>
                  </div>
                  <div>
                    <p className="text-[--text-primary] text-3xl md:text-4xl font-black tracking-tighter">100%</p>
                    <p className="text-[--text-muted]/40 text-[8px] md:text-[10px] font-black uppercase tracking-widest mt-1">Guaranteed Secure</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'portfolio' && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-[--text-primary] font-black text-2xl md:text-3xl mb-6 md:mb-8 tracking-tighter">Your Assets</h2>
                <Portfolio />
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-[--text-primary] font-black text-2xl md:text-3xl mb-6 md:mb-8 tracking-tighter">Recent Transactions</h2>
                <TransactionList />
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8">
            <div className="lg:sticky lg:top-28 space-y-6 md:space-y-8">
              <VirtualCard />
              <PaymentCard />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
