import { PropsWithChildren } from 'react';
import Footer from './Footer';
import Particles from './utils/Particles';
import { useTheme } from '../contexts/theme';
import { SpeedInsights } from '@vercel/speed-insights/react';

const Layout = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();

  return (
    <div className='min-h-screen flex flex-col justify-between items-center overflow-hidden rotate-0'>
      {/* <Header here /> */}
      {theme === 'synthwave' && <Particles className='absolute inset-0 -z-10 animate-fade-in' quantity={100} />}
      <main className='relative flex-1 flex flex-col justify-center items-center w-full max-w-5xl py-16 gap-10'>
        {children}
        <SpeedInsights />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
