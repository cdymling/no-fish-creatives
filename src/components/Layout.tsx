
import { ReactNode } from 'react';
import Navigation from './Navigation';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const isProtectedVideosPage = location.pathname === '/protected-videos';
  const isStandalonePage = location.pathname === '/work';
  
  return (
    <div className={`min-h-screen ${isProtectedVideosPage ? 'bg-[#FEC6A1]' : ''}`}>
      <Navigation />
      <main className={`${isProtectedVideosPage || isStandalonePage ? 'h-full overflow-auto' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
