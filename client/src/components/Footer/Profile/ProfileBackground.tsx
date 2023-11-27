const ProfileBackground = ({ menuOpen }: { menuOpen: boolean }) => {
  return <div className={'z-10 bg-gradient-to-b from-base-300/75 from-10% to-primary/75 backdrop-blur-[10px] h-6 w-6 rounded-full absolute translate-center transition-transform transition-menu ' + (menuOpen ? 'scale-[180]' : 'scale-[1]')} />;
};

export default ProfileBackground;
