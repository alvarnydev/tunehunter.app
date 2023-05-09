import { BsGithub } from 'react-icons/bs';
import { useEffect } from 'react';
import { themeChange } from 'theme-change';

const Footer = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <footer className='absolute bottom-0 w-full flex justify-around py-5'>
      <select className='select'>
        <option disabled selected>
          Region
        </option>
        <option value='eu'>EU</option>
        <option value='us'>US</option>
      </select>
      <a href='https://github.com/alvarnydev/btt.com' target='_blank' className='btn btn-ghost'>
        <BsGithub size={24} />
      </a>
      <select data-choose-theme className='select'>
        <option disabled selected>
          Pick a theme
        </option>
        <option value='light'>Light</option>
        <option value='dark'>Dark</option>
        <option value='synthwave'>Synthwave</option>
        <option value='valentine'>Valentine</option>
        {/* 
        <option value='cupcake'>Cupcake</option>
        <option value='bumblebee'>Bumblebee</option>
        <option value='emerald'>Emerald</option>
        <option value='corporate'>Corporate</option>
        <option value='retro'>Retro</option>
        <option value='cyberpunk'>Cyberpunk</option>
        <option value='halloween'>Halloween</option>
        <option value='garden'>Garden</option>
        <option value='forest'>Forest</option>
        <option value='aqua'>Aqua</option>
        <option value='lofi'>Lofi</option>
        <option value='pastel'>Pastel</option>
        <option value='fantasy'>Fantasy</option>
        <option value='wireframe'>Wireframe</option>
        <option value='black'>Black</option>
        <option value='luxury'>Luxury</option>
        <option value='dracula'>Dracula</option>
        <option value='cmyk'>Cmyk</option>
        <option value='autumn'>Autumn</option>
        <option value='business'>Business</option>
        <option value='acid'>Acid</option>
        <option value='lemonade'>Lemonade</option>
        <option value='night'>Night</option>
        <option value='coffee'>Coffee</option>
        <option value='winter'>Winter</option> */}
      </select>
    </footer>
  );
};

export default Footer;
