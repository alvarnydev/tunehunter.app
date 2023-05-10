import { BsGithub } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';
import { DE, ES, GB, US } from 'country-flag-icons/react/3x2';

const ThemeSelector = () => (
  <select data-choose-theme className='select'>
    <option disabled selected>
      Pick a theme
    </option>
    <option value='light'>Light</option>
    <option value='dark'>Dark</option>
    <option value='synthwave'>Synthwave</option>
    <option value='valentine'>Valentine</option>
  </select>
);

const LanguageSelector = () => {
  const [language, setLanguage] = useState('English');

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const lang = e.currentTarget.firstChild?.textContent;
    if (lang == null) return;

    setLanguage(lang);
  }

  return (
    <div className='dropdown dropdown-top'>
      <label tabIndex={0} className='btn m-1 border-0 bg-base-100 hover:bg-current'>
        {language === 'English' && <GB title='English' className='w-8 rounded' />}
        {language === 'German' && <DE title='German' className='w-8 rounded' />}
        {language === 'Spanish' && <ES title='Spanish' className='w-8 rounded' />}
      </label>
      <ul tabIndex={0} className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36'>
        <li>
          <a onClick={handleClick}>
            <GB title='English' className='w-8 rounded' /> English
          </a>
        </li>
        <li>
          <a onClick={handleClick}>
            <DE title='German' className='w-8 rounded' /> German
          </a>
        </li>
        <li>
          <a onClick={handleClick}>
            <ES title='Spanish' className='w-8 rounded' /> Spanish
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
    <footer className='absolute bottom-0 w-full flex justify-around py-5 bg-base-300'>
      <LanguageSelector />
      <a href='https://github.com/alvarnydev/btt.com' target='_blank' className='btn'>
        <BsGithub size={24} />
      </a>
      <ThemeSelector />
    </footer>
  );
};

export default Footer;
