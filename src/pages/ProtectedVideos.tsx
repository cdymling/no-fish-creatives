
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
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <h3 className="text-base font-medium mb-2 text-foreground">Campaign Video 1</h3>
                  <div className="aspect-video bg-black/20 rounded-lg flex items-center justify-center">
                    <p className="text-foreground/70">Video 1 placeholder - Add your video here</p>
                  </div>
                  <p className="mt-2 text-sm text-foreground/80">
                    Description of the first campaign video.
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <h3 className="text-base font-medium mb-2 text-foreground">Campaign Video 2</h3>
                  <div className="aspect-video bg-black/20 rounded-lg flex items-center justify-center">
                    <p className="text-foreground/70">Video 2 placeholder - Add your video here</p>
                  </div>
                  <p className="mt-2 text-sm text-foreground/80">
                    Description of the second campaign video.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProtectedVideos;
