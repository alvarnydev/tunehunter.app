/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, PropsWithChildren, useState } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  user: {
    name: '',
    email: '',
  },
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
  });

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser({
      name: '',
      email: '',
    });
    // todo: clear local storage
  };

  return <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>{children}</AuthContext.Provider>;
};
