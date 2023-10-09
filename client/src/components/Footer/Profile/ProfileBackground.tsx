const ProfileBackground = ({ menuOpen }: { menuOpen: boolean }) => {
  return (
    <div
      className={
        'z-10 bg-gradient-to-tr from-primary/75 from-30% to-secondary/75 backdrop-blur-[10px] h-10 w-10 rounded-full absolute translate-center transition-transform ease-[cubic-bezier(0.85, 0, 0.15, 1)] duration-1000 ' +
        (menuOpen ? 'scale-[80]' : 'scale-[1]')
      }
    />
  );
};

export default ProfileBackground;
