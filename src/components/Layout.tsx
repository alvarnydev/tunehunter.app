import { PropsWithChildren } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <main>{children}</main> */}
      <Footer />
    </>
  );
};

export default Layout;
