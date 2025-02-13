// ThemeContext.ts

import { BaseTheme, DarkTheme, LightTheme } from '@/src/styles/theme.style';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';


interface ThemeContextType {
  theme: BaseTheme;
  toggleTheme: () => void;
}

// Criação do contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(DarkTheme);

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setTheme(colorScheme === 'dark' ? DarkTheme : LightTheme);
  }, []);

  useEffect(() => {
    if(theme === DarkTheme) {
      console.log("Dark Theme")
      Appearance.setColorScheme("dark")
    } else {
      console.log("Light Theme")
      Appearance.setColorScheme("light")
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === LightTheme ? DarkTheme : LightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return context;
};
