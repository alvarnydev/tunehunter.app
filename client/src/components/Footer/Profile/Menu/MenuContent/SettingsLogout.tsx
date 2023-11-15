import { useContext } from 'react';
import { AuthContext } from '../../../../../contexts/auth';

const SettingsLogout = () => {
  const { logout } = useContext(AuthContext);

  const handleClick = () => {
    logout();
  };

  return (
    <div>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default SettingsLogout;
