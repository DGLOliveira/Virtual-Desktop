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
        <to-desktop>
            <button
                onClick={handleClick}
                title="To Desktop (Ctrl + ❖)"
            />
        </to-desktop>
    );
}