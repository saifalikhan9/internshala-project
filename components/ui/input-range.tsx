"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const RangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    showMarks?: boolean;
    formatValue?: (value: number) => string;
  }
>(({ className, showMarks = false, formatValue = (v) => `${v}`, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    {props.value && props.value.map((_, i) => (
      <SliderPrimitive.Thumb
        key={i}
        className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      />
    ))}
    {showMarks && props.value && (
      <div className="relative w-full mt-1">
        {props.value.map((value, i) => (
          <div
            key={i}
            className="absolute text-xs text-muted-foreground"
            style={{ 
              left: `calc(${((value - (props.min || 0)) / ((props.max || 100) - (props.min || 0))) * 100}% - 1rem)`,
             }}
          >
            {formatValue(value)}
          </div>
        ))}
      </div>
    )}
  </SliderPrimitive.Root>
));
RangeSlider.displayName = SliderPrimitive.Root.displayName;

export { RangeSlider };