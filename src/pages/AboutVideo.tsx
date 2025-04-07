
import React from 'react';
import VideoBackground from '../components/VideoBackground';

const AboutVideo = () => {
  console.log("AboutVideo component rendering");
  return <VideoBackground videoId="about-background-video" videoSource="/about_background.mp4" />;
};

export default AboutVideo;
