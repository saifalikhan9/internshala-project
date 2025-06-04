"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { FilterState, Photographer, SortOption } from "@/lib/types";
import { useDebounce } from "@/lib/hooks/use-debounce";

interface FilterContextType {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  filteredPhotographers: Photographer[];
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

const initialFilters: FilterState = {
  
  priceRange: [0, 50000],
  minRating: 0,
  styles: [],
  tags: [],
  city: "",
  sortBy: "rating-high-to-low",
  search: "",
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(6);
  
  const debouncedSearch = useDebounce(filters.search, 300);
  const debouncedPriceRange = useDebounce(filters.priceRange, 300);

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/photographers`);
        const data: Photographer[] = await response.json();
        console.log(data,"data");
        
        setPhotographers(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching photographers:', error);
        setIsLoading(false);
      }
    };

    fetchPhotographers();
  }, []);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredPhotographers = useMemo(() => {
    if (!photographers.length) return [];

    // First filter by all criteria
    let result = photographers.filter((photographer) => {
      // Price range filter
      const inPriceRange = 
        photographer.startingPrice >= filters.priceRange[0] && 
        photographer.startingPrice <= filters.priceRange[1];

      // Rating filter
      const meetsRating = photographer.rating >= filters.minRating;

      // Style filter
      const matchesStyle = 
        filters.styles.length === 0 || 
        filters.styles.some((style) => photographer.styles.includes(style));

      // tags filter
      const matchesTags = filters.tags.length===0 ||   filters.tags.some((tags) => photographer.tags.includes(tags));

      // City filter
      const matchesCity = 
        !filters.city || photographer.location === filters.city;

      // Search filter - fuzzy matching for name, location, or tags
      const matchesSearch = debouncedSearch 
        ? photographer.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          photographer.location.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          photographer.tags.some((tag) => 
            tag.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
        : true;

      return inPriceRange && meetsRating && matchesStyle && matchesCity && matchesSearch && matchesTags;
    });

    // Then sort the filtered results
    result = [...result].sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low-to-high":
          return a.startingPrice - b.startingPrice;
        case "price-high-to-low":
          return b.startingPrice - a.startingPrice;
        case "rating-high-to-low":
          return b.rating - a.rating;
        case "recently-added":
          // In a real app, we'd use a createdAt date
          // For this mock, we'll just use the ID as a proxy for recency
          return b.id - a.id;
        default:
          return 0;
      }
    });

    return result;
  }, [photographers, filters.priceRange, filters.minRating, filters.styles, filters.city, filters.sortBy, debouncedSearch ,filters.tags]);

  const hasMore = displayCount < filteredPhotographers.length;

  const loadMore = () => {
    setDisplayCount((prev) => prev + 6);
  };

  // Get the photographers to display based on the current display count
  const displayedPhotographers = filteredPhotographers.slice(0, displayCount);

  const value = {
    filters,
    setFilters,
    updateFilter,
    filteredPhotographers: displayedPhotographers,
    isLoading,
    hasMore,
    loadMore
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export const useFilter = () => {
  
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};