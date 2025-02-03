import { ReactNode } from 'react';
import Navigation from './Navigation';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;