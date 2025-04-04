
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
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const auth = localStorage.getItem('nofish_auth');
    if (auth !== 'true') {
      navigate('/work');
      return;
    }
    
    const savedVideos = localStorage.getItem('nofish_videos');
    if (savedVideos) {
      try {
        setVideos(JSON.parse(savedVideos));
      } catch (e) {
        console.error('Error loading saved videos', e);
      }
    }
    
    fetchVideosFromGitHub();
    
    return () => {
      localStorage.removeItem('nofish_auth');
    };
  }, [navigate]);

  useEffect(() => {
    if (videos !== defaultVideos) {
      localStorage.setItem('nofish_videos', JSON.stringify(videos));
    }
  }, [videos]);

  const handleGoBack = () => {
    localStorage.removeItem('nofish_auth');
    navigate('/', { replace: true });
    setTimeout(() => {
      const workSection = document.getElementById('work');
      if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#FEC6A1] overflow-hidden relative isolate">
      <div className="absolute inset-0 -z-10 bg-[#FEC6A1]"></div>
      
      <div className="absolute top-4 left-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleGoBack}
          className="text-foreground hover:bg-foreground/10 p-2"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> 
          <span className="text-sm font-space">Back</span>
        </Button>
      </div>

      <section className={`px-6 min-h-screen flex ${isMobile ? 'items-start pt-[5vh]' : 'items-start pt-[5vh]'}`}>
        <div className="py-4 w-full max-w-5xl mx-auto">
          <div className="flex flex-col space-y-8">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg md:text-xl font-bold text-foreground font-clash">AI-powered Demos</h2>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center my-8">
                  <div className="text-foreground font-space">Loading videos from GitHub...</div>
                </div>
              ) : videos.length === 0 ? (
                <div className="backdrop-blur-sm p-6 rounded-xl">
                  <p className="text-foreground font-space">No videos found in the repository.</p>
                </div>
              ) : (
                <div className="flex flex-col space-y-12">
                  {videos.length > 0 && (
                    <div className="max-w-[290px] ml-0">
                      <h3 className="text-base font-medium mb-2 text-foreground font-clash">{videos[0].title}</h3>
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
                      <p className="mt-2 text-sm text-foreground/80 font-space">
                        {videos[0].description}
                      </p>
                    </div>
                  )}

                  {videos.length > 1 && (
                    <div className="max-w-[290px] ml-0">
                      <h3 className="text-base font-medium mb-2 text-foreground font-clash">{videos[1].title}</h3>
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
                      <p className="mt-2 text-sm text-foreground/80 font-space">
                        {videos[1].description}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProtectedVideos;
