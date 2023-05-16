import { BiSearch } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

const SearchButton = () => {
  const { t } = useTranslation();

  return (
    <button
      type='submit'
      className='btn btn-primary font-normal rounded-full md:w-auto w-1/2 gap-2 normal-case order-3 px-4 text-base flex m-auto tracking-wide'
    >
      <BiSearch size={18} />
      {t('searchbar.search')}
    </button>
  );
};

export default SearchButton;
