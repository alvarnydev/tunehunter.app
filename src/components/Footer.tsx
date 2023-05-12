import { useEffect } from 'react';
import { themeChange } from 'theme-change';
import ThemeSelector from './ThemeSelector';
import LanguageSelector from './LanguageSelector';
import GithubLinker from './GithubLinker';

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
