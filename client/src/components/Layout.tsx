import { PropsWithChildren } from 'react';
import Footer from './Footer';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='min-h-screen flex flex-col justify-between items-center overflow-hidden'>
      {/* <Header /> */}
      <main className='flex-1 flex flex-col justify-center items-center w-full max-w-5xl py-16 gap-16 md:gap-8'>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
