import SpotifyIntegrationBox from './SearchPage/SpotifyIntegrationBox';
import SearchBar from './SearchPage/SearchBar';

const SearchPage = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center gap-10'>
      <SearchBar />
      <SpotifyIntegrationBox />
    </div>
  );
};

export default SearchPage;
