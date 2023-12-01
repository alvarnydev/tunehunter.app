import SearchModeToggler from './SearchModeToggler';
import SearchTextInput from './SearchInput';
import SearchButton from './SearchButton';
import { FormDataType } from '../../../../../types';

const SearchBar = ({ formData, handleFormUpdate, handleSubmit }: { formData: FormDataType; handleFormUpdate: (formData: FormDataType) => void; handleSubmit: () => void }) => {
  return (
    <div className='flex md:flex-row flex-col w-4/5 md:gap-10 gap-8'>
      <SearchModeToggler formData={formData} handleFormUpdate={handleFormUpdate} />
      <SearchTextInput formData={formData} handleFormUpdate={handleFormUpdate} />
      <SearchButton handleSubmit={handleSubmit} />
    </div>
  );
};

export default SearchBar;
