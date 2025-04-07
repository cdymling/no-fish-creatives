
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ArrowLeft } from 'lucide-react';

const GITHUB_OWNER = 'cdymling';
const GITHUB_REPO = 'no-fish-creatives';
const GITHUB_BRANCH = 'main';
const VIDEOS_PATH = 'videos';

interface Video {
  id: number;
  title: string;
  description: string;
  url: string;
}

const ProtectedVideos = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // Check authentication immediately
  const auth = localStorage.getItem('nofish_auth');
  if (auth !== 'true') {
    // If not authenticated, don't render anything and redirect
    window.location.href = '/work';
    return null;
  }

  const defaultVideos = [
    {
      id: 1,
      title: 'Campaign Video 1',
      description: 'Description of the first campaign video.',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    {
      id: 2,
      title: 'Campaign Video 2',
      description: 'Description of the second campaign video.',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    }
  ];

  const [videos, setVideos] = useState<Video[]>(defaultVideos);

  // Load videos from localStorage or fetch them
  useEffect(() => {
    // Load saved videos from localStorage if available
    const savedVideos = localStorage.getItem('nofish_videos');
    if (savedVideos) {
      try {
        setVideos(JSON.parse(savedVideos));
      } catch (e) {
        console.error('Error loading saved videos', e);
      }
    }
    
    // Fetch videos from GitHub
    fetchVideosFromGitHub();
  }, []);

  const fetchVideosFromGitHub = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${VIDEOS_PATH}?ref=${GITHUB_BRANCH}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch videos from GitHub');
      }
      
      const contents = await response.json();
      
      const videoMetadataFile = contents.find((file: any) => file.name === 'videos.json');
      
      if (videoMetadataFile) {
        const metadataResponse = await fetch(videoMetadataFile.download_url);
        if (metadataResponse.ok) {
          const videosData = await metadataResponse.json();
          
          const videosWithUrls = videosData.map((video: any) => {
            const videoFile = contents.find((file: any) => 
              file.name === video.filename
            );
            
            return {
              ...video,
              url: videoFile ? videoFile.download_url : ''
            };
          });
          
          setVideos(videosWithUrls);
          localStorage.setItem('nofish_videos', JSON.stringify(videosWithUrls));
          toast({
            title: "Videos loaded",
            description: "Successfully loaded videos from GitHub",
          });
        }
      } else {
        const videoFiles = contents.filter((file: any) => 
          file.name.endsWith('.mp4') || file.name.endsWith('.webm') || file.name.endsWith('.mov')
        );
        
        if (videoFiles.length > 0) {
          const newVideos = videoFiles.map((file: any, index: number) => ({
            id: index + 1,
            title: file.name.replace(/\.[^/.]+$/, ''),
            description: `Video loaded from GitHub: ${file.name}`,
            url: file.download_url
          }));
          
          setVideos(newVideos);
          localStorage.setItem('nofish_videos', JSON.stringify(newVideos));
          toast({
            title: "Videos loaded",
            description: `Found ${newVideos.length} videos on GitHub`,
          });
        } else {
          toast({
            title: "No videos found",
            description: "Could not find any videos in the GitHub repository",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error('Error loading videos from GitHub:', error);
      toast({
        title: "Error loading videos",
        description: "Failed to load videos from GitHub. Using default videos.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    localStorage.removeItem('nofish_auth');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative isolate">
      <div className="absolute top-4 left-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleGoBack}
          className="text-white hover:bg-white/10 p-2"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> 
          <span className="text-sm font-space">Back</span>
        </Button>
      </div>

      <section className="px-6 pt-16 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-clash text-white text-[3rem] md:text-[5rem] lg:text-[7rem] font-bold leading-[1.1] text-left mb-8">
            <span className="block">AI</span>
            <span className="block">demos</span>
          </h1>

          <div className="flex flex-col space-y-12 mt-12">
            {isLoading ? (
              <div className="flex justify-center my-8">
                <div className="text-white font-space">Loading videos from GitHub...</div>
              </div>
            ) : videos.length === 0 ? (
              <div className="backdrop-blur-sm p-6 rounded-xl">
                <p className="text-white font-space">No videos found in the repository.</p>
              </div>
            ) : (
              <div className="flex flex-col space-y-16">
                {videos.length > 0 && (
                  <div className="max-w-[290px] ml-0">
                    <h3 className="text-xl font-medium mb-3 text-white font-clash">{videos[0].title}</h3>
                    <div className="overflow-hidden">
                      <AspectRatio ratio={9/16}>
                        <video 
                          controls 
                          className="w-full h-full object-cover"
                        >
                          <source src={videos[0].url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </AspectRatio>
                    </div>
                    <p className="mt-3 text-white/80 font-space">
                      {videos[0].description}
                    </p>
                  </div>
                )}

                {videos.length > 1 && (
                  <div className="max-w-[290px] ml-0">
                    <h3 className="text-xl font-medium mb-3 text-white font-clash">{videos[1].title}</h3>
                    <div className="overflow-hidden">
                      <AspectRatio ratio={9/16}>
                        <video 
                          controls 
                          className="w-full h-full object-cover"
                        >
                          <source src={videos[1].url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </AspectRatio>
                    </div>
                    <p className="mt-3 text-white/80 font-space">
                      {videos[1].description}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProtectedVideos;
