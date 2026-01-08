
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  User, 
  Menu,
  X,
  ShoppingBag,
  Globe
} from 'lucide-react';

import Home from './pages/Home';
import Explore from './pages/Explore';
import ListingDetail from './pages/ListingDetail';
import Dashboard from './pages/Dashboard';
import AddListing from './pages/AddListing';

// --- i18n System ---
type Language = 'pt-BR' | 'en-US';

const translations = {
  'pt-BR': {
    home: 'Início',
    explore: 'Explorar',
    dashboard: 'Painel',
    addListing: 'Anunciar',
    footerDesc: 'A plataforma definitiva de diretórios. Modular, movida a IA e projetada para crescer.',
    platform: 'Plataforma',
    exploreMaps: 'Explorar Mapas',
    addBusiness: 'Adicionar Negócio',
    memberDash: 'Painel do Membro',
    support: 'Suporte',
    docs: 'Documentação API',
    help: 'Central de Ajuda',
    privacy: 'Privacidade e Termos',
    newsletter: 'Newsletter',
    newsDesc: 'Receba as melhores joias locais no seu e-mail.',
    join: 'Participar',
    copyright: '© 2024 MyListing Directory. Feito com ❤️ e IA.'
  },
  'en-US': {
    home: 'Home',
    explore: 'Explore',
    dashboard: 'Dashboard',
    addListing: 'Add Listing',
    footerDesc: 'The ultimate directory platform. Modular, AI-powered, and designed for growth.',
    platform: 'Platform',
    exploreMaps: 'Explore Maps',
    addBusiness: 'Add Business',
    memberDash: 'Member Dashboard',
    support: 'Support',
    docs: 'API Documentation',
    help: 'Help Center',
    privacy: 'Privacy & Terms',
    newsletter: 'Newsletter',
    newsDesc: 'Get the latest local gems delivered to your inbox.',
    join: 'Join',
    copyright: '© 2024 MyListing Directory. Made with ❤️ and AI.'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['pt-BR']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};

// --- Cart Context ---
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

const Header = ({ cartCount }: { cartCount: number }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            M
          </div>
          <span className="text-xl font-bold text-slate-900 hidden sm:block tracking-tight">MyListing</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`text-sm font-semibold ${location.hash === '' || location.hash === '#/' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}>{t('home')}</Link>
          <Link to="/explore" className={`text-sm font-semibold ${location.hash.includes('/explore') ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}>{t('explore')}</Link>
          <Link to="/dashboard" className={`text-sm font-semibold ${location.hash.includes('/dashboard') ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}>{t('dashboard')}</Link>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 rounded-full p-1 mr-2">
            <button 
              onClick={() => setLanguage('pt-BR')}
              className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${language === 'pt-BR' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
            >
              PT
            </button>
            <button 
              onClick={() => setLanguage('en-US')}
              className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${language === 'en-US' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
            >
              EN
            </button>
          </div>

          <div className="relative group">
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          <Link to="/add-listing" className="hidden sm:flex items-center space-x-2 bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-95">
            <Plus size={18} />
            <span>{t('addListing')}</span>
          </Link>
          <Link to="/dashboard" className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <User size={22} />
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-600">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 py-6 px-4 space-y-4 shadow-xl absolute w-full animate-in slide-in-from-top duration-300">
          <Link onClick={() => setIsMenuOpen(false)} to="/" className="block text-lg font-bold text-slate-900">{t('home')}</Link>
          <Link onClick={() => setIsMenuOpen(false)} to="/explore" className="block text-lg font-bold text-slate-900">{t('explore')}</Link>
          <Link onClick={() => setIsMenuOpen(false)} to="/dashboard" className="block text-lg font-bold text-slate-900">{t('dashboard')}</Link>
          <Link onClick={() => setIsMenuOpen(false)} to="/add-listing" className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold">
            <Plus size={20} />
            <span>{t('addListing')}</span>
          </Link>
        </div>
      )}
    </header>
  );
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [language, setLanguage] = useState<Language>('pt-BR');

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const t = (key: keyof typeof translations['pt-BR']) => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
        <HashRouter>
          <div className="min-h-screen flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
            <Header cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/listing/:id" element={<ListingDetail />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-listing" element={<AddListing />} />
              </Routes>
            </main>
            <footer className="bg-slate-900 text-slate-400 py-16 px-4">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 text-white">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-extrabold text-xl shadow-lg">M</div>
                    <span className="text-2xl font-black tracking-tight">MyListing</span>
                  </div>
                  <p className="text-sm leading-relaxed">
                    {t('footerDesc')}
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">{t('platform')}</h4>
                  <ul className="space-y-3 text-sm font-medium">
                    <li><Link to="/explore" className="hover:text-indigo-400 transition-colors">{t('exploreMaps')}</Link></li>
                    <li><Link to="/add-listing" className="hover:text-indigo-400 transition-colors">{t('addBusiness')}</Link></li>
                    <li><Link to="/dashboard" className="hover:text-indigo-400 transition-colors">{t('memberDash')}</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">{t('support')}</h4>
                  <ul className="space-y-3 text-sm font-medium">
                    <li><a href="#" className="hover:text-indigo-400 transition-colors">{t('docs')}</a></li>
                    <li><a href="#" className="hover:text-indigo-400 transition-colors">{t('help')}</a></li>
                    <li><a href="#" className="hover:text-indigo-400 transition-colors">{t('privacy')}</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">{t('newsletter')}</h4>
                  <p className="text-sm mb-6 leading-relaxed">{t('newsDesc')}</p>
                  <div className="flex bg-slate-800 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                    <input type="email" placeholder="email@example.com" className="bg-transparent border-none rounded-l-xl px-4 py-2 w-full focus:ring-0 text-white placeholder-slate-500 text-sm" />
                    <button className="bg-indigo-600 text-white rounded-xl px-6 py-2 text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg">{t('join')}</button>
                  </div>
                </div>
              </div>
              <div className="max-w-7xl mx-auto border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-semibold uppercase tracking-tighter gap-4">
                <span className="text-slate-500">{t('copyright')}</span>
                <div className="flex space-x-6">
                  <a href="#" className="hover:text-white transition-colors">Twitter</a>
                  <a href="#" className="hover:text-white transition-colors">Instagram</a>
                  <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                </div>
              </div>
            </footer>
          </div>
        </HashRouter>
      </CartContext.Provider>
    </LanguageContext.Provider>
  );
};

export default App;
