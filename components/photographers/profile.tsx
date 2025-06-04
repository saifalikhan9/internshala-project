  // components/photographers/profile.tsx

  "use client";

  import React from "react";
  import Image from "next/image";
  import Link from "next/link";
  import { useRouter } from "next/navigation";
  import { Photographer } from "@/lib/types";
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
  import { PhotoGallery } from "@/components/photographers/photo-gallery";
  import { ReviewCard } from "@/components/photographers/review-card";
  import { InquiryForm } from "@/components/photographers/inquiry-form";
  import { ArrowLeft, ChevronRight, MapPin, Star } from "lucide-react";

  export function PhotographerProfile({ photographer }: { photographer: Photographer| null |undefined}) {
    const router = useRouter();

      if (!photographer) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p>Photographer data is not available.</p>
        <Button className="mt-4" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }


    return (
      <div className="container mx-auto px-4 py-20  ">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Photographers
          </Button>
          <div className="flex items-center ml-auto">
            <Link href="/photographers" className="text-sm text-muted-foreground">
              Photographers
            </Link>
            <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
            <span className="text-sm font-medium">{photographer.name}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with Photographer Info */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg overflow-hidden relative">
              <div className="aspect-square relative">
                <Image
                  src={photographer.profilePicture}
                  alt={photographer.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <h1 className="text-3xl font-bold">{photographer.name}</h1>

              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">{photographer.location}</span>
              </div>

              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium">{photographer.rating}</span>
                <span className="text-muted-foreground text-sm ml-1">
                  ({photographer.reviewCount} reviews)
                </span>
              </div>

              <div className="mt-2">
                <p className="font-medium text-xl">
                  ₹{photographer.startingPrice.toLocaleString()} onwards
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {photographer.styles.map((style) => (
                  <Badge key={style} variant="secondary">
                    {style}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {photographer.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <InquiryForm photographerName={photographer.name} />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-2/3 space-y-12">
            {/* About Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed">{photographer.bio}</p>
            </section>

            {/* Gallery Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
              <PhotoGallery images={photographer.gallery} photographerName={photographer.name} />
            </section>

            {/* Reviews Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {photographer.reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
