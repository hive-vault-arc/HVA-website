import React from 'react';
import Navbar from './Navbar';
import SiteFooter from './SiteFooter';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <>
      <Navbar />
      <main className="min-h-[100dvh] w-full">
        {children}
      </main>
      <SiteFooter />
    </>
  );
};

export default Layout;
