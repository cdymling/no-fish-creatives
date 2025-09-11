import React from 'react';
import { cn } from '../lib/utils';

interface BubbleDotProps {
  className?: string;
}

export function BubbleDot({ className }: BubbleDotProps) {
  return (
    <span 
      className={cn(
        "absolute w-[0.2em] h-[0.2em] rounded-full bg-white",
        "z-10",
        className
      )}
      style={{
        // Position exactly where the i dot should be
        top: '0.05em',
        left: '50%',
        transform: 'translateX(-50%)',
        transformOrigin: 'center center',
      }}
    />
  );
}