import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full">
        {children}
      </main>
    </>
  );
};

export default Layout;