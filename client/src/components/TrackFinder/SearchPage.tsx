import SpotifyIntegrationBox from './SearchPage/SpotifyIntegrationBox';
import SearchBar from './SearchPage/SearchBar';
import { useAuth } from '../../contexts/auth';

const SearchPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className={`w-full flex flex-col justify-center items-center gap-16 md:gap-[2.8vh] ${isAuthenticated ? 'md:gap-[4.6vh]' : 'md:gap-[2.8vh]'}`}>
      <SearchBar />
      <SpotifyIntegrationBox />
    </div>
  );
};

export default SearchPage;
