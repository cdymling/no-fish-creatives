
import React from 'react';
import VideoBackground from '../components/VideoBackground';

const WorkVideo = () => {
  console.log("WorkVideo component rendering");
  return <VideoBackground videoId="work-background-video" videoSource="/work_background.mp4" />;
};

export default WorkVideo;
