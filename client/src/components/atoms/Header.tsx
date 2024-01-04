import { FaCompactDisc } from 'react-icons/fa6';
import { useNavigate } from 'react-router';

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className='mb-4'>
      <button className='flex items-center shadow-primary drop-shadow-xl' onClick={handleClick}>
        <FaCompactDisc className='text-2xl mr-2 text-base-content ' />
        <h1 className='text-5xl text-primary'>Rekord</h1>
        <h1 className='text-5xl text-secondary'>Store</h1>
      </button>
      {/* <h3 className='text-right mr-2'>
        <i>Rekord shopping in one click</i>
      </h3> */}
    </div>
  );
};

export default Header;
