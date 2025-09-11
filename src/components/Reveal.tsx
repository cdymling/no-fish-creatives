import React from 'react';
import { useInView } from '../hooks/use-in-view';
import { cn } from '../lib/utils';

interface RevealProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down' | 'fadeScale';
  delay?: number;
  as?: 'div' | 'span' | 'section' | 'article' | 'header' | 'main';
  className?: string;
  repeat?: boolean;
  threshold?: number;
  rootMargin?: string;
  duration?: number;
}

export function Reveal({
  children,
  direction = 'right',
  delay = 0,
  as: Component = 'div',
  className,
  repeat = false,
  threshold = 0.2,
  rootMargin = '0px 0px -10% 0px',
  duration = 700,
}: RevealProps) {
  const { ref, isVisible } = useInView({
    once: !repeat,
    threshold,
    rootMargin,
  });

  const getInitialTransform = () => {
    switch (direction) {
      case 'left':
        return '-translate-x-6';
      case 'right':
        return 'translate-x-6';
      case 'up':
        return '-translate-y-6';
      case 'down':
        return 'translate-y-6';
      case 'fadeScale':
        return 'scale-50';
      default:
        return 'translate-x-6';
    }
  };

  return (
    <Component
      ref={ref as any}
      className={cn(
        `transition-all duration-${duration} ease-out will-change-transform`,
        'motion-reduce:opacity-100 motion-reduce:transform-none motion-reduce:transition-none',
        isVisible
          ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
          : `opacity-0 ${getInitialTransform()}`,
        className
      )}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </Component>
  );
}