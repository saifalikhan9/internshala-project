"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Photographer } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";

interface PhotographerCardProps {
  photographer: Photographer;
}

export function PhotographerCard({ photographer }: PhotographerCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={photographer.profilePicture}
          alt={photographer.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-xl">{photographer.name}</h3>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{photographer.location}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="font-medium">{photographer.rating}</span>
            <span className="text-muted-foreground text-sm ml-1">({photographer.reviewCount})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 pb-3 flex-grow">
        <div className="mt-2">
          <p className="font-medium">Starts at ₹{photographer.startingPrice.toLocaleString()}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {photographer.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {photographer.styles.map((style) => (
            <Badge key={style} variant="outline" className="text-xs">
              {style}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/photographers/${photographer.slug}`}>
            View Profile
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}