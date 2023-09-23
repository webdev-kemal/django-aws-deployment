import React, { createContext, useContext, useState } from "react";

// export const ThemeContext = createContext();

export const ThemeContext = createContext({
  theme: "light", // default value
  toggleTheme: () => {} // default empty function
});


export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    console.log(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
