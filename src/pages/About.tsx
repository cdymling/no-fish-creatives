
import React from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const About = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen relative bg-[#FEC6A1]">
      <section className={`px-6 min-h-screen flex ${isMobile ? 'items-start pt-[5vh] justify-center text-center' : 'items-center'}`}>
        <div className="py-8 max-w-3xl">
          <h2 className="font-clash text-lg md:text-xl font-bold mb-2 text-foreground">We make it easier to buy creative advertising. Here's how:</h2>
          
          <ol className={`font-space list-decimal ${isMobile ? 'pl-0' : 'pl-5'} space-y-3 mb-6`}>
            <li className="text-base text-foreground">
              By letting you work directly with senior creatives. The kind you'd normally find at a big, highly awarded creative agency. Just without all the layers of people, processes and up-selling that usually comes with.
            </li>
            <li className="text-base text-foreground">
              By being smart about production. When it makes sense, we handle it ourselves, using AI or taking on tasks like directing and editing.
            </li>
            <li className="text-base text-foreground">
              By collaborating with a trusted network of specialists in strategy, design and production when your task demands it. That way you only pay for what you need, when you need it.
            </li>
          </ol>

          <p className="font-space text-base -mt-2 mb-4 text-foreground">
            This means you don't need a big agency to do big things. With a small, AI-positive, senior team, you can get more done than you'd think. Faster, smoother and for less.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
