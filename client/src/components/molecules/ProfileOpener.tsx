import { PropsWithChildren, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { RiAccountCircleFill } from 'react-icons/ri';
import { RiCloseCircleFill } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { SetStateAction } from 'react';
import { PiMusicNotesFill } from 'react-icons/pi';
import { IoMdSettings } from 'react-icons/io';
import { FaCircleInfo } from 'react-icons/fa6';
import { playJingle } from '@/utils/functions/playAudio';

const ProfileButton = ({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();

  const handleProfileClick = () => {
    if (isAuthenticated) setMenuOpen(!menuOpen);
  };

  return (
    <div className='relative z-30 flex justify-center items-center h-full'>
      <button
        className={`btn border-none rounded-full px-3 md:px-4 normal-case ${isAuthenticated ? 'btn-primary hover:bg-primary ' : ' btn-active btn-ghost no-animation cursor-not-allowed tooltip'}`}
        data-tip={t('footer.profileDisabledTooltip')}
        onClick={handleProfileClick}
      >
        <label className={`swap swap-rotate ${menuOpen ? 'swap-active' : ''} ${isAuthenticated ? '' : ' cursor-not-allowed'}`}>
          <RiCloseCircleFill size={40} className='text-white swap-on transition-menu ' />
          <RiAccountCircleFill size={40} className='text-white swap-off transition-menu ' />
        </label>
      </button>
    </div>
  );
};

const ProfileBackground = ({ menuOpen }: { menuOpen: boolean }) => {
  return <div className={'z-10 bg-gradient-to-b from-base-300/75 from-10% to-primary/75 backdrop-blur-[10px] h-6 w-6 rounded-full absolute translate-center transition-transform transition-menu ' + (menuOpen ? 'scale-[180]' : 'scale-[1]')} />;
};

const ProfileMenu = ({ menuOpen }: { menuOpen: boolean }) => {
  const [menuPage, setMenuPage] = useState('you');

  return (
    <div className={`z-20 w-4/5 h-3/4 fixed flex justify-center items-center translate-center transition-menu-fast ${menuOpen ? '' : 'opacity-0 pointer-events-none'}`}>
      <div className='flex items-center justify-start gap-8 '>
        <MenuNavigation menuPage={menuPage} setMenuPage={setMenuPage} />
        <MenuContent menuPage={menuPage} />
      </div>
    </div>
  );
};

const MenuNavigation = ({ menuPage, setMenuPage }: { menuPage: string; setMenuPage: React.Dispatch<SetStateAction<string>> }) => {
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

const MenuContent = ({ menuPage }: { menuPage: string }) => {
  const { userData } = useAuth();

  const MenuContentLayout = ({ children }: PropsWithChildren) => {
    return <div className='flex flex-col justify-center items-center gap-4 '>{children}</div>;
  };

  return (
    <MenuContentLayout>
      {menuPage === 'you' && <ProfileYou />}
      {menuPage === 'settings' && <ProfileSettings />}
      {menuPage === 'about' && <ProfileAbout />}
    </MenuContentLayout>
  );
};

const ProfileYou = () => {
  const YouEdits = () => {
    // todo: make this a form? add region here, get initially from spotify api

    return (
      // <div>
      //   <div className='flex'>
      //     <label htmlFor=''>E-Mail</label>
      //     <input
      //       type='text'
      //       placeholder="You can't touch this"
      //       className='input input-bordered w-full max-w-xs'
      //       disabled
      //     />
      //   </div>
      // </div>
      <div className='overflow-x-auto w-full'>
        <table className='table w-full'>
          <tbody className=''>
            <tr>
              <td className='text-end'>Name</td>
              <td>Peter</td>
            </tr>
            <tr>
              <td className='text-end'>E-Mail</td>
              <td>
                <input type='text' placeholder='peterstolz@google.com' className='input input-bordered w-full max-w-xs rounded-full' disabled />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const YouStats = () => {
    return (
      <div className='stats shadow'>
        <div className='stat'>
          <div className='stat-figure text-primary'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-8 h-8 stroke-current'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
            </svg>
          </div>
          <div className='stat-title'>Total Likes</div>
          <div className='stat-value text-primary'>25.6K</div>
          <div className='stat-desc'>21% more than last month</div>
        </div>
        <div className='stat'>
          <div className='stat-figure text-secondary'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-8 h-8 stroke-current'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 10V3L4 14h7v7l9-11h-7z' />
            </svg>
          </div>
          <div className='stat-title'>Page Views</div>
          <div className='stat-value text-secondary'>2.6M</div>
          <div className='stat-desc'>21% more than last month</div>
        </div>
        <div className='stat'>
          <div className='stat-figure text-secondary'>
            <div className='avatar online'>
              <div className='w-16 rounded-full'>
                <img src='logo_beatport.jpg' />
              </div>
            </div>
          </div>
          <div className='stat-value'>86%</div>
          <div className='stat-title'>Tasks done</div>
          <div className='stat-desc text-secondary'>31 tasks remaining</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <YouEdits />
      <YouStats />
    </>
  );
};

const ProfileSettings = () => {
  const SettingsLogout = () => {
    const { logout } = useAuth();

    const handleClick = () => {
      playJingle(true);
      setTimeout(() => {
        logout();
      }, 200);
    };

    return (
      <div>
        <button onClick={handleClick}>Logout</button>
      </div>
    );
  };

  return (
    <>
      <SettingsLogout />
    </>
  );
};

const ProfileAbout = () => {
  const AboutContribute = () => {
    return <div></div>;
  };

  const AboutFeedback = () => {
    return <div></div>;
  };

  const AboutInfo = () => {
    return <div></div>;
  };

  return (
    <>
      <AboutInfo />
      <AboutFeedback />
      <AboutContribute />
    </>
  );
};

const ProfileOpener = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) setMenuOpen(false);
  }, [isAuthenticated]);

  return (
    <div className='relative'>
      <ProfileButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <ProfileBackground menuOpen={menuOpen} />
      <ProfileMenu menuOpen={menuOpen} />
    </div>
  );
};

export default ProfileOpener;
