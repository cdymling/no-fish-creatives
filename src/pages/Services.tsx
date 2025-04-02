
import React from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const Services = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen relative bg-[#33C3F0]">
      <section className={`px-6 min-h-screen flex ${isMobile ? 'items-start pt-[20vh]' : 'items-center'}`}>
        <div className="py-8 max-w-3xl">
          <h2 className="text-lg md:text-xl font-bold mb-2 text-foreground">How we might be of service:</h2>
          
          <div className="space-y-4 max-w-2xl">
            <p className="text-base text-foreground">
              → Acting as a flexible creative partner to marketing departments and in-house agencies.
            </p>
            <p className="text-base text-foreground">
              → Developing concepts, campaigns or just a single ad, and producing them when possible.
            </p>
            <p className="text-base text-foreground">
              → Leading creatively from initial idea to final delivery.
            </p>
            <p className="text-base text-foreground">
              → In a way you might have thought of that we haven't?
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
