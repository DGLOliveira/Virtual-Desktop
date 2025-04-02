import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../../System/ThemeManager/context.jsx";

import ColorPicker from "../../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

import { WiCloudy } from "react-icons/wi";

export const TrayPreview = () => {
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
                <live-apps></live-apps>
                <vertical-rect />
                <taskbar-tray>
                    <button>
                        <WiCloudy /> 20°C
                    </button>
                    <button>
                        11:59
                        <br />
                        31/12/2000
                    </button>
                </taskbar-tray>
            </div>
        </>
    );
};

export const Tray = () => {
    var root = document.querySelector(":root");
    const theme = useContext(ThemeContext);

    const [taskbarTrayBkgr, setTaskbarTrayBkgr] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarTrayBkgr")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarTrayBkgr", taskbarTrayBkgr);
    }, [taskbarTrayBkgr]);
    //----------------------------------------------------------------------------//
    const [taskbarTrayMargin, setTaskbarTrayMargin] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarTrayMargin").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarTrayMargin", taskbarTrayMargin + "px");
    }, [taskbarTrayMargin]);
    //----------------------------------------------------------------------------//
    const [taskbarTrayPadding, setTaskbarTrayPadding] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarTrayPadding").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarTrayPadding", taskbarTrayPadding + "px");
    }, [taskbarTrayPadding]);
    //----------------------------------------------------------------------------//
    const [taskbarTrayBorderColor, setTaskbarTrayBorderColor] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarTrayBorderColor")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarTrayBorderColor", taskbarTrayBorderColor);
    }, [taskbarTrayBorderColor]);
    //----------------------------------------------------------------------------//
    const [taskbarTrayBorderRadius, setTaskbarTrayBorderRadius] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarTrayBorderRadius").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarTrayBorderRadius", taskbarTrayBorderRadius + "px");
    }, [taskbarTrayBorderRadius]);
    //----------------------------------------------------------------------------//
    const [taskbarTrayBorderWidth, setTaskbarTrayBorderWidth] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarTrayBorderWidth").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarTrayBorderWidth", taskbarTrayBorderWidth + "px");
    }, [taskbarTrayBorderWidth]);
    //----------------------------------------------------------------------------//
    const [taskbarTrayBorderType, setTaskbarTrayBorderType] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarTrayBorderType")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarTrayBorderType", taskbarTrayBorderType);
    }, [taskbarTrayBorderType]);
    //----------------------------------------------------------------------------//
    const [taskbarTrayButtonBkgr, setTaskbarTrayButtonBkgr] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarTrayButtonBkgr")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarTrayButtonBkgr", taskbarTrayButtonBkgr);
    }, [taskbarTrayButtonBkgr]);
    //----------------------------------------------------------------------------//
    const [taskbarTrayButtonBkgrHover, setTaskbarTrayButtonBkgrHover] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarTrayButtonBkgrHover")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarTrayButtonBkgrHover", taskbarTrayButtonBkgrHover);
    }, [taskbarTrayButtonBkgrHover]);
    //----------------------------------------------------------------------------//
    const [taskbarTrayButtonBkgrActive, setTaskbarTrayButtonBkgrActive] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarTrayButtonBkgrActive")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarTrayButtonBkgrActive", taskbarTrayButtonBkgrActive);
    }, [taskbarTrayButtonBkgrActive]);
    //----------------------------------------------------------------------------//
    const [taskbarTrayButtonColor, setTaskbarTrayButtonColor] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarTrayButtonColor")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarTrayButtonColor", taskbarTrayButtonColor);
    }, [taskbarTrayButtonColor]);
    //----------------------------------------------------------------------------//
    const [taskbarTrayButtonColorHover, setTaskbarTrayButtonColorHover] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarTrayButtonColorHover")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarTrayButtonColorHover", taskbarTrayButtonColorHover);
    }, [taskbarTrayButtonColorHover]);
    //----------------------------------------------------------------------------//
    const [taskbarTrayButtonColorActive, setTaskbarTrayButtonColorActive] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarTrayButtonColorActive")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarTrayButtonColorActive", taskbarTrayButtonColorActive);
    }, [taskbarTrayButtonColorActive]);
    //----------------------------------------------------------------------------//
    const [taskbarTrayButtonMargin, setTaskbarTrayButtonMargin] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarTrayButtonMargin").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarTrayButtonMargin", taskbarTrayButtonMargin + "px");
    }, [taskbarTrayButtonMargin]);
    //----------------------------------------------------------------------------//
    const [taskbarTrayButtonPadding, setTaskbarTrayButtonPadding] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarTrayButtonPadding").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarTrayButtonPadding", taskbarTrayButtonPadding + "px");
    }, [taskbarTrayButtonPadding]);
    //----------------------------------------------------------------------------//
    const [taskbarTrayButtonBorderColor, setTaskbarTrayButtonBorderColor] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarTrayButtonBorderColor")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarTrayButtonBorderColor", taskbarTrayButtonBorderColor);
    }, [taskbarTrayButtonBorderColor]);
    //----------------------------------------------------------------------------//
    const [taskbarTrayButtonBorderRadius, setTaskbarTrayButtonBorderRadius] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarTrayButtonBorderRadius").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarTrayButtonBorderRadius", taskbarTrayButtonBorderRadius + "px");
    }, [taskbarTrayButtonBorderRadius]);
    //----------------------------------------------------------------------------//
    const [taskbarTrayButtonBorderWidth, setTaskbarTrayButtonBorderWidth] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarTrayButtonBorderWidth").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarTrayButtonBorderWidth", taskbarTrayButtonBorderWidth + "px");
    }, [taskbarTrayButtonBorderWidth]);
    //----------------------------------------------------------------------------//
    const [taskbarTrayButtonBorderType, setTaskbarTrayButtonBorderType] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarTrayButtonBorderType")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarTrayButtonBorderType", taskbarTrayButtonBorderType);
    }, [taskbarTrayButtonBorderType]);

    return (
        <>
            <fieldset>
                <legend>Tray Group</legend>
                <div>
                    <label>Background:</label>
                    <ColorPicker
                        color={taskbarTrayBkgr}
                        setColor={setTaskbarTrayBkgr}
                        alpha={true}
                    />
                </div>
                <fieldset>
                    <legend>Dimentions</legend>
                    <div>
                        <label>Magin:</label>
                        <input
                            type="range"
                            min={0}
                            max={5}
                            step="1"
                            value={taskbarTrayMargin}
                            onChange={(e) => setTaskbarTrayMargin(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Padding:</label>
                        <input
                            type="range"
                            min={0}
                            max={5}
                            step="1"
                            value={taskbarTrayPadding}
                            onChange={(e) => setTaskbarTrayPadding(e.target.value)}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Border</legend>
                    <div>
                        <label>Width:</label>
                        <input
                            type="range"
                            min={0}
                            max={5}
                            step="1"
                            value={taskbarTrayBorderWidth}
                            onChange={(e) => setTaskbarTrayBorderWidth(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Radius:</label>
                        <input
                            type="range"
                            min={0}
                            max={15}
                            step="1"
                            value={taskbarTrayBorderRadius}
                            onChange={(e) => setTaskbarTrayBorderRadius(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Color:</label>
                        <ColorPicker
                            color={taskbarTrayBorderColor}
                            setColor={setTaskbarTrayBorderColor}
                            alpha={true}
                        />
                    </div>
                    <div>
                        <label>Type:</label>
                        <select
                            value={taskbarTrayBorderType}
                            onChange={(e) => setTaskbarTrayBorderType(e.target.value)}
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
                </fieldset>
            </fieldset>
            <fieldset>
                <legend>Button</legend>
                <fieldset>
                    <legend>Dimentions</legend>
                    <div>
                        <label>Magin:</label>
                        <input
                            type="range"
                            min={0}
                            max={5}
                            step="1"
                            value={taskbarTrayButtonMargin}
                            onChange={(e) => setTaskbarTrayButtonMargin(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Padding:</label>
                        <input
                            type="range"
                            min={0}
                            max={5}
                            step="1"
                            value={taskbarTrayButtonPadding}
                            onChange={(e) => setTaskbarTrayButtonPadding(e.target.value)}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Background Color:</legend>
                    <div>
                        <label>Passive:</label>
                        <ColorPicker
                            color={taskbarTrayButtonBkgr}
                            setColor={setTaskbarTrayButtonBkgr}
                            alpha={true}
                        />
                    </div>
                    <div>
                        <label>Hover:</label>
                        <ColorPicker
                            color={taskbarTrayButtonBkgrHover}
                            setColor={setTaskbarTrayButtonBkgrHover}
                            alpha={true}
                        />
                    </div>
                    <div>
                        <label>Active:</label>
                        <ColorPicker
                            color={taskbarTrayButtonBkgrActive}
                            setColor={setTaskbarTrayButtonBkgrActive}
                            alpha={true}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Font Color</legend>
                    <div>
                        <label>Passive:</label>
                        <ColorPicker
                            color={taskbarTrayButtonColor}
                            setColor={setTaskbarTrayButtonColor}
                            alpha={true}
                        />
                    </div>
                    <div>
                        <label>Hover:</label>
                        <ColorPicker
                            color={taskbarTrayButtonColorHover}
                            setColor={setTaskbarTrayButtonColorHover}
                            alpha={true}
                        />
                    </div>
                    <div>
                        <label>Active:</label>
                        <ColorPicker
                            color={taskbarTrayButtonColorActive}
                            setColor={setTaskbarTrayButtonColorActive}
                            alpha={true}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Border</legend>
                    <div>
                        <label>Width:</label>
                        <input
                            type="range"
                            min={0}
                            max={5}
                            step="1"
                            value={taskbarTrayButtonBorderWidth}
                            onChange={(e) => setTaskbarTrayButtonBorderWidth(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Radius:</label>
                        <input
                            type="range"
                            min={0}
                            max={15}
                            step="1"
                            value={taskbarTrayButtonBorderRadius}
                            onChange={(e) => setTaskbarTrayButtonBorderRadius(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Color:</label>
                        <ColorPicker
                            color={taskbarTrayButtonBorderColor}
                            setColor={setTaskbarTrayButtonBorderColor}
                            alpha={true}
                        />
                    </div>
                    <div>
                        <label>Type:</label>
                        <select
                            value={taskbarTrayButtonBorderType}
                            onChange={(e) => setTaskbarTrayButtonBorderType(e.target.value)}
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
                </fieldset>
            </fieldset>
        </>
    )
}