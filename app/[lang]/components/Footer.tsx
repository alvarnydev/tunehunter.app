'use client';

import { useEffect } from 'react';
import { themeChange } from 'theme-change';
import ThemeSelector from './Footer/ThemeSelector';
import LanguageSelector from './Footer/LanguageSelector';
import GithubLinker from './Footer/GithubLinker';
import { LangType } from '../../../i18n-config';

const Footer = ({ lang }: { lang: LangType }) => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <footer className='w-full grid grid-cols-3 md:py-3 py-1 bg-base-300'>
      <ThemeSelector />
      <GithubLinker />
      <LanguageSelector lang={lang} />
    </footer>
  );
};

export default Footer;
