import { RiAccountCircleFill } from 'react-icons/ri';
import { RiCloseCircleFill } from 'react-icons/ri';
import { useAuth } from '../../../contexts/auth';
import { useTranslation } from 'react-i18next';

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

export default ProfileButton;
