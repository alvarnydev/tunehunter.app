import { PropsWithChildren } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Footer from '@/components/organisms/Footer';
import { useTheme } from '@/contexts/theme';
import Particles from '@/components/atoms/Particles';
import Header from '../atoms/Header';
import InfoBanner from '../atoms/InfoBanner';

const Layout = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();

  return (
    <div className='min-h-screen flex flex-col justify-between items-center overflow-hidden rotate-0'>
      {theme === 'synthwave' && <Particles className='absolute inset-0 -z-10 animate-fade-in' quantity={100} />}
      <InfoBanner className='w-full' message='Work in Progress ' />
      <main className='relative flex-1 flex flex-col justify-center items-center w-full max-w-5xl py-16 gap-10'>
        <Header />
        {children}
        <SpeedInsights />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
