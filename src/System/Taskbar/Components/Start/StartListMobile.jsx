import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { DeviceContext } from "../../../DeviceManager/context.jsx";
import { FileContext } from "../../../FileManager/context.jsx";
import { AppContext } from "../../../AppManager/Context/context.jsx";
import { ThemeContext } from "../../../ThemeManager/context.jsx";
import { AppIcon } from "../../../AppManager/Components/AppIcon.jsx";

import "./StartListMobile.css";

//import { FaGear } from "react-icons/fa6";
//import { MdOutlineRestartAlt } from "react-icons/md";
//import { RiShutDownLine } from "react-icons/ri";

export const StartListMobile = ({ isOpen, setIsOpen }) => {
    const device = useContext(DeviceContext);
    const file = useContext(FileContext);
    const app = useContext(AppContext);
    const theme = useContext(ThemeContext);
    const [zIndex, setZIndex] = useState(100);
    const [doesDesktopExist, setDoesDesktopExist] = useState(false);

    //Prevents the start menu from being rendered if the <desk-top> element doesn't exist
    const checkIfDeskTopExists = () => {
        const desktop = document.getElementsByTagName("desk-top")[0];
        if(desktop) {
            return setDoesDesktopExist(true);
        }
        setTimeout(checkIfDeskTopExists, 500);
    }
    //Checks if the <desk-top> element exists, usually it does not exist on first render
    useEffect(() => {
        checkIfDeskTopExists();
    }, []);

    //Handles the z-index of the start menu  by placing it behind the desktop when it is not open
    //This allows the Y position transition to be smooth
    useEffect(() => {
        const timeout =
            setTimeout(() => {
            setZIndex(-100);
            }, getComputedStyle(document.querySelector(":root")).getPropertyValue("--StartMenuMobileTransition").slice(0, -1) * 1000);
        if(!isOpen) {
            timeout;
        }else {
            setZIndex(100);
            clearTimeout(timeout);
        }
    },[isOpen]);


    return (
        <>
            {doesDesktopExist && createPortal(
                <start-list-mobile
                style={{
                    background: isOpen ? "var(--StartMenuMobileOuterBkgr)" : "hsla(0, 0%, 0%, 0)",
                    boxShadow: isOpen ? " 0 0 var(--StartMenuMobileOuterShadowBlur) var(--StartMenuMobileOuterShadowSpread) var(--StartMenuMobileOuterShadowColor) inset" 
                                        : " 0 0 0 0 hsla(0, 0%, 0%, 0) inset",
                    zIndex: zIndex,
                }}
                >
                    <start-list-mobile-container 
                    style={{
                        top: isOpen ? "0" : "calc(100% + var(--StartMenuMobileOuterPadding) + var(--TaskbarHeight))",
                    }}
                    >
                    {Object.keys(file.taskbar).map((name) => (
                        <button
                            key={name}
                            onClick={() => {app.setOpen(name); setIsOpen(false); device.setVirtualOSState({...device.virtualOSState, display: "none"})}}
                            aria-label={"Open " + name + " App"}
                        >
                            <AppIcon appName={name} />
                            <span>{name}</span>
                        </button>
                    ))}
                    </start-list-mobile-container>
                </start-list-mobile>, document.getElementsByTagName("desk-top")[0])
            }
        </>
    );
}