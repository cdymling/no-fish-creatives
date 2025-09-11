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
        "block relative",
        "animate-float-gentle",
        "transform-gpu perspective-1000",
        "[transform-style:preserve-3d]",
        "hover:scale-105 transition-transform duration-300",
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        transform: 'perspective(1000px) rotateX(10deg) translateZ(20px)',
        textShadow: '0 10px 20px rgba(92, 225, 230, 0.3), 0 0 40px rgba(92, 225, 230, 0.1)',
        filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.5))',
      }}
    >
      {children}
    </span>
  );
}