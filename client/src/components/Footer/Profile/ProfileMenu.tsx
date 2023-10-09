const ProfileMenu = ({ menuOpen }: { menuOpen: boolean }) => {
  return (
    <div className={`z-20 fixed translate-center ${menuOpen ? '' : 'hidden'}`}>
      <nav>
        <ul>
          <li>Profile</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </nav>
    </div>
  );
};

export default ProfileMenu;
