import { PropsWithChildren } from 'react';
import Footer from './Footer';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className='h-screen flex flex-col justify-between items-center overflow-hidden'>
        <main className='flex-1 flex flex-col justify-center w-4/5 max-w-5xl'>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
