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
    backgroundFXList: [],
    windowBackgroundFX: "",
    setWindowBackgroundFX: () => { },
    dialogBackgroundFX: "",
    setDialogBackgroundFX: () => { },
});

export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState("Default");
    const themeList = ["Default", "Aqua"];

    const [topBarIconTheme, setTopBarIconTheme] = useState("Default");
    const topBarIconThemeList = ["Default", "Aqua"];

    const [windowBackgroundFX, setWindowBackgroundFX] = useState("none");
    const [dialogBackgroundFX, setDialogBackgroundFX] = useState("none");

    const backgroundFXList = ["None", "Metallic"];
    const MetallicFX = {
        BkgrImage: "var(--MetallicFXBkgrImage)",
        BkgrPosition: "var(--MetallicFXBkgrPosition)",
        BkgrSize: "var(--MetallicFXBkgrSize)",
        BkgrRepeat: "var(--MetallicFXBkgrRepeat)",
        BackdropFilter: "var(--MetallicFXBackdropFilter)",
    };
    // Translucent FX needs to be refined
    const TranslucentFX = {
        BkgrImage: "var(--TranslucentFXBkgrImage)",
        BkgrPosition: "var(--TranslucentFXBkgrPosition)",
        BkgrSize: "var(--TranslucentFXBkgrSize)",
        BkgrRepeat: "var(--TranslucentFXBkgrRepeat)",
        BackdropFilter: "var(--TranslucentFXBackdropFilter)",
    };
    const NoneFX = {
        BkgrImage: "none",
        BkgrPosition: "none",
        BkgrSize: "none",
        BkgrRepeat: "none",
        BackdropFilter: "none",
    };

    const changeRootStyle = (property, value) => {
        document.querySelector(":root").style.setProperty(`${property}`, value);
    };
    const switchTheme = (value) => {
        switch (value) {
            case "Aqua":
                Object.keys(Aqua).forEach((key) => changeRootStyle(key, Aqua[key]));
                setTopBarIconTheme("Aqua");
                setWindowBackgroundFX("Metallic");
                setDialogBackgroundFX("Metallic");
                break;
            default:
                Object.keys(Default).forEach((key) => changeRootStyle(key, Default[key]));
                setTopBarIconTheme("Default");
                setWindowBackgroundFX("None");
                setDialogBackgroundFX("None");
                break;
        }
    };

    const changeRootStyleFX = (target, property, value) => {
        document.querySelector(":root").style.setProperty(`--${target}${property}`, value);
    };
    const switchFX = (target, value) => {
        switch (value) {
            case "Metallic":
                Object.keys(MetallicFX).forEach((key) => changeRootStyleFX(target, key, MetallicFX[key]));
                break;
            case "Translucent":
                Object.keys(TranslucentFX).forEach((key) => changeRootStyleFX(target, key, TranslucentFX[key]));
                break;
            case "None":
                Object.keys(NoneFX).forEach((key) => changeRootStyleFX(target, key, NoneFX[key]));
                break;
            default:
                Object.keys(NoneFX).forEach((key) => changeRootStyleFX(target, key, NoneFX[key]));
                break;
        }
    };

    useEffect(() => {switchTheme(theme);}, [theme]);

    useEffect(() => {switchFX("Window", windowBackgroundFX);}, [windowBackgroundFX]);
    useEffect(() => {switchFX("Dialog", dialogBackgroundFX);}, [dialogBackgroundFX]);

    const contextValue = {
        theme,
        themeList,
        setTheme,
        topBarIconTheme,
        topBarIconThemeList,
        setTopBarIconTheme,
        windowBackgroundFX,
        backgroundFXList,
        setWindowBackgroundFX
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}
export default ThemeProvider;