import { useState, useEffect } from 'react';
import { Menu, X, Wallet, ChevronDown, LogOut, Sun, Moon } from 'lucide-react';
import { useTransaction } from '../Wallet/context/TransactionContext';
import { shortAddress } from '../Wallet/utils/shortAddress';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export function Header() {
  const { currentAccount, connectWallet, disconnectWallet } = useTransaction();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainLinks = [
    { label: 'Home', to: '/' },
    { label: 'Wallet', to: '/wallet' },
    { label: 'Token Sale', to: '/token-sale' },
    { label: 'Swap', to: '/exchanges' },
  ];

  const moreLinks = [
    { label: 'Fundraiser', to: '/fundraiser' },
    { label: 'ROI Calculator', to: '/calculator' },
    { label: 'Referral', to: '/referral' },
    { label: 'About', to: '/about' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
      isScrolled 
        ? 'backdrop-blur-xl bg-[--bg-primary]/80 border-b border-[--border] py-2' 
        : 'backdrop-blur-sm bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <svg width="28" height="28" viewBox="0 0 256 417" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" className="group-hover:scale-110 transition-transform text-[--brand]">
            <path fill="currentColor" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"/>
            <path fill="currentColor" d="M127.962 0L0 212.32l127.962 75.639V154.158z" opacity=".8"/>
            <path fill="currentColor" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.59 128.038-180.32z"/>
            <path fill="currentColor" d="M127.962 416.896V312.187L0 236.586z" opacity=".8"/>
            <path fill="currentColor" d="M127.961 287.958l127.96-75.637-127.96-58.162z" opacity=".6"/>
            <path fill="currentColor" d="M0 212.32l127.962 75.638V154.158z" opacity=".2"/>
          </svg>
          <span className="text-2xl font-black text-[--text-primary] tracking-tighter">VAULTA</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {mainLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-black uppercase tracking-widest transition-all duration-200 ${location.pathname === link.to ? 'text-[--brand]' : 'text-[--text-muted] hover:text-[--text-primary]'}`}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-black uppercase tracking-widest text-[--text-muted] group-hover:text-[--text-primary] transition-all">
              More <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
               <div className="bg-[--bg-primary] border border-[--border] rounded-2xl p-2 w-48 shadow-2xl backdrop-blur-xl">
                  {moreLinks.map(link => (
                    <Link 
                      key={link.to} 
                      to={link.to}
                      className="block px-4 py-2.5 text-xs font-black uppercase tracking-widest text-[--text-muted] hover:text-[--text-primary] hover:bg-[--surface] rounded-xl transition-all"
                    >
                      {link.label}
                    </Link>
                  ))}
               </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 bg-[--surface] hover:bg-[--surface-hover] border border-[--border] rounded-xl text-[--text-muted] hover:text-[--text-primary] transition-all"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {currentAccount ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(o => !o)}
                className="flex items-center gap-2 border border-[--brand] text-[--brand] rounded-full px-3 md:px-5 py-1.5 text-xs md:text-sm font-bold hover:bg-[--brand] hover:text-white transition-all duration-300"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="hidden sm:inline">{shortAddress(currentAccount)}</span>
                <span className="sm:hidden">{currentAccount.substring(2,6).toUpperCase()}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-[--bg-primary] border border-[--border] rounded-2xl p-2 shadow-2xl backdrop-blur-xl z-[110]">
                  <button
                    onClick={() => { disconnectWallet(); setDropdownOpen(false); }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium"
                  >
                    <LogOut size={14} /> Disconnect
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="flex items-center gap-2 border border-[--brand] text-[--brand] hover:bg-[--brand] hover:text-white rounded-full px-6 py-2 text-sm font-bold transition-all duration-300"
            >
              <Wallet size={14} /> Connect Wallet
            </button>
          )}

          <button className="md:hidden text-white/70 hover:text-[--text-primary] p-1" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[--border] bg-[--bg-primary] px-4 py-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          {[...mainLinks, ...moreLinks].map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`text-lg font-black uppercase tracking-widest transition-all ${location.pathname === link.to ? 'text-[--brand]' : 'text-[--text-muted] hover:text-[--text-primary]'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
