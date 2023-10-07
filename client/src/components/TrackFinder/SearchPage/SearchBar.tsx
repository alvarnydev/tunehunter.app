import { useState } from 'react';
import SearchModeToggler from './SearchModeToggler';
import SearchTextInput from './SearchInput';
import SearchButton from './SearchButton';

const SearchBar = ({
  searchParams,
  setSearchParams,
}: {
  searchParams?: URLSearchParams;
  setSearchParams?: (searchparams: URLSearchParams) => void;
}) => {
  const [searchMode, setSearchMode] = useState(localStorage.getItem('searchMode') || 'song');
  const [songSearchQuery, setSongSearchQuery] = useState({
    artist: localStorage.getItem('songSearchQuery_artist') || '',
    title: localStorage.getItem('songSearchQuery_title') || '',
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
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </div>
  );
};

export default SearchBar;
