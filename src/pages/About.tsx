
import React from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const About = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black">
      {/* First Section */}
      <section className="h-screen w-full flex items-start justify-start px-6 py-6 snap-start">
        <div className="w-full">
          <h1 className="font-clash text-white text-[3.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[12rem] font-bold leading-[1.1] text-left">
            <span className="block">You don't</span>
            <span className="block">need a big</span>
            <span className="block">agency <span className="text-[#5CE1E6]">to do</span></span>
            <span className="text-[#5CE1E6]">big things.</span>
          </h1>
        </div>
      </section>

      {/* Second Section - Updated to match the image */}
      <section className="h-screen w-full bg-black px-6 py-12 flex flex-col justify-start snap-start">
        <h2 className="font-clash text-white text-4xl md:text-5xl font-bold mb-8">
          Here's why:
        </h2>
        
        <div className="space-y-12 max-w-5xl">
          <div>
            <p className="font-clash text-white text-3xl md:text-4xl leading-tight">
              <span className="text-[#5CE1E6] font-bold">#1</span> We let you work directly with senior creatives. The kind you'd normally find at a big, highly awarded creative agency. Just without all the layers of people, processes and up-selling that usually come with it.
            </p>
          </div>
          
          <div>
            <p className="font-clash text-white text-3xl md:text-4xl leading-tight">
              <span className="text-[#5CE1E6] font-bold">#2</span> We're smart about production. When it makes sense, we handle it ourselves, using AI or taking on tasks like directing and editing.
            </p>
          </div>
          
          <div>
            <p className="font-clash text-white text-3xl md:text-4xl leading-tight">
              <span className="text-[#5CE1E6] font-bold">#3</span> We collaborate with a network of specialists in strategy, design and production when your task demands it. That way, we minimize overlapping roles and processes and make sure you only pay for what you need, when you need it.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

