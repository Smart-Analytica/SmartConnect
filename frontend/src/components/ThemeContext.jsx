import React, { createContext, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const prefersDarkMode = useMediaQuery({ query: '(prefers-color-scheme: dark)' });
  
  // Set initial mode based on user preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      setDarkMode(savedTheme === 'true');
    } else if (prefersDarkMode) {
      setDarkMode(true);
      localStorage.setItem('darkMode', 'true');
    }
  }, [prefersDarkMode]);
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
