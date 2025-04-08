
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const videoElement = document.getElementById('home-background-video') as HTMLVideoElement;
    
    const handleVideoLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    };
    
    if (videoElement) {
      videoElement.addEventListener('loadeddata', handleVideoLoad);
      
      if (videoElement.readyState >= 3) {
        handleVideoLoad();
      }
    }
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadeddata', handleVideoLoad);
      }
    };
  }, []);

  // Calculate video positioning - for mobile, move 5% to the left (from 70% to 65%)
  const videoPosition = isMobile ? 'object-[65%_center]' : 'object-[70%_center]';

  return (
    <div className="min-h-screen relative">
      {/* Svart bakgrund som visas under laddning */}
      <div 
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-2000 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      />

      {/* Background Video */}
      <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
        <video
          id="home-background-video"
          autoPlay
          loop
          muted
          playsInline
          className={`absolute min-w-full min-h-full object-cover md:object-center ${videoPosition} transition-opacity duration-2000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        >
          <source src="/home-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Logo and Tagline centered */}
      <div className={`flex flex-col items-center justify-center h-screen text-center transition-opacity duration-2000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <span className="font-clash text-white text-[7.5rem] font-bold leading-none">no fish</span>
        {/* Tagline removed as per user request */}
      </div>
    </div>
  );
};

export default Home;
