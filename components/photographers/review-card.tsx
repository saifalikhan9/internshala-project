import React from "react";
import { Review } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, StarHalf } from "lucide-react";
import { format, parseISO } from "date-fns";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  // Generate initials from the name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star\" className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    return stars;
  };

  // Format the date
  const formattedDate = (() => {
    try {
      return format(parseISO(review.date), 'MMM d, yyyy');
    } catch (error) {
      console.error(error);
      
      
    }
  })();

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>{getInitials(review.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{review.name}</p>
              <div className="flex mt-1">
                {renderStars(review.rating)}
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{review.comment}</p>
      </CardContent>
    </Card>
  );
}