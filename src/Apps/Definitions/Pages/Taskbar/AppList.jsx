import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../../System/ThemeManager/context.jsx";

import ColorPicker from "../../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

import { FcGlobe, FcCalculator, FcInfo } from "react-icons/fc";

export const AppListPreview = () => {

    return (
        <start-list-mobile
            style={{
                background: "var(--StartMenuMobileOuterBkgr)",
                boxShadow: " 0 0 var(--StartMenuMobileOuterShadowBlur) var(--StartMenuMobileOuterShadowSpread) var(--StartMenuMobileOuterShadowColor) inset",
            }}>
            <start-list-mobile-container>
                <button><FcGlobe /><span>App 1</span></button>
                <button><FcCalculator /><span>App 2</span></button>
                <button><FcInfo /><span>App 3</span></button>
            </start-list-mobile-container>
        </start-list-mobile>
    )
}

export const AppList = () => {
    var root = document.querySelector(":root");
    const theme = useContext(ThemeContext);

    const [startMenuOuterPadding, setStartMenuOuterPadding] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileOuterPadding").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileOuterPadding", startMenuOuterPadding + "px");
    }, [startMenuOuterPadding]);
    //----------------------------------------------------------------------------//
    const [startMenuOuterShadowBlur, setStartMenuOuterShadowBlur] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileOuterShadowBlur").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileOuterShadowBlur", startMenuOuterShadowBlur + "px");
    }, [startMenuOuterShadowBlur]);
    //----------------------------------------------------------------------------//
    const [startMenuOuterShadowSpread, setStartMenuOuterShadowSpread] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileOuterShadowSpread").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileOuterShadowSpread", startMenuOuterShadowSpread + "px");
    }, [startMenuOuterShadowSpread]);
    //----------------------------------------------------------------------------//
    const [startMenuOuterShadowColor, setStartMenuOuterShadowColor] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileOuterShadowColor"),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileOuterShadowColor", startMenuOuterShadowColor);
    }, [startMenuOuterShadowColor]);
    //----------------------------------------------------------------------------//
    const [startMenuOuterBkgr, setStartMenuOuterBkgr] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileOuterBkgr"),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileOuterBkgr", startMenuOuterBkgr);
    }, [startMenuOuterBkgr]);
    //----------------------------------------------------------------------------//
    const [startMenuInnerBkgr, setStartMenuInnerBkgr] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileInnerBkgr"),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileInnerBkgr", startMenuInnerBkgr);
    }, [startMenuInnerBkgr]);
    //----------------------------------------------------------------------------//
    const [startMenuInnerBorderWidth, setStartMenuInnerBorderWidth] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileInnerBorderWidth").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileInnerBorderWidth", startMenuInnerBorderWidth + "px");
    }, [startMenuInnerBorderWidth]);
    //----------------------------------------------------------------------------//
    const [startMenuInnerBorderColor, setStartMenuInnerBorderColor] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileInnerBorderColor"),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileInnerBorderColor", startMenuInnerBorderColor);
    }, [startMenuInnerBorderColor]);
    //----------------------------------------------------------------------------//
    const [startMenuInnerBorderType, setStartMenuInnerBorderType] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileInnerBorderType"),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileInnerBorderType", startMenuInnerBorderType);
    }, [startMenuInnerBorderType]);
    //----------------------------------------------------------------------------//
    const [startMenuInnerBorderRadius, setStartMenuInnerBorderRadius] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileInnerBorderRadius").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileInnerBorderRadius", startMenuInnerBorderRadius + "px");
    }, [startMenuInnerBorderRadius]);
    //----------------------------------------------------------------------------//
    const [startMenuButtonPadding, setStartMenuButtonPadding] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileButtonPadding").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileButtonPadding", startMenuButtonPadding + "px");
    }, [startMenuButtonPadding]);
    //----------------------------------------------------------------------------//
    const [startMenuButtonMargin, setStartMenuButtonMargin] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileButtonMargin").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileButtonMargin", startMenuButtonMargin + "px");
    }, [startMenuButtonMargin]);
    //----------------------------------------------------------------------------//
    const [startMenuButtonSize, setStartMenuButtonSize] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileButtonSize").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileButtonSize", startMenuButtonSize + "px");
    }, [startMenuButtonSize]);
    //----------------------------------------------------------------------------//
    const [startMenuButtonFontSize, setStartMenuButtonFontSize] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileButtonFontSize").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileButtonFontSize", startMenuButtonFontSize + "px");
    }, [startMenuButtonFontSize]);
    //----------------------------------------------------------------------------//
    const [startMenuButtonFontColor, setStartMenuButtonFontColor] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileButtonFontColor"),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileButtonFontColor", startMenuButtonFontColor);
    }, [startMenuButtonFontColor]);
    //----------------------------------------------------------------------------//
    const [startMenuButtonFontDisplay, setStartMenuButtonFontDisplay] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileButtonFontDisplay"),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileButtonFontDisplay", startMenuButtonFontDisplay);
    }, [startMenuButtonFontDisplay]);
    //----------------------------------------------------------------------------//
    const [startMenuButtonBkgr, setStartMenuButtonBkgr] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileButtonBkgr"),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileButtonBkgr", startMenuButtonBkgr);
    }, [startMenuButtonBkgr]);
    //----------------------------------------------------------------------------//
    const [startMenuButtonBkgrHover, setStartMenuButtonBkgrHover] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileButtonBkgrHover"),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileButtonBkgrHover", startMenuButtonBkgrHover);
    }, [startMenuButtonBkgrHover]);
    //----------------------------------------------------------------------------//
    const [startMenuButtonBkgrActive, setStartMenuButtonBkgrActive] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileButtonBkgrActive"),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileButtonBkgrActive", startMenuButtonBkgrActive);
    }, [startMenuButtonBkgrActive]);
    //----------------------------------------------------------------------------//
    const [startMenuButtonBorderWidth, setStartMenuButtonBorderWidth] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileButtonBorderWidth").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileButtonBorderWidth", startMenuButtonBorderWidth + "px");
    }, [startMenuButtonBorderWidth]);
    //----------------------------------------------------------------------------//
    const [startMenuButtonBorderColor, setStartMenuButtonBorderColor] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileButtonBorderColor"),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileButtonBorderColor", startMenuButtonBorderColor);
    }, [startMenuButtonBorderColor]);
    //----------------------------------------------------------------------------//
    const [startMenuButtonBorderType, setStartMenuButtonBorderType] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileButtonBorderType"),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileButtonBorderType", startMenuButtonBorderType);
    }, [startMenuButtonBorderType]);
    //----------------------------------------------------------------------------//
    const [startMenuButtonBorderRadius, setStartMenuButtonBorderRadius] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileButtonBorderRadius").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileButtonBorderRadius", startMenuButtonBorderRadius + "px");
    }, [startMenuButtonBorderRadius]);
    //----------------------------------------------------------------------------//
    const [startMenuButtonIconSize, setStartMenuButtonIconSize] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuMobileButtonIconSize").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuMobileButtonIconSize", startMenuButtonIconSize + "px");
    }, [startMenuButtonIconSize]);


    return (<>

        <fieldset>
            <legend>Outside Container</legend>
            <div>
                <label>Padding</label>
                <input type="range" min="0" max="100" value={startMenuOuterPadding} onChange={(e) => { setStartMenuOuterPadding(e.target.value) }} />
            </div>
            <div>
                <label>Background</label>
                <ColorPicker color={startMenuOuterBkgr} setColor={setStartMenuOuterBkgr} useAlpha={true} />
            </div>
            <fieldset>
                <legend>Shadow</legend>
                <div>
                    <label>Blur</label>
                    <input type="range" min="0" max="100" value={startMenuOuterShadowBlur} onChange={(e) => { setStartMenuOuterShadowBlur(e.target.value) }} />
                </div>
                <div>
                    <label>Spread</label>
                    <input type="range" min="0" max="100" value={startMenuOuterShadowSpread} onChange={(e) => { setStartMenuOuterShadowSpread(e.target.value) }} />
                </div>
                <div>
                    <label>Color</label>
                    <ColorPicker color={startMenuOuterShadowColor} setColor={setStartMenuOuterShadowColor} useAlpha={true} />
                </div>
            </fieldset>
        </fieldset>
        <fieldset>
            <legend>List Container</legend>
            <div>
                <label>Background</label>
                <ColorPicker color={startMenuInnerBkgr} setColor={setStartMenuInnerBkgr} useAlpha={true} />
            </div>
            <div>
                <label>background FX</label>
                <select value={theme.startMenuMobileBackgroundFX} onChange={(e) => { theme.setStartMenuMobileBackgroundFX(e.target.value) }}>
                    {theme.backgroundFXList.map((backgroundFX) => (<option key={backgroundFX} value={backgroundFX}>{backgroundFX}</option>))}
                </select>
            </div>
            <fieldset>
                <legend>Border</legend>
                <div>
                    <label>Width</label>
                    <input type="range" min="0" max="20" value={startMenuInnerBorderWidth} onChange={(e) => { setStartMenuInnerBorderWidth(e.target.value) }} />
                </div>
                <div>
                    <label>Color</label>
                    <ColorPicker color={startMenuInnerBorderColor} setColor={setStartMenuInnerBorderColor} useAlpha={true} />
                </div>
                <div>
                    <label>Radius</label>
                    <input type="range" min="0" max="100" value={startMenuInnerBorderRadius} onChange={(e) => { setStartMenuInnerBorderRadius(e.target.value) }} />
                </div>
                <div>
                    <label>Type</label>
                    <select value={startMenuInnerBorderType} onChange={(e) => { setStartMenuInnerBorderType(e.target.value) }}>
                        <option value="none">none</option>
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
            </fieldset>
        </fieldset>
        <fieldset>
            <legend>Buttons</legend>
            <fieldset>
                <legend>Dimentions</legend>
                <div>
                    <label>Size</label>
                    <input type="range" min="0" max="250" value={startMenuButtonSize} onChange={(e) => { setStartMenuButtonSize(e.target.value) }} />
                </div>
                <div>
                    <label>Padding</label>
                    <input type="range" min="0" max="100" value={startMenuButtonPadding} onChange={(e) => { setStartMenuButtonPadding(e.target.value) }} />
                </div>
                <div>
                    <label>Margin</label>
                    <input type="range" min="0" max="100" value={startMenuButtonMargin} onChange={(e) => { setStartMenuButtonMargin(e.target.value) }} />
                </div>
                <div>
                    <label>Icon Size</label>
                    <input type="range" min="0" max="200" value={startMenuButtonIconSize} onChange={(e) => { setStartMenuButtonIconSize(e.target.value) }} />
                </div>
            </fieldset>
            <fieldset>
                <legend>Background</legend>
                <div>
                    <label>Normal</label>
                    <ColorPicker color={startMenuButtonBkgr} setColor={setStartMenuButtonBkgr} useAlpha={true} />
                </div>
                <div>
                    <label>On Hover</label>
                    <ColorPicker color={startMenuButtonBkgrHover} setColor={setStartMenuButtonBkgrHover} useAlpha={true} />
                </div>
                <div>
                    <label>On Click</label>
                    <ColorPicker color={startMenuButtonBkgrActive} setColor={setStartMenuButtonBkgrActive} useAlpha={true} />
                </div>
            </fieldset>
            <fieldset>
                <legend>Border</legend>
                <div>
                    <label>Width</label>
                    <input type="range" min="0" max="20" value={startMenuButtonBorderWidth} onChange={(e) => { setStartMenuButtonBorderWidth(e.target.value) }} />
                </div>
                <div>
                    <label>Color</label>
                    <ColorPicker color={startMenuButtonBorderColor} setColor={setStartMenuButtonBorderColor} useAlpha={true} />
                </div>
                <div>
                    <label>Radius</label>
                    <input type="range" min="0" max="100" value={startMenuButtonBorderRadius} onChange={(e) => { setStartMenuButtonBorderRadius(e.target.value) }} />
                </div>
                <div>
                    <label>Type</label>
                    <select value={startMenuButtonBorderType} onChange={(e) => { setStartMenuButtonBorderType(e.target.value) }}>
                        <option value="none">none</option>
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
            </fieldset>
            <fieldset>
                <legend>Text</legend>
                <div>
                    <label>Display</label>
                    <input type="checkbox" checked={startMenuButtonFontDisplay === "visible" ? true : false} onChange={(e) => { startMenuButtonFontDisplay === "visible" ? setStartMenuButtonFontDisplay("none") : setStartMenuButtonFontDisplay("visible") }} />
                </div>
                <div>
                    <label>Color</label>
                    <ColorPicker color={startMenuButtonFontColor} setColor={setStartMenuButtonFontColor} useAlpha={false} />
                </div>
                <div>
                    <label>Size</label>
                    <input type="range" min="0" max="32" value={startMenuButtonFontSize} onChange={(e) => { setStartMenuButtonFontSize(e.target.value) }} />
                </div>
            </fieldset>
        </fieldset>
    </>);
}