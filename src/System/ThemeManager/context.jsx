import { createContext, useState, useEffect } from "react";
import registery from "./registery.json";

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
    const themeList = [];

    const [startButtonTheme, setStartButtonTheme] = useState("Fluent");
    const startButtonThemeList = [];

    const [liveAppsTheme, setLiveAppsTheme] = useState("Fluent");
    const liveAppsThemeList = [];

    const [topBarIconTheme, setTopBarIconTheme] = useState("Fluent");
    const topBarIconThemeList = [];

    const [dialogButtonTheme, setDialogButtonTheme] = useState("Fluent");
    const dialogButtonThemeList = [];

    // Populate theme lists with registery
    Object.keys(registery).forEach((value, _key) => {
        themeList.push(value);
        startButtonThemeList.push(value);
        liveAppsThemeList.push(value);
        topBarIconThemeList.push(value);
        dialogButtonThemeList.push(value);
    });

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

    //Imports new root variables from specified theme folder
    function getNewRootVars(value, darkmode) {
        return new Promise((resolve) => {
            resolve(import(`./Themes/${value}/Root_${darkmode}.json`));
        })
    };
    //Changes root variables according to imported json
    async function changeRootVars(value) {
        let darkmode;
        if (mode === "System") {
            darkmode = systemDarkMode ? "Dark" : "Light";
        } else {
            darkmode = mode;
        }
        const newRootVars = await getNewRootVars(value, darkmode);
        Object.keys(newRootVars).forEach((key) =>
            document.querySelector(":root").style.setProperty(`${key}`, newRootVars[key])
        );
    };

    const switchTheme = (value) => {
        changeRootVars(value);
        setStartButtonTheme(value);
        setLiveAppsTheme(value);
        setTopBarIconTheme(value);
        setDialogButtonTheme(value);
        switch (value) {
            case "Classic":
                setWindowBackgroundFX("None");
                setDialogBackgroundFX("None");
                setTaskbarBackgroundFX("None");
                setTaskbarWindowBackgroundFX("None");
                setStartMenuBackgroundFX("None");
                setNavMenuLocation("in top bar");
                setDialogButtonsLocation("in info container");
                break;
            case "Aqua":
                setWindowBackgroundFX("Metallic");
                setDialogBackgroundFX("Metallic");
                setTaskbarBackgroundFX("Metallic");
                setStartMenuBackgroundFX("Metallic");
                setTaskbarWindowBackgroundFX("Metallic");
                setNavMenuLocation("in top bar");
                setDialogButtonsLocation("in window");
                break;
            case "Aero":
                setWindowBackgroundFX("Translucent");
                setDialogBackgroundFX("Translucent");
                setTaskbarBackgroundFX("Translucent");
                setTaskbarWindowBackgroundFX("Translucent");
                setStartMenuBackgroundFX("Translucent");
                setNavMenuLocation("in app");
                setDialogButtonsLocation("in info container");
                break;
            case "Fluent":
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

    useEffect(() => { switchTheme(theme); }, [theme, mode]);
    useEffect(() => { if (mode === "System") switchTheme(theme); }, [systemDarkMode]);

    useEffect(() => { switchFX("Window", windowBackgroundFX); }, [windowBackgroundFX]);
    useEffect(() => { switchFX("Dialog", dialogBackgroundFX); }, [dialogBackgroundFX]);
    useEffect(() => { switchFX("Taskbar", taskbarBackgroundFX); }, [taskbarBackgroundFX]);
    useEffect(() => { switchFX("StartMenu", startMenuBackgroundFX); }, [startMenuBackgroundFX]);
    useEffect(() => { switchFX("TaskbarWindow", taskbarWindowBackgroundFX); }, [taskbarWindowBackgroundFX]);

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