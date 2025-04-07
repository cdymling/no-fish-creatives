
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
  
  useEffect(() => {
    const auth = localStorage.getItem('nofish_auth');
    if (auth === 'true') {
      navigate('/protected-videos');
    }
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
    <div className="min-h-screen bg-black">
      {/* First section with heading and description */}
      <section className="h-screen w-full flex flex-col justify-start pt-12 px-6 snap-start">
        <div className="w-full max-w-3xl">
          <h1 className="font-clash text-white text-[3.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[12rem] font-bold leading-[1.1] text-left">
            <span className="block">Hold tight</span>
            <span className="block">while we get</span>
            <span className="block">this show <span className="text-[#5CE1E6]">on</span></span>
            <span className="block text-[#5CE1E6]">the road.</span>
          </h1>
          
          <p className="font-space text-white text-xl md:text-2xl leading-tight mt-8 mb-4">
            We and our current clients are soon ready to show what we've been working on. In the meantime, know that the work we'll be doing is backed by years of experience as award-winning creatives, developing ideas and campaigns for some of Sweden's biggest brands across all kinds of channels, formats and industries.
          </p>
          
          <p className="font-space text-white text-xl md:text-2xl leading-tight mb-10">
            Curious about us or what's possible with AI? Email us at hello@nofish.se.
          </p>
          
          <form onSubmit={handlePasswordSubmit} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 max-w-md">
            <div className="flex-1">
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="bg-white/20 text-white placeholder:text-white/50 border-none focus-visible:ring-white/30"
              />
            </div>
            
            <Button 
              type="submit" 
              className="bg-[#FEC6A1] text-black hover:bg-[#FEC6A1]/80 transition-colors"
            >
              Submit
            </Button>
          </form>
          
          {error && <p className="font-space text-red-400 mt-2">{error}</p>}
        </div>
      </section>
    </div>
  );
};

export default Work;

