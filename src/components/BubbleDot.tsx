import React from 'react';
import { cn } from '../lib/utils';

interface BubbleDotProps {
  className?: string;
}

export function BubbleDot({ className }: BubbleDotProps) {
  // Generate random bubble configurations
  const bubbles = [
    { size: 0.1, delay: 0, duration: 4 },
    { size: 0.08, delay: 0.8, duration: 5 },
    { size: 0.12, delay: 1.6, duration: 4.5 },
    { size: 0.06, delay: 2.4, duration: 6 },
    { size: 0.09, delay: 3.2, duration: 3.5 },
  ];

  return (
    <span className="absolute top-[0.17em] left-1/2 transform -translate-x-1/2">
      {bubbles.map((bubble, index) => (
        <span
          key={index}
          className={cn(
            "absolute rounded-full bg-white/80",
            "animate-bubble-rise transform-gpu will-change-transform",
            "z-10",
            className
          )}
          style={{
            width: `${bubble.size}em`,
            height: `${bubble.size}em`,
            left: `${(index - 2) * 0.05}em`, // Slight horizontal offset
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
            transformOrigin: 'center center',
          }}
        />
      ))}
    </span>
  );
}