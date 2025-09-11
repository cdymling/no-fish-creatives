
import React, { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { FloatingText } from '../components/FloatingText';
import { BubbleDot } from '../components/BubbleDot';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const isMobile = useIsMobile();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Direct video sources without state management
  const videoSrc = isMobile ? "/home-background-mobile.mp4" : "/home-background.mp4";

  useEffect(() => {
    // Function to handle video loading events
    const handleVideoEvent = (event: string) => {
      console.log(`Video ${event} event fired`);
      setVideoLoaded(true);
      setIsLoading(false);
    };

    const videoElement = videoRef.current;
    
    if (videoElement) {
      // Safari specific fix: force reload the video
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      
      if (isSafari) {
        console.log("Safari detected, applying special video handling");
        
        // Force load the video element
        videoElement.load();
        
        // Set a timeout to check if video is ready
        setTimeout(() => {
          if (videoElement.readyState >= 2) {
            handleVideoEvent('canplay (timeout)');
          } else {
            // If still not ready, try to reload
            videoElement.src = videoSrc;
            videoElement.load();
          }
        }, 1000);
      }
      
      // Add multiple event listeners to catch as soon as possible when video is ready
      videoElement.addEventListener('loadeddata', () => handleVideoEvent('loadeddata'));
      videoElement.addEventListener('canplay', () => handleVideoEvent('canplay'));
      videoElement.addEventListener('playing', () => handleVideoEvent('playing'));
      
      // In case video is already cached and ready
      if (videoElement.readyState >= 3) {
        handleVideoEvent('already loaded');
      }
    }
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadeddata', () => handleVideoEvent('loadeddata'));
        videoElement.removeEventListener('canplay', () => handleVideoEvent('canplay'));
        videoElement.removeEventListener('playing', () => handleVideoEvent('playing'));
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
          ref={videoRef}
          id="home-background-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={`absolute min-w-full min-h-full object-cover ${videoPosition} transition-opacity duration-500 ${!videoLoaded ? 'opacity-0' : 'opacity-100'}`}
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
        <FloatingText className="font-clash text-white text-[7.5rem] font-bold leading-none safari-text-fix animate-underwater-wave">
          <span className="inline-block animate-letter-wave-1">n</span>
          <span className="inline-block animate-letter-wave-2">o</span>
          <span className="inline-block animate-letter-wave-3 mr-8"> </span>
          <span className="inline-block animate-letter-wave-4">f</span>
           <span className="inline-block animate-letter-wave-5">i</span>
          <span className="inline-block animate-letter-wave-6">s</span>
          <span className="inline-block animate-letter-wave-1">h</span>
        </FloatingText>
      </div>
    </div>
  );
};

export default Home;
