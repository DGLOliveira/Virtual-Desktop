import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
    theme: "",
    themeList: [],
    setTheme: () => { }
});

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("Default");
    const themeList = ["Default", "NewAqua"];

    useEffect(() => {
        switch (theme) {
            case "NewAqua":
                document.querySelector(":root").style.setProperty("--WindowTopBarFlexDirection", "row-reverse");
                break;
            default:
                document.documentElement.style.setProperty("--WindowTopBarFlexDirection", "row");
                break;
        }
    }, [theme]);


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