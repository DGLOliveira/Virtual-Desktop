import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../../System/ThemeManager/context.jsx";

import ColorPicker from "../../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

import { FcGlobe } from "react-icons/fc";
import { FcCalculator } from "react-icons/fc";

export const LiveAppsPreview = () => {
    const themeContext = useContext(ThemeContext);

    return (
        <>
            <div
                style={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    height: "var(--TaskbarHeight)",
                    backgroundColor: "var(--TaskbarBkgr)",
                    backgroundImage: "var(--TaskbarBkgrImage)",
                    backgroundPosition: "var(--TaskbarBkgrPosition)",
                    backgroundSize: "var(--TaskbarBkgrSize)",
                    backgroundRepeat: "var(--TaskbarBkgrRepeat)",
                    backdropFilter: "var(--TaskbarBackdropFilter)",
                    zIndex: 1,
                }}
            >
                <live-apps>
                    <button>
                        <FcGlobe />
                        <span>Active</span>
                    </button>
                    <button>
                        <FcCalculator />
                        <span>Inactive</span>
                    </button>
                </live-apps>
            </div>
        </>
    );
};

export const LiveApps = () => {

    var root = document.querySelector(":root");
    const theme = useContext(ThemeContext);

    const [liveAppsBkgr, setLiveAppsBkgr] = useState(
        getComputedStyle(root).getPropertyValue("--LiveAppsBkgr"),
    );
    useEffect(() => {
        root.style.setProperty("--LiveAppsBkgr", liveAppsBkgr);
    }, [liveAppsBkgr]);
    //----------------------------------------------------------------------------//
    const [liveAppsBkgrHover, setLiveAppsBkgrHover] = useState(
        getComputedStyle(root).getPropertyValue("--LiveAppsBkgrHover"),
    );
    useEffect(() => {
        root.style.setProperty("--LiveAppsBkgrHover", liveAppsBkgrHover);
    }, [liveAppsBkgrHover]);
    //----------------------------------------------------------------------------//
    const [liveAppsBkgrActive, setLiveAppsBkgrActive] = useState(
        getComputedStyle(root).getPropertyValue("--LiveAppsBkgrActive"),
    );
    useEffect(() => {
        root.style.setProperty("--LiveAppsBkgrActive", liveAppsBkgrActive);
    }, [liveAppsBkgrActive]);
    //----------------------------------------------------------------------------//
    const [liveAppsIconSize, setLiveAppsIconSize] = useState(
        getComputedStyle(root).getPropertyValue("--LiveAppsIconSize").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--LiveAppsIconSize", liveAppsIconSize + "px");
    }, [liveAppsIconSize]);
    //----------------------------------------------------------------------------//
    const [liveAppsFontSize, setLiveAppsFontSize] = useState(
        getComputedStyle(root).getPropertyValue("--LiveAppsFontSize").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--LiveAppsFontSize", liveAppsFontSize + "px");
    }, [liveAppsFontSize]);
    //----------------------------------------------------------------------------//
    const [liveAppsFontColor, setLiveAppsFontColor] = useState(
        getComputedStyle(root).getPropertyValue("--LiveAppsFontColor"),
    );
    useEffect(() => {
        root.style.setProperty("--LiveAppsFontColor", liveAppsFontColor);
    }, [liveAppsFontColor]);
    //----------------------------------------------------------------------------//
    const [liveAppsFontColorHover, setLiveAppsFontColorHover] = useState(
        getComputedStyle(root).getPropertyValue("--LiveAppsFontColorHover"),
    );
    useEffect(() => {
        root.style.setProperty("--LiveAppsFontColorHover", liveAppsFontColorHover);
    }, [liveAppsFontColorHover]);
    //----------------------------------------------------------------------------//
    const [liveAppsFontColorActive, setLiveAppsFontColorActive] = useState(
        getComputedStyle(root).getPropertyValue("--LiveAppsFontColorActive"),
    );
    useEffect(() => {
        root.style.setProperty("--LiveAppsFontColorActive", liveAppsFontColorActive);
    }, [liveAppsFontColorActive]);
    //----------------------------------------------------------------------------//
    const [liveAppsFontColorActiveHover, setLiveAppsFontColorActiveHover] = useState(
        getComputedStyle(root).getPropertyValue("--LiveAppsFontColorActiveHover"),
    );
    useEffect(() => {
        root.style.setProperty("--LiveAppsFontColorActiveHover", liveAppsFontColorActiveHover);
    }, [liveAppsFontColorActiveHover]);
    //----------------------------------------------------------------------------//
    const [liveAppsFontVisibility, setLiveAppsFontVisibility] = useState(
        getComputedStyle(root).getPropertyValue("--LiveAppsFontVisibility"),
    );
    useEffect(() => {
        root.style.setProperty("--LiveAppsFontVisibility", liveAppsFontVisibility);
    }, [liveAppsFontVisibility]);
    //----------------------------------------------------------------------------//
    const [liveAppsHeight, setLiveAppsHeight] = useState(
        getComputedStyle(root).getPropertyValue("--LiveAppsHeight").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--LiveAppsHeight", liveAppsHeight + "px");
    }, [liveAppsHeight]);
    //----------------------------------------------------------------------------//
    const [liveAppsMargin, setLiveAppsMargin] = useState(
        getComputedStyle(root).getPropertyValue("--LiveAppsMargin").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--LiveAppsMargin", liveAppsMargin + "px");
    }, [liveAppsMargin]);
    //----------------------------------------------------------------------------//
    const [liveAppsPadding, setLiveAppsPadding] = useState(
        getComputedStyle(root).getPropertyValue("--LiveAppsPadding").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--LiveAppsPadding", liveAppsPadding + "px");
    }, [liveAppsPadding]);
    //----------------------------------------------------------------------------//
    const [liveAppsBorderWidth, setLiveAppsBorderWidth] = useState(
        getComputedStyle(root).getPropertyValue("--LiveAppsBorderWidth").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--LiveAppsBorderWidth", liveAppsBorderWidth + "px");
    }, [liveAppsBorderWidth]);
    //----------------------------------------------------------------------------//
    const [liveAppsBorderRadius, setLiveAppsBorderRadius] = useState(
        getComputedStyle(root).getPropertyValue("--LiveAppsBorderRadius").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--LiveAppsBorderRadius", liveAppsBorderRadius + "px");
    }, [liveAppsBorderRadius]);
    //----------------------------------------------------------------------------//
    const [liveAppsBorderColor, setLiveAppsBorderColor] = useState(
        getComputedStyle(root).getPropertyValue("--LiveAppsBorderColor"),
    );
    useEffect(() => {
        root.style.setProperty("--LiveAppsBorderColor", liveAppsBorderColor);
    }, [liveAppsBorderColor]);
    //----------------------------------------------------------------------------//
    const [liveAppsBorderType, setLiveAppsBorderType] = useState(
        getComputedStyle(root).getPropertyValue("--LiveAppsBorderType"),
    );
    useEffect(() => {
        root.style.setProperty("--LiveAppsBorderType", liveAppsBorderType);
    }, [liveAppsBorderType]);

    return (
        <>
            <fieldset>
                <legend>Colors</legend>
                <fieldset>
                    <legend>Background</legend>
                    <div>
                        <label>Normal</label>
                        <ColorPicker
                            color={liveAppsBkgr}
                            setColor={setLiveAppsBkgr}
                            useAlpha={true}
                        />
                    </div>
                    <div>
                        <label>Hover</label>
                        <ColorPicker
                            color={liveAppsBkgrHover}
                            setColor={setLiveAppsBkgrHover}
                            useAlpha={true}
                        />
                    </div>
                    <div>
                        <label>Active</label>
                        <ColorPicker
                            color={liveAppsBkgrActive}
                            setColor={setLiveAppsBkgrActive}
                            useAlpha={true}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Font</legend>
                    <div>
                        <label>Visibility</label>
                        <select
                            value={liveAppsFontVisibility}
                            onChange={(e) => setLiveAppsFontVisibility(e.target.value)}
                        >
                            <option value="visible">Visible</option>
                            <option value="none">Hidden</option>
                        </select>
                    </div>
                    <div>
                        <label>Normal</label>
                        <ColorPicker
                            color={liveAppsFontColor}
                            setColor={setLiveAppsFontColor}
                            useAlpha={false}
                        />
                    </div>
                    <div>
                        <label>Hover</label>
                        <ColorPicker
                            color={liveAppsFontColorHover}
                            setColor={setLiveAppsFontColorHover}
                            useAlpha={false}
                        />
                    </div>
                    <div>
                        <label>Active</label>
                        <ColorPicker
                            color={liveAppsFontColorActive}
                            setColor={setLiveAppsFontColorActive}
                            useAlpha={false}
                        />
                    </div>
                </fieldset>
            </fieldset>
            <fieldset>
                <legend>Dimentions</legend>
                <div>
                    <label>Height</label>
                    <input
                        type="range"
                        min="0"
                        max="80"
                        value={liveAppsHeight}
                        onChange={(e) => setLiveAppsHeight(e.target.value)}
                    />
                </div>
                <div>
                    <label>Icon</label>
                    <input
                        type="range"
                        min="0"
                        max="80"
                        value={liveAppsIconSize}
                        onChange={(e) => setLiveAppsIconSize(e.target.value)}
                    />
                </div>
                <div>
                    <label>Font</label>
                    <input
                        type="range"
                        min="0"
                        max="30"
                        value={liveAppsFontVisibility}
                        onChange={(e) => setLiveAppsFontVisibility(e.target.value)}
                    />
                </div>
                <div>
                    <label>Margin</label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={liveAppsMargin}
                        onChange={(e) => setLiveAppsMargin(e.target.value)}
                    />
                </div>
                <div>
                    <label>Padding</label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={liveAppsPadding}
                        onChange={(e) => setLiveAppsPadding(e.target.value)}
                    />
                </div>
            </fieldset>
            <fieldset>
                <legend>Border</legend>
                <div>
                    <label>Width</label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={liveAppsBorderWidth}
                        onChange={(e) => setLiveAppsBorderWidth(e.target.value)}
                    />
                </div>
                <div>
                    <label>Radius</label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={liveAppsBorderRadius}
                        onChange={(e) => setLiveAppsBorderRadius(e.target.value)}
                    />
                </div>
                <div>
                    <label>Type</label>
                    <select
                        value={liveAppsBorderType}
                        onChange={(e) => setLiveAppsBorderType(e.target.value)}
                    >
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
                    <label>Color</label>
                    <ColorPicker
                        color={liveAppsBorderColor}
                        setColor={setLiveAppsBorderColor}
                        useAlpha={false}
                    />
                </div>
            </fieldset>
        </>
    )
};