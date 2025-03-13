import { createContext, useState, useEffect } from "react";
import Aqua from "./Themes/Aqua.json";
import Default from "./Themes/Default.json";

export const ThemeContext = createContext({
    theme: "",
    themeList: [],
    setTheme: () => { },
    topBarIconTheme: "",
    topBarIconThemeList: [],
    setTopBarIconTheme: () => { },
    windowBackgroundFX: "",
    windowBackgroundFXList: [],
    setWindowBackgroundFX: () => { },
});

export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState("Default");
    const themeList = ["Default", "Aqua"];

    const [topBarIconTheme, setTopBarIconTheme] = useState("Default");
    const topBarIconThemeList = ["Default", "Aqua"];

    const [windowBackgroundFX, setWindowBackgroundFX] = useState("none");
    const windowBackgroundFXList = ["None", "Metallic"];
    const MetallicFX = {
        "--WindowBkgrImage": "var(--MetallicFXBkgrImage)",
        "--WindowBkgrPosition": "var(--MetallicFXBkgrPosition)",
        "--WindowBkgrSize": "var(--MetallicFXBkgrSize)",
        "--WindowBkgrRepeat": "var(--MetallicFXBkgrRepeat)",
        "--WindowBackdropFilter": "var(--MetallicFXBackdropFilter)",
    };
    // Translucent FX needs to be refined
    const TranslucentFX = {
        "--WindowBkgrImage": "var(--TranslucentFXBkgrImage)",
        "--WindowBkgrPosition": "var(--TranslucentFXBkgrPosition)",
        "--WindowBkgrSize": "var(--TranslucentFXBkgrSize)",
        "--WindowBkgrRepeat": "var(--TranslucentFXBkgrRepeat)",
        "--WindowBackdropFilter": "var(--TranslucentFXBackdropFilter)",
    };
    const NoneFX = {
        "--WindowBkgrImage": "none",
        "--WindowBkgrPosition": "none",
        "--WindowBkgrSize": "none",
        "--WindowBkgrRepeat": "none",
        "--WindowBackdropFilter": "none",
    };

    const changeRootStyle = (property, value) => {
        document.querySelector(":root").style.setProperty(`${property}`, value);
    };

    useEffect(() => {
        switch (theme) {
            case "Aqua":
                Object.keys(Aqua).forEach((key) => changeRootStyle(key, Aqua[key]));
                setTopBarIconTheme("Aqua");
                setWindowBackgroundFX("Metallic");
                break;
            default:
                Object.keys(Default).forEach((key) => changeRootStyle(key, Default[key]));
                setTopBarIconTheme("Default");
                setWindowBackgroundFX("None");
                break;
        }
    }, [theme]);

    useEffect(() => {
        console.log("FX changed " + windowBackgroundFX);
        switch (windowBackgroundFX) {
            case "Metallic":
                console.log("Metallic");
                Object.keys(MetallicFX).forEach((key) => changeRootStyle(key, MetallicFX[key]));
                break;
            case "Translucent":
                Object.keys(TranslucentFX).forEach((key) => changeRootStyle(key, TranslucentFX[key]));
                break;
            case "None":
                Object.keys(NoneFX).forEach((key) => changeRootStyle(key, NoneFX[key]));
                break;
            default:
                Object.keys(NoneFX).forEach((key) => changeRootStyle(key, NoneFX[key]));
                break;
        }
    }, [windowBackgroundFX]);

    const contextValue = {
        theme,
        themeList,
        setTheme,
        topBarIconTheme,
        topBarIconThemeList,
        setTopBarIconTheme,
        windowBackgroundFX,
        windowBackgroundFXList,
        setWindowBackgroundFX
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}
export default ThemeProvider;