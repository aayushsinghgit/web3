import { lazy, Suspense, useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useTransaction } from './Wallet/context/TransactionContext';
import { Header } from './Components/Header';
import { NetworkBanner } from './Components/NetworkBanner';
import { Chatbot } from './Components/Chatbot';

// Lazy load screens for performance optimization and smoother route loading
const Homepage = lazy(() => import('./Screens/Homepage').then(m => ({ default: m.Homepage })));
const Walletpage = lazy(() => import('./Screens/Walletpage').then(m => ({ default: m.Walletpage })));
const TokenSale = lazy(() => import('./Screens/TokenSale').then(m => ({ default: m.TokenSale })));
const Fundraiser = lazy(() => import('./Screens/Fundraiser').then(m => ({ default: m.Fundraiser })));
const Exchanges = lazy(() => import('./Screens/Exchanges').then(m => ({ default: m.Exchanges })));
const ReturnCalculator = lazy(() => import('./Screens/ReturnCalculator').then(m => ({ default: m.ReturnCalculator })));
const About = lazy(() => import('./Screens/About').then(m => ({ default: m.About })));
const Referral = lazy(() => import('./Screens/Referral').then(m => ({ default: m.Referral })));
const Careers = lazy(() => import('./Screens/Careers').then(m => ({ default: m.Careers })));
const Blog = lazy(() => import('./Screens/Blog').then(m => ({ default: m.Blog })));
const Vision = lazy(() => import('./Screens/Vision').then(m => ({ default: m.Vision })));
const Demo = lazy(() => import('./Screens/Demo').then(m => ({ default: m.Demo })));
const GetStarted = lazy(() => import('./Screens/GetStarted').then(m => ({ default: m.GetStarted })));
const ShareLink = lazy(() => import('./Screens/ShareLink').then(m => ({ default: m.ShareLink })));
const Rankings = lazy(() => import('./Screens/Rankings').then(m => ({ default: m.Rankings })));

const CRYPTO_QUOTES = [
  "Code is law.",
  "Not your keys, not your coins.",
  "Vires in Numeris. (Strength in Numbers)",
  "Don't trust. Verify.",
  "HODL: Hold On for Dear Life.",
  "Decentralization is the future.",
  "Bear markets are for building.",
  "The future of money is programmable.",
  "Cryptography is the ultimate form of non-violent direct action.",
  "Banks are the trusted third parties that create security holes."
];

const LoadingScreen = () => {
  const [quote, setQuote] = useState(CRYPTO_QUOTES[0]);

  useEffect(() => {
    setQuote(CRYPTO_QUOTES[Math.floor(Math.random() * CRYPTO_QUOTES.length)]);
    fetch('https://dummyjson.com/quotes/random')
      .then(r => r.json())
      .then(d => { if (d.quote) setQuote(d.quote); })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-transparent px-4">
      <div className="w-12 h-12 border-4 border-[--brand]/30 border-t-[--brand] rounded-full animate-spin mb-8" />
      <p className="text-[--brand] font-black text-xs tracking-widest uppercase mb-4 animate-pulse">Initializing Secure Route</p>
      <p className="text-[--text-muted] font-medium text-lg italic text-center max-w-md">"{quote}"</p>
    </div>
  );
};

// Applies top padding to all routes EXCEPT the homepage which manages its own hero layout
const RouteWrapper = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const noPaddingRoutes = ['/', '/token-sale'];
  return (
    <div className={noPaddingRoutes.includes(pathname) ? '' : 'pt-16 md:pt-20'}>
      {children}
    </div>
  );
};

function App() {
  const { currentAccount } = useTransaction();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const ref = params.get('ref');
    if (ref && currentAccount && ref.toLowerCase() !== currentAccount.toLowerCase()) {
      // Use the environment variable for API URL with a fallback
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      fetch(`${apiUrl}/referrals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referrer: ref, referred: currentAccount })
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        console.warn("Referral tracking skipped:", err.message);
      });
    }
  }, [currentAccount, search]);

  return (
    <div className="bg-[--bg-primary] relative text-[--text-primary] font-sans flex flex-col min-h-screen">
      <Header />
      <NetworkBanner />
      <Chatbot />
      <main className="flex-1">
        <Suspense fallback={<LoadingScreen />}>
          <RouteWrapper>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path="/wallet" component={Walletpage} />
              <Route path="/token-sale" component={TokenSale} />
              <Route path="/fundraiser" component={Fundraiser} />
              <Route path="/exchanges" component={Exchanges} />
              <Route path="/calculator" component={ReturnCalculator} />
              <Route path="/about" component={About} />
              <Route path="/referral" component={Referral} />
              <Route path="/careers" component={Careers} />
              <Route path="/blog" component={Blog} />
              <Route path="/vision" component={Vision} />
              <Route path="/demo" component={Demo} />
              <Route path="/get-started" component={GetStarted} />
              <Route path="/share-link" component={ShareLink} />
              <Route path="/rankings" component={Rankings} />
            </Switch>
          </RouteWrapper>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
