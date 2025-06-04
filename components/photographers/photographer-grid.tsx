"use client";

import React, { useEffect, useRef } from "react";
import { useFilter } from "@/context/FilterContext";
import { PhotographerCard } from "@/components/photographers/photographer-card";
import { PhotographerGridSkeleton } from "@/components/ui/loading-skeleton";
import { Button } from "@/components/ui/button";
import { Camera, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function PhotographerGrid() {
  const { filteredPhotographers, isLoading, hasMore, loadMore, filters } =
    useFilter();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  console.log(filteredPhotographers,"poto");
  

  // Implementing a smart suggestion based on filters
  const generateSuggestion = () => {
    if (
      filters.city &&
      filters.styles.length > 0 &&
      filters.styles.includes("Outdoor")
    ) {
      return `Top-rated outdoor maternity photographers in ${filters.city}`;
    } else if (filters.city && filters.minRating >= 4.5) {
      return `Highly rated photographers in ${filters.city}`;
    } else if (filters.styles.length === 1) {
      return `Best ${filters.styles[0].toLowerCase()} photographers`;
    }
    return null;
  };

  const suggestion = generateSuggestion();

  // Intersection observer for infinite scroll
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  if (isLoading) {
    return <PhotographerGridSkeleton />;
  }

  if (filteredPhotographers.length === 0) {
    return (
      <div className="text-center py-16 border rounded-lg bg-background">
        <Camera className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-2xl font-semibold mb-2">No photographers found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your filters or search criteria
        </p>
        <Button
          onClick={() => (window.location.href = "/photographers")}
          variant="outline"
        >
          Reset Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {suggestion && (
        <div className="bg-accent/50 p-4 rounded-lg">
          <h3 className="font-medium">Suggested for you:</h3>
          <p className="text-lg font-semibold">{suggestion}</p>
        </div>
      )}

      <AnimatePresence>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredPhotographers.map((photographer) => (
            <motion.div
              key={photographer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              
            >
              <PhotographerCard  photographer={photographer} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center mt-8 pb-6">
          <Button
            onClick={loadMore}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            Load More
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
