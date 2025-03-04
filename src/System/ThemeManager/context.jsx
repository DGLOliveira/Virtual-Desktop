import { createContext, useState, useEffect, lazy } from "react";
import Aqua from "./Themes/Aqua.json";
import Default from "./Themes/Default.json";

export const ThemeContext = createContext({
    theme: "",
    themeList: [],
    setTheme: () => { }
});

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("Default");
    const themeList = ["Default", "Aqua"];
    
    const changeRootStyle = (property, value) => {
        document.querySelector(":root").style.setProperty(`${property}`, value);
    };

    useEffect(() => {
        switch (theme) {
            case "Aqua":
                Object.keys(Aqua).forEach((key) => changeRootStyle(key, Aqua[key]));
                break;
            default:
                Object.keys(Default).forEach((key) => changeRootStyle(key, Default[key]));
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