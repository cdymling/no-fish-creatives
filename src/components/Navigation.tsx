import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

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

  return (
    <nav className={`fixed top-0 right-0 z-50 px-6 py-4 transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex justify-between items-center text-white">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white p-2 hover:text-primary transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="absolute right-0 top-16 w-48 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg p-4">
          <div className="flex flex-col space-y-2">
            <Link to="/intro" className="text-white hover:text-primary transition-colors">Intro</Link>
            <Link to="/about" className="text-white hover:text-primary transition-colors">About</Link>
            <Link to="/work" className="text-white hover:text-primary transition-colors">Work</Link>
            <Link to="/contact" className="text-white hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;