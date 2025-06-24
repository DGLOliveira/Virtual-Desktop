import { useContext } from "react";
import { createPortal } from "react-dom";

import { TaskbarClock } from "../../Components/Clock/index.jsx";
import { Weather } from "../../Components/Weather/index.jsx";
import { DeviceSet } from "../../Components/DeviceSet/index.jsx";
import { DeviceContext } from "../../../DeviceManager/context.jsx";

import "./styles.css";

export const Tray = ({ showWeather, setShowWeather, showClock, setShowClock, contextMenu }) => {
    const device = useContext(DeviceContext);
    return (<>
        {device.deviceType === "Desktop" ?
            <><taskbar-tray>
                {showWeather && <Weather contextMenu={contextMenu} setShowWeather={setShowWeather} />}
                <DeviceSet />
                {showClock && <TaskbarClock contextMenu={contextMenu} setShowClock={setShowClock} />}
            </taskbar-tray>
                <vertical-rect />
            </>
            : createPortal(
                <mobile-tray>
                    {showWeather && <Weather contextMenu={contextMenu} setShowWeather={setShowWeather} />}
                    <DeviceSet />
                    {showClock && <TaskbarClock contextMenu={contextMenu} setShowClock={setShowClock} />}
                </mobile-tray>
            , document.getElementById("root"))
        }
    </>
    );
}