import SpotifyIntegrationBox from './SearchPage/SpotifyIntegrationBox';
import SearchBar from './SearchPage/SearchBar';

const SearchPage = () => {
  return (
    <div className={`w-full flex flex-col justify-center items-center gap-16 md:gap-[2.8vh] 'md:gap-[2.8vh]'`}>
      <SearchBar />
      <SpotifyIntegrationBox />
    </div>
  );
};

export default SearchPage;
