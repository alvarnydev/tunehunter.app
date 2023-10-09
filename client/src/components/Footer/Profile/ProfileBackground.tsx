const ProfileBackground = ({ menuOpen }: { menuOpen: boolean }) => {
  return (
    <div
      className={
        'z-10 bg-gradient-to-b from-base-300/75 from-10% to-primary/75 backdrop-blur-[10px] h-10 w-10 rounded-full absolute translate-center transition-transform transition-menu ' +
        (menuOpen ? 'scale-[80]' : 'scale-[1]')
      }
    />
  );
};

export default ProfileBackground;
