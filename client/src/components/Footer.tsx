import { useEffect } from 'react';
import { themeChange } from 'theme-change';
import { useWindowSize } from '@uidotdev/usehooks';
import { BiSearch } from 'react-icons/bi';
import { SlSocialSpotify } from 'react-icons/sl';
import ThemeSelector from '@/components/Footer/ThemeSelector';
import LanguageSelector from '@/components/Footer/LanguageSelector';
import Profile from '@/components/Footer/Profile';
import { useAuth } from '@/contexts/auth';

const Footer = () => {
  const size = useWindowSize();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    themeChange(false);
  }, []);

  if (size.width! > 768) {
    return (
      <footer className='w-full grid grid-cols-3 md:py-3 py-2 bg-base-300'>
        <ThemeSelector />
        <Profile />
        <LanguageSelector />
      </footer>
    );
  }

  return (
    <div className='btm-nav bg-base-300'>
      <div className='flex-none'>
        <button className='btn btn-square btn-ghost'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-5 h-5 stroke-current'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
          </svg>
        </button>
      </div>
      <button className='text-base-content '>
        <BiSearch size={30} />
      </button>
      <button className={`text-base-content ${isAuthenticated ? '' : 'disabled'}`}>
        <SlSocialSpotify size={28} />
      </button>
      <button className='text-base-content active'>
        <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.3'
            d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
          />
        </svg>
      </button>
    </div>
  );
};

export default Footer;

// const TabPicker = () => {
//   if (size.width! < 768) {
//     if (displayMode === 'both') setDisplayMode('search');
//   } else {
//     setDisplayMode('both');
//   }
// };
