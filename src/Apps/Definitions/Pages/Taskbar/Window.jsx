import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../../System/ThemeManager/context.jsx";

import ColorPicker from "../../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

import { FaCog, FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const TrayWindowPreview = () => {

    return (
        <>
            <taskbar-window style={{ bottom: 0 }}>
                <taskbar-window-header style={{ height: "50px", justifyContent: "center", alignItems: "center" }}>
                    Header Content
                </taskbar-window-header>
                <taskbar-window-nav>
                    <button><FaCog /></button>
                    <button><FaArrowLeft /></button>
                    <button><FaArrowRight /></button>
                    Nav Bar Content
                </taskbar-window-nav>
                <taskbar-window-body style={{ height: "100px", width: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    Body Content
                </taskbar-window-body>
                <taskbar-window-footer>
                    Footer Content
                </taskbar-window-footer>
            </taskbar-window>
        </>
    );
};

export const TrayWindow = () => {

    var root = document.querySelector(":root");
    const theme = useContext(ThemeContext);

    const [taskbarWindowBkgr, setTaskbarWindowBkgr] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowBkgr")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowBkgr", taskbarWindowBkgr);
    }, [taskbarWindowBkgr]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowPadding, setTaskbarWindowPadding] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowPadding").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowPadding", taskbarWindowPadding + "px");
    }, [taskbarWindowPadding]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowBorderColor, setTaskbarWindowBorderColor] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowBorderColor")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowBorderColor", taskbarWindowBorderColor);
    }, [taskbarWindowBorderColor]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowBorderRadius, setTaskbarWindowBorderRadius] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowBorderRadius").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowBorderRadius", taskbarWindowBorderRadius + "px");
    }, [taskbarWindowBorderRadius]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowBorderWidth, setTaskbarWindowBorderWidth] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowBorderWidth").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowBorderWidth", taskbarWindowBorderWidth + "px");
    }, [taskbarWindowBorderWidth]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowBorderType, setTaskbarWindowBorderType] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowBorderType")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowBorderType", taskbarWindowBorderType);
    }, [taskbarWindowBorderType]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowHeaderBkgr, setTaskbarWindowHeaderBkgr] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowHeaderBkgr")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowHeaderBkgr", taskbarWindowHeaderBkgr);
    }, [taskbarWindowHeaderBkgr]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowHeaderColor, setTaskbarWindowHeaderColor] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowHeaderColor")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowHeaderColor", taskbarWindowHeaderColor);
    }, [taskbarWindowHeaderColor]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowHeaderMargin, setTaskbarWindowHeaderMargin] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowHeaderMargin").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowHeaderMargin", taskbarWindowHeaderMargin + "px");
    }, [taskbarWindowHeaderMargin]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowHeaderPadding, setTaskbarWindowHeaderPadding] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowHeaderPadding").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowHeaderPadding", taskbarWindowHeaderPadding + "px");
    }, [taskbarWindowHeaderPadding]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowHeaderBorderColor, setTaskbarWindowHeaderBorderColor] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowHeaderBorderColor")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowHeaderBorderColor", taskbarWindowHeaderBorderColor);
    }, [taskbarWindowHeaderBorderColor]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowHeaderBorderRadius, setTaskbarWindowHeaderBorderRadius] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowHeaderBorderRadius").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowHeaderBorderRadius", taskbarWindowHeaderBorderRadius + "px");
    }, [taskbarWindowHeaderBorderRadius]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowHeaderBorderWidth, setTaskbarWindowHeaderBorderWidth] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowHeaderBorderWidth").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowHeaderBorderWidth", taskbarWindowHeaderBorderWidth + "px");
    }, [taskbarWindowHeaderBorderWidth]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowHeaderBorderType, setTaskbarWindowHeaderBorderType] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowHeaderBorderType")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowHeaderBorderType", taskbarWindowHeaderBorderType);
    }, [taskbarWindowHeaderBorderType]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowNavBkgr, setTaskbarWindowNavBkgr] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowNavBkgr")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowNavBkgr", taskbarWindowNavBkgr);
    }, [taskbarWindowNavBkgr]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowNavColor, setTaskbarWindowNavColor] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowNavColor")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowNavColor", taskbarWindowNavColor);
    }, [taskbarWindowNavColor]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowNavMargin, setTaskbarWindowNavMargin] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowNavMargin").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowNavMargin", taskbarWindowNavMargin + "px");
    }, [taskbarWindowNavMargin]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowNavPadding, setTaskbarWindowNavPadding] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowNavPadding").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowNavPadding", taskbarWindowNavPadding + "px");
    }, [taskbarWindowNavPadding]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowNavBorderColor, setTaskbarWindowNavBorderColor] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowNavBorderColor")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowNavBorderColor", taskbarWindowNavBorderColor);
    }, [taskbarWindowNavBorderColor]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowNavBorderRadius, setTaskbarWindowNavBorderRadius] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowNavBorderRadius").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowNavBorderRadius", taskbarWindowNavBorderRadius + "px");
    }, [taskbarWindowNavBorderRadius]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowNavBorderWidth, setTaskbarWindowNavBorderWidth] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowNavBorderWidth").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowNavBorderWidth", taskbarWindowNavBorderWidth + "px");
    }, [taskbarWindowNavBorderWidth]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowNavBorderType, setTaskbarWindowNavBorderType] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowNavBorderType")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowNavBorderType", taskbarWindowNavBorderType);
    }, [taskbarWindowNavBorderType]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowBodyBkgr, setTaskbarWindowBodyBkgr] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowBodyBkgr")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowBodyBkgr", taskbarWindowBodyBkgr);
    }, [taskbarWindowBodyBkgr]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowBodyColor, setTaskbarWindowBodyColor] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowBodyColor")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowBodyColor", taskbarWindowBodyColor);
    }, [taskbarWindowBodyColor]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowBodyMargin, setTaskbarWindowBodyMargin] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowBodyMargin").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowBodyMargin", taskbarWindowBodyMargin + "px");
    }, [taskbarWindowBodyMargin]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowBodyPadding, setTaskbarWindowBodyPadding] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowBodyPadding").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowBodyPadding", taskbarWindowBodyPadding + "px");
    }, [taskbarWindowBodyPadding]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowBodyBorderColor, setTaskbarWindowBodyBorderColor] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowBodyBorderColor")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowBodyBorderColor", taskbarWindowBodyBorderColor);
    }, [taskbarWindowBodyBorderColor]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowBodyBorderRadius, setTaskbarWindowBodyBorderRadius] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowBodyBorderRadius").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowBodyBorderRadius", taskbarWindowBodyBorderRadius + "px");
    }, [taskbarWindowBodyBorderRadius]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowBodyBorderWidth, setTaskbarWindowBodyBorderWidth] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowBodyBorderWidth").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowBodyBorderWidth", taskbarWindowBodyBorderWidth + "px");
    }, [taskbarWindowBodyBorderWidth]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowBodyBorderType, setTaskbarWindowBodyBorderType] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowBodyBorderType")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowBodyBorderType", taskbarWindowBodyBorderType);
    }, [taskbarWindowBodyBorderType]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowFooterBkgr, setTaskbarWindowFooterBkgr] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowFooterBkgr")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowFooterBkgr", taskbarWindowFooterBkgr);
    }, [taskbarWindowFooterBkgr]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowFooterColor, setTaskbarWindowFooterColor] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowFooterColor")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowFooterColor", taskbarWindowFooterColor);
    }, [taskbarWindowFooterColor]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowFooterMargin, setTaskbarWindowFooterMargin] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowFooterMargin").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowFooterMargin", taskbarWindowFooterMargin + "px");
    }, [taskbarWindowFooterMargin]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowFooterPadding, setTaskbarWindowFooterPadding] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowFooterPadding").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowFooterPadding", taskbarWindowFooterPadding + "px");
    }, [taskbarWindowFooterPadding]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowFooterBorderColor, setTaskbarWindowFooterBorderColor] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowFooterBorderColor")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowFooterBorderColor", taskbarWindowFooterBorderColor);
    }, [taskbarWindowFooterBorderColor]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowFooterBorderRadius, setTaskbarWindowFooterBorderRadius] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowFooterBorderRadius").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowFooterBorderRadius", taskbarWindowFooterBorderRadius + "px");
    }, [taskbarWindowFooterBorderRadius]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowFooterBorderWidth, setTaskbarWindowFooterBorderWidth] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowFooterBorderWidth").slice(0, -2)
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowFooterBorderWidth", taskbarWindowFooterBorderWidth + "px");
    }, [taskbarWindowFooterBorderWidth]);
    //----------------------------------------------------------------------------//
    const [taskbarWindowFooterBorderType, setTaskbarWindowFooterBorderType] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWindowFooterBorderType")
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWindowFooterBorderType", taskbarWindowFooterBorderType);
    }, [taskbarWindowFooterBorderType]);

    return (
        <>
            <fieldset>
                <legend>Tray Window</legend>
                <fieldset>
                    <legend>Background</legend>
                    <div>
                        <label>Color:</label>
                        <ColorPicker
                            color={taskbarWindowBkgr}
                            setColor={setTaskbarWindowBkgr}
                            useAlpha={true}
                        />
                    </div>
                    <div>
                        <label>FX:</label>
                        <select
                            value={theme.taskbarBackgroundFX}
                            onChange={(e) => theme.setTaskbarBackgroundFX(e.target.value)}
                        >{
                                theme.backgroundFXList.map((fx) => (
                                    <option key={fx} value={fx}>{fx}</option>
                                ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Dimentions</legend>
                    <div>
                        <label>Padding:</label>
                        <input
                            type="range"
                            min={0}
                            max={15}
                            step="1"
                            value={taskbarWindowPadding}
                            onChange={(e) => setTaskbarWindowPadding(e.target.value)}
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
                            value={taskbarWindowBorderWidth}
                            onChange={(e) => setTaskbarWindowBorderWidth(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Radius:</label>
                        <input
                            type="range"
                            min={0}
                            max={15}
                            step="1"
                            value={taskbarWindowBorderRadius}
                            onChange={(e) => setTaskbarWindowBorderRadius(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Color:</label>
                        <ColorPicker
                            color={taskbarWindowBorderColor}
                            setColor={setTaskbarWindowBorderColor}
                            useAlpha={true}
                        />
                    </div>
                    <div>
                        <label>Type:</label>
                        <select
                            value={taskbarWindowBorderType}
                            onChange={(e) => setTaskbarWindowBorderType(e.target.value)}
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
                <legend>Header</legend>
                <fieldset>
                    <legend>Color</legend>
                    <div>
                        <label>Background:</label>
                        <ColorPicker
                            color={taskbarWindowHeaderBkgr}
                            setColor={setTaskbarWindowHeaderBkgr}
                            useAlpha={true}
                        />
                    </div>
                    <div>
                        <label>Color:</label>
                        <ColorPicker
                            color={taskbarWindowHeaderColor}
                            setColor={setTaskbarWindowHeaderColor}
                            useAlpha={false}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Dimentions</legend>
                    <div>
                        <label>Margin:</label>
                        <input
                            type="range"
                            min={0}
                            max={5}
                            step="1"
                            value={taskbarWindowHeaderMargin}
                            onChange={(e) => setTaskbarWindowHeaderMargin(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Padding:</label>
                        <input
                            type="range"
                            min={0}
                            max={5}
                            step="1"
                            value={taskbarWindowHeaderPadding}
                            onChange={(e) => setTaskbarWindowHeaderPadding(e.target.value)}
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
                            value={taskbarWindowHeaderBorderWidth}
                            onChange={(e) => setTaskbarWindowHeaderBorderWidth(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Radius:</label>
                        <input
                            type="range"
                            min={0}
                            max={15}
                            step="1"
                            value={taskbarWindowHeaderBorderRadius}
                            onChange={(e) => setTaskbarWindowHeaderBorderRadius(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Color:</label>
                        <ColorPicker
                            color={taskbarWindowHeaderBorderColor}
                            setColor={setTaskbarWindowHeaderBorderColor}
                            useAlpha={true}
                        />
                    </div>
                    <div>
                        <label>Type:</label>
                        <select
                            value={taskbarWindowHeaderBorderType}
                            onChange={(e) => setTaskbarWindowHeaderBorderType(e.target.value)}
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
                <legend>Nav Bar</legend>
                <fieldset>
                    <legend>Color</legend>
                    <div>
                        <label>Background:</label>
                        <ColorPicker
                            color={taskbarWindowNavBkgr}
                            setColor={setTaskbarWindowNavBkgr}
                            useAlpha={true}
                        />
                    </div>
                    <div>
                        <label>Color:</label>
                        <ColorPicker
                            color={taskbarWindowNavColor}
                            setColor={setTaskbarWindowNavColor}
                            useAlpha={false}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Dimentions</legend>
                    <div>
                        <label>Margin:</label>
                        <input
                            type="range"
                            min={0}
                            max={5}
                            step="1"
                            value={taskbarWindowNavMargin}
                            onChange={(e) => setTaskbarWindowNavMargin(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Padding:</label>
                        <input
                            type="range"
                            min={0}
                            max={5}
                            step="1"
                            value={taskbarWindowNavPadding}
                            onChange={(e) => setTaskbarWindowNavPadding(e.target.value)}
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
                            value={taskbarWindowNavBorderWidth}
                            onChange={(e) => setTaskbarWindowNavBorderWidth(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Radius:</label>
                        <input
                            type="range"
                            min={0}
                            max={15}
                            step="1"
                            value={taskbarWindowNavBorderRadius}
                            onChange={(e) => setTaskbarWindowNavBorderRadius(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Color:</label>
                        <ColorPicker
                            color={taskbarWindowNavBorderColor}
                            setColor={setTaskbarWindowNavBorderColor}
                            useAlpha={true}
                        />
                    </div>
                    <div>
                        <label>Type:</label>
                        <select
                            value={taskbarWindowNavBorderType}
                            onChange={(e) => setTaskbarWindowNavBorderType(e.target.value)}
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
                <legend>Body</legend>
                <fieldset>
                    <legend>Color</legend>
                    <div>
                        <label>Background:</label>
                        <ColorPicker
                            color={taskbarWindowBodyBkgr}
                            setColor={setTaskbarWindowBodyBkgr}
                            useAlpha={true}
                        />
                    </div>
                    <div>
                        <label>Color:</label>
                        <ColorPicker
                            color={taskbarWindowBodyColor}
                            setColor={setTaskbarWindowBodyColor}
                            useAlpha={false}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Dimentions</legend>
                    <div>
                        <label>Margin:</label>
                        <input
                            type="range"
                            min={0}
                            max={5}
                            step="1"
                            value={taskbarWindowBodyMargin}
                            onChange={(e) => setTaskbarWindowBodyMargin(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Padding:</label>
                        <input
                            type="range"
                            min={0}
                            max={5}
                            step="1"
                            value={taskbarWindowBodyPadding}
                            onChange={(e) => setTaskbarWindowBodyPadding(e.target.value)}
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
                            value={taskbarWindowBodyBorderWidth}
                            onChange={(e) => setTaskbarWindowBodyBorderWidth(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Radius:</label>
                        <input
                            type="range"
                            min={0}
                            max={15}
                            step="1"
                            value={taskbarWindowBodyBorderRadius}
                            onChange={(e) => setTaskbarWindowBodyBorderRadius(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Color:</label>
                        <ColorPicker
                            color={taskbarWindowBodyBorderColor}
                            setColor={setTaskbarWindowBodyBorderColor}
                            useAlpha={true}
                        />
                    </div>
                    <div>
                        <label>Type:</label>
                        <select
                            value={taskbarWindowBodyBorderType}
                            onChange={(e) => setTaskbarWindowBodyBorderType(e.target.value)}
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
                <legend>Footer</legend>
                <fieldset>
                    <legend>Color</legend>
                    <div>
                        <label>Background:</label>
                        <ColorPicker
                            color={taskbarWindowFooterBkgr}
                            setColor={setTaskbarWindowFooterBkgr}
                            useAlpha={true}
                        />
                    </div>
                    <div>
                        <label>Color:</label>
                        <ColorPicker
                            color={taskbarWindowFooterColor}
                            setColor={setTaskbarWindowFooterColor}
                            useAlpha={false}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Dimentions</legend>
                    <div>
                        <label>Margin:</label>
                        <input
                            type="range"
                            min={0}
                            max={5}
                            step="1"
                            value={taskbarWindowFooterMargin}
                            onChange={(e) => setTaskbarWindowFooterMargin(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Padding:</label>
                        <input
                            type="range"
                            min={0}
                            max={5}
                            step="1"
                            value={taskbarWindowFooterPadding}
                            onChange={(e) => setTaskbarWindowFooterPadding(e.target.value)}
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
                            value={taskbarWindowFooterBorderWidth}
                            onChange={(e) => setTaskbarWindowFooterBorderWidth(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Radius:</label>
                        <input
                            type="range"
                            min={0}
                            max={15}
                            step="1"
                            value={taskbarWindowFooterBorderRadius}
                            onChange={(e) => setTaskbarWindowFooterBorderRadius(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Color:</label>
                        <ColorPicker
                            color={taskbarWindowFooterBorderColor}
                            setColor={setTaskbarWindowFooterBorderColor}
                            useAlpha={true}
                        />
                    </div>
                    <div>
                        <label>Type:</label>
                        <select
                            value={taskbarWindowFooterBorderType}
                            onChange={(e) => setTaskbarWindowFooterBorderType(e.target.value)}
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
    );
}