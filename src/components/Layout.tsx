import { PropsWithChildren } from 'react';
import Footer from './Footer';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main className='flex items-center justify-center h-screen'>
        <div className=''>{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
