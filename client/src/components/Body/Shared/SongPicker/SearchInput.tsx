import { useTranslation } from 'react-i18next';
import { FormDataType } from '@/types';

const SearchTextInput = ({ formData, handleFormUpdate }: { formData: FormDataType; handleFormUpdate: (newFormData: FormDataType) => void }) => {
  return (
    <div className='w-full flex md:flex-row flex-col md:gap-10 gap-8 order-2'>
      {formData.searchMode === 'song' && <SongInput formData={formData} handleFormUpdate={handleFormUpdate} />}
      {formData.searchMode === 'playlist' && <PlaylistInput formData={formData} handleFormUpdate={handleFormUpdate} />}
    </div>
  );
};

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
    <input type='text' placeholder='https://open.spotify.com/playlist/4Zn1Wd...' className='input input-primary rounded-full md:w-full border-2 tracking-wide' value={formData.playlistSearchString} onChange={handleChange} onKeyDown={handleSubmit} />
  );
};

function handleSubmit(e: React.KeyboardEvent) {
  if (e.key === 'Enter') {
    document.getElementById('submitBtn')?.click();
  }
}

export default SearchTextInput;
