
import { ReactNode, useState, useEffect } from 'react';
import Navigation from './Navigation';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const isProtectedVideosPage = location.pathname === '/protected-videos';
  const [isTransitioning, setIsTransitioning] = useState(true);
  
  useEffect(() => {
    // Apply a small delay before removing transition state
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ease-in-out ${
      isProtectedVideosPage ? 'bg-[#FEC6A1]' : ''
    } ${isTransitioning ? 'opacity-95' : 'opacity-100'}`}>
      <Navigation />
      <main className={isProtectedVideosPage ? 'h-full' : ''}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
