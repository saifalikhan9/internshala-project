# Pixisphere Photography Platform

Pixisphere is a photography platform that connects clients with photographers based on their preferences, location, and budget.

## Features

- **Category Listing Page**: Browse photographers with advanced filtering options  
- **Photographer Profile Pages**: View detailed profiles with galleries and reviews  
- **Search Functionality**: Find photographers by name, location, or specialties  
- **Filtering System**: Filter by price, rating, styles, and location  
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices  
- **Inquiry System**: Contact photographers directly through the platform  

## Tech Stack

- **Frontend Framework**: Next.js (App Router)  
- **Styling**: Tailwind CSS with shadcn/ui components  
- **State Management**: React Context API  
- **Form Handling**: React Hook Form with Zod validation  
- **Image Optimization**: Next.js Image component  
- **Animation**: Framer Motion for smooth transitions  
- **Date Handling**: date-fns for date formatting  

## Key Implementation Details

### Filtering System

The filtering system is implemented using React Context API for global state management. The main components are:

1. `FilterContext.tsx` – Provides state and methods for filtering photographers  
2. `FilterSidebar.tsx` – UI for applying filters  
3. `useDebounce.tsx` – Custom hook for debouncing filter inputs  

The filtering logic handles multiple filter criteria simultaneously:

```ts
const filteredPhotographers = useMemo(() => {
  return photographers.filter((photographer) => {
    const inPriceRange = 
      photographer.startingPrice >= filters.priceRange[0] && 
      photographer.startingPrice <= filters.priceRange[1];

    const meetsRating = photographer.rating >= filters.minRating;

    // Additional filtering criteria...

    return inPriceRange && meetsRating && matchesStyle && matchesCity && matchesSearch;
  });
}, [photographers, filters]);
````

### Debounce Logic

To optimize performance, search and price range inputs are debounced:

```ts
const debouncedSearch = useDebounce(filters.search, 300);
const debouncedPriceRange = useDebounce(filters.priceRange, 300);
```

The `useDebounce` hook:

```ts
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

## Mock API Handling in Next.js

To ensure compatibility with Vercel and avoid deployment issues related to JSON Server, a mock API is implemented directly inside the Next.js API route:

```ts
// app/api/photographers/route.ts
import { NextResponse } from 'next/server';
import data from '@/db.json';

export async function GET() {
  return NextResponse.json(data.photographers);
}
```

> **Note:** This replaces the need to run a separate JSON Server, making it easier to deploy and maintain in serverless environments like Vercel.

## Setup Instructions

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

* `/app` – Next.js App Router pages
* `/components` – Reusable React components
* `/context` – Context providers for state management
* `/lib` – Utility functions and TypeScript types
* `/public` – Static assets
* `/app/api/photographers` – Mock API route serving photographer data

## API Data Structure

The mock API uses data from `db.json` with the following structure:

```ts
interface Photographer {
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

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}
```



