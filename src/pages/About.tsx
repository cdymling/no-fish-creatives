
import React, { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { ScrollArea } from '../components/ui/scroll-area';

const About = () => {
  const isMobile = useIsMobile();
  const [activeReason, setActiveReason] = useState(0);
  const reasonsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobile || !reasonsContainerRef.current) return;

    const handleScroll = () => {
      const container = reasonsContainerRef.current;
      if (!container) return;
      
      const scrollPosition = container.scrollTop;
      const containerHeight = container.clientHeight;
      
      // Determine which reason is currently visible based on scroll position
      if (scrollPosition < containerHeight * 0.5) {
        setActiveReason(0);
      } else if (scrollPosition < containerHeight * 1.5) {
        setActiveReason(1);
      } else {
        setActiveReason(2);
      }
    };

    const container = reasonsContainerRef.current;
    container.addEventListener('scroll', handleScroll);
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  const reasons = [
    {
      number: "#1",
      text: "We let you work directly with senior creatives. The kind you'd normally find at a big, highly awarded creative agency. Just without all the layers of people, processes and up-selling that usually come with it."
    },
    {
      number: "#2",
      text: "We're smart about production. When it makes sense, we handle it ourselves, using AI or taking on tasks like directing and editing."
    },
    {
      number: "#3",
      text: "We collaborate with a network of specialists in strategy, design and production when your task demands it. That way, we minimize overlapping roles and processes and make sure you only pay for what you need, when you need it."
    }
  ];

  if (isMobile) {
    return (
      <div className="h-screen bg-black flex flex-col">
        {/* Fixed header */}
        <div className="px-6 py-8 bg-black z-10 border-b border-gray-800">
          <h2 className="font-clash text-white text-4xl md:text-5xl font-bold">
            Here's why:
          </h2>
        </div>
        
        {/* Scrollable reasons */}
        <div 
          ref={reasonsContainerRef}
          className="flex-1 overflow-y-auto snap-y snap-mandatory"
          style={{ scrollSnapType: 'y mandatory' }}
        >
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="h-[calc(100vh-132px)] flex flex-col justify-center px-6 snap-start"
            >
              <p className="font-clash text-white text-3xl leading-tight">
                <span className="text-[#5CE1E6] font-bold">{reason.number}</span> {reason.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Return original content for desktop
  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="text-center text-white">
        <p className="text-2xl">About page content is now part of the main page flow</p>
      </div>
    </div>
  );
};

export default About;
