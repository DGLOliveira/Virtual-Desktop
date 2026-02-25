import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "./../../../System/ThemeManager/context.jsx";
import { DeviceContext } from "./../../../System/DeviceManager/context.jsx";

export const Global = () => {
    const theme = useContext(ThemeContext);
    const device = useContext(DeviceContext);
    const root = document.documentElement;
    /*
    Disabled due to interference with theme change 
        const fontFamilyList = [
            "Arial",
            "Times New Roman",
            "Monospace",
            "Verdana",
            "Georgia",
            "Courier New",
            "Tahoma",
            "Garamond",
            "Trebuchet MS",
            "Impact",
            "Helvetica",
            "Arial Black",
            "Comic Sans MS",
            "Lucida Console",
            "Lucida Sans Unicode",
            "Lucida Sans",
            "Palatino Linotype",
            "Book Antiqua",
            "Arial Narrow",
            "Arial Rounded MT Bold",
            "Brush Script MT",
            "Century Gothic",
            "Century Schoolbook"
        ];
        const [fontFamily, setFontFamily] = useState(
            getComputedStyle(root).getPropertyValue("--GeneralFontFamily"));
        
        useEffect(() => {
            root.style.setProperty("--GeneralFontFamily", fontFamily);
        }, [fontFamily]);
    
        useEffect(()=>{
                setFontFamily(getComputedStyle(root).getPropertyValue("--GeneralFontFamily"));
        },[theme.theme]);
        
                    <div>
                        <label>Font Family:</label>
                        <select
                            value={fontFamily}
                            onChange={(e) => setFontFamily(e.target.value)}
                        >
                            {fontFamilyList.sort().map((font) => (
                                <option key={font} value={font} style={{ fontFamily: font }}>
                                    {font}
                                </option>
                            ))}
                        </select>
                    </div>*/

    return (
        <>
            <fieldset>
                <legend>Device</legend>
                <div>
                    <label>Type:</label>
                    <select
                        value={device.deviceType}
                        onChange={(e) => device.setDeviceType(e.target.value)}
                    >
                        {device.deviceTypeList.map((device) => (
                            <option key={device} value={device}>{device}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <legend>Global Theme</legend>
                <div>
                    <label>Theme:</label>
                    <select
                        value={theme.theme}
                        onChange={(e) => theme.setTheme(e.target.value)}
                    >
                        {theme.themeList.map((theme) => (
                            <option key={theme} value={theme}>{theme}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Dark Mode:</label>
                    <select
                        value={theme.mode}
                        onChange={(e) => theme.setMode(e.target.value)}
                    >
                        {theme.modeList.map((mode) => (
                            <option key={mode} value={mode}>{mode}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
        </>
    )
}