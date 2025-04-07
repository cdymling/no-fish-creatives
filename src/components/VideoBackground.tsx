
import React, { useState, useEffect } from 'react';

interface VideoBackgroundProps {
  videoId: string;
  videoSource: string;
}

const VideoBackground = ({ videoId, videoSource }: VideoBackgroundProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(`${videoId} component mounted`);
    const videoElement = document.getElementById(videoId) as HTMLVideoElement;
    
    const handleVideoLoad = () => {
      console.log(`${videoId} - Video loaded successfully`);
      setTimeout(() => {
        setIsLoading(false);
        console.log(`${videoId} - Loading state set to false`);
      }, 100);
    };
    
    if (videoElement) {
      console.log(`${videoId} - Video element found, current readyState:`, videoElement.readyState);
      videoElement.addEventListener('loadeddata', handleVideoLoad);
      
      if (videoElement.readyState >= 3) {
        console.log(`${videoId} - Video already loaded (readyState >= 3)`);
        handleVideoLoad();
      }
      
      // Add error handling
      videoElement.addEventListener('error', (e) => {
        console.error(`${videoId} - Error loading video:`, e);
      });
    } else {
      console.error(`${videoId} - Video element not found`);
    }
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadeddata', handleVideoLoad);
      }
    };
  }, [videoId]);

  return (
    <div className="min-h-screen relative">
      {/* Loading overlay */}
      <div 
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-2000 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      />

      {/* Background Video */}
      <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
        <video
          id={videoId}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute min-w-full min-h-full object-cover md:object-center object-[70%_center] transition-opacity duration-2000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoBackground;
