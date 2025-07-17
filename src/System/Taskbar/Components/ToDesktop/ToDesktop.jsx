import { useState, useContext } from "react";
import { DeviceContext } from "../../../DeviceManager/context.jsx";
import { AppContext } from "../../../AppManager/Context/context.jsx";
import DefaultIcon from "./DefaultIcon.jsx";
import "./ToDesktop.css";

export const ToDesktop = () => {
    const deviceContext = useContext(DeviceContext);
    const appContext = useContext(AppContext);
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        deviceContext.setVirtualOSState({ ...deviceContext.virtualOSState, display: "none" });
        appContext.minimizeAll();
        setClicked(true);
        setTimeout(() => setClicked(false), 2000);
    }

    return (
        <to-desktop-button
            style={{
                display: deviceContext.deviceType !== "Desktop" ? "flex" : "auto",
                width: deviceContext.deviceType !== "Desktop" ? "100%" : "auto",
            }}
        >
            <button

                onClick={handleClick}
                title="To Desktop (Ctrl + ❖)"
            >
                <DefaultIcon isActive={clicked}/>
                </button>
        </to-desktop-button>
    );
}