import { BsGithub } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';
import { DE, ES, GB } from 'country-flag-icons/react/3x2';

const ThemeSelector = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'synthwave');

  function handleClick() {
    const newTheme = theme === 'synthwave' ? 'valentine' : 'synthwave';
    setTheme(newTheme);

    const body = document.body;
    body.setAttribute('data-theme', newTheme);

    localStorage.setItem('theme', newTheme);
  }

  return (
    <label className='swap swap-rotate'>
      <input type='checkbox' onClick={handleClick} />

      <svg
        className='swap-on fill-current w-9 h-9'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
      >
        <path d='M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z' />
      </svg>

      <svg
        className='swap-off fill-current w-9 h-9'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
      >
        <path d='M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z' />
      </svg>
    </label>
  );
};

const LanguageSelector = () => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'english');
  const [visible, setIsVisible] = useState(false);

  function handleOptionClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const lang = e.currentTarget.firstChild?.textContent;
    if (lang == null) return;

    localStorage.setItem('language', lang);
    setLanguage(lang);
    setIsVisible(false);
  }

  function handleMenuClick() {
    setIsVisible(!visible);
  }

  return (
    <div className='dropdown dropdown-top [@media(max-width:500px)]:dropdown-end flex justify-center items-center'>
      <label
        onClick={handleMenuClick}
        tabIndex={0}
        className='btn btn-ghost m-1 border-0 hover:bg-transparent'
      >
        {language === 'english' && (
          <GB title='english' className='w-10 rounded pointer-events-none' />
        )}
        {language === 'german' && (
          <DE title='german' className='w-10 rounded  pointer-events-none' />
        )}
        {language === 'spanish' && (
          <ES title='spanish' className='w-10 rounded  pointer-events-none' />
        )}
      </label>
      <ul
        tabIndex={0}
        className='dropdown-content menu p-2 bg-base-200 rounded-box w-36'
        style={{ visibility: visible ? 'visible' : 'hidden', opacity: visible ? '1' : '0' }}
      >
        <li>
          <a onClick={handleOptionClick}>
            <GB title='english' className='w-10 rounded pointer-events-none' /> English
          </a>
        </li>
        <li>
          <a onClick={handleOptionClick}>
            <DE title='german' className='w-10 rounded pointer-events-none' /> German
          </a>
        </li>
        <li>
          <a onClick={handleOptionClick}>
            <ES title='spanish' className='w-10 rounded pointer-events-none' /> Spanish
          </a>
        </li>
      </ul>
    </div>
  );
};

const GithubLinker = () => (
  <div className='flex justify-center items-center'>
    <a href='https://github.com/alvarnydev/btt.com' target='_blank' className='btn'>
      <BsGithub size={28} />
    </a>
  </div>
);

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
