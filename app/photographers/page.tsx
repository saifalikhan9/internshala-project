"use client";
import React, { useEffect } from "react";
import { FilterSidebar } from "@/components/photographers/filter-sidebar";
import { PhotographerGrid } from "@/components/photographers/photographer-grid";
import { useSearchParams } from "next/navigation";
import { useFilter } from "@/context/FilterContext";

export default function PhotographersPage() {
  const searchParams = useSearchParams();
  const { updateFilter } = useFilter();

  useEffect(() => {
    const tags = searchParams.get("tags");
    if (tags) {
      updateFilter("tags", [tags]);
    }
  },[]);

  return (
    <div className="container  mx-auto px-4 py-20">
      <div className="mb-6 text-center">
        <h1 className="text-3xl  font-bold">Photographers in India</h1>
        <p className="text-muted-foreground mt-1">
          Find and connect with the best photographers for your next project
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 ">
        {/* Filter Sidebar */}
        <FilterSidebar className="w-full  border-foreground lg:w-64 xl:w-72 shrink-0 " />

        {/* Main Content */}
        <div className="flex-1">
          <PhotographerGrid />
        </div>
      </div>
    </div>
  );
}
