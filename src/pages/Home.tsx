
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {
    // Set the appropriate video source based on device type
    setVideoSrc(isMobile ? "/home-background-mobile.mp4" : "/home-background.mp4");
  }, [isMobile]);

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

  // Use default centered position for both mobile and desktop
  const videoPosition = 'object-center';

  return (
    <div className="min-h-screen relative">
      {/* Black background shown during loading */}
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
          className={`absolute min-w-full min-h-full object-cover ${videoPosition} transition-opacity duration-2000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          key={videoSrc} // Add key to force re-render when source changes
        >
          <source 
            src={videoSrc}
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Logo and Tagline centered */}
      <div className={`flex flex-col items-center justify-center h-screen text-center transition-opacity duration-2000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <span className="font-clash text-white text-[7.5rem] font-bold leading-none">no fish</span>
      </div>
    </div>
  );
};

export default Home;
