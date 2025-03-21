import { useState, useEffect, useContext } from "react";
import { FcGlobe } from "react-icons/fc";

import { ThemeContext } from "../../../../System/ThemeManager/context.jsx";
import ColorPicker from "../../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

export const AppPreview = () => {
    const themeContext = useContext(ThemeContext);
    return (
        <>
            <app-window
                style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    width: "80%",
                    height: "120px",
                    backgroundColor: "var(--WindowBkgrColorInactive)",
                    borderColor: "var(--WindowBorderColorInactive)"
                }}
                className="app appInactive"
            >
                <app-top-bar
                    style={{
                        color: "var(--WindowTopBarFontColorInactive)",
                        backgroundColor: "var(--WindowTopBarBkgrColorInactive)"
                    }}>
                    <FcGlobe />
                    <h1>Inactive</h1>
                </app-top-bar>
                <app-container
                    style={{
                        color: "var(--AppFontColorInactive)",
                        backgroundColor: "var(--AppBkgrColorInactive)",
                        borderColor: "var(--AppBorderColorInactive)",
                        textAlign: "left"
                    }}>{"-Content"}</app-container>
            </app-window>
            <app-window
                style={{
                    position: "absolute",
                    top: "50px",
                    left: "60px",
                    width: "80%",
                    height: "120px",
                    backgroundColor: "var(--WindowBkgrColor)"
                }}
                className="app"
            >
                <app-top-bar
                    style={{
                        color: "var(--WindowTopBarFontColor)",
                        backgroundColor: "var(--WindowTopBarBkgrColor)"
                    }}>
                    <FcGlobe />
                    <h1>Active</h1>
                </app-top-bar>
                <app-container
                    style={{
                        color: "var(--AppFontColor)",
                        backgroundColor: "var(--AppBkgrColor)",
                        borderColor: "var(--AppBorderColor)",
                        textAlign:"left"
                    }}>{"-Content"}</app-container>
            </app-window>
        </>
    );
};

export const App = () => {
    var root = document.querySelector(":root");

    const [fontColor, setFontColor] = useState(
        getComputedStyle(root).getPropertyValue("--AppFontColor"));
    useEffect(() => {
        root.style.setProperty("--AppFontColor", fontColor);
    }, [fontColor]);
    //----------------------------------------------------------------------------//
    const [fontColorInactive, setFontColorInactive] = useState(
        getComputedStyle(root).getPropertyValue("--AppFontColorInactive"));
    useEffect(() => {
        root.style.setProperty("--AppFontColorInactive", fontColorInactive);
    }, [fontColorInactive]);
    //----------------------------------------------------------------------------//
    const [bkgColor, setBkgColor] = useState(
        getComputedStyle(root).getPropertyValue("--AppBkgrColor"));
    useEffect(() => {
        root.style.setProperty("--AppBkgrColor", bkgColor);
    }, [bkgColor]);
    //----------------------------------------------------------------------------//
    const [bkgColorInactive, setBkgColorInactive] = useState(
        getComputedStyle(root).getPropertyValue("--AppBkgrColorInactive"));
    useEffect(() => {
        root.style.setProperty("--AppBkgrColorInactive", bkgColorInactive);
    }, [bkgColorInactive]);
    //----------------------------------------------------------------------------//
    const [borderColor, setBorderColor] = useState(
        getComputedStyle(root).getPropertyValue("--AppBorderColor"));
    useEffect(() => {
        root.style.setProperty("--AppBorderColor", borderColor);
    }, [borderColor]);
    //----------------------------------------------------------------------------//
    const [borderColorInactive, setBorderColorInactive] = useState(
        getComputedStyle(root).getPropertyValue("--AppBorderColorInactive"));
    useEffect(() => {
        root.style.setProperty("--AppBorderColorInactive", borderColorInactive);
    }, [borderColorInactive]);
    //----------------------------------------------------------------------------//
    const [borderWidth, setBorderWidth] = useState(
        getComputedStyle(root).getPropertyValue("--AppBorderWidth").slice(0, -2));
    useEffect(() => {
        root.style.setProperty("--AppBorderWidth", borderWidth + "px");
    }, [borderWidth]);
    //----------------------------------------------------------------------------//
    const [borderRadius, setBorderRadius] = useState(
        getComputedStyle(root).getPropertyValue("--AppBorderRadius").slice(0, -2));
    useEffect(() => {
        root.style.setProperty("--AppBorderRadius", borderRadius + "px");
    }, [borderRadius]);
    //----------------------------------------------------------------------------//
    const [borderType, setBorderType] = useState(
        root.style.getPropertyValue("--AppBorderType"));
    useEffect(() => {
        root.style.setProperty("--AppBorderType", borderType);
    }, [borderType]);

    return (
        <>
            <fieldset>
                <legend>Font Color</legend>
                <div>
                    <label>Active</label>
                    <ColorPicker
                        color={fontColor}
                        setColor={setFontColor}
                        alpha={false}
                    />
                </div>
                <div>
                    <label>Inactive</label>
                    <ColorPicker
                        color={fontColorInactive}
                        setColor={setFontColorInactive}
                        alpha={false}
                    />
                </div>
            </fieldset>
            <fieldset>
                <legend>Background Color</legend>
                <div>
                    <label>Active</label>
                    <ColorPicker
                        color={bkgColor}
                        setColor={setBkgColor}
                        alpha={false}
                    />
                </div>
                <div>
                    <label>Inactive</label>
                    <ColorPicker
                        color={bkgColorInactive}
                        setColor={setBkgColorInactive}
                        alpha={false}
                    />
                </div>
            </fieldset>
            <fieldset>
                <legend>Border</legend>
                <div>
                    <label>Color Active</label>
                    <ColorPicker
                        color={borderColor}
                        setColor={setBorderColor}
                        alpha={false}
                    />
                </div>
                <div>
                    <label>Color Inactive</label>
                    <ColorPicker
                        color={borderColorInactive}
                        setColor={setBorderColorInactive}
                        alpha={false}
                    />
                </div>
                <div>
                    <label>Width</label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={borderWidth}
                        onChange={(e) => setBorderWidth(e.target.value)}
                    />
                </div>
                <div>
                    <label>Radius</label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={borderRadius}
                        onChange={(e) => setBorderRadius(e.target.value)}
                    />
                </div>
                <div>
                    <label>Type</label>
                    <select value={borderType} onChange={(e) => setBorderType(e.target.value)}>
                        <option value="solid">solid</option>
                        <option value="dashed">dashed</option>
                        <option value="dotted">dotted</option>
                        <option value="double">double</option>
                        <option value="groove">groove</option>
                        <option value="ridge">ridge</option>
                        <option value="inset">inset</option>
                        <option value="outset">outset</option>
                    </select>
                </div>
            </fieldset>
        </>
    );
};