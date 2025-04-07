
import React from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const About = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="text-center text-white">
        <p className="text-2xl">About page content is now part of the main page flow</p>
      </div>
    </div>
  );
};

export default About;
