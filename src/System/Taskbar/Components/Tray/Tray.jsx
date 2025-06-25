import { useState, useContext } from "react";
import { createPortal } from "react-dom";

import { TaskbarClock } from "../../Components/Clock/index.jsx";
import { Weather } from "../../Components/Weather/index.jsx";
import { DeviceSet } from "../../Components/DeviceSet/index.jsx";
import { DeviceContext } from "../../../DeviceManager/context.jsx";

import "./styles.css";

export const Tray = ({ showWeather, setShowWeather, showClock, setShowClock, contextMenu }) => {
    const device = useContext(DeviceContext);
    const [dragY, setDragY] = useState({ start: 0, current: 0 });
    const [availableHeight, setAvailableHeight] = useState(document.getElementsByTagName("desk-top")[0].clientHeight);
    const [heightOffset, setHeightOffset] = useState(0);

    const handleDragStart = (e) => {
        setAvailableHeight(document.getElementsByTagName("desk-top")[0].clientHeight);
        setHeightOffset(document.getElementsByTagName("mobile-tray")[0].clientHeight);
        if (e.type === "touchstart") {
            setDragY({ start: e.touches[0].clientY, current: 0 })
        }
        else {
            setDragY({ start: e.clientY, current: 0 })
        }
    };
    const handleDrag = (e) => {
        e.preventDefault();
        if (e.type.includes("drag")) {
            setDragY({ ...dragY, current: e.clientY });
        } else {
            setDragY({ ...dragY, current: e.touches[0].clientY });
        }
    };
    const handleDragEnd = (e) => {
        let endY;
        if (e.type.includes("drag")) {
            endY = e.clientY;
        } else {
            endY = e.touches[0].clientY;
        }
        if (device.virtualOSState.display === "tray") {
            if (window.innerHeight * 0.2 < dragY.start - endY) {
                device.setVirtualOSState({ ...device.virtualOSState, display: "none" })
            }
        } else {
            if (window.innerHeight * 0.2 < endY - dragY.start) {
                device.setVirtualOSState({ ...device.virtualOSState, display: "tray" })
            }
        }
        setDragY({start: 0, current: 0});
    };




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
                <>
                    <mobile-tray
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e)}
                        onDrag={(e) => handleDrag(e)}
                        onDragEnd={(e) => handleDragEnd(e)}
                    >
                        {showWeather && <Weather contextMenu={contextMenu} setShowWeather={setShowWeather} />}
                        <DeviceSet />
                        {showClock && <TaskbarClock contextMenu={contextMenu} setShowClock={setShowClock} />}
                    </mobile-tray>
                    {createPortal(
                        <mobile-tray-fullscreen
                            style={{
                                top: dragY.current - dragY.start !== 0 ? 
                                device.virtualOSState.display === "tray" 
                                    ? (dragY.current - dragY.start > 0 ? "0": `${-heightOffset + dragY.current - dragY.start}px` ) 
                                    : (dragY.current - dragY.start < 0 ? "-100%" : `${-heightOffset-availableHeight + dragY.current - dragY.start}px` ) 
                                : device.virtualOSState.display === "tray" ? "0" : "-100%",
                            }}
                            draggable="true"
                            onDragStart={(e) => handleDragStart(e)}
                            onDrag={(e) => handleDrag(e)}
                            onDragEnd={(e) => handleDragEnd(e)}
                        >

                        </mobile-tray-fullscreen>
                        , document.getElementsByTagName("desk-top")[0])
                    }
                </>
                , document.getElementById("root"))
        }
    </>
    );
}