import { PropsWithChildren } from 'react';
import Footer from './Footer';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='min-h-screen flex flex-col justify-between items-center overflow-hidden'>
      <main className='flex-1 flex justify-center items-center w-full max-w-5xl py-16'>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
