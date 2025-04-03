
import React from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Work = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const handleNavigateToProtectedVideos = () => {
    console.log('Navigating to /protected-videos');
    navigate('/protected-videos');
  };
  
  return (
    <div className="min-h-screen relative bg-[#FEC6A1]">
      <section className={`px-6 min-h-screen flex ${isMobile ? 'items-start pt-[10vh]' : 'items-center'}`}>
        <div className="py-8">
          <h2 className="text-lg md:text-xl font-bold mb-1 text-foreground">Our work:</h2>
          <p className="text-base max-w-2xl mb-6 text-foreground">
            We and our current clients are soon ready to show what we've been working on. In the meantime, know that the work we'll be doing is backed by years of experience as award-winning creatives, developing ideas and campaigns for some of Sweden's biggest brands across all kinds of channels, formats and industries.
          </p>
          
          <p className="text-base max-w-2xl mb-6 text-foreground">
            Curious about what's possible with AI? Have a look at some demos we've developed for clients here:
          </p>
          
          <div className="mt-8">
            <Button 
              variant="ghost" 
              className="text-foreground/60 hover:text-foreground/80 border-foreground/20 hover:border-foreground/40"
              onClick={handleNavigateToProtectedVideos}
            >
              AI Demos
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
