import { useEffect, useState } from 'react';
import SearchModeToggler from './SearchModeToggler';
import SearchTextInput from './SearchInput';
import SearchButton from './SearchButton';
import { FormDataType } from '../../../../../types';

const initialFormData: FormDataType = {
  searchMode: 'song',
  songSearchQuery: {
    artist: '',
    title: '',
  },
  playlistSearchString: '',
};

const SearchBar = ({
  searchParams,
  setSearchParams,
}: {
  searchParams?: URLSearchParams;
  setSearchParams?: (searchparams: URLSearchParams) => void;
}) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleFormUpdate = (newFormData: FormDataType) => {
    setFormData(newFormData);
  };

  useEffect(() => {
    const searchModeStored = localStorage.getItem('searchMode');
    if (searchModeStored) {
      setFormData({ ...formData, searchMode: searchModeStored });
    }

    const playlistSearchStringStored = localStorage.getItem('playlistSearchString');
    if (playlistSearchStringStored) {
      setFormData({ ...formData, playlistSearchString: playlistSearchStringStored });
    }

    const songSearchQuery_artist = localStorage.getItem('songSearchQuery_artist');
    const songSearchQuery_title = localStorage.getItem('songSearchQuery_title');
    if (songSearchQuery_artist && songSearchQuery_title) {
      setFormData({
        ...formData,
        songSearchQuery: {
          artist: songSearchQuery_artist,
          title: songSearchQuery_title,
        },
      });
    }
  }, []);

  return (
    <div className='flex md:flex-row flex-col w-4/5 md:gap-10 gap-8'>
      <SearchModeToggler formData={formData} handleFormUpdate={handleFormUpdate} />
      <SearchTextInput formData={formData} handleFormUpdate={handleFormUpdate} />
      <SearchButton
        formData={formData}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </div>
  );
};

export default SearchBar;
