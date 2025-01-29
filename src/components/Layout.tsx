import { ReactNode } from 'react';
import Navigation from './Navigation';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
};

export default Layout;