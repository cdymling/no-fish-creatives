import React from 'react';
import { useInView } from '../hooks/use-in-view';
import { cn } from '../lib/utils';

interface RevealProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  as?: 'div' | 'span' | 'section' | 'article' | 'header' | 'main';
  className?: string;
}

export function Reveal({
  children,
  direction = 'right',
  delay = 0,
  as: Component = 'div',
  className,
}: RevealProps) {
  const { ref, isVisible } = useInView();

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
      default:
        return 'translate-x-6';
    }
  };

  return (
    <Component
      ref={ref as any}
      className={cn(
        'transition-all duration-700 ease-out will-change-transform',
        'motion-reduce:opacity-100 motion-reduce:transform-none motion-reduce:transition-none',
        isVisible
          ? 'opacity-100 translate-x-0 translate-y-0'
          : `opacity-0 ${getInitialTransform()}`,
        className
      )}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </Component>
  );
}