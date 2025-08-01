import { createContext, useState, useEffect } from "react";
import themeRegistry from "./Themes/registry.json";
import fxRegistry from "./FX/registry.json";

export const ThemeContext = createContext({
    mode: "",
    setMode: () => { },
    modeList: [],
    systemDarkMode: false,
    theme: "",
    themeList: [],
    setTheme: () => { },
    topBarIconTheme: "",
    topBarIconThemeList: [],
    setTopBarIconTheme: () => { },
    TopBarButtonsPath: () => { },
    dialogButtonTheme: "",
    dialogButtonThemeList: [],
    setDialogButtonTheme: () => { },
    DialogButtonPath: () => { },
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
    StartButtonPath: () => { },
    liveAppsTheme: "",
    liveAppsThemeList: [],
    setLiveAppsTheme: () => { },
    LiveAppButtonPath: () => { },
    LiveAppsMobileIconPath: () => { },
    ToDesktopIconPath: () => { },
    startMenuBackgroundFX: "",
    setStartMenuBackgroundFX: () => { },
    taskbarWindowBackgroundFX: "",
    setTaskbarWindowBackgroundFX: () => { },
    startMenuMobileBackgroundFX: "",
    setStartMenuMobileBackgroundFX: () => { },
    mobileTrayBackgroundFX: "",
    setMobileTrayBackgroundFX: () => { },
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
    const DEFAULT_THEME = "Fluent";
    const [theme, setTheme] = useState(DEFAULT_THEME);
    const themeList = [];

    const [startButtonTheme, setStartButtonTheme] = useState(DEFAULT_THEME);
    const startButtonThemeList = [];
    const [StartButtonPath, setStartButtonPath] = 
    useState(`Themes/${themeRegistry[startButtonTheme]["Components"]["StartButton"]}`);

    const [liveAppsTheme, setLiveAppsTheme] = useState(DEFAULT_THEME);
    const liveAppsThemeList = [];
    const [LiveAppButtonPath, setLiveAppButtonPath] = 
    useState(`Themes/${themeRegistry[liveAppsTheme]["Components"]["LiveAppButton"]}`);

    const [LiveAppsMobileIconPath, setLiveAppsMobileIconPath] = 
    useState(`Themes/${themeRegistry[liveAppsTheme]["Components"]["MobileLiveAppsIcon"]}`);

    const [ToDesktopIconPath, setToDesktopIconPath] = 
    useState(`Themes/${themeRegistry[liveAppsTheme]["Components"]["ToDesktopIcon"]}`);

    const [topBarIconTheme, setTopBarIconTheme] = useState(DEFAULT_THEME);
    const topBarIconThemeList = [];
    const [TopBarButtonsPath, setTopBarButtonsPath] = 
    useState(`Themes/${themeRegistry[topBarIconTheme]["Components"]["TopBarButtons"]}`);

    const [dialogButtonTheme, setDialogButtonTheme] = useState(DEFAULT_THEME);
    const dialogButtonThemeList = [];
    const [DialogButtonPath, setDialogButtonPath] = 
    useState(`Themes/${themeRegistry[dialogButtonTheme]["Components"]["DialogButton"]}`);

    // Populate theme lists with themeRegistry keys
    Object.keys(themeRegistry).forEach((value, _key) => {
        themeList.push(value);
        startButtonThemeList.push(value);
        liveAppsThemeList.push(value);
        topBarIconThemeList.push(value);
        dialogButtonThemeList.push(value);
    });
    
    const [windowBackgroundFX, setWindowBackgroundFX] =
        useState(themeRegistry[theme]["FX"]["Backgrounds"]["Window"]);
    const [dialogBackgroundFX, setDialogBackgroundFX] =
        useState(themeRegistry[theme]["FX"]["Backgrounds"]["Dialog"]);
    const [taskbarBackgroundFX, setTaskbarBackgroundFX] =
        useState(themeRegistry[theme]["FX"]["Backgrounds"]["Taskbar"]);
    const [taskbarWindowBackgroundFX, setTaskbarWindowBackgroundFX] =
        useState(themeRegistry[theme]["FX"]["Backgrounds"]["TaskbarWindow"]);
    const [startMenuBackgroundFX, setStartMenuBackgroundFX] =
        useState(themeRegistry[theme]["FX"]["Backgrounds"]["StartMenu"]);
    const [startMenuMobileBackgroundFX, setStartMenuMobileBackgroundFX] =
        useState(themeRegistry[theme]["FX"]["Backgrounds"]["StartMenuMobile"]);
    const [mobileTrayBackgroundFX, setMobileTrayBackgroundFX] =
        useState(themeRegistry[theme]["FX"]["Backgrounds"]["MobileTray"]);

    const [dialogButtonsLocation, setDialogButtonsLocation] = useState("in window");
    const dialogButtonsLocationList = ["in info container", "in window"];
    const [navMenuLocation, setNavMenuLocation] = useState("in top bar");
    const navMenuLocationList = ["in app", "in top bar"];

    const backgroundFXList = [];
    Object.keys(fxRegistry["Backgrounds"]).forEach((value, _key) => {
        backgroundFXList.push(value);
    });

    //Imports new root variables from specified theme folder
    function getNewRootVars(value, darkmode) {
        return new Promise((resolve) => {
            resolve(import(`./Themes/${themeRegistry[value]["Mode"][darkmode]}`));
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

    //Updates all variables when global theme is changed
    const switchTheme = (value) => {
        changeRootVars(value);
        setStartButtonTheme(value);
        setLiveAppsTheme(value);

        setTopBarIconTheme(value);
        setDialogButtonTheme(value);
        setWindowBackgroundFX(themeRegistry[value]["FX"]["Backgrounds"]["Window"]);
        setDialogBackgroundFX(themeRegistry[value]["FX"]["Backgrounds"]["Dialog"]);
        setTaskbarBackgroundFX(themeRegistry[value]["FX"]["Backgrounds"]["Taskbar"]);
        setTaskbarWindowBackgroundFX(themeRegistry[value]["FX"]["Backgrounds"]["TaskbarWindow"]);
        setStartMenuBackgroundFX(themeRegistry[value]["FX"]["Backgrounds"]["StartMenu"]);
        setStartMenuMobileBackgroundFX(themeRegistry[value]["FX"]["Backgrounds"]["StartMenuMobile"]);
        setMobileTrayBackgroundFX(themeRegistry[value]["FX"]["Backgrounds"]["MobileTray"]);
        setNavMenuLocation(themeRegistry[value]["Locations"]["NavMenu"]);
        setDialogButtonsLocation(themeRegistry[value]["Locations"]["DialogButtons"]);

    };

    //Gets CSS variables for background FX
    function getFXvalues(value) {
        return new Promise((resolve) => {
            resolve(import(`./FX/Backgrounds/${fxRegistry["Backgrounds"][value]}`));
        })
    }

    //Updates CSS variables for background FX
    async function switchFX(target, value) {
        const newFX = await getFXvalues(value);
        Object.keys(newFX).forEach((key) => 
            document.querySelector(":root").style.setProperty(`--${target}${key}`, newFX[key])
        );
    };

    useEffect(() => { switchTheme(theme); }, [theme, mode]);
    useEffect(() => { if (mode === "System") switchTheme(theme); }, [systemDarkMode]);

    useEffect(() => { switchFX("Window", windowBackgroundFX); }, [windowBackgroundFX]);
    useEffect(() => { switchFX("Dialog", dialogBackgroundFX); }, [dialogBackgroundFX]);
    useEffect(() => { switchFX("Taskbar", taskbarBackgroundFX); }, [taskbarBackgroundFX]);
    useEffect(() => { switchFX("StartMenu", startMenuBackgroundFX); }, [startMenuBackgroundFX]);
    useEffect(() => { switchFX("StartMenuMobileInner", startMenuMobileBackgroundFX); }, [startMenuMobileBackgroundFX]);
    useEffect(() => { switchFX("TaskbarWindow", taskbarWindowBackgroundFX); }, [taskbarWindowBackgroundFX]);
    useEffect(() => { switchFX("MobileTrayFull", mobileTrayBackgroundFX); }, [mobileTrayBackgroundFX]);

    useEffect(() => { setStartButtonPath(`Themes/${themeRegistry[startButtonTheme]["Components"]["StartButton"]}`);},[startButtonTheme]);
    useEffect(() => { setLiveAppsMobileIconPath(`Themes/${themeRegistry[startButtonTheme]["Components"]["MobileLiveAppsIcon"]}`);},[startButtonTheme]);
    useEffect(() => { setToDesktopIconPath(`Themes/${themeRegistry[startButtonTheme]["Components"]["ToDesktopIcon"]}`);},[startButtonTheme]);
    useEffect(() => { setLiveAppButtonPath(`Themes/${themeRegistry[liveAppsTheme]["Components"]["LiveAppButton"]}`);},[liveAppsTheme]);
    useEffect(() => { setTopBarButtonsPath(`Themes/${themeRegistry[topBarIconTheme]["Components"]["TopBarButtons"]}`);},[topBarIconTheme]);
    useEffect(() => { setDialogButtonPath(`Themes/${themeRegistry[dialogButtonTheme]["Components"]["DialogButton"]}`);},[dialogButtonTheme]);

    const contextValue = {
        mode,
        modeList,
        setMode,
        systemDarkMode,
        theme,
        themeList,
        setTheme,
        startButtonTheme,
        startButtonThemeList,
        setStartButtonTheme,
        StartButtonPath,
        liveAppsTheme,
        liveAppsThemeList,
        setLiveAppsTheme,
        LiveAppButtonPath,
        LiveAppsMobileIconPath,
        ToDesktopIconPath,
        topBarIconTheme,
        topBarIconThemeList,
        setTopBarIconTheme,
        TopBarButtonsPath,
        dialogButtonTheme,
        dialogButtonThemeList,
        setDialogButtonTheme,
        DialogButtonPath,
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
        startMenuMobileBackgroundFX,
        setStartMenuMobileBackgroundFX,
        mobileTrayBackgroundFX,
        setMobileTrayBackgroundFX,
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