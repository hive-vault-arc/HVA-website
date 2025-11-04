import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <>
      <Navbar />
      <main className="min-h-screen w-screen mx-auto ">
        {children}
      </main>
    </>
  );
};

export default Layout;