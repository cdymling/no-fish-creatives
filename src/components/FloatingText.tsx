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
        "transform-gpu",
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'both',
        transform: 'none',
        willChange: 'transform',
      }}
    >
      {children}
    </span>
  );
}