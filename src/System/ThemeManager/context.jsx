import {createContext, useState} from "react";

export const ThemeContext = createContext({
    theme: "",
    setTheme: () => {}
});

export function ThemeProvider({children}) {
    const [theme, setTheme] = useState("Default");

    const contextValue = {
        theme,
        setTheme
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}
export default ThemeProvider;