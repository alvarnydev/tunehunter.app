/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { PropsWithChildren, createContext, useContext, useState } from 'react';

const ThemeContext = createContext({
  theme: 'synthwave',
  changeTheme: (_theme: string) => {},
  toggleTheme: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState('synthwave');

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'synthwave' ? 'valentine' : 'synthwave';
    setTheme(newTheme);

    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return <ThemeContext.Provider value={{ theme, changeTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
