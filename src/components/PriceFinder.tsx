import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import SearchModeToggler from './SearchModeToggler';
import SearchInput from './SearchInput';

const SearchButton = () => (
  <button className='btn btn-primary rounded-full md:w-auto w-1/2 gap-2 normal-case order-3 md:text-base text-lg flex m-auto'>
    <BiSearch size={18} />
    Search
  </button>
);

const PriceFinder = () => {
  const [searchMode, setSearchMode] = useState('song');
  const [songSearchQuery, setSongSearchQuery] = useState({ artist: '', song: '' });
  const [playlistSearchString, setPlaylistSearchString] = useState('');

  return (
    <div className='flex md:flex-row flex-col md:gap-10 gap-8'>
      <SearchModeToggler
        searchMode={searchMode}
        setSearchMode={setSearchMode}
        songSearchQuery={songSearchQuery}
        playlistSearchString={playlistSearchString}
        setSongSearchQuery={setSongSearchQuery}
        setPlaylistSearchString={setPlaylistSearchString}
      />
      <SearchInput
        searchMode={searchMode}
        songSearchQuery={songSearchQuery}
        setSongSearchQuery={setSongSearchQuery}
        playlistSearchString={playlistSearchString}
        setPlaylistSearchString={setPlaylistSearchString}
      />
      <SearchButton />
    </div>
  );
};

export default PriceFinder;
