import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const year = new Date().getFullYear();
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-[80vh] max-w-5xl mx-auto px-4 bg-transparent">
        {children}
      </main>
      <footer className="footer-minimal">
        &copy; {year} DevCraft. All rights reserved.
      </footer>
    </>
  );
};

export default Layout;