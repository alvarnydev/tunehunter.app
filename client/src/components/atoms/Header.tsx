import { FaCompactDisc } from 'react-icons/fa6';
import { useNavigate } from 'react-router';

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className='mb-4 flex gap-2 flex-col items-center'>
      <button className='flex items-center shadow-primary drop-shadow-xl' onClick={handleClick}>
        <FaCompactDisc className='text-2xl mr-2 text-base-content ' />
        <h1 className='text-5xl text-primary'>Tune</h1>
        <h1 className='text-5xl text-secondary'>Hunter</h1>
      </button>
      {/* <h3 className='text-right mr-2'>
        <i>Let the hunt begin</i>
      </h3> */}
    </div>
  );
};

export default Header;
