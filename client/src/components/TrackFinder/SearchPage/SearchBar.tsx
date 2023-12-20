import { FormDataType } from '@/types';
import SearchTextInput from './SearchInput';
import SearchButton from './SearchButton';

const SearchBar = ({ formData, handleFormUpdate, handleSubmit }: { formData: FormDataType; handleFormUpdate: (formData: FormDataType) => void; handleSubmit: () => void }) => {
  return (
    <div className='flex md:flex-row flex-col w-4/5 gap-10'>
      {/* <SearchModeToggler formData={formData} handleFormUpdate={handleFormUpdate} /> */}
      <SearchTextInput formData={formData} handleFormUpdate={handleFormUpdate} />
      <SearchButton handleSubmit={handleSubmit} />
    </div>
  );
};

export default SearchBar;
