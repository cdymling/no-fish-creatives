
import { ReactNode, useEffect } from 'react';
import Navigation from './Navigation';
import { useLocation, useNavigate } from 'react-router-dom';

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isProtectedVideosPage = location.pathname === '/protected-videos';
  
  // Check authentication for protected page
  useEffect(() => {
    if (isProtectedVideosPage) {
      const auth = localStorage.getItem('nofish_auth');
      if (auth !== 'true') {
        // Redirect to work page if not authenticated
        window.location.href = '/work';
      }
    }
  }, [isProtectedVideosPage]);
  
  return (
    <div className={`min-h-screen ${isProtectedVideosPage ? 'bg-black' : ''}`}>
      <Navigation />
      <main className={isProtectedVideosPage ? 'h-full' : ''}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
