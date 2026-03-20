import { createContext, useContext, useState } from 'react';

type Theme = 'dark' | 'light';

const ThemeContext = createContext<any>(null);

export const ThemeProviderCustom = ({ children }: any) => {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme((prev: Theme) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeCustom = () => useContext(ThemeContext);