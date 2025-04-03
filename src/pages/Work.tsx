
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const CORRECT_PASSWORD = 'nofish2024';

const Work = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [contentVisible, setContentVisible] = useState(false);
  
  useEffect(() => {
    // Set initial black background
    document.body.style.backgroundColor = 'black';
    
    // Check authentication
    const auth = localStorage.getItem('nofish_auth');
    if (auth === 'true') {
      navigate('/protected-videos');
    }
    
    // Show content after a delay to simulate loading
    const timer = setTimeout(() => {
      setContentVisible(true);
    }, 300);
    
    // When component unmounts, reset body color
    return () => {
      document.body.style.backgroundColor = '';
      clearTimeout(timer);
    };
  }, [navigate]);
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      localStorage.setItem('nofish_auth', 'true');
      setError('');
      navigate('/protected-videos');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };
  
  return (
    <div 
      className={`min-h-screen relative bg-[#FEC6A1] transition-opacity duration-700 ease-in-out ${
        contentVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <section className={`px-6 min-h-screen flex ${isMobile ? 'items-start pt-[10vh]' : 'items-center'}`}>
        <div className="py-8">
          <h2 className="text-lg md:text-xl font-bold mb-1 text-foreground">Our work:</h2>
          <p className="text-base max-w-2xl mb-6 text-foreground">
            We and our current clients are soon ready to show what we've been working on. In the meantime, know that the work we'll be doing is backed by years of experience as award-winning creatives, developing ideas and campaigns for some of Sweden's biggest brands across all kinds of channels, formats and industries.
          </p>
          
          <p className="text-base max-w-2xl mb-6 text-foreground">
            Curious about what's possible with AI? Email hello@nofish.se to get access to some demos.
          </p>
          
          <form onSubmit={handlePasswordSubmit} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 max-w-md">
            <div className="flex-1">
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="bg-white/20 text-foreground placeholder:text-foreground/50"
              />
            </div>
            
            <Button 
              type="submit" 
              className="bg-white/10 backdrop-blur-sm text-foreground hover:bg-white/20 transition-colors"
            >
              Submit
            </Button>
          </form>
          
          {error && <p className="text-red-400 mt-2">{error}</p>}
        </div>
      </section>
    </div>
  );
};

export default Work;
