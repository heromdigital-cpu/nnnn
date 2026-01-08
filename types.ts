
export enum ListingType {
  RESTAURANT = 'Restaurant',
  HOTEL = 'Hotel',
  EVENT = 'Event',
  REAL_ESTATE = 'Real Estate',
  JOB = 'Job',
  SERVICE = 'Service'
}

export interface Listing {
  id: string;
  title: string;
  type: ListingType;
  category: string;
  description: string;
  priceRange?: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  logoUrl?: string;
  location: {
    address: string;
    city: string;
    lat: number;
    lng: number;
  };
  featured: boolean;
  status: 'open' | 'closed';
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'owner' | 'visitor';
}

export interface Review {
  id: string;
  listingId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
