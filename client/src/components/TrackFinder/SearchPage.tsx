import SpotifyIntegrationBox from './SearchPage/SpotifyIntegrationBox';
import SearchBar from './SearchPage/SearchBar';
import { FormDataType } from '../../../../types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastComponent } from '../utils/ToastComponent';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const initialFormData: FormDataType = {
  country: 'DE',
  searchMode: 'song',
  songSearchQuery: {
    artist: '',
    title: '',
    duration: 0,
  },
  playlistSearchString: '',
};

const SearchPage = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [shouldSearch, setShouldSearch] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // todo: this is terrible, figure out another way
  /*
    I use handleformupdate for the manual update via the input fields but also for the update via the spotify integration box
    I can't use handleSubmit after handleFormUpdate in the spotifyintegration box because the state is still old so we have to somehow wait for the rerender of SearchPage
  */
  useEffect(() => {
    if (shouldSearch) {
      handleSubmit();
    }
    setShouldSearch(false);
  }, [shouldSearch]);

  const handleFormUpdate = (newFormData: FormDataType, final?: boolean) => {
    setFormData(newFormData);
    if (final) {
      setShouldSearch(true);
    }
  };

  function handleSubmit() {
    if (!isValidInput()) {
      return;
    }

    storeFormData();

    const params = buildGetParams();
    navigate(`/results${params}`);
  }

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
          ...formData.songSearchQuery,
          artist,
          title,
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

  const existSearchParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('type')) {
      return true;
    }
    return false;
  };

  const restoreInputFromLocalStorage = () => {
    const searchMode = localStorage.getItem('searchMode');
    if (searchMode) {
      setFormData((formData) => ({ ...formData, searchMode }));
    }

    const playlistSearchString = localStorage.getItem('playlistSearchString');
    if (playlistSearchString) {
      setFormData((formData) => ({
        ...formData,
        playlistSearchString,
      }));
    }

    const artist = localStorage.getItem('songSearchQuery_artist');
    const title = localStorage.getItem('songSearchQuery_title');
    if (artist && title) {
      setFormData((formData) => ({
        ...formData,
        songSearchQuery: {
          ...formData.songSearchQuery,
          artist,
          title,
        },
      }));
    }
  };

  function isValidInput(): boolean {
    const { searchMode, songSearchQuery, playlistSearchString } = formData;

    if (searchMode == 'song') {
      if (songSearchQuery.artist == '' || songSearchQuery.title == '') {
        toast((toast) => <ToastComponent t={toast} text={t('errors.missingSongInput')} />);
        return false;
      }
    } else if (searchMode == 'playlist' && playlistSearchString == '') {
      toast((toast) => <ToastComponent t={toast} text={t('errors.missingPlaylistInput')} />);
      return false;
    }

    return true;
  }

  function buildGetParams(): string {
    const { country, searchMode, songSearchQuery, playlistSearchString } = formData;
    let params = `?type=${searchMode}&country=${country}`;

    if (searchMode == 'song') {
      params += `&artist=${songSearchQuery.artist}&title=${songSearchQuery.title}&duration=${songSearchQuery.duration}`;
    } else if (searchMode == 'playlist') {
      params += `&url=${playlistSearchString}`;
    }
    return params;
  }

  function storeFormData() {
    const { searchMode, songSearchQuery, playlistSearchString } = formData;
    localStorage.setItem('searchMode', searchMode);

    if (searchMode == 'song') {
      localStorage.setItem('songSearchQuery_artist', songSearchQuery.artist);
      localStorage.setItem('songSearchQuery_title', songSearchQuery.title);
      localStorage.removeItem('playlistSearchString');
    } else if (searchMode == 'playlist') {
      localStorage.removeItem('songSearchQuery_artist');
      localStorage.removeItem('songSearchQuery_title');
      localStorage.setItem('playlistSearchString', playlistSearchString);
    }
  }

  return (
    <div className='w-full flex flex-col justify-center items-center gap-10'>
      <SearchBar formData={formData} handleFormUpdate={handleFormUpdate} handleSubmit={handleSubmit} />
      <SpotifyIntegrationBox handleFormUpdate={handleFormUpdate} />
    </div>
  );
};

export default SearchPage;
