import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { BiSearch } from 'react-icons/bi';
import MemoizedSpotifyIntegration from '../molecules/SpotifyIntegration';
import { DataRequestQuery } from '../../../../globalTypes';

const SearchBar = ({ formData, handleFormUpdate, handleSubmit }: { formData: DataRequestQuery; handleFormUpdate: (formData: DataRequestQuery) => void; handleSubmit: () => boolean }) => {
  const [inputError, setInputError] = useState(false);

  return (
    <div className='flex md:flex-row flex-col w-4/5 gap-10'>
      <SearchTextInput formData={formData} handleFormUpdate={handleFormUpdate} setInputError={setInputError} />
      <SearchButton handleSubmit={handleSubmit} inputError={inputError} setInputError={setInputError} />
    </div>
  );
};

const SearchTextInput = ({ formData, handleFormUpdate, setInputError }: { formData: DataRequestQuery; handleFormUpdate: (newFormData: DataRequestQuery) => void; setInputError: Dispatch<SetStateAction<boolean>> }) => {
  const { t } = useTranslation();
  const { artist, title } = formData;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputError(false);
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

const SearchButton = ({ handleSubmit, inputError, setInputError }: { handleSubmit: () => boolean; inputError: boolean; setInputError: Dispatch<SetStateAction<boolean>> }) => {
  const { t } = useTranslation();

  return (
    <div className={`order-3 md:flex ${inputError === true ? 'tooltip tooltip-open' : ''}`} data-tip={t('errors.missingSongInput')}>
      <button id='submitBtn' type='submit' className='btn btn-primary font-normal md:w-auto w-1/2 m-auto rounded-full gap-2 flex normal-case px-4 text-base tracking-wide' onClick={() => setInputError(!handleSubmit())}>
        <BiSearch size={18} />
        {t('searchbar.search')}
      </button>
    </div>
  );
};

const initialFormData: DataRequestQuery = {
  country: 'DE',
  artist: '',
  title: '',
  duration: 0,
  album: '',
};

const SongPicker = () => {
  const [formData, setFormData] = useState(initialFormData);
  // const [displayMode, setDisplayMode] = useState<'both' | 'search' | 'spotify'>('both');
  const navigate = useNavigate();
  document.title = 'RekordStore';

  const handleSubmit = useCallback(
    (submitData?: DataRequestQuery) => {
      let { country, artist, title, duration, album } = formData; // Either from form: big search button
      if (submitData) {
        ({ country, artist, title, duration, album } = submitData); // Or from spotify integration
      }

      const buildGetParams = (): string => {
        let params = `?country=${country}`;
        params += `&artist=${artist}&title=${title}`;
        if (duration) params += `&duration=${duration}`;
        if (album) params += `&album=${album}`;
        return params;
      };

      if (artist && title) {
        const newParams = buildGetParams();
        navigate(`/results${newParams}`);
        return true;
      }

      return false;
    },
    [formData, navigate]
  );

  useEffect(() => {
    restoreFormData();
  }, []);

  const handleFormUpdate = useCallback((newFormData: DataRequestQuery) => {
    setFormData(newFormData);
  }, []);

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

  return (
    <div className=' w-full flex flex-col justify-center items-center gap-10'>
      <SearchBar formData={formData} handleFormUpdate={handleFormUpdate} handleSubmit={handleSubmit} />
      <MemoizedSpotifyIntegration handleSubmit={handleSubmit} />
    </div>
  );
};

export default SongPicker;
