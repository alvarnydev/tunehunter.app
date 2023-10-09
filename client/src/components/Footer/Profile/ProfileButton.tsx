import { RiAccountCircleFill } from 'react-icons/ri';

const ProfileButton = ({ handleProfileClick }: { handleProfileClick: () => void }) => {
  return (
    <div className='relative z-30 flex justify-center items-center h-full'>
      <button
        className='btn btn-primary hover:bg-gradient-to-tr from-primary border-none rounded-full px-3 md:px-4'
        onClick={handleProfileClick}
      >
        <RiAccountCircleFill size={40} className='text-white' />
      </button>
    </div>
  );
};

export default ProfileButton;
