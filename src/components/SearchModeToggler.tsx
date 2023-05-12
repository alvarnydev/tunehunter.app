import { GiMusicalNotes } from 'react-icons/gi';
import { IoIosMusicalNote } from 'react-icons/io';

interface SearchModeTogglerProps {
  searchMode: string;
  setSearchMode: (searchMode: string) => void;
  songSearchQuery: { artist: string; song: string };
  playlistSearchString: string;
  setSongSearchQuery: (songInput: { artist: string; song: string }) => void;
  setPlaylistSearchString: (playlistInput: string) => void;
}
const SearchModeToggler = ({
  searchMode,
  setSearchMode,
  songSearchQuery,
  playlistSearchString,
  setSongSearchQuery,
  setPlaylistSearchString,
}: SearchModeTogglerProps) => {
  // Change mode and save / restore search query
  function handleChange() {
    // Changing from song -> playlist
    if (searchMode === 'song') {
      setPlaylistSearchString(playlistSearchString);
      setSearchMode('playlist');
      return;
    }

    // Changing from playlist -> song
    setSongSearchQuery({ artist: songSearchQuery.artist, song: songSearchQuery.song });
    setSearchMode('song');
  }

  return (
    <label htmlFor='search-mode-switcher' className='swap swap-rotate md:order-1 order-3 m-auto'>
      <input
        id='search-mode-switcher'
        aria-labelledby='search-mode-switcher'
        type='checkbox'
        defaultChecked={searchMode === 'playlist'}
        onChange={handleChange}
      />

      <div className='swap-on fill-current md:w-10 w-8 h-10 flex items-center'>
        <GiMusicalNotes size={40} />
      </div>
      <div className='swap-off fill-current md:w-10 w-8 h-10 flex items-center'>
        <IoIosMusicalNote size={40} />
      </div>
    </label>
  );
};

export default SearchModeToggler;
