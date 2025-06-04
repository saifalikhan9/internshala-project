"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, Menu, Search, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useFilter } from "@/context/FilterContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { filters, updateFilter } = useFilter();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) {
      updateFilter("search", "");
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-background/90 backdrop-blur-sm border-b shadow-sm py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Camera className="h-7 w-7" />
            <span className="font-bold text-xl sm:text-2xl tracking-tight">Pixisphere</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent">
              Home
            </Link>
            <Link href="/photographers" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent">
              Photographers
            </Link>
            <Link href="/categories" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent">
              Categories
            </Link>
            <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent">
              About
            </Link>
          </nav>

          {/* Search & Auth on Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search photographers..."
                className="pl-9 w-64"
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
              />
              {filters.search && (
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => updateFilter("search", "")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button variant="default">Sign In</Button>
          </div>

          {/* Mobile Search Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleSearch}>
              {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col space-y-4 mt-6">
                  <Link 
                    href="/" 
                    className="py-2 px-4 rounded-md hover:bg-accent transition-colors"
                  >
                    Home
                  </Link>
                  <Link 
                    href="/photographers" 
                    className="py-2 px-4 rounded-md hover:bg-accent transition-colors"
                  >
                    Photographers
                  </Link>
                  <Link 
                    href="/categories" 
                    className="py-2 px-4 rounded-md hover:bg-accent transition-colors"
                  >
                    Categories
                  </Link>
                  <Link 
                    href="/about" 
                    className="py-2 px-4 rounded-md hover:bg-accent transition-colors"
                  >
                    About
                  </Link>
                  <div className="border-t pt-4 mt-2">
                    <Button className="w-full">Sign In</Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Input - Expandable */}
        {searchOpen && (
          <div className="md:hidden pt-3 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search photographers..."
              className="pl-9 w-full"
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              autoFocus
            />
            {filters.search && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => updateFilter("search", "")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}