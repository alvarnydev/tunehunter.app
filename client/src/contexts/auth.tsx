/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { removeFromLocalStorage } from '../utils/localStorage';
import { combinedFetchSpotifyData, fetchCurrentlyPlaying, fetchQueue, fetchRecentlyPlayed } from '../utils/fetchSpotifyData';
import { SpotifyDataType } from '../types';
import { TokenType } from '../../../types';

const initialUserData: SpotifyDataType = {
  isLoading: false,
  profileData: null,
  currentlyPlaying: null,
  queue: null,
  recentlyPlayed: null,
  topArtists: null,
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

  const refreshData = async (type: string) => {
    setUserData((userData) => ({ ...userData, isLoading: true }));
    let newData;

    switch (type) {
      case 'recentlyPlayed':
        newData = await fetchRecentlyPlayed(tokens.accessToken);
        setUserData({ ...userData, recentlyPlayed: newData, isLoading: false });
        break;
      case 'currentlyPlaying':
        newData = await fetchCurrentlyPlaying(tokens.accessToken);
        setUserData({ ...userData, currentlyPlaying: newData, isLoading: false });
        break;
      default:
        break;
    }
  };

  return <AuthContext.Provider value={{ isAuthenticated, userData, tokens, login, logout, refreshData }}>{children}</AuthContext.Provider>;
};
