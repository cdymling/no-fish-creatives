
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  
  // Direct video sources without state management
  const videoSrc = isMobile ? "/home-background-mobile.mp4" : "/home-background.mp4";

  useEffect(() => {
    // Preload video before displaying it
    const preloadVideo = () => {
      const videoPreload = document.createElement('video');
      videoPreload.src = videoSrc;
      videoPreload.preload = "auto";
      
      // Start loading actual player once preload starts
      const videoElement = document.getElementById('home-background-video') as HTMLVideoElement;
      if (videoElement) {
        videoElement.load();
      }
    };
    
    // Try to preload
    try {
      preloadVideo();
    } catch (e) {
      console.log("Video preloading failed, falling back to standard loading");
    }
    
    const videoElement = document.getElementById('home-background-video') as HTMLVideoElement;
    
    const handleVideoLoad = () => {
      // Reduce the delay before displaying video
      setTimeout(() => {
        setIsLoading(false);
      }, 50); // Reduced from 100 to 50ms for faster display
    };
    
    if (videoElement) {
      videoElement.addEventListener('loadeddata', handleVideoLoad);
      
      // Show the video as soon as enough data is available for playback
      videoElement.addEventListener('canplay', handleVideoLoad);
      
      // In case video is already cached or loaded quickly
      if (videoElement.readyState >= 3) {
        handleVideoLoad();
      }
    }
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadeddata', handleVideoLoad);
        videoElement.removeEventListener('canplay', handleVideoLoad);
      }
    };
  }, [videoSrc]);

  // Use default centered position for both mobile and desktop
  const videoPosition = 'object-center';

  return (
    <div className="min-h-screen relative">
      {/* Black background shown during loading */}
      <div 
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      />

      {/* Background Video */}
      <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
        <video
          id="home-background-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={`absolute min-w-full min-h-full object-cover ${videoPosition} transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          key={videoSrc} // Key based on source to force reload when source changes
        >
          <source 
            src={videoSrc}
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Logo and Tagline centered */}
      <div className={`flex flex-col items-center justify-center h-screen text-center transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <span className="font-clash text-white text-[7.5rem] font-bold leading-none safari-text-fix">no fish</span>
      </div>
    </div>
  );
};

export default Home;
