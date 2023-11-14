import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DE, ES, GB } from 'country-flag-icons/react/3x2';

const LanguageSelector = () => {
  const [language, setLanguage] = useState('english');
  const [visible, setIsVisible] = useState(false);

  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  useEffect(() => {
    const languageStored = localStorage.getItem('language');
    if (languageStored) {
      setLanguage(languageStored);
    }
  }, []);

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
      <label onClick={handleMenuClick} tabIndex={0} className='btn btn-ghost grayscale-[20%] m-1 border-0 hover:bg-transparent'>
        {language === 'english' && <GB title='english' className='w-11 rounded pointer-events-none' />}
        {language === 'german' && <DE title='german' className='w-11 rounded  pointer-events-none' />}
        {language === 'spanish' && <ES title='spanish' className='w-11 rounded  pointer-events-none' />}
      </label>
      <ul tabIndex={0} className='dropdown-content menu p-2 bg-base-200 rounded-box w-42' style={{ visibility: visible ? 'visible' : 'hidden', opacity: visible ? '1' : '0' }}>
        <li>
          <a onClick={handleOptionClick} aria-label='Link to change the language of the site to English'>
            <GB title='english' className='w-8 rounded pointer-events-none' /> English
          </a>
        </li>
        <li>
          <a onClick={handleOptionClick} aria-label='Link to change the language of the site to German'>
            <DE title='german' className='w-8 rounded pointer-events-none' /> German
          </a>
        </li>
        <li>
          <a onClick={handleOptionClick} aria-label='Link to change the language of the site to Spanish'>
            <ES title='spanish' className='w-8 rounded pointer-events-none' /> Spanish
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LanguageSelector;
