import { GiMusicalNotes } from 'react-icons/gi';
import { IoIosMusicalNote } from 'react-icons/io';
import { FormDataType } from '../../../../../types';

const SearchModeToggler = ({
  formData,
  handleFormUpdate,
}: {
  formData: FormDataType;
  handleFormUpdate: (newFormData: FormDataType) => void;
}) => {
  function handleChange() {
    if (formData.searchMode === 'song') {
      handleFormUpdate({
        ...formData,
        searchMode: 'playlist',
      });
      return;
    }

    handleFormUpdate({
      ...formData,
      searchMode: 'song',
    });
  }

  return (
    <label htmlFor='search-mode-switcher' className='swap swap-rotate md:order-1 order-3 m-auto'>
      <input
        id='search-mode-switcher'
        aria-labelledby='search-mode-switcher'
        type='checkbox'
        defaultChecked={formData.searchMode === 'playlist'}
        onChange={handleChange}
      />

      <div className='swap-on fill-current md:w-8 w-8 h-10 flex items-center'>
        <GiMusicalNotes size={40} />
      </div>
      <div className='swap-off fill-current md:w-8 w-8 h-10 flex items-center'>
        <IoIosMusicalNote size={40} />
      </div>
    </label>
  );
};

export default SearchModeToggler;
