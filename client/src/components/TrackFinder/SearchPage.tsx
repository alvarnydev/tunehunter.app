import SpotifyIntegrationBox from './SearchPage/SpotifyIntegrationBox';
import SearchBar from './SearchPage/SearchBar';
import { useEffect, useState } from 'react';

const SearchPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log('access token: ' + localStorage.getItem('accessToken'));
  });

  return (
    <>
      <SearchBar />
      {!loggedIn && <SpotifyIntegrationBox />}
    </>
  );
};

export default SearchPage;
