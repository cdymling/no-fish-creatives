
import { useState, useEffect } from 'react';
import { Menu, ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we're on the protected videos page
  const isProtectedVideosPage = location.pathname === '/protected-videos';
  
  console.log("Current location pathname:", location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
      
      // Find which section is currently in view
      const sections = ['home', 'about-title', 'about-video', 'services-title', 'services-video', 'work-title', 'work-video'];
      
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    console.log("Attempting to scroll to section:", id);
    // Navigate to homepage first if not already there
    if (location.pathname !== '/') {
      navigate('/');
      // Use setTimeout to allow navigation to complete before trying to scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          console.log("Scrolled to element:", id);
        } else {
          console.error("Element not found:", id);
        }
      }, 100);
    } else {
      // If already on homepage, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        console.log("Scrolled to element:", id);
      } else {
        console.error("Element not found:", id);
      }
    }
    setIsMenuOpen(false);
  };

  // Hide navigation on protected videos page
  if (isProtectedVideosPage) {
    return <></>;
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
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-foreground p-2 hover:text-primary transition-colors"
            aria-label="Go to home"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
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
              className={`transition-colors text-left ${activeSection === 'home' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about-title')}
              className={`transition-colors text-left ${activeSection === 'about-title' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('about-video')}
              className={`transition-colors text-left ${activeSection === 'about-video' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
            >
              About Video
            </button>
            <button 
              onClick={() => scrollToSection('services-title')}
              className={`transition-colors text-left ${activeSection === 'services-title' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('services-video')}
              className={`transition-colors text-left ${activeSection === 'services-video' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
            >
              Services Video
            </button>
            <button 
              onClick={() => scrollToSection('work-title')}
              className={`transition-colors text-left ${activeSection === 'work-title' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
            >
              Work
            </button>
            <button 
              onClick={() => scrollToSection('work-video')}
              className={`transition-colors text-left ${activeSection === 'work-video' ? 'text-[#3B82F6] hover:text-[#60a5fa]' : 'text-foreground hover:text-primary'}`}
            >
              Work Video
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
