
import React, { useState, useEffect } from 'react';

interface VideoBackgroundProps {
  videoId: string;
  videoSource: string;
}

const VideoBackground = ({ videoId, videoSource }: VideoBackgroundProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(`${videoId} component mounted`);
    
    // Try to get the video element
    const videoElement = document.getElementById(videoId) as HTMLVideoElement;
    
    if (!videoElement) {
      console.error(`${videoId} - Video element not found`);
      return;
    }
    
    console.log(`${videoId} - Video element found, initial readyState:`, videoElement.readyState);
    
    const handleVideoLoad = () => {
      console.log(`${videoId} - Video loaded successfully`);
      setIsLoading(false);
    };
    
    const handleVideoError = (e: Event) => {
      console.error(`${videoId} - Error loading video:`, e);
      // Set loading to false to remove loading overlay even if there's an error
      setIsLoading(false);
    };
    
    // Check if video is already loaded
    if (videoElement.readyState >= 3) {
      console.log(`${videoId} - Video already loaded (readyState >= 3)`);
      handleVideoLoad();
    }
    
    // Add event listeners
    videoElement.addEventListener('canplay', handleVideoLoad);
    videoElement.addEventListener('loadeddata', handleVideoLoad);
    videoElement.addEventListener('error', handleVideoError);
    
    // Force the video to load
    videoElement.load();
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('canplay', handleVideoLoad);
        videoElement.removeEventListener('loadeddata', handleVideoLoad);
        videoElement.removeEventListener('error', handleVideoError);
      }
    };
  }, [videoId, videoSource]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Loading overlay */}
      <div 
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-1000 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      />

      {/* Background Video */}
      <div className="fixed inset-0 w-full h-full overflow-hidden">
        <video
          id={videoId}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute min-w-full min-h-full object-cover md:object-center object-[70%_center] transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          style={{ zIndex: -10 }}
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoBackground;
