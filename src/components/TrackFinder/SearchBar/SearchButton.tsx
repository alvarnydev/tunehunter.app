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
    <div className='order-3'>
      <Link className='md:flex' to={`/results${params}`}>
        <button
          type='submit'
          className='btn btn-primary font-normal md:w-auto w-1/2 m-auto rounded-full gap-2 flex normal-case px-4 text-base tracking-wide'
        >
          <BiSearch size={18} />
          {t('searchbar.search')}
        </button>
      </Link>
    </div>
  );
};

export default SearchButton;
