import { VscAccount } from 'react-icons/vsc';

const Header = () => {
  return (
    <div className='absolute right-[15%] md:right-[5%] top-[5%]'>
      <VscAccount size={40} className='text-primary cursor-pointer' />
    </div>
  );
};

export default Header;
