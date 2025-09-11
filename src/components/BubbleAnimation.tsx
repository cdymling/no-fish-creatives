import React, { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
}

export function BubbleAnimation() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Create initial bubbles
    const initialBubbles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 8 + 4, // 4-12px
      delay: Math.random() * 5000, // 0-5s delay
      duration: Math.random() * 4000 + 6000, // 6-10s duration
    }));
    
    setBubbles(initialBubbles);
    
    // Add new bubbles periodically
    const interval = setInterval(() => {
      setBubbles(prev => {
        const newBubble = {
          id: Date.now(),
          x: Math.random() * 100,
          size: Math.random() * 8 + 4,
          delay: 0,
          duration: Math.random() * 4000 + 6000,
        };
        
        // Keep only the last 12 bubbles to prevent memory issues
        const updated = [...prev, newBubble].slice(-12);
        return updated;
      });
    }, Math.random() * 3000 + 2000); // New bubble every 2-5 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute bottom-0 bg-white/20 rounded-full animate-bubble-rise"
          style={{
            left: `${bubble.x}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDelay: `${bubble.delay}ms`,
            animationDuration: `${bubble.duration}ms`,
          }}
        />
      ))}
    </div>
  );
}
