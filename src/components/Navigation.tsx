import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'No Fish' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          No Fish
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-accent rounded-full transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-sm">
          <div className="flex flex-col space-y-4 p-6">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-lg hover:text-primary transition-colors ${
                  location.pathname === link.href ? 'text-primary' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;