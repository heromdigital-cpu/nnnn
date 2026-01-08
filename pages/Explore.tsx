
import React, { useState, useEffect } from 'react';
import { Search, Map as MapIcon, Filter, SlidersHorizontal, ChevronDown, LayoutGrid, List, MapPin, TrendingUp } from 'lucide-react';
import ListingCard from '../components/ListingCard';
import { Listing, ListingType } from '../types';

const MOCK_LISTINGS: Listing[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `${i + 1}`,
  title: [
    'Golden Dragon Chinese', 'Riverside Bistro', 'Skyline Suites', 
    'Central Office Space', 'Green Thumb Gardeners', 'Digital Dynamics',
    'Elite Gym & Spa', 'City Events Hall', 'Vintage Vineyards',
    'Tech Hub Co-working', 'Pasta Paradiso', 'Sunset Marquee'
  ][i % 12],
  type: [
    ListingType.RESTAURANT, ListingType.RESTAURANT, ListingType.HOTEL, 
    ListingType.REAL_ESTATE, ListingType.SERVICE, ListingType.JOB,
    ListingType.SERVICE, ListingType.EVENT, ListingType.RESTAURANT,
    ListingType.REAL_ESTATE, ListingType.RESTAURANT, ListingType.EVENT
  ][i % 6] as ListingType,
  category: 'Various',
  description: 'A great place for various activities and services.',
  rating: Number((4 + Math.random()).toFixed(1)),
  reviewsCount: Math.floor(Math.random() * 500) + 10,
  imageUrl: `https://picsum.photos/seed/listing${i}/800/600`,
  location: { address: 'Main St', city: 'London', lat: 51.5 + (Math.random() - 0.5) * 0.1, lng: -0.1 + (Math.random() - 0.5) * 0.1 },
  featured: i < 3,
  status: Math.random() > 0.3 ? 'open' : 'closed',
  tags: ['Modern', 'Accessible', 'Top Rated'],
  priceRange: ['£', '££', '£££', '££££'][Math.floor(Math.random() * 4)]
}));

const Explore: React.FC = () => {
  const [showMap, setShowMap] = useState(true);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [activeType, setActiveType] = useState<string>('All');

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      {/* Search & Filter Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-4 flex-grow max-w-4xl">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search listings..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <button className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full text-sm font-medium transition-colors">
            <SlidersHorizontal size={16} />
            <span>Filters</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center space-x-2 ml-4 border-l border-slate-200 pl-4">
          <button 
            onClick={() => setShowMap(!showMap)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${showMap ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            <MapIcon size={16} />
            <span>{showMap ? 'Hide Map' : 'Show Map'}</span>
          </button>
          <div className="flex bg-slate-100 p-1 rounded-full">
            <button 
              onClick={() => setViewType('grid')}
              className={`p-2 rounded-full ${viewType === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button 
              onClick={() => setViewType('list')}
              className={`p-2 rounded-full ${viewType === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar Results */}
        <div className={`flex flex-col overflow-y-auto bg-slate-50 transition-all duration-300 ${showMap ? 'w-full lg:w-[450px] xl:w-[600px]' : 'w-full'}`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold text-slate-900">1,248 Results found</h1>
              <div className="flex items-center text-sm font-medium text-slate-600 cursor-pointer hover:text-blue-600">
                <span>Sort by: Recommended</span>
                <ChevronDown size={14} className="ml-1" />
              </div>
            </div>

            {/* Quick Category Filters */}
            <div className="flex space-x-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {['All', 'Restaurants', 'Hotels', 'Events', 'Real Estate', 'Jobs', 'Services'].map((type) => (
                <button 
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-xs font-bold transition-all ${activeType === type ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'}`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className={viewType === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6" : "space-y-6"}>
              {MOCK_LISTINGS.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            <div className="mt-12 text-center pb-12">
              <button className="bg-white border border-slate-200 px-8 py-3 rounded-full font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                Load More Listings
              </button>
            </div>
          </div>
        </div>

        {/* Map View */}
        {showMap && (
          <div className="hidden lg:block flex-grow relative bg-slate-200 overflow-hidden">
             {/* Mock Map UI */}
             <div className="absolute inset-0 bg-[#e5e7eb] flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-60 grayscale-[0.2]"></div>
                
                {/* Pins */}
                {MOCK_LISTINGS.map((listing, i) => (
                  <div 
                    key={i}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{ 
                      top: `${30 + Math.random() * 40}%`, 
                      left: `${30 + Math.random() * 40}%` 
                    }}
                  >
                    {/* Fix: Added missing MapPin icon from imports */}
                    <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg group-hover:scale-125 transition-transform duration-200 border-2 border-white">
                      <MapPin size={18} />
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {listing.title}
                    </div>
                  </div>
                ))}
             </div>

             {/* Map Controls */}
             <div className="absolute bottom-6 right-6 flex flex-col space-y-2">
                <button className="bg-white p-2 rounded-lg shadow-md text-slate-600 hover:bg-slate-50">+</button>
                <button className="bg-white p-2 rounded-lg shadow-md text-slate-600 hover:bg-slate-50">-</button>
             </div>
             <div className="absolute top-6 right-6">
                {/* Fix: Added missing TrendingUp icon from imports */}
                <button className="bg-white px-4 py-2 rounded-full shadow-md text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center space-x-2">
                  <TrendingUp size={14} />
                  <span>Search as I move</span>
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
