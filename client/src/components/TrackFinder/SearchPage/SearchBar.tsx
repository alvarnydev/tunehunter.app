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

const SearchBar = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleFormUpdate = (newFormData: FormDataType) => {
    setFormData(newFormData);
  };

  const existSearchParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('type')) {
      return true;
    }
    return false;
  };

  const restoreInputFromSearchParams = () => {
    const searchParams = new URLSearchParams(window.location.search);

    const type = searchParams.get('type');
    if (type) {
      setFormData((formData) => ({ ...formData, searchMode: type }));
    }

    const artist = searchParams.get('artist');
    const title = searchParams.get('title');
    if (artist && title) {
      setFormData((formData) => ({
        ...formData,
        songSearchQuery: {
          artist: artist,
          title: title,
        },
      }));
    }

    const url = searchParams.get('url');
    if (url) {
      setFormData((formData) => ({
        ...formData,
        playlistSearchString: url,
      }));
    }
  };

  const restoreInputFromLocalStorage = () => {
    const searchModeStored = localStorage.getItem('searchMode');
    if (searchModeStored) {
      setFormData((formData) => ({ ...formData, searchMode: searchModeStored }));
    }

    const playlistSearchStringStored = localStorage.getItem('playlistSearchString');
    if (playlistSearchStringStored) {
      setFormData((formData) => ({
        ...formData,
        playlistSearchString: playlistSearchStringStored,
      }));
    }

    const songSearchQuery_artist = localStorage.getItem('songSearchQuery_artist');
    const songSearchQuery_title = localStorage.getItem('songSearchQuery_title');
    if (songSearchQuery_artist && songSearchQuery_title) {
      setFormData((formData) => ({
        ...formData,
        songSearchQuery: {
          artist: songSearchQuery_artist,
          title: songSearchQuery_title,
        },
      }));
    }
  };

  useEffect(() => {
    function restoreFormData() {
      if (existSearchParams()) {
        restoreInputFromSearchParams();
      } else {
        restoreInputFromLocalStorage(); // to keep inputs after mode switch (playlist <> song)
      }
    }

    restoreFormData();
  }, []);

  return (
    <div className='flex md:flex-row flex-col w-4/5 md:gap-10 gap-8'>
      <SearchModeToggler formData={formData} handleFormUpdate={handleFormUpdate} />
      <SearchTextInput formData={formData} handleFormUpdate={handleFormUpdate} />
      <SearchButton formData={formData} />
    </div>
  );
};

export default SearchBar;
