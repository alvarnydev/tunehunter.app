import { PropsWithChildren } from 'react';
import Footer from './Footer';
import Particles from './utils/Particles';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='min-h-screen flex flex-col justify-between items-center overflow-hidden rotate-0'>
      {/* <Header here /> */}
      <Particles className='absolute inset-0 -z-10 animate-fade-in' quantity={100} />
      <main className='relative flex-1 flex flex-col justify-center items-center w-full max-w-5xl py-16 gap-10'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
