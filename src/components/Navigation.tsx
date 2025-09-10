
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
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
    console.log('Attempting to scroll to section:', id);
    if (location.pathname !== '/') {
      // First navigate to home page
      navigate('/', { replace: true });
      // We need a longer timeout to ensure the navigation completes
      setTimeout(() => {
        const element = document.getElementById(id);
        console.log('Element found after navigation:', element);
        if (element) {
          // Get the parent container with snap-scroll
          const snapContainer = document.querySelector('.snap-y');
          if (snapContainer) {
            snapContainer.scrollTo({
              top: element.offsetTop,
              behavior: 'smooth'
            });
          } else {
            // Fallback to regular scroll
            window.scrollTo({
              top: element.offsetTop,
              behavior: 'smooth'
            });
          }
        }
      }, 500); // Increased timeout for Safari
    } else {
      const element = document.getElementById(id);
      console.log('Element found:', element);
      if (element) {
        // Get the parent container with snap-scroll
        const snapContainer = document.querySelector('.snap-y');
        if (snapContainer) {
          snapContainer.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
          });
        } else {
          // Fallback to regular scroll
          window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
          });
        }
      }
    }
    setIsMenuOpen(false);
  };

  if (isProtectedVideosPage) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[999]">
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        } bg-background/80 backdrop-blur-sm border-b border-border/50`}
      />
      
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
              onClick={() => scrollToSection('clients-title')}
              className="text-foreground hover:text-primary transition-colors text-left"
            >
              Clients
            </button>
            <button 
              onClick={() => scrollToSection('contact-title')}
              className="text-foreground hover:text-primary transition-colors text-left"
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
