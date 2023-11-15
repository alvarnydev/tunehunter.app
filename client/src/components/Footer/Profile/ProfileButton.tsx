import { useContext } from 'react';
import { RiAccountCircleFill } from 'react-icons/ri';
import { RiCloseCircleFill } from 'react-icons/ri';
import { AuthContext } from '../../../contexts/auth';

const ProfileButton = ({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { isAuthenticated } = useContext(AuthContext);

  const handleProfileClick = () => {
    if (isAuthenticated) setMenuOpen(!menuOpen);
  };

  return (
    <div className='relative z-30 flex justify-center items-center h-full'>
      <button className={`btn border-none rounded-full px-3 md:px-4 ${isAuthenticated ? 'btn-primary hover:bg-primary ' : ' btn-active btn-ghost no-animation cursor-not-allowed'}`} onClick={handleProfileClick}>
        <label className={`swap swap-rotate ${menuOpen ? 'swap-active' : ''} ${isAuthenticated ? '' : ' cursor-not-allowed'}`}>
          <RiCloseCircleFill size={40} className='text-white swap-on transition-menu ' />
          <RiAccountCircleFill size={40} className='text-white swap-off transition-menu ' />
        </label>
      </button>
    </div>
  );
};

export default ProfileButton;
