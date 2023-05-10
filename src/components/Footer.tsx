import { BsGithub } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';
import { DE, ES, GB } from 'country-flag-icons/react/3x2';

const ThemeSelector = () => (
  <div className='flex justify-center items-center'>
    <select data-choose-theme className='select focus:outline-0 '>
      <option disabled selected>
        Themes
      </option>
      <option value='light'>Light</option>
      <option value='dark'>Dark</option>
      <option value='synthwave'>Synthwave</option>
      <option value='valentine'>Valentine</option>
    </select>
  </div>
);

const LanguageSelector = () => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'english');

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const lang = e.currentTarget.firstChild?.textContent;
    if (lang == null) return;

    localStorage.setItem('language', lang);
    setLanguage(lang);
  }

  return (
    <div className='dropdown dropdown-top flex justify-center items-center'>
      <label tabIndex={0} className='btn btn-primary m-1 border-0 bg-base-100 '>
        {language === 'english' && (
          <GB title='english' className='w-8 rounded pointer-events-none' />
        )}
        {language === 'german' && (
          <DE title='german' className='w-8 rounded  pointer-events-none' />
        )}
        {language === 'spanish' && (
          <ES title='spanish' className='w-8 rounded  pointer-events-none' />
        )}
      </label>
      <ul tabIndex={0} className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36'>
        <li>
          <a onClick={handleClick}>
            <GB title='english' className='w-8 rounded  pointer-events-none' /> English
          </a>
        </li>
        <li>
          <a onClick={handleClick}>
            <DE title='german' className='w-8 rounded pointer-events-none' /> German
          </a>
        </li>
        <li>
          <a onClick={handleClick}>
            <ES title='spanish' className='w-8 rounded pointer-events-none' /> Spanish
          </a>
        </li>
      </ul>
    </div>
  );
};

const Footer = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <footer className=' w-full grid grid-cols-3 py-3 bg-base-300'>
      <LanguageSelector />
      <div className='flex justify-center items-center'>
        <a href='https://github.com/alvarnydev/btt.com' target='_blank' className='btn'>
          <BsGithub size={28} />
        </a>
      </div>
      <ThemeSelector />
    </footer>
  );
};

export default Footer;
