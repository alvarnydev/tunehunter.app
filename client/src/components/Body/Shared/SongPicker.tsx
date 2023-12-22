import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { FormDataType } from '@/types';
import { ToastComponent } from '@/components/Shared/ToastComponent';
import { BiSearch } from 'react-icons/bi';
import MemoizedSpotifyIntegration from './SpotifyIntegration';

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

const SongPicker = () => {
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

  useEffect(() => {
    restoreFormData();
  }, []);

  const handleFormUpdate = useCallback((newFormData: FormDataType, final?: boolean) => {
    setFormData(newFormData);
    if (final) {
      setForceUpdate(true);
    }
  }, []);

  const handleSubmit = () => {
    if (!isValidInput()) {
      return;
    }

    const newParams = buildGetParams();
    navigate(`/results${newParams}`);
  };

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

  const isValidInput = (): boolean => {
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
  };

  const buildGetParams = (): string => {
    const { country, searchMode, songSearchQuery, playlistSearchString } = formData;
    let params = `?type=${searchMode}&country=${country}`;

    if (searchMode == 'song') {
      params += `&artist=${songSearchQuery.artist}&title=${songSearchQuery.title}&duration=${songSearchQuery.duration}`;
    } else if (searchMode == 'playlist') {
      params += `&url=${playlistSearchString}`;
    }
    return params;
  };

  const SongPickerLayout = ({ children }: PropsWithChildren) => {
    return <div className=' w-full flex flex-col justify-center items-center gap-10'>{children}</div>;
  };

  const SearchBar = ({ formData, handleFormUpdate, handleSubmit }: { formData: FormDataType; handleFormUpdate: (formData: FormDataType) => void; handleSubmit: () => void }) => {
    const SearchTextInput = ({ formData, handleFormUpdate }: { formData: FormDataType; handleFormUpdate: (newFormData: FormDataType) => void }) => {
      function handleSubmit(e: React.KeyboardEvent) {
        if (e.key === 'Enter') {
          document.getElementById('submitBtn')?.click();
        }
      }

      const SongInput = ({ formData, handleFormUpdate }: { formData: FormDataType; handleFormUpdate: (newFormData: FormDataType) => void }) => {
        const { t } = useTranslation();
        const { songSearchQuery } = formData;

        function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
          handleFormUpdate({
            ...formData,
            songSearchQuery: { ...songSearchQuery, [e.target.name]: e.target.value },
          });
        }

        return (
          <>
            <input type='text' name='artist' placeholder={t('searchbar.artist')} className='input input-primary rounded-full md:w-full border-2 tracking-wide' value={songSearchQuery.artist} onChange={handleChange} onKeyDown={handleSubmit} />
            <input type='text' name='title' placeholder={t('searchbar.song')} className='input rounded-full input-primary md:w-full border-2 tracking-wide' value={songSearchQuery.title} onChange={handleChange} onKeyDown={handleSubmit} />
          </>
        );
      };

      const PlaylistInput = ({ formData, handleFormUpdate }: { formData: FormDataType; handleFormUpdate: (newFormData: FormDataType) => void }) => {
        function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
          const value = e.target.value;
          handleFormUpdate({ ...formData, playlistSearchString: value });
        }

        return (
          <input
            type='text'
            placeholder='https://open.spotify.com/playlist/4Zn1Wd...'
            className='input input-primary rounded-full md:w-full border-2 tracking-wide'
            value={formData.playlistSearchString}
            onChange={handleChange}
            onKeyDown={handleSubmit}
          />
        );
      };

      return (
        <div className='w-full flex md:flex-row flex-col md:gap-10 gap-8 order-2'>
          {formData.searchMode === 'song' && <SongInput formData={formData} handleFormUpdate={handleFormUpdate} />}
          {formData.searchMode === 'playlist' && <PlaylistInput formData={formData} handleFormUpdate={handleFormUpdate} />}
        </div>
      );
    };

    const SearchButton = ({ handleSubmit }: { handleSubmit: () => void }) => {
      const { t } = useTranslation();

      return (
        <div className='order-3 md:flex'>
          <button id='submitBtn' type='submit' className='btn btn-primary font-normal md:w-auto w-1/2 m-auto rounded-full gap-2 flex normal-case px-4 text-base tracking-wide' onClick={handleSubmit}>
            <BiSearch size={18} />
            {t('searchbar.search')}
          </button>
        </div>
      );
    };

    return (
      <div className='flex md:flex-row flex-col w-4/5 gap-10'>
        {/* <SearchModeToggler formData={formData} handleFormUpdate={handleFormUpdate} /> */}
        <SearchTextInput formData={formData} handleFormUpdate={handleFormUpdate} />
        <SearchButton handleSubmit={handleSubmit} />
      </div>
    );
  };

  return (
    <SongPickerLayout>
      <SearchBar formData={formData} handleFormUpdate={handleFormUpdate} handleSubmit={handleSubmit} />
      <MemoizedSpotifyIntegration handleFormUpdate={handleFormUpdate} />
    </SongPickerLayout>
  );
};

export default SongPicker;
