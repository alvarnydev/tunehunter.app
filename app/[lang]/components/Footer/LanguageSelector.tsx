'use client';
import { useState } from 'react';
import { DE, ES, GB } from 'country-flag-icons/react/3x2';
import { LangType } from '../../../../i18n-config';
import Link from 'next/link';

const langData = [
  { short: 'en', long: 'English' },
  { short: 'de', long: 'German' },
  { short: 'es', long: 'Spanish' },
];

// URL is like this: https://buythattrack.com/en?artist=X&song=Y
// Now we want it to be like this: https://buythattrack.com/de?artist=X&song=Y
// window.location.protocol = https://
// window.location.host = buythattrack.com
// window.location.pathname = /en
// window.location.search = ?artist=X&song=Y
// window.location.hash = #hash
// --> Change the pathname
// window.location.origin = protocol + host = https://buythattrack.com
// window.location.href = origin + pathname + search + hash https://buythattrack.com/en?artist=X&song=Y#hash

const LanguageSelector = ({ lang }: { lang: LangType }) => {
  const [visible, setIsVisible] = useState(false);

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
        {langData.map((lang) => (
          <li key={lang.short}>
            <Link
              aria-label={`Link to change the language of the site to ${lang.short}`}
              href={`/${lang.short}`}
            >
              {lang.short === 'en' && (
                <GB title={lang.long} className='w-8 rounded pointer-events-none' />
              )}
              {lang.short === 'de' && (
                <DE title={lang.long} className='w-8 rounded pointer-events-none' />
              )}
              {lang.short === 'es' && (
                <ES title={lang.long} className='w-8 rounded pointer-events-none' />
              )}
              {lang.long}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSelector;
