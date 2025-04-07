
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const CORRECT_PASSWORD = 'nofish2024';

const Work = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
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
    <div className="w-full">
      <form onSubmit={handlePasswordSubmit} className="w-full">
        <div className="flex flex-col sm:flex-row gap-2 max-w-md w-full mb-2">
          <div className="flex-1">
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="bg-white/20 text-white placeholder:text-white/50 border-none focus-visible:ring-white/30 w-full"
            />
          </div>
          
          <Button 
            type="submit" 
            className="bg-[#5CE1E6] text-black hover:bg-[#5CE1E6]/80 transition-colors"
          >
            Submit
          </Button>
        </div>
        
        {error && <p className="font-space text-red-400 text-sm w-full">{error}</p>}
      </form>
    </div>
  );
};

export default Work;
