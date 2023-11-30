import { BiSearch } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast, { Toast } from 'react-hot-toast';
import { FormDataType } from '../../../../../types';

const ToastComponent = ({ t, text }: { t: Toast; text: string }) => {
  return (
    <span>
      <div className='flex justify-center items-center gap-4 mx-4'>
        <span>{text}</span>
        <button className='bg-white/50 border-2 border-black rounded-lg py-1 px-2 m-0' onClick={() => toast.dismiss(t.id)}>
          Dismiss
        </button>
      </div>
    </span>
  );
};

const SearchButton = ({ formData }: { formData: FormDataType }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function isValidInput(): boolean {
    const { searchMode, songSearchQuery, playlistSearchString } = formData;

    if (searchMode == 'song') {
      if (songSearchQuery.artist == '' || songSearchQuery.title == '') {
        toast((t) => <ToastComponent t={t} text={'Heya there, need both fields to continue!'} />);
        return false;
      }
    } else if (searchMode == 'playlist' && playlistSearchString == '') {
      toast((t) => <ToastComponent t={t} text={'Hey there, please put in a URL!'} />);
      return false;
    }

    return true;
  }

  function buildGetParams(): string {
    const { searchMode, songSearchQuery, playlistSearchString } = formData;
    let params = `?type=${searchMode}&country=DE`; // TODO: other countries

    if (searchMode == 'song') {
      params += `&artist=${songSearchQuery.artist}&title=${songSearchQuery.title}`;
    } else if (searchMode == 'playlist') {
      params += `&url=${playlistSearchString}`;
    }
    return params;
  }

  function saveFormData() {
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

  function handleClick() {
    if (!isValidInput()) {
      return;
    }

    saveFormData();

    const params = buildGetParams();

    navigate(`/results${params}`);
    // if (setSearchParams && searchParams) {
    //   setSearchParams(new URLSearchParams(params));
    // }
  }

  return (
    <div className='order-3 md:flex'>
      <button id='submitBtn' type='submit' className='btn btn-primary font-normal md:w-auto w-1/2 m-auto rounded-full gap-2 flex normal-case px-4 text-base tracking-wide' onClick={handleClick}>
        <BiSearch size={18} />
        {t('searchbar.search')}
      </button>
    </div>
  );
};

export default SearchButton;
