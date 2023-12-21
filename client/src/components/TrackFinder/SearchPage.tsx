import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { FormDataType } from '@/types';
import { ToastComponent } from '@/components/UtilComponents/ToastComponent';
import MemoizedSpotifyIntegrationBox from './SearchPage/SpotifyIntegration';
import SearchBar from './SearchPage/SearchBar';
import SearchPageLayout from './SearchPage/SearchPageLayout';

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
  const [forceUpdate, setForceUpdate] = useState(false);
  const [displayMode, setDisplayMode] = useState<'both' | 'search' | 'spotify'>('both'); // todo: remove this, use formData.searchMode instead
  const navigate = useNavigate();
  const { t } = useTranslation();
  document.title = t('title');

  // todo: this is terrible, figure out another way
  /*
    I use handleformupdate for the manual update via the input fields but also for the update via the spotify integration box
    I can't use handleSubmit after handleFormUpdate in the spotifyintegration box because the state is still old so we have to somehow wait for the rerender of SearchPage
  */
  useEffect(() => {
    if (forceUpdate) {
      handleSubmit();
    }
    setForceUpdate(false);
  }, [forceUpdate]);

  const handleFormUpdate = useCallback((newFormData: FormDataType, final?: boolean) => {
    setFormData(newFormData);
    if (final) {
      setForceUpdate(true);
    }
  }, []);

  function handleSubmit() {
    if (!isValidInput()) {
      return;
    }

    const newParams = buildGetParams();
    navigate(`/results${newParams}`);
  }

  useEffect(() => {
    restoreFormData();
  }, []);

  const restoreFormData = () => {
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

  return (
    <SearchPageLayout>
      <SearchBar formData={formData} handleFormUpdate={handleFormUpdate} handleSubmit={handleSubmit} />
      <MemoizedSpotifyIntegrationBox handleFormUpdate={handleFormUpdate} />
    </SearchPageLayout>
  );
};

export default SearchPage;
