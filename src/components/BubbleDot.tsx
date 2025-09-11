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
        "animate-bubble-float transform-gpu will-change-transform",
        "z-10",
        className
      )}
      style={{
        // Position exactly where the i dot would be
        top: '0.1em',
        left: '50%',
        transform: 'translateX(-50%) translateY(-0.8em)',
        transformOrigin: 'center center',
      }}
    />
  );
}