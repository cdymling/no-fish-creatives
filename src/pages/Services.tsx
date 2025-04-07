import React from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const Services = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black">
      {/* First Section */}
      <section className="h-screen w-full flex items-start justify-start px-6 py-6 snap-start">
        <div className="w-full">
          <h1 className="font-clash text-white text-[3.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[12rem] font-bold leading-[1.1] text-left">
            <span className="block">How we</span>
            <span className="block">might be of</span>
            <span className="block text-[#5CE1E6]">service:</span>
          </h1>
        </div>
      </section>

      {/* Second Section with service bullets */}
      <section className="h-screen w-full bg-black px-6 py-12 flex flex-col justify-start snap-start">
        <div className="space-y-16 max-w-5xl">
          <div>
            <p className="font-space text-white text-2xl md:text-3xl leading-tight">
              → Acting as a flexible creative partner to marketing departments and in-house agencies.
            </p>
          </div>
          
          <div>
            <p className="font-space text-white text-2xl md:text-3xl leading-tight">
              → Developing concepts, campaigns or just a single ad, and producing them when possible.
            </p>
          </div>
          
          <div>
            <p className="font-space text-white text-2xl md:text-3xl leading-tight">
              → Leading creatively from initial idea to final delivery.
            </p>
          </div>
          
          <div>
            <p className="font-space text-white text-2xl md:text-3xl leading-tight">
              → In a way you might have thought of that we haven't?
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
