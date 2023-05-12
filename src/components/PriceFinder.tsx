import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import SearchModeToggler from './SearchModeToggler';
import SearchInput from './SearchInput';

const SearchButton = () => {
  const { t } = useTranslation();

  return (
    <button className='btn btn-primary rounded-full md:w-auto w-1/2 gap-2 normal-case order-3 md:px-8 px-4 md:h-16 h-12 text-lg flex m-auto tracking-wide'>
      <BiSearch size={18} />
      {t('pricefinder.search')}
    </button>
  );
};

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
