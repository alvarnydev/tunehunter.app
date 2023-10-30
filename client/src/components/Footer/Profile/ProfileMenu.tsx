import { useState } from 'react';
import MenuNavigation from './Menu/MenuNavigation';
import MenuContent from './Menu/MenuContent';

const ProfileMenu = ({ menuOpen }: { menuOpen: boolean }) => {
  const [menuPage, setMenuPage] = useState('you');

  return (
    <div
      className={`z-20 w-4/5 h-3/4 fixed flex justify-center items-center translate-center transition-menu-fast ${
        menuOpen ? '' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className='flex items-center justify-start gap-8 '>
        <MenuNavigation menuPage={menuPage} setMenuPage={setMenuPage} />
        <MenuContent menuPage={menuPage} />
      </div>
    </div>
  );
};

export default ProfileMenu;
