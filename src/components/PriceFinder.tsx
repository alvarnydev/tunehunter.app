import { GiMusicalNotes } from 'react-icons/gi';

const PriceFinder = () => {
  return (
    <div className='flex gap-10'>
      <input
        type='text'
        placeholder='Artist'
        className='input input-bordered input-primary w-full max-w-xs'
      />
      <input
        type='text'
        placeholder='Song'
        className='input input-bordered input-primary w-full max-w-xs'
      />
      <button className='btn btn-primary gap-2 normal-case'>
        Find Price
        <GiMusicalNotes />
      </button>
    </div>
  );
};

export default PriceFinder;
