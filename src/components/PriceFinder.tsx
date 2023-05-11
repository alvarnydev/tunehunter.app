import { useState } from 'react';
import { GiMusicalNotes } from 'react-icons/gi';
import { IoIosMusicalNote } from 'react-icons/io';
import { BiSearch } from 'react-icons/bi';

interface SearchModeTogglerProps {
  searchMode: string;
  setSearchMode: (searchMode: string) => void;
}

const SearchModeToggler = ({ searchMode, setSearchMode }: SearchModeTogglerProps) => {
  function handleClick() {
    setSearchMode(searchMode === 'song' ? 'playlist' : 'song');
  }

  return (
    <label className='swap swap-rotate'>
      <input type='checkbox' />

      <div className='swap-on fill-current w-8 h-10 flex items-center' onClick={handleClick}>
        <GiMusicalNotes size={40} />
      </div>
      <div className='swap-off fill-current w-8 h-10 flex items-center' onClick={handleClick}>
        <IoIosMusicalNote size={40} />
      </div>
    </label>
  );
};

const SearchInput = ({ searchMode }: { searchMode: string }) => {
  return (
    <div className='w-full flex gap-5'>
      {searchMode === 'song' && <SongInput />}
      {searchMode === 'playlist' && <PlaylistInput />}
    </div>
  );
};

const SongInput = () => (
  <>
    <input
      type='text'
      placeholder='Artist'
      className='input input-primary rounded-full w-1/2 max-w-xs'
    />
    <input
      type='text'
      placeholder='Song'
      className='input rounded-full input-primary w-1/2 max-w-xs'
    />
  </>
);

const PlaylistInput = () => (
  <>
    <input
      type='text'
      placeholder='https://open.spotify.com/playlist/4Zn1Wd...'
      className='input input-primary rounded-full w-full'
    />
  </>
);

const SearchButton = () => (
  <button className='btn btn-primary rounded-full gap-2 normal-case'>
    <BiSearch size={18} />
    Search
  </button>
);

const PriceFinder = () => {
  const [searchMode, setSearchMode] = useState('song');

  return (
    <div className='flex gap-10'>
      <SearchModeToggler searchMode={searchMode} setSearchMode={setSearchMode} />
      <SearchInput searchMode={searchMode} />
      <SearchButton />
    </div>
  );
};

export default PriceFinder;
