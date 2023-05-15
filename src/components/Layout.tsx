import { PropsWithChildren } from 'react';
import Footer from './Footer';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='min-h-screen flex flex-col justify-between items-center overflow-hidden'>
      <main className='flex-1 flex flex-col justify-evenly w-4/5 max-w-5xl md:gap-4 gap-10 py-10'>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
