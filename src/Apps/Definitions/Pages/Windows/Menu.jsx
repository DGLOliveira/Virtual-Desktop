import { useState, useEffect, useContext, Fragment } from "react";

import { ThemeContext } from "../../../../System/ThemeManager/context.jsx";
import ColorPicker from "../../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

export const MenuPreview = () => {
    const theme = useContext(ThemeContext);
    const NavMenu = () => <nav
        className="appMenuBar"
        style={{
            backgroundColor: "var(--WindowMenuNavBkgr)"
        }}
    >
        <Fragment>
            <drop-down>
                <ul>
                    <li>
                        <button>
                            <div>Button</div>
                            <span />
                            <kbd>keybind</kbd>
                        </button>
                    </li>
                    <li>
                        <button disabled>
                            <div>Disabled Button</div>
                            <span />
                            <kbd>keybind</kbd>
                        </button>
                    </li>
                    <li>
                        <hr />
                    </li>
                    <li>
                        <button>
                            <div>Checkbox</div>
                            <span />
                            <input type="checkbox" />
                        </button>
                    </li>
                    <li>
                        <hr />
                    </li>
                    <li>
                        <button>
                            <div>Checkbox 1</div>
                            <span />
                            <input type="radio" name="radio" />
                        </button>
                    </li>
                    <li>
                        <button>
                            <div>Checkbox 2</div>
                            <span />
                            <input type="radio" name="radio" />
                        </button>
                    </li>
                </ul>
            </drop-down>
            <button>
                Menu 1
            </button>
        </Fragment>
        <button>
            Menu 3
        </button>
        <button>
            Menu 4
        </button>
    </nav>;

    return (
        <>
            <app-window
                style={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    width: "100%",
                    height: "100%",
                    color: "var(--WindowFontColor)",
                    backgroundColor: "var(--WindowBkgrColor)",
                    borderWidth: "var(--WindowBorderWidth)",
                    borderColor: "var(--WindowBorderColor)",
                    borderRadius: "var(--WindowBorderRadius)",
                    borderColor: "var(--WindowBorderColor)"
                }}
            >
                {theme.navMenuLocation === "in top bar" && <NavMenu />}
                <app-container
                    style={{
                        color: "var(--AppFontColor)",
                        backgroundColor: "var(--AppBkgrColor)",
                        borderColor: "var(--AppBorderColor)"
                    }}>
                    {theme.navMenuLocation === "in app" && <NavMenu />}
                </app-container>
            </app-window>
        </>
    );
};

export const Menu = () => {
    const root = document.querySelector(":root");
    const theme = useContext(ThemeContext);
    const [navBkgrColor, setNavBkgrColor] = useState(
        getComputedStyle(root).getPropertyValue("--WindowMenuNavBkgr"),
    );
    useEffect(() => {
        root.style.setProperty("--WindowMenuNavBkgr", navBkgrColor);
    }, [navBkgrColor]);
    //----------------------------------------------------------------------------//
    const [navBkgrColorInactive, setNavBkgrColorInactive] = useState(
        getComputedStyle(root).getPropertyValue("--WindowMenuNavBkgrInactive"),
    );
    useEffect(() => {
        root.style.setProperty("--WindowMenuNavBkgrInactive", navBkgrColorInactive);
    }, [navBkgrColorInactive]);
    //----------------------------------------------------------------------------//
    const [backgroundColor, setBackgroundColor] = useState(
        getComputedStyle(root).getPropertyValue("--WindowMenuBkgr"),
    );
    useEffect(() => {
        root.style.setProperty("--WindowMenuBkgr", backgroundColor);
    }, [backgroundColor]);
    //----------------------------------------------------------------------------//
    const [fontColor, setFontColor] = useState(
        getComputedStyle(root).getPropertyValue("--WindowMenuFontColor"),
    );
    useEffect(() => {
        root.style.setProperty("--WindowMenuFontColor", fontColor);
    }, [fontColor]);
    //----------------------------------------------------------------------------//
    const [fontSize, setFontSize] = useState(
        getComputedStyle(root).getPropertyValue("--WindowMenuFontSize").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--WindowMenuFontSize", fontSize + "px");
    }, [fontSize]);
    //----------------------------------------------------------------------------//
    const [borderColor, setBorderColor] = useState(
        getComputedStyle(root).getPropertyValue("--WindowMenuBorderColor"),
    );
    useEffect(() => {
        root.style.setProperty("--WindowMenuBorderColor", borderColor);
    }, [borderColor]);
    //----------------------------------------------------------------------------//
    const [borderWidth, setBorderWidth] = useState(
        getComputedStyle(root).getPropertyValue("--WindowMenuBorderWidth").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--WindowMenuBorderWidth", borderWidth + "px");
    }, [borderWidth]);
    //----------------------------------------------------------------------------//
    const [borderRadius, setBorderRadius] = useState(
        getComputedStyle(root).getPropertyValue("--WindowMenuBorderRadius").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--WindowMenuBorderRadius", borderRadius + "px");
    }, [borderRadius]);
    //----------------------------------------------------------------------------//
    const [borderType, setBorderType] = useState(
        getComputedStyle(root).getPropertyValue("--WindowMenuBorderType"),
    );
    useEffect(() => {
        root.style.setProperty("--WindowMenuBorderType", borderType);
    }, [borderType]);
    //----------------------------------------------------------------------------//
    const [hoverFontColor, setHoverFontColor] = useState(
        getComputedStyle(root).getPropertyValue("--WindowMenuHoverColor"),
    );
    useEffect(() => {
        root.style.setProperty("--WindowMenuHoverColor", hoverFontColor);
    }, [hoverFontColor]);
    //----------------------------------------------------------------------------//
    const [hoverBkgr, setHoverBkgr] = useState(
        getComputedStyle(root).getPropertyValue("--WindowMenuHoverBkgr"),
    );
    useEffect(() => {
        root.style.setProperty("--WindowMenuHoverBkgr", hoverBkgr);
    }, [hoverBkgr]);
    //----------------------------------------------------------------------------//
    const [navButtonBkgr, setNavButtonBkgr] = useState(
        getComputedStyle(root).getPropertyValue("--WindowMenuNavButtonBkgr"),
    );
    useEffect(() => {
        root.style.setProperty("--WindowMenuNavButtonBkgr", navButtonBkgr);
    }, [navButtonBkgr]);
    //----------------------------------------------------------------------------//
    const [navButtonFontColor, setNavButtonFontColor] = useState(
        getComputedStyle(root).getPropertyValue("--WindowMenuNavButtonColor"),
    );
    useEffect(() => {
        root.style.setProperty("--WindowMenuNavButtonColor", navButtonFontColor);
    }, [navButtonFontColor]);
    //----------------------------------------------------------------------------//
    const [navButtonHoverBkgr, setNavButtonHoverBkgr] = useState(
        getComputedStyle(root).getPropertyValue("--WindowMenuNavButtonHoverBkgr"),
    );
    useEffect(() => {
        root.style.setProperty("--WindowMenuNavButtonHoverBkgr", navButtonHoverBkgr);
    }, [navButtonHoverBkgr]);
    //----------------------------------------------------------------------------//
    const [navButtonHoverFontColor, setNavButtonHoverFontColor] = useState(
        getComputedStyle(root).getPropertyValue("--WindowMenuNavButtonHoverColor"),
    );
    useEffect(() => {
        root.style.setProperty("--WindowMenuNavButtonHoverColor", navButtonHoverFontColor);
    }, [navButtonHoverFontColor]);
    //----------------------------------------------------------------------------//
    const [navButtonBorderColor, setNavButtonBorderColor] = useState(
        getComputedStyle(root).getPropertyValue("--WindowMenuNavButtonBorderColor"),
    );
    useEffect(() => {
        root.style.setProperty("--WindowMenuNavButtonBorderColor", navButtonBorderColor);
    }, [navButtonBorderColor]);
    //----------------------------------------------------------------------------//
    const [navButtonBorderWidth, setNavButtonBorderWidth] = useState(
        getComputedStyle(root).getPropertyValue("--WindowMenuNavButtonBorderWidth").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--WindowMenuNavButtonBorderWidth", navButtonBorderWidth + "px");
    }), [navButtonBorderWidth];
    //----------------------------------------------------------------------------//
    const [navButtonBorderRadius, setNavButtonBorderRadius] = useState(
        getComputedStyle(root).getPropertyValue("--WindowMenuNavButtonBorderRadius").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--WindowMenuNavButtonBorderRadius", navButtonBorderRadius + "px");
    }, [navButtonBorderRadius]);
    //----------------------------------------------------------------------------//
    const [navButtonBorderType, setNavButtonBorderType] = useState(
        getComputedStyle(root).getPropertyValue("--WindowMenuNavButtonBorderType"),
    );
    useEffect(() => {
        root.style.setProperty("--WindowMenuNavButtonBorderType", navButtonBorderType);
    }, [navButtonBorderType]);
    //----------------------------------------------------------------------------//



    return (
        <>
            <fieldset>
                <legend>Global</legend>
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
                <div>
                    <label>Position:</label>
                    <select
                        value={theme.navMenuLocation}
                        onChange={(e) => theme.setNavMenuLocation(e.target.value)}
                    >
                        {theme.navMenuLocationList.map((location) => (
                            <option value={location} key={location}>{location}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <legend>Navigation Bar</legend>
                <div>
                    <label>Nav Bar Background:</label>
                    <ColorPicker
                        color={navBkgrColor}
                        setColor={setNavBkgrColor}
                        useAlpha={true}
                    />
                </div>
                <div>
                    <label>Nav Bar Background Inactive:</label>
                    <ColorPicker
                        color={navBkgrColorInactive}
                        setColor={setNavBkgrColorInactive}
                        useAlpha={true}
                    />
                </div>
            </fieldset>
            <fieldset>
                <legend>Navigation Buttons</legend>
                <div>
                    <label>Font Color:</label>
                    <ColorPicker
                        color={navButtonFontColor}
                        setColor={setNavButtonFontColor}
                        useAlpha={false}
                    />
                </div>
                <div>
                    <label>Hover Font Color:</label>
                    <ColorPicker
                        color={navButtonHoverFontColor}
                        setColor={setNavButtonHoverFontColor}
                        useAlpha={false}
                    />
                </div>
                <div>
                    <legend>Background</legend>
                    <ColorPicker
                        color={navButtonBkgr}
                        setColor={setNavButtonBkgr}
                        useAlpha={false}
                    />
                </div>
                <div>
                    <legend>Hover Background</legend>
                    <ColorPicker
                        color={navButtonHoverBkgr}
                        setColor={setNavButtonHoverBkgr}
                        useAlpha={false}
                    />
                </div>
                <div>
                    <label>Border Color:</label>
                    <ColorPicker
                        color={navButtonBorderColor}
                        setColor={setNavButtonBorderColor}
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
                        value={navButtonBorderWidth}
                        onChange={(e) => setNavButtonBorderWidth(e.target.value)}
                    />
                </div>
                <div>
                    <label>Border Radius:</label>
                    <input
                        type="range"
                        min={0}
                        max={20}
                        step="1"
                        value={navButtonBorderRadius}
                        onChange={(e) => setNavButtonBorderRadius(e.target.value)}
                    />
                </div>
                <div>
                    <label>Border Type:</label>
                    <select
                        value={navButtonBorderType}
                        onChange={(e) => setNavButtonBorderType(e.target.value)}
                    >
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
            </fieldset>

            <fieldset>
                <legend>Menu</legend>

                <div>
                    <label>Font Color:</label>
                    <ColorPicker
                        color={fontColor}
                        setColor={setFontColor}
                        useAlpha={false}
                    />
                </div>
                <div>
                    <label>Hover Font Color:</label>
                    <ColorPicker
                        color={hoverFontColor}
                        setColor={setHoverFontColor}
                        useAlpha={false}
                    />
                </div>
                <div>
                    <label>Background Color:</label>
                    <ColorPicker
                        color={backgroundColor}
                        setColor={setBackgroundColor}
                        useAlpha={true}
                    />
                </div>
                <div>
                    <label>Hover Background:</label>
                    <ColorPicker
                        color={hoverBkgr}
                        setColor={setHoverBkgr}
                        useAlpha={true}
                    />
                </div>
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
            </fieldset>
        </>
    );
};