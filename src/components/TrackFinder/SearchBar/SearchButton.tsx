import { BiSearch } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface SearchButtonProps {
  searchMode: string;
  songSearchQuery: { artist: string; song: string };
  playlistSearchString: string;
}

const SearchButton = ({ searchMode, songSearchQuery, playlistSearchString }: SearchButtonProps) => {
  const { t } = useTranslation();

  let params = `?type=${searchMode}`; //&artist=${songSearchQuery.artist}&song=${songSearchQuery.song}`;

  if (searchMode == 'song') {
    params += `&artist=${songSearchQuery.artist}&song=${songSearchQuery.song}`;
  } else if (searchMode == 'playlist') {
    params += `&url=${playlistSearchString}`;
  }

  return (
    <Link className='order-3 flex' to={`/results${params}`}>
      <button
        type='submit'
        className='btn btn-primary font-normal rounded-full md:w-auto w-1/2 gap-2 flex normal-case px-4 text-base tracking-wide'
      >
        <BiSearch size={18} />
        {t('searchbar.search')}
      </button>
    </Link>
  );
};

export default SearchButton;
