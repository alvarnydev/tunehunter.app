/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { removeFromLocalStorage } from '../utils/localStorage';
import { fetchRecentlyPlayed } from '../utils/fetchSpotifyData';

export const AuthContext = createContext({
  isAuthenticated: false,
  accessToken: '',
  userData: {
    name: '',
    email: '',
    imagePath: '',
    spotify: {
      totalLikes: 0,
      totalSongs: 0,
      searches: 0,
    },
  },
  login: (_accessToken: string) => {},
  logout: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    imagePath: '',
    spotify: {
      totalLikes: 0,
      totalSongs: 0,
      searches: 0,
    },
  });

  const login = (accessToken: string) => {
    setIsAuthenticated(true);
    setAccessToken(accessToken);
    getUserData(accessToken);
  };

  const logout = () => {
    removeFromLocalStorage('access_token');
    setIsAuthenticated(false);
    setAccessToken('');
    setUserData({
      name: '',
      email: '',
      imagePath: '',
      spotify: {
        totalLikes: 0,
        totalSongs: 0,
        searches: 0,
      },
    });
  };

  const getUserData = async (accessToken: string) => {
    const recentlyPlayed = fetchRecentlyPlayed(accessToken);
    // setUserData(data);
  };

  return <AuthContext.Provider value={{ isAuthenticated, userData, accessToken, login, logout }}>{children}</AuthContext.Provider>;
};
