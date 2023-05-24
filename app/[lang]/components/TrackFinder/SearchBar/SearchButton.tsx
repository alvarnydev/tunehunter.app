import { BiSearch } from 'react-icons/bi';

const SearchButton = () => {
  return (
    <button
      type='submit'
      className='btn btn-primary font-normal rounded-full md:w-auto w-1/2 gap-2 normal-case order-3 px-4 text-base flex m-auto tracking-wide'
    >
      <BiSearch size={18} />
      {'searchbar.search'}
    </button>
  );
};

export default SearchButton;
