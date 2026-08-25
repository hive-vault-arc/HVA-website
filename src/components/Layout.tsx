import React from 'react';
import Navbar from './Navbar';
import SiteFooter from './SiteFooter';
import SiteMotion from './motion/SiteMotion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <>
      <Navbar />
      <SiteMotion>{children}</SiteMotion>
      <SiteFooter />
    </>
  );
};

export default Layout;
