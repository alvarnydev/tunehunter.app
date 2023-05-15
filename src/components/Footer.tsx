import { useEffect } from 'react';
import { themeChange } from 'theme-change';
import ThemeSelector from './Footer/ThemeSelector';
import LanguageSelector from './Footer/LanguageSelector';
import GithubLinker from './Footer/GithubLinker';

const Footer = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <footer className='w-full grid grid-cols-3 md:py-3 py-1 bg-base-300'>
      <ThemeSelector />
      <GithubLinker />
      <LanguageSelector />
    </footer>
  );
};

export default Footer;
