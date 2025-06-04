"use client";

import React from "react";
import { useFilter } from "@/context/FilterContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RangeSlider } from "@/components/ui/input-range";
import { SortOption } from "@/lib/types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterX, SlidersHorizontal } from "lucide-react";

// Photography styles options
const STYLES = [
  "Traditional",
  "Candid",
  "Studio",
  "Outdoor",
  "Fashion",
  "Documentary",
  "Lifestyle",
];
const TAGS = [
  "Candid",
  "Maternity",
  "Newborn",
  "Birthday",
  "Wedding",
  "Pre-wedding",
  "Couple",
  "Family",
];

// Cities options
const CITIES = [
  "All Cities",
  "Bengaluru",
  "Mumbai",
  "Delhi",
  "Chennai",
  "Hyderabad",
  "Kolkata",
];

// Sort options
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "price-low-to-high", label: "Price: Low to High" },
  { value: "price-high-to-low", label: "Price: High to Low" },
  { value: "rating-high-to-low", label: "Rating: High to Low" },
  { value: "recently-added", label: "Recently Added" },
];

// Rating options
const RATING_OPTIONS = [
  { value: 0, label: "Any Rating" },
  { value: 3, label: "3+ Stars" },
  { value: 4, label: "4+ Stars" },
  { value: 4.5, label: "4.5+ Stars" },
];

interface FilterSidebarProps {
  className?: string;
}

export function FilterSidebar({ className }: FilterSidebarProps) {
  const { filters, updateFilter, setFilters } = useFilter();

  const formatPrice = (price: number) => `₹${price.toLocaleString()}`;

  return (
    <>
      {/* Desktop Filter Sidebar */}
      <div
        className={`hidden lg:block p-6 border rounded-lg bg-background sticky top-24 ${className}`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setFilters({
                priceRange: [0, 50000],
                minRating: 0,
                styles: [],
                tags: [],
                city: "",
                sortBy: "rating-high-to-low",
                search: "",
              })
            }
            className="text-xs h-8"
          >
            <FilterX className="h-3.5 w-3.5 mr-1.5" />
            Reset All
          </Button>
        </div>

        <div className="space-y-6">
          {/* Price Range Filter */}
          <div>
            <Label className="text-base font-medium mb-4 block">
              Price Range
            </Label>
            <RangeSlider
              min={0}
              max={50000}
              step={1000}
              value={filters.priceRange}
              onValueChange={(value) =>
                updateFilter("priceRange", value as [number, number])
              }
              className="mb-8"
              showMarks
              formatValue={formatPrice}
            />
          </div>

          {/* City Filter */}
          <div>
            <Label
              htmlFor="city-select"
              className="text-base font-medium mb-3 block"
            >
              City
            </Label>
            <Select
              value={filters.city || "All Cities"}
              onValueChange={(value) =>
                updateFilter("city", value === "All Cities" ? "" : value)
              }
            >
              <SelectTrigger id="city-select">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rating Filter */}
          <div>
            <Label
              htmlFor="rating-select"
              className="text-base font-medium mb-3 block"
            >
              Rating
            </Label>
            <Select
              value={String(filters.minRating)}
              onValueChange={(value) =>
                updateFilter("minRating", Number(value))
              }
            >
              <SelectTrigger id="rating-select">
                <SelectValue placeholder="Select minimum rating" />
              </SelectTrigger>
              <SelectContent>
                {RATING_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={String(option.value)}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Styles Filter */}
          <div>
            <Label className="text-base font-medium mb-3 block">Styles</Label>
            <div className="grid grid-cols-1 gap-3">
              {STYLES.map((style) => (
                <div key={style} className="flex items-center space-x-2">
                  <Checkbox
                    id={`style-${style}`}
                    checked={filters.styles.includes(style)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateFilter("styles", [...filters.styles, style]);
                      } else {
                        updateFilter(
                          "styles",
                          filters.styles.filter((s) => s !== style)
                        );
                      }
                    }}
                  />
                  <Label
                    htmlFor={`style-${style}`}
                    className="text-sm font-normal"
                  >
                    {style}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          {/* Tags Filter */}
          <div>
            <Label className="text-base font-medium mb-3 block">Tags</Label>
            <div className="grid grid-cols-1 gap-3">
              {TAGS.map((tag) => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={`style-${tag}`}
                    checked={filters.tags.includes(tag)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateFilter("tags", [...filters.tags, tag]);
                      } else {
                        updateFilter(
                          "tags",
                          filters.tags.filter((s) => s !== tag)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={`tag-${tag}`} className="text-sm font-normal">
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <Label
              htmlFor="sort-select"
              className="text-base font-medium mb-3 block"
            >
              Sort By
            </Label>
            <Select
              value={filters.sortBy}
              onValueChange={(value) =>
                updateFilter("sortBy", value as SortOption)
              }
            >
              <SelectTrigger id="sort-select">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" className="h-12 w-12 rounded-full shadow-lg">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
            <SheetHeader className="mb-5">
              <div className="flex items-center justify-between">
                <SheetTitle>Filters</SheetTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setFilters({
                      priceRange: [0, 50000],
                      minRating: 0,
                      styles: [],
                      tags: [],
                      city: "",
                      sortBy: "rating-high-to-low",
                      search: "",
                    })
                  }
                >
                  <FilterX className="h-4 w-4 mr-2" />
                  Reset All
                </Button>
              </div>
              <SheetDescription>
                Refine your search with these filters
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6 overflow-y-auto max-h-[calc(85vh-120px)] pb-6">
              {/* Price Range Filter */}
              <div>
                <Label className="text-base font-medium mb-4 block">
                  Price Range
                </Label>
                <RangeSlider
                  min={0}
                  max={50000}
                  step={1000}
                  value={filters.priceRange}
                  onValueChange={(value) =>
                    updateFilter("priceRange", value as [number, number])
                  }
                  className="mb-8"
                  showMarks
                  formatValue={formatPrice}
                />
              </div>

              {/* City Filter */}
              <div>
                <Label
                  htmlFor="mobile-city-select"
                  className="text-base font-medium mb-3 block"
                >
                  City
                </Label>
                <Select
                  value={filters.city || "All Cities"}
                  onValueChange={(value) =>
                    updateFilter("city", value === "All Cities" ? "" : value)
                  }
                >
                  <SelectTrigger id="mobile-city-select">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {CITIES.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Rating Filter */}
              <div>
                <Label
                  htmlFor="mobile-rating-select"
                  className="text-base font-medium mb-3 block"
                >
                  Rating
                </Label>
                <Select
                  value={String(filters.minRating)}
                  onValueChange={(value) =>
                    updateFilter("minRating", Number(value))
                  }
                >
                  <SelectTrigger id="mobile-rating-select">
                    <SelectValue placeholder="Select minimum rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {RATING_OPTIONS.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={String(option.value)}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Styles Filter */}
              <div>
                <Label className="text-base font-medium mb-3 block">
                  Styles
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {STYLES.map((style) => (
                    <div key={style} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-style-${style}`}
                        checked={filters.styles.includes(style)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFilter("styles", [...filters.styles, style]);
                          } else {
                            updateFilter(
                              "styles",
                              filters.styles.filter((s) => s !== style)
                            );
                          }
                        }}
                      />
                      <Label
                        htmlFor={`mobile-style-${style}`}
                        className="text-sm font-normal"
                      >
                        {style}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <Label
                  htmlFor="mobile-sort-select"
                  className="text-base font-medium mb-3 block"
                >
                  Sort By
                </Label>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) =>
                    updateFilter("sortBy", value as SortOption)
                  }
                >
                  <SelectTrigger id="mobile-sort-select">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t">
              <Button className="w-full">Apply Filters</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
