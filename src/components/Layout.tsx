import { ReactNode } from 'react';
import Navigation from './Navigation';

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen">
    <Navigation />
    <main>
      {children}
    </main>
  </div>
);

export default Layout;