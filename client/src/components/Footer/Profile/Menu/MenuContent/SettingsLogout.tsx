import { useAuth } from '../../../../../contexts/auth';
import { playJingle } from '../../../../../utils/audio';

const SettingsLogout = () => {
  const { logout } = useAuth();

  const handleClick = () => {
    playJingle(true);
    setTimeout(() => {
      logout();
    }, 200);
  };

  return (
    <div>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default SettingsLogout;
