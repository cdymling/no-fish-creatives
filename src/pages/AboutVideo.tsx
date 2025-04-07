
import React, { useState, useEffect } from 'react';

const AboutVideo = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const videoElement = document.getElementById('about-background-video') as HTMLVideoElement;
    
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

  return (
    <div className="min-h-screen relative">
      {/* Loading overlay */}
      <div 
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-2000 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      />

      {/* Background Video */}
      <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
        <video
          id="about-background-video"
          autoPlay
          loop
          muted
          playsInline
          className={`absolute min-w-full min-h-full object-cover md:object-center object-[70%_center] transition-opacity duration-2000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        >
          <source src="/about_background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default AboutVideo;
