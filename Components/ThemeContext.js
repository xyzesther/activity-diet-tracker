import React, { createContext, useState, useContext } from 'react';
import { colors } from '../styles/styles';

const ThemeContext = createContext();

const themes = {
    light: {
      background: colors.background.primary,
      textColor: colors.text.secondary,
    },
    dark: {
      background: colors.background.dark,
      textColor: colors.text.primary,
    },
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes.light);

    function toggleTheme() {
      setTheme(
        (prevTheme) => (
          prevTheme === themes.light ? themes.dark : themes.light
        )
      );
    };


    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
  };

  export const useTheme = () => useContext(ThemeContext);
