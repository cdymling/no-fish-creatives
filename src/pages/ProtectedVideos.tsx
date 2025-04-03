
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// The password is hardcoded here - in a real app you'd want to use a more secure approach
const CORRECT_PASSWORD = 'nofish2024';

const ProtectedVideos = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [videos, setVideos] = useState<{id: number, title: string, description: string, url: string}[]>([
    {id: 1, title: 'Campaign Video 1', description: 'Description of the first campaign video.', url: ''},
    {id: 2, title: 'Campaign Video 2', description: 'Description of the second campaign video.', url: ''}
  ]);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null);

  // Check if they're already authenticated
  useEffect(() => {
    const auth = localStorage.getItem('nofish_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('nofish_auth', 'true');
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('nofish_auth');
    navigate('/work');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, videoId: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideos(prevVideos => 
        prevVideos.map(video => 
          video.id === videoId ? {...video, url: videoUrl} : video
        )
      );
    }
  };

  const handleUpdateVideoDetails = () => {
    if (selectedVideoId && videoTitle.trim() && videoDescription.trim()) {
      setVideos(prevVideos => 
        prevVideos.map(video => 
          video.id === selectedVideoId 
            ? {...video, title: videoTitle, description: videoDescription} 
            : video
        )
      );
      setSelectedVideoId(null);
      setVideoTitle('');
      setVideoDescription('');
    }
  };

  const openEditDialog = (video: {id: number, title: string, description: string}) => {
    setSelectedVideoId(video.id);
    setVideoTitle(video.title);
    setVideoDescription(video.description);
  };

  return (
    <div className="min-h-screen relative bg-[#33C3F0]">
      <section className={`px-6 min-h-screen flex ${isMobile ? 'items-start pt-[10vh]' : 'items-center'}`}>
        <div className="py-8 w-full max-w-3xl mx-auto">
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
                  className="w-full bg-foreground text-[#33C3F0] hover:bg-foreground/80"
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
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg md:text-xl font-bold text-foreground">Client Videos</h2>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="border-foreground text-foreground hover:bg-foreground hover:text-[#33C3F0]"
                >
                  Logout
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map(video => (
                  <div key={video.id} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-medium text-foreground">{video.title}</h3>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-foreground text-foreground hover:bg-foreground hover:text-[#33C3F0]"
                            onClick={() => openEditDialog(video)}
                          >
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#33C3F0] border-foreground">
                          <DialogHeader>
                            <DialogTitle className="text-foreground">Edit Video Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="title" className="text-foreground">Title</Label>
                              <Input 
                                id="title"
                                value={videoTitle} 
                                onChange={(e) => setVideoTitle(e.target.value)}
                                className="bg-white/20 text-foreground"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="description" className="text-foreground">Description</Label>
                              <Input 
                                id="description"
                                value={videoDescription} 
                                onChange={(e) => setVideoDescription(e.target.value)}
                                className="bg-white/20 text-foreground"
                              />
                            </div>
                            <Button 
                              onClick={handleUpdateVideoDetails}
                              className="w-full bg-foreground text-[#33C3F0] hover:bg-foreground/80"
                            >
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    {video.url ? (
                      <div className="aspect-video bg-black rounded-lg overflow-hidden">
                        <video 
                          src={video.url} 
                          controls 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-black/20 rounded-lg flex flex-col items-center justify-center">
                        <p className="text-foreground/70 mb-2">Upload your video</p>
                        <Label 
                          htmlFor={`video-upload-${video.id}`} 
                          className="cursor-pointer bg-foreground text-[#33C3F0] px-4 py-2 rounded-md hover:bg-foreground/80"
                        >
                          Choose File
                        </Label>
                        <Input 
                          id={`video-upload-${video.id}`}
                          type="file" 
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, video.id)}
                        />
                      </div>
                    )}
                    
                    <p className="mt-2 text-sm text-foreground/80">
                      {video.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProtectedVideos;
