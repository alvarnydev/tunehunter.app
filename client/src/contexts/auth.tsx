/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  accessToken: '',
  userData: {
    name: '',
    email: '',
  },
  login: () => {},
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
  });

  useEffect(() => {
    if (isAuthenticated) {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) return;

      setAccessToken(accessToken);
    } else {
      localStorage.removeItem('accessToken');
      setAccessToken('');
    }
  }, [isAuthenticated]);

  const login = () => {
    setIsAuthenticated(true);
    // todo: get user data from spotify api
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData({
      name: '',
      email: '',
    });
  };

  return <AuthContext.Provider value={{ isAuthenticated, userData, accessToken, login, logout }}>{children}</AuthContext.Provider>;
};
