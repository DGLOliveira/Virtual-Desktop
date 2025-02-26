import { useState, useEffect } from "react";

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

export const Global = () => {
    const [fontFamily, setFontFamily] = useState(
        getComputedStyle(root).getPropertyValue("--GeneralFontFamily"));
    useEffect(() => {
        root.style.setProperty("--GeneralFontFamily", fontFamily);
    }, [fontFamily]);
    const [theme, setTheme] = useState("Default");
    return (
        <>
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
            <fieldset>
                <legend>Theme:</legend>
                <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    disabled={true}
                    title={"This feature is not available yet."}
                >
                    <option value="Default">Default</option>
                    <option value="Aero">Aero</option>
                    <option value="Aqua">Aqua</option>
                </select>
            </fieldset>
        </>
    )
}