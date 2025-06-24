import { useContext } from "react";
import { DeviceContext } from "../../../DeviceManager/context.jsx";
import { AppContext } from "../../../AppManager/Context/context.jsx";
import "./ToDesktop.css";

export const ToDesktop = () => {
    const deviceContext = useContext(DeviceContext);
    const appContext = useContext(AppContext);
    const handleClick = () => {
        deviceContext.setVirtualOSState({ ...deviceContext.virtualOSState, display: "none" });
        Object.keys(appContext.apps).forEach((name) => {
            !appContext.apps[name].State.isMinimized && appContext.switchMinimized(name);
        });
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
                {deviceContext.deviceType !== "Desktop" && ">>>"}
                </button>
        </to-desktop-button>
    );
}