import { RiAccountCircleFill } from 'react-icons/ri';
import { RiCloseCircleFill } from 'react-icons/ri';

const ProfileButton = ({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleProfileClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='relative z-30 flex justify-center items-center h-full'>
      <button
        className='btn btn-primary hover:bg-primary border-none rounded-full px-3 md:px-4'
        onClick={handleProfileClick}
      >
        <label className={`swap swap-flip ${menuOpen ? 'swap-active' : ''}`}>
          <RiCloseCircleFill size={40} className='text-white swap-on transition-menu' />
          <RiAccountCircleFill size={40} className='text-white swap-off transition-menu' />
        </label>
      </button>
    </div>
  );
};

export default ProfileButton;
