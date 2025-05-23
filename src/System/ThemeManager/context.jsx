import { createContext, useState, useEffect } from "react";
import Aqua from "./Themes/Aqua.json";
import Default from "./Themes/Default.json";
import Classic from "./Themes/Classic.json";
import Aero from "./Themes/Aero.json";

export const ThemeContext = createContext({
    theme: "",
    themeList: [],
    setTheme: () => { },
    topBarIconTheme: "",
    topBarIconThemeList: [],
    setTopBarIconTheme: () => { },
    dialogButtonTheme: "",
    dialogButtonThemeList: [],
    setDialogButtonTheme: () => { },
    backgroundFXList: [],
    windowBackgroundFX: "",
    setWindowBackgroundFX: () => { },
    dialogBackgroundFX: "",
    setDialogBackgroundFX: () => { },
    taskbarBackgroundFX: "",
    setTaskbarBackgroundFX: () => { },
    startButtonTheme: "",
    startButtonThemeList: [],
    setStartButtonTheme: () => { },
    liveAppsTheme: "",
    liveAppsThemeList: [],
    setLiveAppsTheme: () => { },
    startMenuBackgroundFX: "",
    setStartMenuBackgroundFX: () => { },
    taskbarWindowBackgroundFX: "",
    setTaskbarWindowBackgroundFX: () => { },
    navMenuLocation: "",
    navMenuLocationList: [],
    setNavMenuLocation: () => { },
    dialogButtonsLocation: "",
    dialogButtonsLocationList: [],
    setDialogButtonsLocation: () => { },

});

export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState("Default");
    const themeList = ["Default", "Aero", "Aqua", "Classic"];

    const [startButtonTheme, setStartButtonTheme] = useState("Default");
    const startButtonThemeList = ["Default", "Aero", "Aqua", "Classic"];

    const [liveAppsTheme, setLiveAppsTheme] = useState("Default");
    const liveAppsThemeList = ["Default", "Aero", "Aqua", "Classic"];

    const [topBarIconTheme, setTopBarIconTheme] = useState("Default");
    const topBarIconThemeList = ["Default", "Aero", "Aqua", "Classic"];

    const [dialogButtonTheme, setDialogButtonTheme] = useState("Default");
    const dialogButtonThemeList = ["Default", "Aero", "Aqua", "Classic"];

    const [dialogButtonsLocation, setDialogButtonsLocation] = useState("in window");
    const dialogButtonsLocationList = ["in info container", "in window"];

    const [windowBackgroundFX, setWindowBackgroundFX] = useState("none");
    const [dialogBackgroundFX, setDialogBackgroundFX] = useState("none");
    const [taskbarBackgroundFX, setTaskbarBackgroundFX] = useState("none");
    const [startMenuBackgroundFX, setStartMenuBackgroundFX] = useState("none");
    const [taskbarWindowBackgroundFX, setTaskbarWindowBackgroundFX] = useState("none");

    const [navMenuLocation, setNavMenuLocation] = useState("in top bar");
    const navMenuLocationList = ["in app", "in top bar"];

    const backgroundFXList = ["None", "Metallic", "Translucent"];
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
            case "Classic":
                Object.keys(Classic).forEach((key) => changeRootStyle(key, Classic[key]));
                setStartButtonTheme("Classic");
                setLiveAppsTheme("Classic");
                setTopBarIconTheme("Classic");
                setDialogButtonTheme("Classic");
                setWindowBackgroundFX("None");
                setDialogBackgroundFX("None");
                setTaskbarBackgroundFX("None");
                setTaskbarWindowBackgroundFX("None");
                setStartMenuBackgroundFX("None");
                setNavMenuLocation("in top bar");
                setDialogButtonsLocation("in info container");
                break;
            case "Aqua":
                Object.keys(Aqua).forEach((key) => changeRootStyle(key, Aqua[key]));
                setStartButtonTheme("Aqua");
                setLiveAppsTheme("Aqua");
                setTopBarIconTheme("Aqua");
                setDialogButtonTheme("Aqua");
                setWindowBackgroundFX("Metallic");
                setDialogBackgroundFX("Metallic");
                setTaskbarBackgroundFX("Metallic");
                setStartMenuBackgroundFX("Metallic");
                setTaskbarWindowBackgroundFX("Metallic");
                setNavMenuLocation("in top bar");
                setDialogButtonsLocation("in window");
                break;
            case "Aero":
                Object.keys(Aero).forEach((key) => changeRootStyle(key, Aero[key]));
                setStartButtonTheme("Aero");
                setLiveAppsTheme("Aero");
                setTopBarIconTheme("Aero");
                setDialogButtonTheme("Aero");
                setWindowBackgroundFX("Translucent");
                setDialogBackgroundFX("Translucent");
                setTaskbarBackgroundFX("Translucent");
                setTaskbarWindowBackgroundFX("Translucent");
                setStartMenuBackgroundFX("Translucent");
                setNavMenuLocation("in app");
                setDialogButtonsLocation("in info container");
                break;
            default:
                Object.keys(Default).forEach((key) => changeRootStyle(key, Default[key]));
                setStartButtonTheme("Default");
                setLiveAppsTheme("Default");
                setTopBarIconTheme("Default");
                setDialogButtonTheme("Default");
                setWindowBackgroundFX("None");
                setDialogBackgroundFX("None");
                setTaskbarBackgroundFX("None");
                setTaskbarWindowBackgroundFX("None");
                setStartMenuBackgroundFX("None");
                setNavMenuLocation("in top bar");
                setDialogButtonsLocation("in window");
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
    useEffect(() => {switchFX("Taskbar", taskbarBackgroundFX);}, [taskbarBackgroundFX]);
    useEffect(() => {switchFX("StartMenu", startMenuBackgroundFX);}, [startMenuBackgroundFX]);
    useEffect(() => {switchFX("TaskbarWindow", taskbarWindowBackgroundFX);}, [taskbarWindowBackgroundFX]);

    const contextValue = {
        theme,
        themeList,
        setTheme,
        startButtonTheme,
        startButtonThemeList,
        setStartButtonTheme,
        liveAppsTheme,
        liveAppsThemeList,
        setLiveAppsTheme,
        topBarIconTheme,
        topBarIconThemeList,
        setTopBarIconTheme,
        dialogButtonTheme,
        dialogButtonThemeList,
        setDialogButtonTheme,
        backgroundFXList,
        windowBackgroundFX,
        setWindowBackgroundFX,
        taskbarBackgroundFX,
        setTaskbarBackgroundFX,
        startMenuBackgroundFX,
        setStartMenuBackgroundFX,
        taskbarWindowBackgroundFX,
        setTaskbarWindowBackgroundFX,
        dialogBackgroundFX,
        setDialogBackgroundFX,
        navMenuLocation,
        navMenuLocationList,
        setNavMenuLocation,
        dialogButtonsLocation,
        dialogButtonsLocationList,
        setDialogButtonsLocation,
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}
export default ThemeProvider;