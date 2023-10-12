import { SetStateAction } from 'react';
import { PiMusicNotesFill } from 'react-icons/pi';
import { IoMdSettings } from 'react-icons/io';

const MenuNavigation = ({
  menuPage,
  setMenuPage,
}: {
  menuPage: number;
  setMenuPage: React.Dispatch<SetStateAction<number>>;
}) => {
  return (
    <nav className=''>
      <ul className='menu bg-base-200 w-56 rounded-box'>
        <li>
          <a className={menuPage == 0 ? 'active' : ''} onClick={() => setMenuPage(0)}>
            <PiMusicNotesFill size={20} />
            You
          </a>
        </li>
        <li>
          <a className={menuPage == 1 ? 'active' : ''} onClick={() => setMenuPage(1)}>
            <IoMdSettings size={20} />
            Settings
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default MenuNavigation;
