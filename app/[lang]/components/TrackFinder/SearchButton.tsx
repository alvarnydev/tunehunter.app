import { BiSearch } from 'react-icons/bi';

const SearchButton = ({ buttonText }: { buttonText: string }) => {
  return (
    <button
      type='submit'
      className='btn btn-primary font-normal rounded-full md:w-auto w-1/2 gap-2 normal-case order-3 px-4 text-base flex m-auto tracking-wide'
    >
      <BiSearch size={18} />
      {buttonText}
    </button>
  );
};

export default SearchButton;
