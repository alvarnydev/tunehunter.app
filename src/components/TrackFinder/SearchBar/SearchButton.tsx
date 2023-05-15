import { BiSearch } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

const SearchButton = () => {
  const { t } = useTranslation();

  function handleClick() {
    // Fetcher function
    const getFacts = async () => {
      const res = await fetch('https://random-facts2.p.rapidapi.com/getfact');
      return res.json();
    };
    // Using the hook
    //const { data, error, isLoading } = useQuery('randomFacts', getFacts);
  }

  return (
    <button
      onClick={handleClick}
      className='btn btn-primary font-normal rounded-full md:w-auto w-1/2 gap-2 normal-case order-3 px-4 text-base flex m-auto tracking-wide'
    >
      <BiSearch size={18} />
      {t('searchbar.search')}
    </button>
  );
};

export default SearchButton;
