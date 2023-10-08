import { useEffect } from 'react';
import { themeChange } from 'theme-change';
import ThemeSelector from './Footer/ThemeSelector';
import LanguageSelector from './Footer/LanguageSelector';
import ProfileButton from './Footer/ProfileButton';

const Footer = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <footer className='w-full grid grid-cols-3 md:py-3 py-1 bg-base-300'>
      <ThemeSelector />
      <ProfileButton />
      <LanguageSelector />
    </footer>
  );
};

export default Footer;
