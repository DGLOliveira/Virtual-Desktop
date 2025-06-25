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

    return (
        <>
            {device.virtualOSState.display === "startList" && createPortal(
                <start-list-mobile>
                    <start-list-mobile-container>
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