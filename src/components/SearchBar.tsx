import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import SearchModeToggler from './SearchModeToggler';
import SearchInput from './SearchInput';
import { useQuery } from '@tanstack/react-query';

const SearchButton = () => {
  const { t } = useTranslation();

  function handleClick() {
    // Fetcher function
    const getFacts = async () => {
      const res = await fetch('https://random-facts2.p.rapidapi.com/getfact');
      return res.json();
    };
    // Using the hook
    //const { data, error, isLoading } = useQuery('randomFacts', getFacts);
  }

  return (
    <button
      onClick={handleClick}
      className='btn btn-primary rounded-full md:w-auto w-1/2 gap-2 normal-case order-3 md:px-8 px-4 md:h-16 h-12 text-lg flex m-auto tracking-wide'
    >
      <BiSearch size={18} />
      {t('pricefinder.search')}
    </button>
  );
};

interface SearchBarProps {
  setPriceData: (priceData: any) => void;
}

const SearchBar = ({ setPriceData }: SearchBarProps) => {
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

export default SearchBar;
