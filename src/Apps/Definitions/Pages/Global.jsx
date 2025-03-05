import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "./../../../System/ThemeManager/context.jsx";

export const Global = () => {
    const theme = useContext(ThemeContext);
    /*
    To be moved outside of the component, due to interfering with theme change
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
    
            <fieldset>
                <legend>Font Family:</legend>
                <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                >
                    {fontFamilyList.sort().map((font) => (
                        <option key={font} style={{ fontFamily: font }}>
                            {font}
                        </option>
                    ))}
                </select>
            </fieldset>
    */
    
    return (
        <>
            <fieldset>
                <legend>Theme:</legend>
                <select
                    value={theme.theme}
                    onChange={(e) => theme.setTheme(e.target.value)}
                >
                    {theme.themeList.map((theme) => (
                        <option key={theme}>{theme}</option>
                    ))}
                </select>
            </fieldset>
        </>
    )
}