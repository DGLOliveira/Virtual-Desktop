import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../../System/ThemeManager/context.jsx";

import { FaGear } from "react-icons/fa6";
import { MdOutlineRestartAlt } from "react-icons/md";
import { RiShutDownLine } from "react-icons/ri";
import { WiCloudy } from "react-icons/wi";
import { TbDeviceMobile } from "react-icons/tb";

import ColorPicker from "../../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

export const TrayExpandedPreview = () => {
    return (<>
        <mobile-tray-fullscreen
            style={{ top: "calc(-1*var(--MobileTrayHeight))", height: "calc(100% + var(--TaskbarHeight) + var(--MobileTrayHeight))" }}
        >
            <mobile-tray-system>
                <button>
                    <WiCloudy /> 20°C
                </button>
                <button>
                    <TbDeviceMobile />
                </button>
                <button>
                    <FaGear />
                </button>
                <button>
                    <MdOutlineRestartAlt />
                </button>
                <button>
                    <RiShutDownLine />
                </button>
            </mobile-tray-system>
            <mobile-tray-fullscreen-clock>
                <button>
                    11:59
                    <br />
                    31/12/2000
                </button>
            </mobile-tray-fullscreen-clock>
            <div>
            </div>
        </mobile-tray-fullscreen>
    </>
    );
}

export const TrayExpanded = () => {
    const theme = useContext(ThemeContext);
    var root = document.querySelector(":root");

    const [background, setBackground] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayFullBkgr"));
    useEffect(() => {
        root.style.setProperty("--MobileTrayFullBkgr", background);
    }, [background]);
    //----------------------------------------------------------------------------//
    const [systemColor, setSystemColor] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayFullColor"));
    useEffect(() => {
        root.style.setProperty("--MobileTrayFullColor", systemColor);
    }, [systemColor]);
    //----------------------------------------------------------------------------//
    const [systemButtonSize, setSystemButtonSize] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayFullSystemButtonSize").slice(0, -2));
    useEffect(() => {
        root.style.setProperty("--MobileTrayFullSystemButtonSize", systemButtonSize + "px");
    }, [systemButtonSize]);
    //----------------------------------------------------------------------------//
    const [systemButtonBackground, setSystemButtonBackground] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayFullButtonBkgr"));
    useEffect(() => {
        root.style.setProperty("--MobileTrayFullButtonBkgr", systemButtonBackground);
    }, [systemButtonBackground]);
    //----------------------------------------------------------------------------//
    const [systemButtonMargin, setSystemButtonMargin] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayFullButtonMargin").slice(0, -2));
    useEffect(() => {
        root.style.setProperty("--MobileTrayFullButtonMargin", systemButtonMargin + "px");
    }, [systemButtonMargin]);
    //----------------------------------------------------------------------------//
    const [systemButtonPadding, setSystemButtonPadding] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayFullButtonPadding").slice(0, -2));
    useEffect(() => {
        root.style.setProperty("--MobileTrayFullButtonPadding", systemButtonPadding + "px");
    }, [systemButtonPadding]);
    //----------------------------------------------------------------------------//
    const [systemButtonBorderRadius, setSystemButtonBorderRadius] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayFullButtonBorderRadius").slice(0, -2));
    useEffect(() => {
        root.style.setProperty("--MobileTrayFullButtonBorderRadius", systemButtonBorderRadius + "px");
    }, [systemButtonBorderRadius]);
    //----------------------------------------------------------------------------//
    const [systemButtonBorderColor, setSystemButtonBorderColor] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayFullButtonBorderColor"));
    useEffect(() => {
        root.style.setProperty("--MobileTrayFullButtonBorderColor", systemButtonBorderColor);
    }, [systemButtonBorderColor]);
    //----------------------------------------------------------------------------//
    const [systemButtonBorderWidth, setSystemButtonBorderWidth] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayFullButtonBorderWidth").slice(0, -2));
    useEffect(() => {
        root.style.setProperty("--MobileTrayFullButtonBorderWidth", systemButtonBorderWidth + "px");
    }, [systemButtonBorderWidth]);
    //----------------------------------------------------------------------------//
    const [systemButtonBorderType, setSystemButtonBorderType] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayFullButtonBorderType"));
    useEffect(() => {
        root.style.setProperty("--MobileTrayFullButtonBorderType", systemButtonBorderType);
    }, [systemButtonBorderType]);
    //----------------------------------------------------------------------------//
    const [systemButtonIconSize, setSystemButtonIconSize] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayFullSystemButtonIconSize").slice(0, -2));
    useEffect(() => {
        root.style.setProperty("--MobileTrayFullSystemButtonIconSize", systemButtonIconSize + "px");
    }, [systemButtonIconSize]);
    //----------------------------------------------------------------------------//
    const [systemClockFontSize, setSystemClockFontSize] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayFullClockFontSize").slice(0, -2));
    useEffect(() => {
        root.style.setProperty("--MobileTrayFullClockFontSize", systemClockFontSize + "px");
    }, [systemClockFontSize]);
    //----------------------------------------------------------------------------//
    const [systemClockPadding, setSystemClockPadding] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayFullClockPadding").slice(0, -2));
    useEffect(() => {
        root.style.setProperty("--MobileTrayFullClockPadding", systemClockPadding + "px");
    }, [systemClockPadding]);
    //----------------------------------------------------------------------------//
    const [systemClockColor, setSystemClockColor] = useState(
        getComputedStyle(root).getPropertyValue("--MobileTrayFullClockColor"));
    useEffect(() => {
        root.style.setProperty("--MobileTrayFullClockColor", systemClockColor);
    }, [systemClockColor]);

    return (<>
    <fieldset>
        <legend>Colors</legend>
        <div>
            <label>Background</label>
            <ColorPicker color={background} setColor={setBackground} useAlpha={true} />
        </div>
        <div>
            <label>Font & Icon Color</label>
            <ColorPicker color={systemColor} setColor={setSystemColor} useAlpha={false} />
        </div>
    </fieldset>
    <fieldset>
        <legend>System Buttons</legend>
        <div>
            <label>Size</label>
            <input type="range" min="20" max="100" value={systemButtonSize} onChange={(e) => setSystemButtonSize(e.target.value)} />
            <input type="number" min="20" max="100" value={systemButtonSize} onChange={(e) => setSystemButtonSize(e.target.value)} />
        </div>
        <div>
            <label>Margin</label>
            <input type="range" min="0" max="20" value={systemButtonMargin} onChange={(e) => setSystemButtonMargin(e.target.value)} />
            <input type="number" min="0" max="20" value={systemButtonMargin} onChange={(e) => setSystemButtonMargin(e.target.value)} />
        </div>
        <div>
            <label>Padding</label>
            <input type="range" min="0" max="20" value={systemButtonPadding} onChange={(e) => setSystemButtonPadding(e.target.value)} />
            <input type="number" min="0" max="20" value={systemButtonPadding} onChange={(e) => setSystemButtonPadding(e.target.value)} />
        </div>
        <div>
            <label>Background</label>
            <ColorPicker color={systemButtonBackground} setColor={setSystemButtonBackground} useAlpha={true} />
        </div>
        <div>
            <label>Icon Size</label>
            <input type="range" min="10" max="40" value={systemButtonIconSize} onChange={(e) => setSystemButtonIconSize(e.target.value)} />
            <input type="number" min="10" max="40" value={systemButtonIconSize} onChange={(e) => setSystemButtonIconSize(e.target.value)} />
        </div>
        <fieldset>
            <legend>Border</legend>
            <div>
                <label>Width</label>
                <input type="range" min="0" max="10" value={systemButtonBorderWidth} onChange={(e) => setSystemButtonBorderWidth(e.target.value)} />
                <input type="number" min="0" max="10" value={systemButtonBorderWidth} onChange={(e) => setSystemButtonBorderWidth(e.target.value)} />
            </div>
            <div>
                <label>Type</label>
                <select value={systemButtonBorderType} onChange={(e) => setSystemButtonBorderType(e.target.value)} >
                    <option value="none">None</option>
                    <option value="solid">Solid</option>
                    <option value="dashed">Dashed</option>
                    <option value="dotted">Dotted</option>
                    <option value="double">Double</option>
                    <option value="groove">Groove</option>
                    <option value="ridge">Ridge</option>
                    <option value="inset">Inset</option>
                    <option value="outset">Outset</option>
                </select>
            </div>
            <div>
                <label>Color</label>
                <ColorPicker color={systemButtonBorderColor} setColor={setSystemButtonBorderColor} useAlpha={true} />
            </div>
            <div>
                <label>Border Radius</label>
                <input type="range" min="0" max="20" value={systemButtonBorderRadius} onChange={(e) => setSystemButtonBorderRadius(e.target.value)} />
                <input type="number" min="0" max="20" value={systemButtonBorderRadius} onChange={(e) => setSystemButtonBorderRadius(e.target.value)} />
            </div>
        </fieldset>
    </fieldset>
    <fieldset>
        <legend>System Clock</legend>
        <div>
            <label>Size</label>
            <input type="range" min="10" max="50" value={systemClockFontSize} onChange={(e) => setSystemClockFontSize(e.target.value)} />
            <input type="number" min="10" max="50" value={systemClockFontSize} onChange={(e) => setSystemClockFontSize(e.target.value)} />
        </div>
        <div>
            <label>Padding</label>
            <input type="range" min="0" max="20" value={systemClockPadding} onChange={(e) => setSystemClockPadding(e.target.value)} />
            <input type="number" min="0" max="20" value={systemClockPadding} onChange={(e) => setSystemClockPadding(e.target.value)} />
        </div>
        <div>
            <label>Color</label>
            <ColorPicker color={systemClockColor} setColor={setSystemClockColor} useAlpha={false} />
        </div>
    </fieldset>
    </>);
}