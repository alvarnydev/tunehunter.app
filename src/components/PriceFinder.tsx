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
    <label htmlFor='search-mode-switcher' className='swap swap-rotate md:order-1 order-3 m-auto'>
      <input id='search-mode-switcher' type='checkbox' />

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
    <div className='w-full flex md:flex-row flex-col md:gap-10 gap-8 order-2'>
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
      className='input md:h-12 h-16 md:text-base text-lg input-primary rounded-full md:w-full border-2'
    />
    <input
      type='text'
      placeholder='Song'
      className='input md:h-12 h-16 md:text-base text-lg rounded-full input-primary md:w-full border-2'
    />
  </>
);

const PlaylistInput = () => (
  <input
    type='text'
    placeholder='https://open.spotify.com/playlist/4Zn1Wd...'
    className='input input-primary rounded-full md:w-full md:text-base text-lg md:h-12 h-16 border-2'
  />
);

const SearchButton = () => (
  <button className='btn btn-primary rounded-full md:w-auto w-1/2 gap-2 normal-case order-3 md:text-base text-lg flex m-auto'>
    <BiSearch size={18} />
    Search
  </button>
);

const PriceFinder = () => {
  const [searchMode, setSearchMode] = useState('song');

  return (
    <div className='flex md:flex-row flex-col md:gap-10 gap-8'>
      <SearchModeToggler searchMode={searchMode} setSearchMode={setSearchMode} />
      <SearchInput searchMode={searchMode} />
      <SearchButton />
    </div>
  );
};

export default PriceFinder;
