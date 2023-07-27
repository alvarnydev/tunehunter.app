import { BiSearch } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface SearchButtonProps {
  searchMode: string;
  songSearchQuery: { artist: string; song: string };
  playlistSearchString: string;
}

function isValidInput({
  searchMode,
  songSearchQuery,
  playlistSearchString,
}: SearchButtonProps): boolean {
  if (searchMode == 'song') {
    if (songSearchQuery.artist == '' || songSearchQuery.song == '') {
      toast((t) => (
        <span>
          <div className='flex justify-between items-center gap-4'>
            <span>Fill out all fields.</span>
            <button
              className='bg-white/50 border-2 border-black rounded-lg py-1 px-2 m-0'
              onClick={() => toast.dismiss(t.id)}
            >
              Dismiss
            </button>
          </div>
        </span>
      ));
      return false;
    }
  } else if (searchMode == 'playlist' && playlistSearchString == '') {
    toast("That didn't quite work! Fill out the field.");
    return false;
  }

  return true;
}

function buildGetParams({
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
  const navigate = useNavigate();

  function handleClick() {
    if (
      !isValidInput({
        searchMode,
        songSearchQuery,
        playlistSearchString,
      })
    ) {
      return;
    }

    saveParamsToLocalStorage({
      searchMode,
      songSearchQuery,
      playlistSearchString,
    });

    const params = buildGetParams({
      searchMode,
      songSearchQuery,
      playlistSearchString,
    });

    navigate(`/results${params}`);
  }

  return (
    <div className='order-3 md:flex'>
      <button
        id='submitBtn'
        type='submit'
        className='btn btn-primary font-normal md:w-auto w-1/2 m-auto rounded-full gap-2 flex normal-case px-4 text-base tracking-wide'
        onClick={handleClick}
      >
        <BiSearch size={18} />
        {t('searchbar.search')}
      </button>
    </div>
  );
};

export default SearchButton;
