import { BiSearch } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface SearchButtonProps {
  searchMode: string;
  songSearchQuery: { artist: string; song: string };
  playlistSearchString: string;
}

function buildUrlParams({
  searchMode,
  songSearchQuery,
  playlistSearchString,
}: SearchButtonProps): string {
  let params = `?type=${searchMode}`;

  if (searchMode == 'song') {
    params += `&artist=${songSearchQuery.artist}&song=${songSearchQuery.song}`;
  } else if (searchMode == 'playlist') {
    params += `&url=${playlistSearchString}`;
  }
  return params;
}

function saveParamsToLocalStorage({
  searchMode,
  songSearchQuery,
  playlistSearchString,
}: SearchButtonProps) {
  localStorage.setItem('searchMode', searchMode);
  if (searchMode == 'song') {
    localStorage.setItem('songSearchQuery_artist', songSearchQuery.artist);
    localStorage.setItem('songSearchQuery_song', songSearchQuery.song);
    localStorage.removeItem('playlistSearchString');
  } else if (searchMode == 'playlist') {
    localStorage.removeItem('songSearchQuery_artist');
    localStorage.removeItem('songSearchQuery_song');
    localStorage.setItem('playlistSearchString', playlistSearchString);
  }
}

const SearchButton = ({ searchMode, songSearchQuery, playlistSearchString }: SearchButtonProps) => {
  const { t } = useTranslation();

  saveParamsToLocalStorage({
    searchMode,
    songSearchQuery,
    playlistSearchString,
  });

  const params = buildUrlParams({
    searchMode,
    songSearchQuery,
    playlistSearchString,
  });

  return (
    <div className='order-3'>
      <Link className='md:flex' to={`/results${params}`}>
        <button
          id='submitBtn'
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
