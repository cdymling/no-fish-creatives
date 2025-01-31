import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-sm' : ''}`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <span className={`font-clash font-bold text-xl text-white transition-opacity duration-300`}>
          no fish creatives
        </span>
        
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white p-2 hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="absolute right-6 top-16 w-48 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg p-4">
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-primary transition-colors text-left"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('intro')}
              className="text-white hover:text-primary transition-colors text-left"
            >
              Intro
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-primary transition-colors text-left"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('work')}
              className="text-white hover:text-primary transition-colors text-left"
            >
              Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-primary transition-colors text-left"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;