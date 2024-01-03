import { FaCompactDisc } from 'react-icons/fa6';
import { useNavigate } from 'react-router';

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <button className='flex items-center mb-4' onClick={handleClick}>
      <FaCompactDisc className='text-2xl mr-2 ' />
      <h1 className='text-5xl text-primary'>Rekord</h1>
      <h1 className='text-5xl text-secondary'>Store</h1>
    </button>
  );
};

export default Header;
