import { RiAccountCircleFill } from 'react-icons/ri';

const ProfileButton = () => (
  <div className='flex justify-center items-center'>
    <a
      href='https://github.com/alvarnydev/buythattrack.com'
      target='_blank'
      className='btn'
      aria-label='Link to the GitHub page of the project'
    >
      <RiAccountCircleFill size={36} className='' />
    </a>
  </div>
);

export default ProfileButton;
