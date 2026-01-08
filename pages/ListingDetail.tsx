
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Star, MapPin, Phone, Clock, 
  Share2, Heart, CheckCircle,
  Calendar, Info, Plus, ChevronRight, UserPlus,
  Hotel, Check, Sparkles
} from 'lucide-react';
import { Listing, ListingType } from '../types';
import { useCart } from '../App';

const ListingDetail: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const { addToCart } = useCart();

  const listing: Listing = {
    id: id || '1',
    title: 'The Artisan Bakery & Bistro',
    type: id === '2' ? ListingType.HOTEL : ListingType.RESTAURANT,
    category: 'Bakery & European',
    description: 'Bem-vindo ao Artisan, onde a panificação tradicional encontra a culinária europeia moderna. Usamos apenas os melhores ingredientes orgânicos de origem local para criar doces de dar água na boca e pratos elegantes.',
    rating: 4.8,
    reviewsCount: 156,
    imageUrl: id === '2' ? 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1600' : 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1600',
    logoUrl: 'https://images.unsplash.com/photo-1514328537552-475260197793?auto=format&fit=crop&q=80&w=300',
    location: { address: '124 Baker Street, Marylebone', city: 'London', lat: 51.5, lng: -0.1 },
    featured: true,
    status: 'open',
    tags: ['Organic', 'Vegan Friendly', 'Outdoor Seating', 'Live Music'],
    priceRange: '££'
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => setBookingConfirmed(false), 5000);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="relative h-[550px] group overflow-hidden bg-slate-900">
        <img src={listing.imageUrl} alt={listing.title} className="w-full h-full object-cover opacity-60 transition-transform duration-[30s] group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-10">
              <div className="w-32 h-32 md:w-48 md:h-48 bg-white p-2 rounded-[2.5rem] shadow-2xl rotate-3 shrink-0">
                <img src={listing.logoUrl} className="w-full h-full object-cover rounded-[2rem]" alt="Logo" />
              </div>

              <div className="text-center md:text-left text-white flex-grow">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <span className="bg-indigo-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-indigo-600/40">
                    <Sparkles size={12} className="inline mr-2 mb-0.5" />
                    {listing.type}
                  </span>
                  <div className="flex items-center bg-white/10 backdrop-blur-xl border border-white/20 px-3 py-1.5 rounded-xl">
                    <Star size={14} className="text-yellow-400 fill-current mr-2" />
                    <span className="font-black">{listing.rating}</span>
                  </div>
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 leading-none">{listing.title}</h1>
                <p className="flex items-center justify-center md:justify-start opacity-70 font-bold text-xl">
                  <MapPin size={24} className="mr-3 text-indigo-400" /> {listing.location.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="flex-grow space-y-20">
            {/* Tabs */}
            <nav className="flex space-x-2 border-b-2 border-slate-50 overflow-x-auto scrollbar-hide">
              {['Overview', 'Menu', 'Reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-6 px-10 font-black text-xs uppercase tracking-[0.3em] transition-all relative ${activeTab === tab ? 'text-indigo-600' : 'text-slate-300 hover:text-slate-500'}`}
                >
                  {tab}
                  {activeTab === tab && <div className="absolute bottom-[-2px] left-0 w-full h-1 bg-indigo-600 rounded-full"></div>}
                </button>
              ))}
            </nav>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              {activeTab === 'Overview' && (
                <div className="space-y-12">
                   <div className="prose prose-slate max-w-none">
                     <p className="text-2xl text-slate-600 leading-relaxed font-medium italic">"{listing.description}"</p>
                   </div>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                     {listing.tags.map(tag => (
                       <div key={tag} className="flex items-center p-6 bg-slate-50 rounded-[2rem] border-2 border-slate-100 hover:border-indigo-100 transition-colors group">
                         <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                           <Check size={20} strokeWidth={4} />
                         </div>
                         <span className="text-[11px] font-black text-slate-800 uppercase tracking-widest">{tag}</span>
                       </div>
                     ))}
                   </div>
                </div>
              )}
            </div>
          </div>

          <aside className="w-full lg:w-[450px]">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white border-2 border-slate-50 rounded-[3rem] p-12 shadow-2xl">
                <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center tracking-tight">
                  <Calendar className="mr-4 text-indigo-600" size={32} />
                  Reserva Online
                </h3>

                {bookingConfirmed ? (
                  <div className="bg-emerald-50 p-10 rounded-[2.5rem] text-center border-4 border-emerald-100 animate-in zoom-in duration-300">
                    <h5 className="text-2xl font-black text-emerald-900">Solicitado!</h5>
                    <p className="text-emerald-700 font-medium mt-2">Aguardando confirmação.</p>
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-6">
                    <div className="space-y-4">
                       <input type="date" required className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold text-sm outline-none" />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white py-6 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.3em] shadow-xl hover:bg-indigo-700 transition-all">
                       Reservar Agora
                    </button>
                  </form>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
