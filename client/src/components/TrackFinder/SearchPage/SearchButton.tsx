import { useTranslation } from 'react-i18next';
import { BiSearch } from 'react-icons/bi';

const SearchButton = ({ handleSubmit }: { handleSubmit: () => void }) => {
  const { t } = useTranslation();

  return (
    <div className='order-3 md:flex'>
      <button id='submitBtn' type='submit' className='btn btn-primary font-normal md:w-auto w-1/2 m-auto rounded-full gap-2 flex normal-case px-4 text-base tracking-wide' onClick={handleSubmit}>
        <BiSearch size={18} />
        {t('searchbar.search')}
      </button>
    </div>
  );
};

export default SearchButton;
