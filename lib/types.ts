

export interface Photographer {
  id: number;
  name: string;
  slug: string;
  profilePicture: string;
  location: string;
  startingPrice: number;
  rating: number;
  reviewCount: number;
  styles: string[];
  tags: string[];
  bio: string;
  gallery: string[];
  reviews: Review[];
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FilterState {
  priceRange: [number, number];
  minRating: number;
  styles: string[];
  tags:string[];
  city: string;
  sortBy: SortOption;
  search: string;
}



export type SortOption = 
  | "price-low-to-high" 
  | "price-high-to-low" 
  | "rating-high-to-low" 
  | "recently-added";