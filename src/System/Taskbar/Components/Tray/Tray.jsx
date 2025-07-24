import { useState, useEffect, useContext } from "react";
import { createPortal } from "react-dom";

import { DeviceContext } from "../../../DeviceManager/context.jsx";
import { AppContext } from "../../../AppManager/Context/context.jsx";

import { TaskbarClock } from "../../Components/Clock/index.jsx";
import { Weather } from "../../Components/Weather/index.jsx";
import { DeviceSet } from "../../Components/DeviceSet/index.jsx";

import { WiUmbrella } from "react-icons/wi";
import { FaGear } from "react-icons/fa6";
import { MdOutlineRestartAlt } from "react-icons/md";
import { RiShutDownLine } from "react-icons/ri";

import "./styles.css";

export const Tray = ({ showWeather, setShowWeather, showClock, setShowClock, contextMenu }) => {
    const device = useContext(DeviceContext);
    const app = useContext(AppContext);
    const [dragY, setDragY] = useState({ start: 0, current: 0 });
    const [availableHeight, setAvailableHeight] = useState(0);
    const [heightOffset, setHeightOffset] = useState(0);
    const [doesDesktopAndTaskbarExist, setDoesDesktopAndTaskbarExist] = useState(false);

    //Assures that the tray elements are last children in the root element
    const checkIfDeskTopAndTaskbarExists = () => {
        const desktop = document.getElementsByTagName("desk-top")[0];
        const taskbar = document.getElementsByTagName("task-bar")[0];
        if (desktop && taskbar) {
            return setDoesDesktopAndTaskbarExist(true);
        }
        setTimeout(checkIfDeskTopAndTaskbarExists, 500);
    }
    //Checks if the <desk-top> and <task-bar> element exists, usually it does not exist on first render on mobile
    useEffect(() => {
        checkIfDeskTopAndTaskbarExists();
    }, []);

    const switchTray = () => {
        if (device.virtualOSState.display === "tray") {
            device.setVirtualOSState({ ...device.virtualOSState, display: "none" })
        } else {
            device.setVirtualOSState({ ...device.virtualOSState, display: "tray" })
        }
    }

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
            endY = e.changedTouches[0].clientY;
        }
        if (device.virtualOSState.display === "tray") {
            if (heightOffset < dragY.start - endY) {
                device.setVirtualOSState({ ...device.virtualOSState, display: "none" })
            }
        } else {
            if (heightOffset < endY - dragY.start) {
                device.setVirtualOSState({ ...device.virtualOSState, display: "tray" })
            }
        }
        setDragY({ start: 0, current: 0 });
    };

    const openWeatherTray = () => document.getElementById("WeatherButton").click();


    return (<>
        {device.deviceType === "Desktop" ?
            <><taskbar-tray>
                {showWeather && <Weather contextMenu={contextMenu} setShowWeather={setShowWeather} />}
                <DeviceSet />
                {showClock && <TaskbarClock contextMenu={contextMenu} setShowClock={setShowClock} />}
            </taskbar-tray>
                <vertical-rect />
            </>
            : doesDesktopAndTaskbarExist && createPortal(
                <>
                    <mobile-tray-fullscreen
                        style={{
                            top: dragY.current - dragY.start !== 0 ?
                                device.virtualOSState.display === "tray"
                                    ? (dragY.current - dragY.start > 0 ? `${-heightOffset + dragY.current - dragY.start}px` : "0")
                                    : (dragY.current - dragY.start < 0 ? "calc(-100% + var(--MobileTrayHeight) + var(--TaskbarHeight))" : `${-heightOffset - availableHeight + dragY.current - dragY.start}px`)
                                : device.virtualOSState.display === "tray" ? "0" : "calc(-100% + var(--MobileTrayHeight) + var(--TaskbarHeight))",
                            borderRadius: device.virtualOSState.display === "tray" ? "0 0 0 0" : " 0 0 var(--MobileTrayHorizontalBorderRadius) var(--MobileTrayHorizontalBorderRadius)"
                        }}
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e)}
                        onDrag={(e) => handleDrag(e)}
                        onDragEnd={(e) => handleDragEnd(e)}
                        onMouseDown={(e) => handleDragStart(e)}
                        onTouchStart={(e) => handleDragStart(e)}
                        onTouchMove={(e) => handleDrag(e)}
                        onTouchEnd={(e) => handleDragEnd(e)}
                        onTouchCancel={(e) => handleDragEnd(e)}
                        onDoubleClick={switchTray}
                    >
                        <mobile-tray-system
                            onDragStart={(e) => handleDragStart(e)}
                            onDrag={(e) => handleDrag(e)}
                            onDragEnd={(e) => handleDragEnd(e)}
                            onMouseDown={(e) => handleDragStart(e)}
                            onTouchStart={(e) => handleDragStart(e)}
                            onTouchMove={(e) => handleDrag(e)}
                            onTouchEnd={(e) => handleDragEnd(e)}
                            onTouchCancel={(e) => handleDragEnd(e)}
                            onDoubleClick={switchTray}>
                            <button
                                onClick={openWeatherTray}
                                title="Weather"
                                aria-label="Weather Button"
                            >
                                <WiUmbrella />
                            </button>
                            <DeviceSet />
                            <button
                                onClick={() => { app.setOpen("Definitions"); device.setVirtualOSState({ ...device.virtualOSState, display: "none" }) }}
                                title="Definitions"
                                aria-label="Definitions Button"
                            >
                                <FaGear />
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                title="Restart (F5)"
                                aria-label="Restart Button"
                            >
                                <MdOutlineRestartAlt />
                            </button>
                            <button
                                onClick={() => window.close()}
                                title="Close (Alt + F4)"
                                aria-label="Close Button"
                            >
                                <RiShutDownLine />
                            </button>
                        </mobile-tray-system>
                        <mobile-tray-fullscreen-clock
                            onDragStart={(e) => handleDragStart(e)}
                            onDrag={(e) => handleDrag(e)}
                            onDragEnd={(e) => handleDragEnd(e)}
                            onMouseDown={(e) => handleDragStart(e)}
                            onTouchStart={(e) => handleDragStart(e)}
                            onTouchMove={(e) => handleDrag(e)}
                            onTouchEnd={(e) => handleDragEnd(e)}
                            onTouchCancel={(e) => handleDragEnd(e)}
                            onDoubleClick={switchTray}>
                            <TaskbarClock contextMenu={contextMenu} setShowClock={setShowClock} />
                        </mobile-tray-fullscreen-clock>
                        <div
                            onDragStart={(e) => handleDragStart(e)}
                            onDrag={(e) => handleDrag(e)}
                            onDragEnd={(e) => handleDragEnd(e)}
                            onMouseDown={(e) => handleDragStart(e)}
                            onTouchStart={(e) => handleDragStart(e)}
                            onTouchMove={(e) => handleDrag(e)}
                            onTouchEnd={(e) => handleDragEnd(e)}
                            onTouchCancel={(e) => handleDragEnd(e)}
                            onDoubleClick={switchTray}>
                        </div>
                    </mobile-tray-fullscreen>
                    <mobile-tray
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e)}
                        onDrag={(e) => handleDrag(e)}
                        onDragEnd={(e) => handleDragEnd(e)}
                        onTouchStart={(e) => handleDragStart(e)}
                        onTouchMove={(e) => handleDrag(e)}
                        onTouchEnd={(e) => handleDragEnd(e)}
                        onTouchCancel={(e) => handleDragEnd(e)}
                        onDoubleClick={switchTray}
                    >
                        {showWeather && <Weather contextMenu={contextMenu} setShowWeather={setShowWeather} />}
                        <DeviceSet />
                        {showClock && <TaskbarClock contextMenu={contextMenu} setShowClock={setShowClock} />}
                    </mobile-tray>
                </>
                , document.getElementById("root"))
        }
    </>
    );
}