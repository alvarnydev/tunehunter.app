import { useRef, useState } from 'react';
import ProfileButton from './Profile/ProfileButton';
import ProfileMenu from './Profile/ProfileMenu';
import ProfileBackground from './Profile/ProfileBackground';

const Profile = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // const handleProfileClick = () => {
  //   backgroundRef.current?.classList.toggle('scale-[80]');
  //   if (backgroundRef.current?.classList.contains('scale-[80]')) {
  //     setMenuOpen(true);
  //   } else {
  //     setMenuOpen(false);
  //   }
  // };

  return (
    <div className='relative'>
      <ProfileButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <ProfileBackground menuOpen={menuOpen} />
      {menuOpen && <ProfileMenu />}
    </div>
  );
};

export default Profile;
