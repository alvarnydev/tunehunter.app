import { BiSearch } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const SearchButton = () => {
  const { t } = useTranslation();

  return (
    <Link className='order-3 ' to='/results'>
      <button
        type='submit'
        className='btn btn-primary font-normal rounded-full md:w-auto w-1/2 gap-2 normal-case px-4 text-base flex m-auto tracking-wide'
      >
        <BiSearch size={18} />
        {t('searchbar.search')}
      </button>
    </Link>
  );
};

export default SearchButton;
