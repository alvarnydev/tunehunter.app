import { useState } from 'react';
import { DE, ES, GB } from 'country-flag-icons/react/3x2';
import { LangType } from '../../../../i18n-config';

const LanguageSelector = ({ lang }: { lang: LangType }) => {
  const [visible, setIsVisible] = useState(false);

  function handleOptionClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const currUrl = window.location.pathname;
    // let newUrl = window.location.pathname.replace(`/${lang}`, `/${code}`);
    // window.location.replace();
    console.log(window);

    setIsVisible(false);
  }

  // Show and hide the menu
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
        {lang === 'en' && <GB title='english' className='w-11 rounded pointer-events-none' />}
        {lang === 'de' && <DE title='german' className='w-11 rounded  pointer-events-none' />}
        {lang === 'es' && <ES title='spanish' className='w-11 rounded  pointer-events-none' />}
      </label>
      <ul
        tabIndex={0}
        className='dropdown-content menu p-2 bg-base-200 rounded-box w-42'
        style={{ visibility: visible ? 'visible' : 'hidden', opacity: visible ? '1' : '0' }}
      >
        <li>
          <a
            onClick={handleOptionClick}
            aria-label='Link to change the language of the site to English'
          >
            <GB title='english' className='w-8 rounded pointer-events-none' /> English
          </a>
        </li>
        <li>
          <a
            onClick={handleOptionClick}
            aria-label='Link to change the language of the site to German'
          >
            <DE title='german' className='w-8 rounded pointer-events-none' /> German
          </a>
        </li>
        <li>
          <a
            onClick={handleOptionClick}
            aria-label='Link to change the language of the site to Spanish'
          >
            <ES title='spanish' className='w-8 rounded pointer-events-none' /> Spanish
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LanguageSelector;
