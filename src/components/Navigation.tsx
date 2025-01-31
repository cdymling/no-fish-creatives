import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <div className="flex justify-between items-center text-white">
        <Link to="/" className="text-xl font-bold">
          no fish creatives
        </Link>
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