
import React from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const Work = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen relative bg-[#FEC6A1]">
      <section className={`px-6 min-h-screen flex ${isMobile ? 'items-start pt-[10vh]' : 'items-center'}`}>
        <div className="py-8">
          <h2 className="text-lg md:text-xl font-bold mb-1 text-foreground">Our work:</h2>
          <p className="text-base max-w-2xl mb-6 text-foreground">
            Hold tight while we and our current clients get ready to show what we've been working on.
          </p>
          <p className="text-base max-w-2xl mb-6 text-foreground">
            In the meantime, know that the work we'll be doing is backed by years of experience as award-winning creatives, developing ideas and campaigns for some of Sweden's biggest brands across all kinds of channels, formats and industries.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Work;
