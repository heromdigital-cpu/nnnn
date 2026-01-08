
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Heart, Clock } from 'lucide-react';
import { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <Link to={`/listing/${listing.id}`}>
          <img 
            src={listing.imageUrl} 
            alt={listing.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        <div className="absolute top-3 right-3 flex space-x-2">
          <button className="p-2 bg-white/90 backdrop-blur rounded-full text-slate-600 hover:text-red-500 shadow-sm transition-colors">
            <Heart size={18} />
          </button>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            {listing.type}
          </span>
        </div>
        {listing.status === 'open' && (
          <div className="absolute bottom-3 left-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
            OPEN NOW
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/listing/${listing.id}`} className="text-lg font-bold text-slate-800 hover:text-blue-600 transition-colors line-clamp-1">
            {listing.title}
          </Link>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded text-yellow-700">
            <Star size={14} className="fill-current mr-1" />
            <span className="text-sm font-bold">{listing.rating}</span>
          </div>
        </div>

        <div className="flex items-center text-slate-500 text-sm mb-3">
          <MapPin size={14} className="mr-1" />
          <span className="line-clamp-1">{listing.location.address}, {listing.location.city}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {listing.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] text-slate-400 border border-slate-200 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="text-slate-600 font-semibold text-sm">
            {listing.priceRange || 'Contact for Price'}
          </div>
          <Link to={`/listing/${listing.id}`} className="text-blue-600 text-sm font-bold hover:underline">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
