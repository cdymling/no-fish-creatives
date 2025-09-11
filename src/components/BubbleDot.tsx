import React from 'react';
import { cn } from '../lib/utils';

interface BubbleDotProps {
  className?: string;
}

export function BubbleDot({ className }: BubbleDotProps) {
  return (
    <span 
      className={cn(
        "absolute w-[0.15em] h-[0.15em] rounded-full bg-white",
        "z-10",
        className
      )}
      style={{
        // Position exactly where the i dot should be
        top: '0.17em',
        left: '50%',
        transform: 'translateX(-50%)',
        transformOrigin: 'center center',
      }}
    />
  );
}