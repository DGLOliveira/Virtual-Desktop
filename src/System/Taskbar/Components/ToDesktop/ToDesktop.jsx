import { useState, useContext, useCallback, lazy, Suspense } from "react";
import { DeviceContext } from "../../../DeviceManager/context.jsx";
import { ThemeContext } from "../../../ThemeManager/context.jsx";
import { AppContext } from "../../../AppManager/Context/context.jsx";
import DefaultIcon from "./DefaultIcon.jsx";
import "./ToDesktop.css";

export const ToDesktop = () => {
    const deviceContext = useContext(DeviceContext);
    const appContext = useContext(AppContext);
    const theme = useContext(ThemeContext);
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        deviceContext.setVirtualOSState({ ...deviceContext.virtualOSState, display: "none" });
        appContext.minimizeAll();
        setClicked(true);
        setTimeout(() => setClicked(false), 1000);
    }

      const Icon = useCallback((
        lazy(() => import(`../../../ThemeManager/${theme.ToDesktopIconPath}`).catch(
          (error) => {
            let errorMessage = "Failed to load toDesktop Button Icon";
            console.error(errorMessage);
            return { default: DefaultIcon }
          }
        ))
      ), [theme.ToDesktopIconPath]);

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
                <Suspense fallback={null}>
                    <Icon isActive={clicked} />
                </Suspense>
                </button>
        </to-desktop-button>
    );
}