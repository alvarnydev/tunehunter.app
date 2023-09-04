import { useState } from 'react';
import SearchModeToggler from './SearchPage/SearchModeToggler';
import SearchTextInput from './SearchPage/SearchInput';
import SearchButton from './SearchPage/SearchButton';

// interface SearchBarProps {
//   setPriceData: (priceData: [priceDataType]) => void;
// }

const SearchPage = () => {
  const [searchMode, setSearchMode] = useState(localStorage.getItem('searchMode') || 'song');
  const [songSearchQuery, setSongSearchQuery] = useState({
    artist: localStorage.getItem('songSearchQuery_artist') || '',
    song: localStorage.getItem('songSearchQuery_song') || '',
  });
  const [playlistSearchString, setPlaylistSearchString] = useState(
    localStorage.getItem('playlistSearchString') || ''
  );

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

export default SearchPage;
