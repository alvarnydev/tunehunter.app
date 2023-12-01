/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { removeFromLocalStorage } from '../utils/localStorage';
import { combinedFetchSpotifyData, fetchRecentlyPlayed } from '../utils/fetchSpotifyData';
import { SpotifyDataType } from '../types';

const initialUserData: SpotifyDataType = {
  isLoading: false,
  profileData: null,
  currentlyPlaying: null,
  queue: null,
  recentlyPlayed: null,
  topArtists: null,
};

export const AuthContext = createContext({
  isAuthenticated: false,
  accessToken: '',
  userData: initialUserData,
  login: (_accessToken: string) => {},
  logout: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [userData, setUserData] = useState<SpotifyDataType>(initialUserData);

  const login = (accessToken: string) => {
    setIsAuthenticated(true);
    setAccessToken(accessToken);
    getUserData(accessToken);
  };

  const logout = () => {
    removeFromLocalStorage('access_token');
    setIsAuthenticated(false);
    setAccessToken('');
    setUserData(initialUserData);
  };

  const getUserData = async (accessToken: string) => {
    setUserData((userData) => ({ ...userData, isLoading: true }));
    const spotifyData = await combinedFetchSpotifyData(accessToken);
    setUserData({ ...spotifyData, isLoading: false });
  };

  return <AuthContext.Provider value={{ isAuthenticated, userData, accessToken, login, logout }}>{children}</AuthContext.Provider>;
};
