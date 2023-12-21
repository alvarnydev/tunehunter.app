/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { removeFromLocalStorage } from '../utils/localStorage';
import { combinedFetchSpotifyData, fetchCurrentlyPlaying, fetchProfileData, fetchQueue, fetchRecentlyPlayed, fetchTopArtists, fetchTopTracks } from '../utils/fetchSpotifyData';
import { SpotifyDataType } from '@/types';
import { getTokens } from '@/utils/fetchSpotifyAuth';

const initialUserData: SpotifyDataType = {
  profileData: null,
  currentlyPlaying: null,
  queue: null,
  recentlyPlayed: null,
  topArtists: null,
  topTracks: null,
};

const AuthContext = createContext({
  isAuthenticated: false,
  userData: initialUserData,
  login: async () => {},
  logout: () => {},
  refreshData: async (_type?: string) => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<SpotifyDataType>(initialUserData);

  const login = async () => {
    await getTokens();
    setIsAuthenticated(true);
    getUserData();
  };

  const logout = () => {
    removeFromLocalStorage('access_token');
    setIsAuthenticated(false);
    setUserData(initialUserData);
  };

  const getUserData = async () => {
    const { accessToken } = await getTokens();
    const spotifyData = await combinedFetchSpotifyData(accessToken);
    setUserData({ ...spotifyData });
  };

  const refreshData = async (type?: string) => {
    const { accessToken } = await getTokens();
    console.log(`refreshing ${type} data`);
    let newData, newData2;

    switch (type) {
      case 'profileData':
        newData = await fetchProfileData(accessToken);
        setUserData({ ...userData, profileData: newData });
        break;
      case 'currentlyPlaying':
        newData = await fetchCurrentlyPlaying(accessToken);
        setUserData({ ...userData, currentlyPlaying: newData });
        break;
      case 'recentlyPlayed':
        newData = await fetchRecentlyPlayed(accessToken);
        setUserData({ ...userData, recentlyPlayed: newData });
        break;
      case 'currentlyAndRecently':
        newData = await fetchCurrentlyPlaying(accessToken);
        newData2 = await fetchRecentlyPlayed(accessToken);
        setUserData({ ...userData, currentlyPlaying: newData, recentlyPlayed: newData2 });
        break;
      case 'queue':
        newData = await fetchQueue(accessToken);
        setUserData({ ...userData, queue: newData });
        break;
      case 'topArtists':
        newData = await fetchTopArtists(accessToken);
        setUserData({ ...userData, topArtists: newData });
        break;
      case 'topTracks':
        newData = await fetchTopTracks(accessToken);
        setUserData({ ...userData, topTracks: newData });
        break;
      default:
        newData = await combinedFetchSpotifyData(accessToken);
        setUserData({ ...newData });
        break;
    }
  };

  return <AuthContext.Provider value={{ isAuthenticated, userData, login, logout, refreshData }}>{children}</AuthContext.Provider>;
};
