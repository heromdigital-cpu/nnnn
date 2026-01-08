
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, Utensils, Hotel, Calendar, Briefcase, MapPin, 
  TrendingUp, Zap, Sparkles, Wand2, Compass, ArrowRight,
  ChevronLeft, ChevronRight, Star, Check, Building2, BriefcaseBusiness
} from 'lucide-react';
import ListingCard from '../components/ListingCard';
import { Listing, ListingType } from '../types';
import { getSmartRecommendations } from '../services/geminiService';
import { useLanguage } from '../App';

// Extended mock data for different sections
const MOCK_TOP_RATED: Listing[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `tr-${i}`,
  title: ['The Ritz London', 'Lumina Dine', 'Aura Luxury Spa', 'Sky Garden Bar', 'Vibe Boutique Hotel', 'Zest Organic Cafe', 'Prime Stay Apartments', 'Urban Loft Studio'][i],
  type: [ListingType.HOTEL, ListingType.RESTAURANT, ListingType.SERVICE, ListingType.RESTAURANT, ListingType.HOTEL, ListingType.RESTAURANT, ListingType.REAL_ESTATE, ListingType.REAL_ESTATE][i % 8] as ListingType,
  category: 'Premium',
  description: 'Experience excellence at one of the city\'s highest-rated locations.',
  rating: 5.0,
  reviewsCount: 450 + i * 20,
  imageUrl: `https://picsum.photos/seed/tr${i}/800/600`,
  logoUrl: `https://picsum.photos/seed/logo${i}/150/150`,
  location: { address: 'Mayfair', city: 'London', lat: 0, lng: 0 },
  featured: true,
  status: 'open',
  tags: ['Luxury', 'Top Rated'],
  priceRange: '£££'
}));

const MOCK_EVENTS: Listing[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `ev-${i}`,
  title: ['Neon Nights Festival', 'Tech Summit 2024', 'Gourmet Food Expo', 'Jazz in the Park', 'Art Gallery Opening', 'Summer Marathon'][i],
  type: ListingType.EVENT,
  category: 'Major Event',
  description: 'Don\'t miss out on this spectacular event happening in the city.',
  rating: 4.9,
  reviewsCount: 1200,
  imageUrl: `https://picsum.photos/seed/ev${i}/800/600`,
  location: { address: 'London Arena', city: 'London', lat: 0, lng: 0 },
  featured: true,
  status: 'open',
  tags: ['Live', 'Popular'],
  priceRange: '£15 - £150'
}));

const MOCK_REAL_ESTATE: Listing[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `re-${i}`,
  title: ['Modern Penthouse', 'Cozy Garden Studio', 'Victorian Family Home', 'Luxury Riverfront Flat', 'Downtown Loft', 'Suburban Villa'][i],
  type: ListingType.REAL_ESTATE,
  category: 'Residential',
  description: 'Find your perfect home in the heart of the city.',
  rating: 4.8,
  reviewsCount: 12,
  imageUrl: `https://picsum.photos/seed/re${i}/800/600`,
  location: { address: 'Kensington', city: 'London', lat: 0, lng: 0 },
  featured: false,
  status: 'open',
  tags: ['For Rent', 'Modern'],
  priceRange: '£1,500 - £4,500/mo'
}));

const MOCK_JOBS: Listing[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `jb-${i}`,
  title: ['Senior React Developer', 'Marketing Manager', 'Product Designer', 'Sales Director', 'Operations Lead', 'HR Specialist'][i],
  type: ListingType.JOB,
  category: 'Full-time',
  description: 'Join a fast-growing company and take your career to the next level.',
  rating: 4.5,
  reviewsCount: 0,
  imageUrl: `https://picsum.photos/seed/jb${i}/800/600`,
  logoUrl: `https://picsum.photos/seed/jblog${i}/150/150`,
  location: { address: 'City of London', city: 'London', lat: 0, lng: 0 },
  featured: true,
  status: 'open',
  tags: ['Tech', 'Hiring'],
  priceRange: '£45k - £120k'
}));

const CarouselSection: React.FC<{ title: string; subtitle?: string; listings: Listing[]; type?: 'job' | 'default' }> = ({ title, subtitle, listings, type = 'default' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 relative overflow-hidden group">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">{title}</h2>
            {subtitle && <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-3">{subtitle}</p>}
          </div>
          <div className="flex items-center space-x-3">
             <button 
               onClick={() => scroll('left')}
               className="w-12 h-12 rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:border-indigo-600 hover:text-indigo-600 transition-all bg-white shadow-sm"
             >
               <ChevronLeft size={24} />
             </button>
             <button 
               onClick={() => scroll('right')}
               className="w-12 h-12 rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:border-indigo-600 hover:text-indigo-600 transition-all bg-white shadow-sm"
             >
               <ChevronRight size={24} />
             </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex space-x-8 overflow-x-auto scrollbar-hide pb-10 -mx-4 px-4 snap-x snap-mandatory"
        >
          {listings.map((item) => (
            <div key={item.id} className="min-w-[320px] md:min-w-[380px] snap-start">
              {type === 'job' ? (
                <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 hover:border-indigo-600 transition-all shadow-sm hover:shadow-2xl h-full flex flex-col">
                   <div className="flex items-center space-x-6 mb-8">
                      <div className="w-20 h-20 rounded-3xl border-4 border-slate-50 shadow-inner overflow-hidden shrink-0">
                         <img src={item.logoUrl || `https://picsum.photos/seed/${item.id}/200`} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-black text-slate-800 text-lg leading-tight line-clamp-1">{item.title}</h4>
                          <div className="bg-blue-500 text-white p-0.5 rounded-full ml-2 shrink-0">
                             <Check size={12} strokeWidth={4} />
                          </div>
                        </div>
                        <span className="text-xs font-black text-indigo-600 uppercase tracking-widest mt-1 block">Full-time</span>
                      </div>
                   </div>
                   <div className="space-y-4 mb-8">
                      <div className="flex items-center text-slate-400 font-bold text-xs uppercase tracking-widest">
                         <Building2 size={16} className="mr-3 text-slate-300" />
                         <span>Global Tech Solutions</span>
                      </div>
                      <div className="flex items-center text-slate-400 font-bold text-xs uppercase tracking-widest">
                         <MapPin size={16} className="mr-3 text-slate-300" />
                         <span>{item.location.address}, {item.location.city}</span>
                      </div>
                   </div>
                   <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-indigo-600 font-black">{item.priceRange}</span>
                      <button className="text-[10px] font-black uppercase tracking-[0.2em] bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-600 transition-colors">Apply</button>
                   </div>
                </div>
              ) : (
                <ListingCard listing={item} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  const { language } = useLanguage();
  const [search, setSearch] = useState('');
  const [aiRec, setAiRec] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const navigate = useNavigate();

  const isPT = language === 'pt-BR';

  const content = {
    tag: isPT ? 'Descubra a Magia Local' : 'Discover Local Magic',
    hero: isPT ? 'Encontre o ' : 'Find the ',
    heroSpan: isPT ? 'Melhor' : 'Best',
    heroEnd: isPT ? ' da Cidade.' : ' in Town.',
    sub: isPT ? 'Junte-se ao diretório mais sofisticado do mundo. Negócios selecionados à mão, verificados pela comunidade.' : "Join the world's most sophisticated directory. Hand-picked businesses, verified by the community.",
    searchPlaceholder: isPT ? 'Pizza, Café, Academia...' : 'Pizza, Coffee, Gym...',
    nearMe: isPT ? 'Perto de mim' : 'Near me',
    exploreBtn: isPT ? 'EXPLORAR' : 'EXPLORE',
    aiTitle: isPT ? 'Dica Inteligente IA' : 'AI Smart Tip',
    planTitle: isPT ? 'Qual o plano para hoje?' : "What's your plan today?",
    planSub: isPT ? 'Mergulhe em nossas categorias criadas para ajudar você a encontrar exatamente o que deseja.' : "Dive into our hand-crafted categories designed to help you find exactly what you're craving.",
    exploreAll: isPT ? 'EXPLORAR TUDO' : 'EXPLORE EVERYTHING',
    goldTitle: isPT ? 'Coleção de Ouro.' : 'The Gold Collection.',
    goldSub: isPT ? 'Negócios verificados que vão além. Nossos editores visitam pessoalmente cada anúncio do nível Gold.' : 'Verified businesses that go above and beyond. Our editors personally visit every Gold-tier listing.',
    fullMap: isPT ? 'VER MAPA COMPLETO' : 'VIEW THE FULL MAP',
    powerUp: isPT ? 'Dê um upgrade no seu negócio.' : 'Power up your business.',
    powerSub: isPT ? 'Tenha recursos nativos do Wix como Pagamentos, Agendamentos e Lojas prontos para uso.' : 'Get Wix-native features like Payments, Bookings, and Stores out of the box.',
    getStarted: isPT ? 'COMEÇAR GRÁTIS' : 'GET STARTED FREE'
  };

  const categories = [
    { name: isPT ? 'VIDA NOTURNA' : 'NIGHTLIFE', icon: <Sparkles />, color: 'bg-purple-600', count: 124 },
    { name: isPT ? 'SERVIÇOS' : 'SERVICES', icon: <Zap />, color: 'bg-yellow-500', count: 456 },
    { name: isPT ? 'HOTÉIS' : 'HOTELS', icon: <Hotel />, color: 'bg-blue-600', count: 89 },
    { name: isPT ? 'EVENTOS' : 'EVENTS', icon: <Calendar />, color: 'bg-red-500', count: 213 },
    { name: isPT ? 'COMIDA' : 'FOOD', icon: <Utensils />, color: 'bg-emerald-500', count: 765 },
    { name: isPT ? 'TRABALHO' : 'WORK', icon: <Briefcase />, color: 'bg-orange-500', count: 54 }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/explore?q=${search}`);
  };

  const fetchAiRecommendations = async () => {
    if (!search.trim()) return;
    setLoadingAi(true);
    try {
      const rec = await getSmartRecommendations(search, language);
      setAiRec(rec);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAi(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length > 3) fetchAiRecommendations();
    }, 1000);
    return () => clearTimeout(timer);
  }, [search, language]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[750px] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center animate-pulse duration-[10s]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-slate-900/60 to-slate-900"></div>
        
        <div className="relative z-10 w-full max-w-5xl px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-2.5 rounded-full text-indigo-300 font-black text-xs uppercase tracking-[0.3em] mb-10">
            <Sparkles size={16} />
            <span>{content.tag}</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
            {content.hero}<span className="text-indigo-400">{content.heroSpan}</span>{content.heroEnd}
          </h1>
          <p className="text-2xl text-slate-300 mb-12 max-w-3xl mx-auto font-medium leading-relaxed opacity-80">
            {content.sub}
          </p>

          <div className="relative max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row bg-white/95 backdrop-blur-2xl p-3 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] items-center group focus-within:ring-8 focus-within:ring-indigo-500/10 transition-all">
              <div className="flex-grow flex items-center px-6 w-full md:border-r-2 border-slate-100">
                <Search className="text-indigo-600 mr-4" size={28} />
                <input 
                  type="text" 
                  placeholder={content.searchPlaceholder}
                  className="w-full py-5 bg-transparent border-none focus:ring-0 text-slate-900 placeholder-slate-400 font-black text-lg"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex-grow flex items-center px-6 w-full md:w-80">
                <MapPin className="text-indigo-600 mr-4" size={28} />
                <input 
                  type="text" 
                  placeholder={content.nearMe}
                  className="w-full py-5 bg-transparent border-none focus:ring-0 text-slate-900 placeholder-slate-400 font-black text-lg"
                  defaultValue="São Paulo, SP"
                />
              </div>
              <button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 px-12 rounded-[1.8rem] transition-all flex items-center justify-center shadow-xl active:scale-95 text-lg">
                {content.exploreBtn}
              </button>
            </form>

            {(loadingAi || aiRec) && (
              <div className="absolute top-full mt-6 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-slate-900/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 text-left animate-in slide-in-from-top-4 duration-300 shadow-2xl z-20">
                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-600 p-2.5 rounded-xl text-white animate-pulse">
                    <Wand2 size={24} />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-1">{content.aiTitle}</h5>
                    {loadingAi ? (
                      <div className="flex space-x-1 mt-2">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    ) : (
                      <p className="text-slate-200 font-medium leading-relaxed">{aiRec}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-32 max-w-7xl mx-auto px-4 border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">{content.planTitle}</h2>
            <p className="text-xl text-slate-500 font-medium">{content.planSub}</p>
          </div>
          <Link to="/explore" className="group flex items-center space-x-3 bg-white px-8 py-4 rounded-2xl font-black text-slate-900 border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all shadow-sm">
            <span>{content.exploreAll}</span>
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, i) => (
            <Link 
              key={i} 
              to={`/explore?type=${cat.name}`}
              className="group bg-white p-10 rounded-[3rem] border-2 border-slate-50 shadow-sm hover:shadow-2xl hover:border-indigo-600/20 transition-all text-center flex flex-col items-center relative overflow-hidden"
            >
              <div className={`${cat.color} w-20 h-20 rounded-[2rem] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xl text-white`}>
                {React.cloneElement(cat.icon as React.ReactElement<any>, { size: 36 })}
              </div>
              <h3 className="font-black text-slate-900 tracking-widest text-xs uppercase">{cat.name}</h3>
              <div className="mt-3 bg-slate-100 px-3 py-1 rounded-full text-[10px] font-black text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-colors">{cat.count} {isPT ? 'LOCAIS' : 'SPOTS'}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 1 - Os mais bem avaliados */}
      <CarouselSection 
        title={isPT ? '1 - Os mais bem avaliados' : '1 - Top Rated Members'} 
        subtitle={isPT ? 'Negócios com as melhores pontuações da comunidade' : 'Businesses with the best community scores'} 
        listings={MOCK_TOP_RATED} 
      />

      {/* Section 2 - Recomendados */}
      <CarouselSection 
        title={isPT ? '2 - Lugares Recomendados' : '2 - Recommended Places'} 
        subtitle={isPT ? 'Locais cuidadosamente selecionados pela nossa equipe' : 'Locations carefully handpicked by our team'} 
        listings={MOCK_TOP_RATED.slice().reverse()} 
      />

      {/* Section 3 - Eventos */}
      <CarouselSection 
        title={isPT ? 'Eventos - O que está acontecendo?' : 'Events - What\'s happening?'} 
        subtitle={isPT ? 'Descubra eventos por toda a cidade' : 'Discover events across the city'} 
        listings={MOCK_EVENTS} 
      />

      {/* Section 4 - Imobiliária */}
      <CarouselSection 
        title={isPT ? 'Imobiliária - Imóveis' : 'Real Estate - Properties'} 
        subtitle={isPT ? 'Procurando imóveis para alugar ou comprar?' : 'Looking for properties to rent or buy?'} 
        listings={MOCK_REAL_ESTATE} 
      />

      {/* Section 5 - Trabalho */}
      <CarouselSection 
        title={isPT ? 'Trabalho - Vagas de emprego' : 'Jobs - Vacancies'} 
        subtitle={isPT ? 'Encontre sua próxima oportunidade de emprego' : 'Find your next career opportunity'} 
        listings={MOCK_JOBS}
        type="job"
      />

      {/* Gold Collection (Original Section) */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-6xl font-black mb-6 tracking-tighter">{content.goldTitle}</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">{content.goldSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {MOCK_TOP_RATED.slice(0, 3).map(listing => (
              <div key={listing.id} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <ListingCard listing={listing} />
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <Link to="/explore" className="inline-flex items-center px-12 py-6 bg-white text-slate-900 rounded-3xl font-black text-lg hover:bg-indigo-50 transition-all shadow-2xl hover:-translate-y-2 active:translate-y-0">
              <Compass className="mr-3" />
              {content.fullMap}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer PowerUp Section */}
      <section className="py-32 px-4 relative flex items-center justify-center">
        <div className="absolute inset-0 bg-indigo-600"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-10 mix-blend-overlay"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-none">{content.powerUp}</h2>
          <p className="text-indigo-100 text-2xl mb-14 max-w-3xl mx-auto font-medium leading-relaxed">
            {content.powerSub}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/add-listing" className="bg-white text-indigo-600 px-12 py-6 rounded-3xl font-black text-xl hover:bg-indigo-50 transition-all shadow-2xl hover:-translate-y-2 active:translate-y-0 w-full sm:w-auto text-center">
              {content.getStarted}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
