import { useState, useEffect } from "react";

import ColorPicker from "../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

export const ContextMenuPreview = () => {
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [radio, setRadio] = useState("1");
    return (
        <>
            <context-menu style={{ left: 5, top: 5 }}>
                <button>
                    <div>Button</div>
                    <span />
                </button>
                <button>
                    <div>Button with Keybind</div>
                    <span />
                    <kbd>key1 + key2</kbd>
                </button>
                <hr />
                <button onClick={() => setCheckbox1(!checkbox1)}>
                    <div>Checkbox 1</div>
                    <span />
                    <input type="checkbox" checked={checkbox1} readOnly />
                </button>
                <button onClick={() => setCheckbox2(!checkbox2)}>
                    <div>Checkbox 2</div>
                    <span />
                    <input type="checkbox" checked={checkbox2} readOnly />
                </button>
                <hr />
                <button onClick={() => setRadio("1")}>
                    <div>Radio 1</div>
                    <span />
                    <input type="radio" name="radio" checked={radio === "1"} readOnly />
                </button>
                <button onClick={() => setRadio("2")}>
                    <div>Radio 2</div>
                    <span />
                    <input type="radio" name="radio" checked={radio === "2"} readOnly />
                </button>
            </context-menu>
        </>
    );
};
export const ContextMenu = () => {
    var root = document.querySelector(":root");

    const [fontSize, setFontSize] = useState(
        getComputedStyle(root).getPropertyValue("--ContextMenuFontSize").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--ContextMenuFontSize", fontSize + "px");
    }, [fontSize]);
    //----------------------------------------------------------------------------//
    const [fontColor, setFontColor] = useState(
        getComputedStyle(root).getPropertyValue("--ContextMenuFontColor"),
    );
    useEffect(() => {
        root.style.setProperty("--ContextMenuFontColor", fontColor);
    }, [fontColor]);
    //----------------------------------------------------------------------------//
    const [bkgColor, setBkgColor] = useState(
        getComputedStyle(root).getPropertyValue("--ContextMenuBkgr"),
    );
    useEffect(() => {
        root.style.setProperty("--ContextMenuBkgr", bkgColor);
    }, [bkgColor]);
    //----------------------------------------------------------------------------//
    const [borderColor, setBorderColor] = useState(
        getComputedStyle(root).getPropertyValue("--ContextMenuBorderColor"),
    );
    useEffect(() => {
        root.style.setProperty("--ContextMenuBorderColor", borderColor);
    }, [borderColor]);
    //----------------------------------------------------------------------------//
    const [borderWidth, setBorderWidth] = useState(
        getComputedStyle(root).getPropertyValue("--ContextMenuBorderWidth").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--ContextMenuBorderWidth", borderWidth + "px");
    }, [borderWidth]);
    //----------------------------------------------------------------------------//
    const [borderRadius, setBorderRadius] = useState(
        getComputedStyle(root).getPropertyValue("--ContextMenuBorderRadius").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--ContextMenuBorderRadius", borderRadius + "px");
    }, [borderRadius]);
    //----------------------------------------------------------------------------//
    const [borderType, setBorderType] = useState(
        getComputedStyle(root).getPropertyValue("--ContextMenuBorderType"),
    );
    useEffect(() => {
        root.style.setProperty("--ContextMenuBorderType", borderType);
    }, [borderType]);
    //----------------------------------------------------------------------------//
    const [hoverColor, setHoverColor] = useState(
        getComputedStyle(root).getPropertyValue("--ContextMenuButtonHoverColor"),
    );
    useEffect(() => {
        root.style.setProperty("--ContextMenuButtonHoverColor", hoverColor);
    }, [hoverColor]);
    //----------------------------------------------------------------------------//
    const [hoverBkgr, setHoverBkgr] = useState(
        getComputedStyle(root).getPropertyValue("--ContextMenuButtonHoverBkgr"),
    );
    useEffect(() => {
        root.style.setProperty("--ContextMenuButtonHoverBkgr", hoverBkgr);
    }, [hoverBkgr]);
    //----------------------------------------------------------------------------//
    const [padding, setPadding] = useState(
        getComputedStyle(root).getPropertyValue("--ContextMenuPadding").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--ContextMenuPadding", padding + "px");
    }, [padding]);

    return (
        <>
            <fieldset>
                <legend>Font</legend>
                <div>
                    <label>Font Color:</label>
                    <ColorPicker
                        color={fontColor}
                        setColor={setFontColor}
                        useAlpha={false}
                    />
                </div>
                <div>
                    <label>Font Size:</label>
                    <input
                        type="range"
                        min={11}
                        max={30}
                        step="1"
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                    />
                </div>
            </fieldset>
            <fieldset>
                <legend>Background</legend>
                <div>
                    <label>Background Color:</label>
                    <ColorPicker
                        color={bkgColor}
                        setColor={setBkgColor}
                        useAlpha={true}
                    />
                </div>
            </fieldset>
            <fieldset>
                <legend>Border</legend>
                <div>
                    <label>Border Color:</label>
                    <ColorPicker
                        color={borderColor}
                        setColor={setBorderColor}
                        useAlpha={false}
                    />
                </div>
                <div>
                    <label>Border Width:</label>
                    <input
                        type="range"
                        min={0}
                        max={5}
                        step="1"
                        value={borderWidth}
                        onChange={(e) => setBorderWidth(e.target.value)}
                    />
                </div>
                <div>
                    <label>Border Radius:</label>
                    <input
                        type="range"
                        min={0}
                        max={20}
                        step="1"
                        value={borderRadius}
                        onChange={(e) => setBorderRadius(e.target.value)}
                    />
                </div>
                <div>
                    <label>Border Type:</label>
                    <select value={borderType} onChange={(e) => setBorderType(e.target.value)}>
                        <option value="solid">solid</option>
                        <option value="double">double</option>
                        <option value="dashed">dashed</option>
                        <option value="dotted">dotted</option>
                        <option value="groove">groove</option>
                        <option value="ridge">ridge</option>
                        <option value="inset">inset</option>
                        <option value="outset">outset</option>
                    </select>
                </div>
                <div>
                    <label>Padding:</label>
                    <input
                        type="range"
                        min={0}
                        max={20}
                        step="1"
                        value={padding}
                        onChange={(e) => setPadding(e.target.value)}
                    />
                </div>
            </fieldset>
            <fieldset>
                <legend>Hover</legend>
                <div>
                    <label>Hover Color:</label>
                    <ColorPicker
                        color={hoverColor}
                        setColor={setHoverColor}
                        useAlpha={false}
                    />
                </div>
                <div>
                    <label>Hover Background Color:</label>
                    <ColorPicker
                        color={hoverBkgr}
                        setColor={setHoverBkgr}
                        useAlpha={true}
                    />
                </div>
            </fieldset>
        </>
    );
};
