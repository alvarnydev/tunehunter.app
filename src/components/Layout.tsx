import { PropsWithChildren } from 'react';
import Footer from './Footer';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className='h-screen flex flex-col justify-between items-center'>
        <main className='flex-1 flex items-center justify-center max-w-5xl px-5'>
          <div className=''>{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
