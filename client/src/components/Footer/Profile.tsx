import { useState } from 'react';
import ProfileButton from './Profile/ProfileButton';
import ProfileMenu from './Profile/ProfileMenu';
import ProfileBackground from './Profile/ProfileBackground';

const Profile = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='relative'>
      <ProfileButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <ProfileBackground menuOpen={menuOpen} />
      <ProfileMenu menuOpen={menuOpen} />
    </div>
  );
};

export default Profile;
