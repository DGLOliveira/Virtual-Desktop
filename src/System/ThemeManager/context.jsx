import {createContext, useState, useEffect} from "react";

export const ThemeContext = createContext({
    theme: "",
    themeList: [],
    setTheme: () => {}
});

export function ThemeProvider({children}) {
    const [theme, setTheme] = useState("Default");
    const themeList = ["Default", "NewAqua"];

    
    const contextValue = {
        theme,
        themeList,
        setTheme
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}
export default ThemeProvider;