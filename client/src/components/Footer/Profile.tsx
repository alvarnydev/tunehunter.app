import { useContext, useEffect, useState } from 'react';
import ProfileButton from './Profile/ProfileButton';
import ProfileMenu from './Profile/ProfileMenu';
import ProfileBackground from './Profile/ProfileBackground';
import { AuthContext } from '../../contexts/auth';

const Profile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

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

export default Profile;
