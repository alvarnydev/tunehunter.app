import { SetStateAction } from 'react';
import { PiMusicNotesFill } from 'react-icons/pi';
import { IoMdSettings } from 'react-icons/io';
import { FaCircleInfo } from 'react-icons/fa6';

const MenuNavigation = ({
  menuPage,
  setMenuPage,
}: {
  menuPage: string;
  setMenuPage: React.Dispatch<SetStateAction<string>>;
}) => {
  const NavigationItem: React.FC<{
    pageTitle: string;
    pageIcon: React.ReactNode;
  }> = ({ pageTitle, pageIcon }) => {
    const newPage = pageTitle.toLowerCase();

    return (
      <li>
        <a className={menuPage == newPage ? 'active' : ''} onClick={() => setMenuPage(newPage)}>
          {pageIcon}
          {pageTitle}
        </a>
      </li>
    );
  };

  return (
    <nav className=''>
      <ul className='menu bg-base-200 w-56 rounded-box'>
        <NavigationItem pageTitle={'You'} pageIcon={<PiMusicNotesFill size={20} />} />
        <NavigationItem pageTitle={'Settings'} pageIcon={<IoMdSettings size={20} />} />
        <NavigationItem pageTitle={'About'} pageIcon={<FaCircleInfo size={20} />} />
      </ul>
    </nav>
  );
};

export default MenuNavigation;
