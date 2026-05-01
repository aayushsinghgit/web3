import { useState, useEffect, useCallback } from 'react';
import { Newspaper, Calendar, User, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';
import { Footer } from './Footer';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  url: string;
  image: string;
}

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1644143379190-08a5f05561dc?auto=format&fit=crop&q=80&w=800"
];

const SafeImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      const randomFallback = FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
      setImgSrc(randomFallback);
    }
  };

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className={className} 
      onError={handleError}
    />
  );
};

const MOCK_BLOGS: BlogPost[] = [
  {
    title: "The Future of Self-Custody: Why it Matters",
    excerpt: "In a world of centralized failures, taking control of your assets is no longer a luxury—it's a necessity.",
    date: "Oct 24, 2026",
    author: "Elena Vance",
    category: "Education",
    url: "#",
    image: FALLBACK_IMAGES[0]
  },
  {
    title: "Vaulta V2: Modular Security Architecture",
    excerpt: "A deep dive into our new security stack designed to protect against next-gen protocol vulnerabilities.",
    date: "Oct 22, 2026",
    author: "Marcus Thorne",
    category: "Engineering",
    url: "#",
    image: FALLBACK_IMAGES[1]
  }
];

export function Blog() {
  const [news, setNews] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async (retryCount = 0) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');
      
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      
      if (data.Message === "Success" && data.Data) {
        const articles = data.Data.slice(0, 10).map((item: any) => ({
          title: item.title,
          excerpt: item.body.length > 150 ? item.body.substring(0, 150) + '...' : item.body,
          date: new Date(item.published_on * 1000).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }),
          author: item.source_info?.name || item.source,
          category: item.categories.split('|')[0] || 'Market',
          url: item.url,
          image: item.imageurl
        }));
        setNews(articles);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (err) {
      console.error(`Fetch attempt ${retryCount + 1} failed:`, err);
      
      if (retryCount < 2) {
        // Subtle retry with delay
        setTimeout(() => fetchNews(retryCount + 1), 2000);
      } else {
        setError("Live feed syncing issue. Showing archived updates.");
        setNews(MOCK_BLOGS);
        setLoading(false);
      }
    } finally {
      if (retryCount === 2 || !error) {
        setLoading(false);
      }
    }
  }, [error]);

  useEffect(() => {
    fetchNews();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="bg-[--bg-primary] min-h-screen pt-20 md:pt-24 pb-20 px-4 md:px-6 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[--brand]/5 blur-[150px] rounded-full -mr-40 -mt-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-8">
           <div className="animate-in fade-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[--brand]/10 border border-[--brand]/20 text-[--brand] text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-6 md:mb-8">
                <Newspaper size={14} /> The Vaulta Journal
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-9xl font-black text-[--text-primary] mb-4 tracking-tighter leading-[0.85]">
                 Frontier <br /> <span className="text-[--text-muted]/40">Updates.</span>
              </h1>
           </div>
           
           <div className="flex flex-col items-start md:items-end gap-4 animate-in fade-in slide-in-from-right duration-1000">
              {loading ? (
                <div className="flex items-center gap-3 text-[--text-muted]/40 font-black text-[10px] uppercase tracking-widest">
                   <RefreshCw size={14} className="animate-spin text-[--brand]" /> Syncing with Chain...
                </div>
              ) : error ? (
                <div className="flex items-center gap-3 text-red-400 font-black text-[10px] uppercase tracking-widest bg-red-400/10 px-4 py-2 rounded-full border border-red-400/20">
                   <AlertCircle size={14} /> {error}
                </div>
              ) : (
                <div className="flex items-center gap-3 text-green-400 font-black text-[10px] uppercase tracking-widest bg-green-400/10 px-4 py-2 rounded-full border border-green-400/20">
                   <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Live Feed Optimized
                </div>
              )}
              <p className="text-[--text-muted] font-medium text-left md:text-right max-w-xs text-sm md:text-base">Insights, news, and deep dives into the future of decentralization.</p>
           </div>
        </div>

        {/* Featured Post */}
        {!loading && news.length > 0 && (
           <div className="group cursor-pointer mb-16 animate-in fade-in zoom-in duration-1000">
              <a href={news[0].url} target="_blank" rel="noopener noreferrer" className="relative block bg-[--surface] border border-[--border] rounded-[2rem] md:rounded-[4rem] p-8 md:p-12 overflow-hidden transition-all hover:border-[--brand]/50">
                 <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity">
                    <SafeImage src={news[0].image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[--bg-primary] via-[--bg-primary]/80 md:to-transparent" />
                 </div>
                 
                 <div className="max-w-2xl relative z-10">
                    <span className="text-[--brand] font-black text-[10px] uppercase tracking-[0.3em] mb-6 block">Featured Story</span>
                    <h2 className="text-4xl md:text-6xl font-black text-[--text-primary] mb-8 tracking-tighter leading-tight group-hover:translate-x-2 transition-transform duration-500">
                       {news[0].title}
                    </h2>
                    <p className="text-[--text-muted] text-xl mb-12 leading-relaxed font-medium line-clamp-3">
                       {news[0].excerpt}
                    </p>
                     <div className="flex flex-wrap items-center gap-4 md:gap-8 mb-8 md:mb-12 text-[--text-muted]/40 font-black text-[8px] md:text-[10px] uppercase tracking-widest">
                        <span className="flex items-center gap-2"><User size={14} /> {news[0].author}</span>
                        <span className="flex items-center gap-2"><Calendar size={14} /> {news[0].date}</span>
                     </div>
                    <div className="flex items-center gap-3 text-[--text-primary] font-black text-xs uppercase tracking-widest group-hover:gap-6 transition-all">
                       Read full article <ArrowRight size={18} className="text-[--brand]" />
                    </div>
                 </div>
              </a>
           </div>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
           {(loading ? Array(6).fill(null) : news.slice(1)).map((blog, i) => (
             <div key={i} className="bg-[--surface] border border-[--border] rounded-[3rem] p-2 hover:bg-[--surface-hover] transition-all group cursor-pointer">
                {loading ? (
                   <div className="p-8 animate-pulse space-y-6">
                      <div className="h-48 bg-[--bg-primary] rounded-2xl w-full" />
                      <div className="h-4 bg-[--bg-primary] rounded w-1/4" />
                      <div className="h-10 bg-[--bg-primary] rounded w-full" />
                   </div>
                ) : (
                   <a href={blog.url} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
                      <div className="relative h-56 rounded-[2.5rem] overflow-hidden mb-8">
                         <SafeImage src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                         <div className="absolute top-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[8px] font-black uppercase tracking-widest text-white">
                            {blog.category}
                         </div>
                      </div>
                      <div className="px-8 pb-8 flex flex-col flex-grow">
                        <h3 className="text-xl font-black text-[--text-primary] mb-4 tracking-tight leading-snug group-hover:text-[--brand] transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-[--text-muted] text-sm font-medium leading-relaxed mb-8 line-clamp-3 flex-grow">
                          {blog.excerpt}
                        </p>
                        <div className="pt-6 border-t border-[--border] flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-[--text-muted]/40">
                           <span className="flex items-center gap-2"><Calendar size={12} /> {blog.date}</span>
                           <span className="flex items-center gap-2 group-hover:text-[--text-primary] transition-colors">Read <ArrowRight size={10} /></span>
                        </div>
                      </div>
                   </a>
                )}
             </div>
           ))}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-[--surface] border border-[--border] rounded-[2rem] md:rounded-[4rem] p-10 md:p-20 flex flex-col items-center text-center">
           <h2 className="text-[--text-primary] text-2xl md:text-5xl font-black mb-6 md:mb-8 tracking-tighter">Stay ahead of the curve.</h2>
           <p className="text-[--text-muted] text-base md:text-lg mb-8 md:mb-12 max-w-xl font-medium">
             Subscribe to our monthly newsletter for the latest insights, protocol updates, and ecosystem news.
           </p>
           <div className="flex flex-col sm:flex-row w-full max-w-md gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-[--surface] border border-[--border] rounded-2xl px-6 py-4 text-[--text-primary] text-xs outline-none focus:border-[--brand] transition-all h-14"
              />
              <button className="w-full sm:w-auto px-8 py-4 bg-[--brand] text-white font-black rounded-2xl hover:scale-105 transition-all h-14">
                 Subscribe
              </button>
           </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
