import { RiAccountCircleFill } from 'react-icons/ri';

const ProfileButton = () => (
  <div className='flex justify-center items-center'>
    <div className='btn btn-primary rounded-full'>
      <RiAccountCircleFill size={40} className='text-white' />
    </div>
  </div>
);

export default ProfileButton;
