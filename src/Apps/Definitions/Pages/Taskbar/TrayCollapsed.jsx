import { useState, useEffect } from "react";

import { WiCloudy } from "react-icons/wi";
import { TbDeviceMobile } from "react-icons/tb";

import ColorPicker from "../../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

export const TrayCollapsedPreview = () => {
    return (<>
        <mobile-tray-fullscreen
            style={{ top: "calc(-100% + var(--MobileTrayHeight) + var(--TaskbarHeight))" }}
        ></mobile-tray-fullscreen>
        <mobile-tray style={{ width: "100%" }}>
            <button style={{ flexDirection: "row" }}>
                <WiCloudy /> 20°C
            </button>
            <button>
                <TbDeviceMobile />
            </button>
            <button>
                11:59
                <br />
                31/12/2000
            </button>
        </mobile-tray>
    </>
    );
}

export const TrayCollapsed = () => {

    var root = document.querySelector(":root");

    const [height, setHeight] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayHeight").slice(0, -2));
    useEffect(() => {
        root.style.setProperty("--MobileTrayHeight", height + "px");
    });
    //----------------------------------------------------------------------------//
    const [horizontalPadding, setHorizontalPadding] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayHorizontalPadding").slice(0, -2));
    useEffect(() => {
        root.style.setProperty("--MobileTrayHorizontalPadding", horizontalPadding + "px");
    });
    //----------------------------------------------------------------------------//
    const [verticalPadding, setVerticalPadding] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayVerticalPadding").slice(0, -2));
    useEffect(() => {
        root.style.setProperty("--MobileTrayVerticalPadding", verticalPadding + "px");
    });
    //----------------------------------------------------------------------------//
    const [borderRadius, setBorderRadius] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayHorizontalBorderRadius").slice(0, -2));
    useEffect(() => {
        root.style.setProperty("--MobileTrayHorizontalBorderRadius", borderRadius + "px");
    });
    //----------------------------------------------------------------------------//
    const [borderColor, setBorderColor] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayHorizontalBorderColor"));
    useEffect(() => {
        root.style.setProperty("--MobileTrayHorizontalBorderColor", borderColor);
    });
    //----------------------------------------------------------------------------//
    const [borderWidth, setBorderWidth] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayHorizontalBorderWidth").slice(0, -2));
    useEffect(() => {
        root.style.setProperty("--MobileTrayHorizontalBorderWidth", borderWidth + "px");
    });
    //----------------------------------------------------------------------------//
    const [borderType, setBorderType] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayHorizontalBorderType"));
    useEffect(() => {
        root.style.setProperty("--MobileTrayHorizontalBorderType", borderType);
    });
    //----------------------------------------------------------------------------//
    const [fontColor, setFontColor] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayColor"));
    useEffect(() => {
        root.style.setProperty("--MobileTrayColor", fontColor);
    });
    //----------------------------------------------------------------------------//
    const [fontSize, setFontSize] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayFontSize").slice(0, -2));
    useEffect(() => {
        root.style.setProperty("--MobileTrayFontSize", fontSize + "px");
    });
    //----------------------------------------------------------------------------//
    const [iconSize, setIconSize] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayIconSize").slice(0, -2));
    useEffect(() => {
        root.style.setProperty("--MobileTrayIconSize", iconSize + "px");
    });

    return (<>
        <fieldset>
            <legend>Bar</legend>
            <div>
                <label>Height</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
                <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
            </div>
            <div>
                <label>Horizontal Padding</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={horizontalPadding}
                    onChange={(e) => setHorizontalPadding(e.target.value)}
                />
                <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={horizontalPadding}
                    onChange={(e) => setHorizontalPadding(e.target.value)}
                />
            </div>
            <div>
                <label>Vertical Padding</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={verticalPadding}
                    onChange={(e) => setVerticalPadding(e.target.value)}
                />
                <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={verticalPadding}
                    onChange={(e) => setVerticalPadding(e.target.value)}
                />
            </div>
            <fieldset>
                <legend>Border</legend>
                <div>
                    <label>Width</label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={borderWidth}
                        onChange={(e) => setBorderWidth(e.target.value)}
                    />
                    <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={borderWidth}
                        onChange={(e) => setBorderWidth(e.target.value)}
                    />
                </div>
                <div>
                    <label>Color</label>
                    <ColorPicker
                        color={borderColor}
                        setColor={setBorderColor}
                        useAlpha={true}
                    />
                </div>
                <div>
                    <label>Type</label>
                    <select
                        value={borderType}
                        onChange={(e) => setBorderType(e.target.value)}
                    >
                        <option value="none">None</option>
                        <option value="solid">Solid</option>
                        <option value="dotted">Dotted</option>
                        <option value="dashed">Dashed</option>
                        <option value="double">Double</option>
                        <option value="groove">Groove</option>
                        <option value="ridge">Ridge</option>
                        <option value="inset">Inset</option>
                        <option value="outset">Outset</option>
                    </select>
                </div>
                <div>
                    <label>Border Radius</label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={borderRadius}
                        onChange={(e) => setBorderRadius(e.target.value)}
                    />
                    <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={borderRadius}
                        onChange={(e) => setBorderRadius(e.target.value)}
                    />
                </div>
            </fieldset>
        </fieldset>
        <fieldset>
            <legend>Info</legend>
            <div>
                <label>Font Size</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                />
                <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                />
            </div>
            <div>
                <label>Color</label>
                <ColorPicker
                    color={fontColor}
                    setColor={setFontColor}
                    useAlpha={false}
                />
            </div>
            <div>
                <label>Icon Size</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={iconSize}
                    onChange={(e) => setIconSize(e.target.value)}
                />
                <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={iconSize}
                    onChange={(e) => setIconSize(e.target.value)}
                />
            </div>
        </fieldset>
    </>);
}