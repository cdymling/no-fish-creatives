
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

// The password is hardcoded here - in a real app you'd want to use a more secure approach
const CORRECT_PASSWORD = 'nofish2024';

const ProtectedVideos = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  // Default videos
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

  const [videos, setVideos] = useState(defaultVideos);

  // Check if they're already authenticated
  useEffect(() => {
    const auth = localStorage.getItem('nofish_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    
    // Try to load videos from localStorage
    const savedVideos = localStorage.getItem('nofish_videos');
    if (savedVideos) {
      try {
        setVideos(JSON.parse(savedVideos));
      } catch (e) {
        console.error('Error loading saved videos', e);
      }
    }
  }, []);

  // Save videos to localStorage when they change
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
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('nofish_auth');
    navigate('/work');
  };

  return (
    <div className="min-h-screen relative bg-[#33C3F0]">
      <section className={`px-6 min-h-screen flex ${isMobile ? 'items-start pt-[10vh]' : 'items-center'}`}>
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
                    <h3 className="text-base font-medium mb-2 text-foreground">{video.title}</h3>
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <video 
                        controls 
                        className="w-full h-full object-cover"
                      >
                        <source src={video.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
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
