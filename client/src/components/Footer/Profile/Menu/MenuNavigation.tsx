import { SetStateAction } from 'react';
import { PiMusicNotesFill } from 'react-icons/pi';
import { IoMdSettings } from 'react-icons/io';
import { FaCircleInfo } from 'react-icons/fa6';

const MenuNavigation = ({
  menuPage,
  setMenuPage,
}: {
  menuPage: number;
  setMenuPage: React.Dispatch<SetStateAction<number>>;
}) => {
  const NavigationItem: React.FC<{
    pageNumber: number;
    pageTitle: string;
    pageIcon: React.ReactNode;
  }> = ({ pageNumber, pageTitle, pageIcon }) => (
    <li>
      <a className={menuPage == pageNumber ? 'active' : ''} onClick={() => setMenuPage(pageNumber)}>
        {pageIcon}
        {pageTitle}
      </a>
    </li>
  );

  return (
    <nav className=''>
      <ul className='menu bg-base-200 w-56 rounded-box'>
        <NavigationItem
          pageNumber={0}
          pageTitle={'You'}
          pageIcon={<PiMusicNotesFill size={20} />}
        />
        <NavigationItem
          pageNumber={1}
          pageTitle={'Settings'}
          pageIcon={<IoMdSettings size={20} />}
        />
        <NavigationItem pageNumber={2} pageTitle={'About'} pageIcon={<FaCircleInfo size={20} />} />
      </ul>
    </nav>
  );
};

export default MenuNavigation;
