import { useState } from 'react';
import { Menu } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[999]">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm border-b border-border/50" />
      
      <div className="relative z-10 px-6 py-4">
        <div className="flex justify-end items-center max-w-7xl mx-auto">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-foreground p-2 hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="absolute right-6 top-16 w-48 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg p-4 z-20">
          <div className="flex flex-col space-y-4">
            <a 
              href="mailto:christoffer@nofish.se" 
              className="text-foreground hover:text-primary transition-colors text-left"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;