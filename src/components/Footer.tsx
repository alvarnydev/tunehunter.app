import { BsGithub } from 'react-icons/bs';
import { useEffect } from 'react';
import { themeChange } from 'theme-change';

const Footer = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <footer className='absolute bottom-0 w-full flex justify-around py-5'>
      <select data-choose-theme className='opacity-0'>
        <option value=''>Default</option>
        <option value='dark'>Dark</option>
        <option value='pink'>Pink</option>
      </select>

      <select data-choose-theme className='select select-primary'>
        <option disabled selected>
          Pick a theme
        </option>
        <option value='synthwave'>Synthwave</option>
        <option value='dark'>Dark</option>
        <option value='light'>Light</option>
      </select>
      <a
        href='https://github.com/alvarnydev/btt.com'
        target='_blank'
        className='btn btn-outline border-primary'
      >
        <BsGithub size={24} />
      </a>
    </footer>
  );
};

export default Footer;
