import React, { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { AspectRatio } from '@/components/ui/aspect-ratio';

const CORRECT_PASSWORD = 'nofish2024';

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
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
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
    const handleBeforeUnload = () => {
      localStorage.removeItem('nofish_auth');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      localStorage.removeItem('nofish_auth');
    };
  }, []);

  useEffect(() => {
    const auth = localStorage.getItem('nofish_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      
      const savedVideos = localStorage.getItem('nofish_videos');
      if (savedVideos) {
        try {
          setVideos(JSON.parse(savedVideos));
        } catch (e) {
          console.error('Error loading saved videos', e);
        }
      }
      
      fetchVideosFromGitHub();
    }
  }, []);

  useEffect(() => {
    if (videos !== defaultVideos) {
      localStorage.setItem('nofish_videos', JSON.stringify(videos));
    }
  }, [videos]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('nofish_auth', 'true');
      setError('');
      
      fetchVideosFromGitHub();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen relative bg-[#FEC6A1]">
      <section className={`px-6 min-h-screen flex ${isMobile ? 'items-start pt-[10vh]' : 'items-start pt-[10vh]'}`}>
        <div className="py-8 w-full max-w-5xl mx-auto">
          {!isAuthenticated ? (
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h2 className="text-lg md:text-xl font-bold mb-4 text-foreground">Client Access</h2>
              <p className="mb-4 text-foreground">This content is password protected. Please enter the password to view.</p>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password"
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="bg-white/20 text-foreground placeholder:text-foreground/50"
                  />
                </div>
                
                {error && <p className="text-red-400">{error}</p>}
                
                <Button 
                  type="submit" 
                  className="w-full bg-foreground text-[#F97316] hover:bg-foreground/80"
                >
                  Submit
                </Button>
              </form>
              
              <div className="mt-4">
                <Button 
                  variant="ghost" 
                  className="text-foreground hover:text-foreground/80"
                  onClick={() => navigate('/work')}
                >
                  Back to Work
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-16">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg md:text-xl font-bold text-foreground">AI-powered Demos</h2>
                </div>
                
                {isLoading ? (
                  <div className="flex justify-center my-8">
                    <div className="text-foreground">Loading videos from GitHub...</div>
                  </div>
                ) : videos.length === 0 ? (
                  <div className="backdrop-blur-sm p-6 rounded-xl">
                    <p className="text-foreground">No videos found in the repository.</p>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-20">
                    {videos.length > 0 && (
                      <div className="max-w-[600px]">
                        <h3 className="text-base font-medium mb-2 text-foreground">{videos[0].title}</h3>
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
                        <p className="mt-2 text-sm text-foreground/80">
                          {videos[0].description}
                        </p>
                      </div>
                    )}

                    {videos.length > 1 && (
                      <div className="max-w-[600px]">
                        <h3 className="text-base font-medium mb-2 text-foreground">{videos[1].title}</h3>
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
                        <p className="mt-2 text-sm text-foreground/80">
                          {videos[1].description}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProtectedVideos;
