import { PropsWithChildren } from 'react';
import Footer from './Footer';
import { useAuth } from '../contexts/auth';

const Layout = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className='min-h-screen flex flex-col justify-between items-center overflow-hidden rotate-0'>
      {/* <Header /> */}
      <main className={`flex-1 flex flex-col justify-center items-center w-full max-w-5xl py-16 gap-16 ${isAuthenticated ? 'md:gap-[4.6vh]' : 'md:gap-[2.8vh]'}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
