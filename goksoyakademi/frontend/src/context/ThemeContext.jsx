import React, { createContext, useContext, useState, useEffect } from "react";

// export const ThemeContext = createContext();

export const ThemeContext = createContext({
  theme: "light", // default value
  toggleTheme: () => {}, // default empty function
});

export const ThemeProvider = ({ children }) => {
  const initialTheme = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "light";

  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]); // This effect runs whenever 'theme' changes

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
