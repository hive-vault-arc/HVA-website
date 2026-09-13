import React from 'react';
import Navbar from './Navbar';
import SiteFooter from './SiteFooter';
import SiteMotion from './motion/SiteMotion';

interface LayoutProps {
  children: React.ReactNode;
  afterContent?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children, afterContent}) => {

  return (
    <>
      <Navbar />
      <SiteMotion>
        {children}
        {afterContent}
      </SiteMotion>
      <SiteFooter />
    </>
  );
};

export default Layout;
