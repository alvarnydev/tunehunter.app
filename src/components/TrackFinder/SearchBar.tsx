import { useState } from 'react';
import SearchModeToggler from './SearchBar/SearchModeToggler';
import SearchTextInput from './SearchBar/SearchInput';
import SearchButton from './SearchBar/SearchButton';

// interface SearchBarProps {
//   setPriceData: (priceData: [priceDataType]) => void;
// }

const SearchBar = () => {
  const [searchMode, setSearchMode] = useState('song');
  const [songSearchQuery, setSongSearchQuery] = useState({ artist: '', song: '' });
  const [playlistSearchString, setPlaylistSearchString] = useState('');

  return (
    <div className='flex md:flex-row flex-col w-4/5 md:gap-10 gap-8'>
      <SearchModeToggler
        searchMode={searchMode}
        setSearchMode={setSearchMode}
        songSearchQuery={songSearchQuery}
        playlistSearchString={playlistSearchString}
        setSongSearchQuery={setSongSearchQuery}
        setPlaylistSearchString={setPlaylistSearchString}
      />
      <SearchTextInput
        searchMode={searchMode}
        songSearchQuery={songSearchQuery}
        setSongSearchQuery={setSongSearchQuery}
        playlistSearchString={playlistSearchString}
        setPlaylistSearchString={setPlaylistSearchString}
      />
      <SearchButton
        searchMode={searchMode}
        songSearchQuery={songSearchQuery}
        playlistSearchString={playlistSearchString}
      />
    </div>
  );
};

export default SearchBar;
