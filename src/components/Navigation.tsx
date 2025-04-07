
import { useState, useEffect } from 'react';
import { Menu, ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we're on the protected videos page
  const isProtectedVideosPage = location.pathname === '/protected-videos';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // Navigate to homepage first if not already there
    if (location.pathname !== '/') {
      navigate('/');
      // Use setTimeout to allow navigation to complete before trying to scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If already on homepage, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  if (isProtectedVideosPage) {
    return (
      <header className="fixed top-0 left-0 right-0 z-[999]">
        <div className="relative z-10 px-6 py-4">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <button 
              onClick={() => navigate('/work')}
              className="text-black p-2 hover:text-gray-700 transition-colors flex items-center"
              aria-label="Back"
            >
              <ArrowLeft className="w-6 h-6 mr-2" />
              Back
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[999]">
      {/* Semi-transparent background that only appears when scrolled */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        } bg-background/80 backdrop-blur-sm border-b border-border/50`}
      />
      
      {/* Navigation content */}
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
      
      {/* Menu dropdown */}
      {isMenuOpen && (
        <div className="absolute right-6 top-16 w-48 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg p-4 z-20">
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-foreground hover:text-primary transition-colors text-left"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about-title')}
              className="text-foreground hover:text-primary transition-colors text-left"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services-title')}
              className="text-foreground hover:text-primary transition-colors text-left"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('work-title')}
              className="text-foreground hover:text-primary transition-colors text-left"
            >
              Work
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
