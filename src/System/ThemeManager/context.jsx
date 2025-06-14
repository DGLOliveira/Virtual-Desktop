import { createContext, useState, useEffect } from "react";
import AquaDark from "./Themes/Aqua/Root_Dark.json";
import AquaLight from "./Themes/Aqua/Root_Light.json";
import FluentDark from "./Themes/Fluent/Root_Dark.json";
import FluentLight from "./Themes/Fluent/Root_Light.json";
import ClassicDark from "./Themes/Classic/Root_Dark.json";
import ClassicLight from "./Themes/Classic/Root_Light.json";
import AeroDark from "./Themes/Aero/Root_Dark.json";
import AeroLight from "./Themes/Aero/Root_Light.json";

export const ThemeContext = createContext({
    mode: "",
    setMode: () => { },
    modeList: [],
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

    const [mode, setMode] = useState("System");
    const modeList = ["Light", "Dark", "System"];
    const [systemDarkMode, setSystemDarkMode] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
        event.matches ? setSystemDarkMode(true) : setSystemDarkMode(false);
    });

    const [theme, setTheme] = useState("Fluent");
    const themeList = ["Fluent", "Aero", "Aqua", "Classic"];

    const [startButtonTheme, setStartButtonTheme] = useState("Fluent");
    const startButtonThemeList = ["Fluent", "Aero", "Aqua", "Classic"];

    const [liveAppsTheme, setLiveAppsTheme] = useState("Fluent");
    const liveAppsThemeList = ["Fluent", "Aero", "Aqua", "Classic"];

    const [topBarIconTheme, setTopBarIconTheme] = useState("Fluent");
    const topBarIconThemeList = ["Fluent", "Aero", "Aqua", "Classic"];

    const [dialogButtonTheme, setDialogButtonTheme] = useState("Fluent");
    const dialogButtonThemeList = ["Fluent", "Aero", "Aqua", "Classic"];

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
                if(mode === "Light") { 
                    Object.keys(ClassicLight).forEach((key) => changeRootStyle(key, ClassicLight[key])); 
                } else if(mode === "Dark") {
                    Object.keys(ClassicDark).forEach((key) => changeRootStyle(key, ClassicDark[key]));
                } else if(mode === "System") {
                    if(systemDarkMode) {
                        Object.keys(ClassicDark).forEach((key) => changeRootStyle(key, ClassicDark[key]));
                    } else {
                        Object.keys(ClassicLight).forEach((key) => changeRootStyle(key, ClassicLight[key]));
                    }
                }
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
                if(mode === "Light") { 
                    Object.keys(AquaLight).forEach((key) => changeRootStyle(key, AquaLight[key])); 
                } else if(mode === "Dark") {
                    Object.keys(AquaDark).forEach((key) => changeRootStyle(key, AquaDark[key]));
                } else if(mode === "System") {
                    if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
                        Object.keys(AquaDark).forEach((key) => changeRootStyle(key, AquaDark[key]));
                    } else {
                        Object.keys(AquaLight).forEach((key) => changeRootStyle(key, AquaLight[key]));
                    }
                }
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
                if(mode === "Light") { 
                    Object.keys(AeroLight).forEach((key) => changeRootStyle(key, AeroLight[key])); 
                } else if(mode === "Dark") {
                    Object.keys(AeroDark).forEach((key) => changeRootStyle(key, AeroDark[key]));
                } else if(mode === "System") {
                    if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
                        Object.keys(AeroDark).forEach((key) => changeRootStyle(key, AeroDark[key]));
                    } else {
                        Object.keys(AeroLight).forEach((key) => changeRootStyle(key, AeroLight[key]));
                    }
                }
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
            case "Fluent":
                if(mode === "Light") { 
                    Object.keys(FluentLight).forEach((key) => changeRootStyle(key, FluentLight[key])); 
                } else if(mode === "Dark") {
                    Object.keys(FluentDark).forEach((key) => changeRootStyle(key, FluentDark[key]));
                } else if(mode === "System") {
                    if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
                        Object.keys(FluentDark).forEach((key) => changeRootStyle(key, FluentDark[key]));
                    } else {
                        Object.keys(FluentLight).forEach((key) => changeRootStyle(key, FluentLight[key]));
                    }
                }
                setStartButtonTheme("Fluent");
                setLiveAppsTheme("Fluent");
                setTopBarIconTheme("Fluent");
                setDialogButtonTheme("Fluent");
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

    useEffect(() => {switchTheme(theme);}, [theme, mode]);
    useEffect(() => {if(mode==="System") switchTheme(theme);}, [systemDarkMode]);

    useEffect(() => {switchFX("Window", windowBackgroundFX);}, [windowBackgroundFX]);
    useEffect(() => {switchFX("Dialog", dialogBackgroundFX);}, [dialogBackgroundFX]);
    useEffect(() => {switchFX("Taskbar", taskbarBackgroundFX);}, [taskbarBackgroundFX]);
    useEffect(() => {switchFX("StartMenu", startMenuBackgroundFX);}, [startMenuBackgroundFX]);
    useEffect(() => {switchFX("TaskbarWindow", taskbarWindowBackgroundFX);}, [taskbarWindowBackgroundFX]);

    const contextValue = {
        mode,
        modeList,
        setMode,
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