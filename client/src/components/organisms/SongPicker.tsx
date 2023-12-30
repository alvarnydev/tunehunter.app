import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { ToastComponent } from '@/components/atoms/ToastComponent';
import { BiSearch } from 'react-icons/bi';
import MemoizedSpotifyIntegration from '../molecules/SpotifyIntegration';
import { RequestData } from '../../../../globalTypes';

const initialFormData: RequestData = {
  country: 'DE',
  artist: '',
  title: '',
  duration: 0,
};

const SongPickerLayout = ({ children }: PropsWithChildren) => {
  return <div className=' w-full flex flex-col justify-center items-center gap-10'>{children}</div>;
};

const SearchBar = ({ formData, handleFormUpdate, handleSubmit }: { formData: RequestData; handleFormUpdate: (formData: RequestData) => void; handleSubmit: () => void }) => {
  return (
    <div className='flex md:flex-row flex-col w-4/5 gap-10'>
      <SearchTextInput formData={formData} handleFormUpdate={handleFormUpdate} />
      <SearchButton handleSubmit={handleSubmit} />
    </div>
  );
};

const SearchTextInput = ({ formData, handleFormUpdate }: { formData: RequestData; handleFormUpdate: (newFormData: RequestData) => void }) => {
  const { t } = useTranslation();
  const { artist, title } = formData;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleFormUpdate({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleEnter(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      document.getElementById('submitBtn')?.click();
    }
  }

  return (
    <div className='w-full flex md:flex-row flex-col md:gap-10 gap-8 order-2'>
      <input type='text' name='artist' placeholder={t('searchbar.artist')} className='input input-primary rounded-full md:w-full border-2 tracking-wide' value={artist} onChange={handleChange} onKeyDown={handleEnter} />
      <input type='text' name='title' placeholder={t('searchbar.song')} className='input rounded-full input-primary md:w-full border-2 tracking-wide' value={title} onChange={handleChange} onKeyDown={handleEnter} />
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

const SongPicker = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [forceUpdate, setForceUpdate] = useState(false);
  // const [displayMode, setDisplayMode] = useState<'both' | 'search' | 'spotify'>('both'); // todo: remove this, use formData.searchMode instead
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

  const handleFormUpdate = useCallback((newFormData: RequestData, final?: boolean) => {
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

    const artist = searchParams.get('artist');
    const title = searchParams.get('title');
    if (artist && title) {
      setFormData((formData) => ({
        ...formData,
        artist,
        title,
      }));
    }
  };

  const isValidInput = (): boolean => {
    const { artist, title } = formData;

    if (artist == '' || title == '') {
      toast((toast) => <ToastComponent t={toast} text={t('errors.missingSongInput')} />);
      return false;
    }

    return true;
  };

  const buildGetParams = (): string => {
    const { country, artist, title, duration } = formData;
    let params = `?country=${country}`;

    params += `&artist=${artist}&title=${title}`;
    if (duration) {
      params += `&duration=${duration}`;
    }
    return params;
  };

  return (
    <SongPickerLayout>
      <SearchBar formData={formData} handleFormUpdate={handleFormUpdate} handleSubmit={handleSubmit} />
      <MemoizedSpotifyIntegration handleFormUpdate={handleFormUpdate} />
    </SongPickerLayout>
  );
};

export default SongPicker;
