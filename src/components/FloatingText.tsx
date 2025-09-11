import React from 'react';
import { cn } from '../lib/utils';

interface FloatingTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FloatingText({ children, className, delay = 0 }: FloatingTextProps) {
  return (
    <span 
      className={cn(
        "block relative z-10 will-change-transform",
        "animate-underwater-float motion-reduce:animate-none",
        "transform-gpu perspective-1000",
        "[transform-style:preserve-3d]",
        "hover:scale-105 transition-transform duration-300",
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'both',
        transform: 'perspective(1200px) rotateX(5deg)',
        backfaceVisibility: 'hidden',
        willChange: 'transform',
      }}
    >
      {children}
    </span>
  );
}