import { useState } from 'react';
import MenuNavigation from './Menu/MenuNavigation';
import MenuContent from './Menu/MenuContent';

const ProfileMenu = ({ menuOpen }: { menuOpen: boolean }) => {
  const [menuPage, setMenuPage] = useState(0);

  return (
    <div
      className={`z-20 w-4/5 h-3/4 fixed translate-center flex items-center justify-start gap-8 ${
        menuOpen ? '' : 'hidden'
      }`}
    >
      <MenuNavigation menuPage={menuPage} setMenuPage={setMenuPage} />
      <MenuContent menuPage={menuPage} />
    </div>
  );
};

export default ProfileMenu;
