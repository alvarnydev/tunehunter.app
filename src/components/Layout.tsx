import { PropsWithChildren } from 'react';
import Footer from './Footer';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
