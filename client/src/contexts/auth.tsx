/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { removeFromLocalStorage } from '../utils/localStorage';
import { combinedFetchSpotifyData, fetchCurrentlyPlaying, fetchProfileData, fetchQueue, fetchRecentlyPlayed, fetchTopArtists, fetchTopTracks } from '../utils/fetchSpotifyData';
import { SpotifyDataType } from '../types';
import { TokenType } from '../../../types';

const initialUserData: SpotifyDataType = {
  isLoading: false,
  profileData: null,
  currentlyPlaying: null,
  queue: null,
  recentlyPlayed: null,
  topArtists: null,
  topTracks: null,
};

const initialTokens = {
  accessToken: '',
  refreshToken: '',
};

export const AuthContext = createContext({
  isAuthenticated: false,
  tokens: initialTokens,
  userData: initialUserData,
  login: (_tokens: TokenType) => {},
  logout: () => {},
  refreshData: (_type: string) => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokens, setTokens] = useState(initialTokens);
  const [userData, setUserData] = useState<SpotifyDataType>(initialUserData);

  const login = (tokens: TokenType) => {
    setIsAuthenticated(true);
    setTokens({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
    getUserData(tokens.accessToken);
  };

  const logout = () => {
    removeFromLocalStorage('access_token');
    setIsAuthenticated(false);
    setTokens(initialTokens);
    setUserData(initialUserData);
  };

  const getUserData = async (accessToken: string) => {
    setUserData((userData) => ({ ...userData, isLoading: true }));
    const spotifyData = await combinedFetchSpotifyData(accessToken);
    setUserData({ ...spotifyData, isLoading: false });
  };

  const refreshData = async (type?: string) => {
    console.log('refreshing data');
    setUserData((userData) => ({ ...userData, isLoading: true }));
    let newData, newData2;

    switch (type) {
      case 'profileData':
        newData = await fetchProfileData(tokens.accessToken);
        setUserData({ ...userData, profileData: newData, isLoading: false });
        break;
      case 'currentlyPlaying':
        newData = await fetchCurrentlyPlaying(tokens.accessToken);
        setUserData({ ...userData, currentlyPlaying: newData, isLoading: false });
        break;
      case 'recentlyPlayed':
        newData = await fetchRecentlyPlayed(tokens.accessToken);
        setUserData({ ...userData, recentlyPlayed: newData, isLoading: false });
        break;
      case 'currentlyAndRecently':
        newData = await fetchCurrentlyPlaying(tokens.accessToken);
        newData2 = await fetchRecentlyPlayed(tokens.accessToken);
        setUserData({ ...userData, currentlyPlaying: newData, recentlyPlayed: newData2, isLoading: false });
        break;
      case 'queue':
        newData = await fetchQueue(tokens.accessToken);
        setUserData({ ...userData, queue: newData, isLoading: false });
        break;
      case 'topArtists':
        newData = await fetchTopArtists(tokens.accessToken);
        setUserData({ ...userData, topArtists: newData, isLoading: false });
        break;
      case 'topTracks':
        newData = await fetchTopTracks(tokens.accessToken);
        setUserData({ ...userData, topTracks: newData, isLoading: false });
        break;
      default:
        newData = await combinedFetchSpotifyData(tokens.accessToken);
        setUserData({ ...newData, isLoading: false });
        break;
    }
  };

  return <AuthContext.Provider value={{ isAuthenticated, userData, tokens, login, logout, refreshData }}>{children}</AuthContext.Provider>;
};
