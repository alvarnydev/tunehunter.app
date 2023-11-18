/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, PropsWithChildren, useContext, useState } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  accessToken: '',
  userData: {
    name: '',
    email: '',
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
  });

  const getUserData = async () => {
    // const response = await fetch('http://localhost:3001/api/user', {
    //   headers: { Authorization: `Bearer ${accessToken}` },
    // });
    // const data = await response.json();
    // setUserData(data);
  };

  const login = (accessToken: string) => {
    setIsAuthenticated(true);
    setAccessToken(accessToken);
    getUserData();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAccessToken('');
    setUserData({
      name: '',
      email: '',
    });
  };

  return <AuthContext.Provider value={{ isAuthenticated, userData, accessToken, login, logout }}>{children}</AuthContext.Provider>;
};
