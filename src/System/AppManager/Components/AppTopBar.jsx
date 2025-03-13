import { useContext, useState, useEffect } from "react";
import { AppContext } from "../Context/context.jsx";
import { ContextMenuContext } from "../../ContextMenuManager/context.jsx";
import { ThemeContext } from "../../ThemeManager/context.jsx";
import {
    FaRegWindowMinimize,
    FaWindowRestore,
    FaWindowMaximize,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { AppIcon } from "./AppIcon.jsx";
import "../Styles/TopBar.css";

export const AppTopBar = ({ appName, setAction }) => {
    const appContext = useContext(AppContext);
    const contextMenu = useContext(ContextMenuContext);
    const themeContext = useContext(ThemeContext);
    const [cursor, setCursor] = useState("grab");
    const [cursorToWindowDiff, setCursorToWindowDiff] = useState({ x: 0, y: 0 });

    const dragWindow = (event, appName) => {
        event.preventDefault();
        setCursor("grabbing");
        let x, y;
        if (!appContext.apps[appName].isMaximized) {
            if (event.type.includes("drag")) {
                x = event.clientX - cursorToWindowDiff.x;
                y = event.clientY - cursorToWindowDiff.y;
                if (event.clientX !== 0 && event.clientY !== 0) {
                    appContext.setPosition(appName, x, y);
                }
            } else {
                x = event.touches[0].clientX + cursorToWindowDiff.x;
                y = event.touches[0].clientY + cursorToWindowDiff.y;
                if (event.touches[0].clientX !== 0 && event.touches[0].clientY !== 0) {
                    appContext.setPosition(appName, x, y);
                }
            }
        }
        setCursor("grab");
    };
    const dragStart = (event, appName) => {
        let windowX = appContext.apps[appName].Location.Current.left;
        let windowY = appContext.apps[appName].Location.Current.top;
        let x, y;
        if (event.type === "touchstart") {
            windowX = event.touches[0].clientX - windowX;
            windowY = event.touches[0].clientY - windowY;
        }
        else {
            x = event.clientX - windowX;
            y = event.clientY - windowY;
        }
        setCursorToWindowDiff({
            x: x,
            y: y
        });
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
        contextMenu.setOpen();
        contextMenu.setPosition(e.clientX, e.clientY);
        contextMenu.setContent({
            "Minimize": { action: () => { appContext.switchMinimized(appName); } },
            "Maximize": { action: () => { appContext.switchMaximized(appName); } },
            "Close": { action: () => { setAction("Close"); } }
        })
    };

    const handleKeybinds = (event) => {
        if (appContext.apps[appName].State.isSelected) {
            if (event.ctrlKey && event.shiftKey && event.key === "F4") {
                setAction(appName, "Close");
            }
            else if (event.altKey) {
                if (event.key === "ArrowUp") {
                    if (!appContext.apps[appName].State.isMinimized
                        && !appContext.apps[appName].State.isMaximized) {
                        appContext.switchMaximized(appName);
                    } else if (appContext.apps[appName].State.isMinimized) {
                        appContext.switchMinimized(appName);
                    }
                } else if (event.key === "ArrowDown") {
                    if (appContext.apps[appName].State.isMaximized) {
                        appContext.switchMaximized(appName);
                    } else if (!appContext.apps[appName].State.isMinimized) {
                        appContext.switchMinimized(appName);
                    }
                }
            }
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeybinds);
        return () => document.removeEventListener("keydown", handleKeybinds);
    }, [handleKeybinds]);

    return (
        <app-top-bar
            style={{
                color: appContext.apps[appName].State.isSelected
                    ? "var(--WindowTopBarFontColor)" : "var(--WindowTopBarFontColorInactive)",
                backgroundColor: appContext.apps[appName].State.isSelected
                    ? "var(--WindowTopBarBkgrColor)" : "var(--WindowTopBarBkgrColorInactive)",
                cursor: appContext.apps[appName].State.isMaximized
                    ? "default" : cursor
            }}
            draggable={!appContext.apps[appName].State.isMaximized}
            onDragStart={(e) => dragStart(e, appName)}
            onDrag={(e) => dragWindow(e, appName)}
            onDragEnd={(e) => dragWindow(e, appName)}
            onTouchStart={(e) => dragStart(e, appName)}
            onTouchMove={(e) => dragWindow(e, appName)}
            onContextMenu={(e) => handleContextMenu(e)}
        >
            <AppIcon appName={appName} />
            <h1
                onDoubleClick={(e) => (
                    e.stopPropagation(), appContext.switchMaximized(appName)
                )}>{appName}</h1>
            {themeContext.theme === "Default" &&
                <>
                    <div
                        className="appTopBarButtonFluent"
                        onClick={(e) => (
                            e.stopPropagation(), appContext.switchMinimized(appName)
                        )}
                        title="Minimize (Alt + ⇩)">
                        <FaRegWindowMinimize />
                    </div>
                    {appContext.apps[appName].State.isMaximized ? (
                        <div
                            className="appTopBarButtonFluent"
                            onClick={(e) => (
                                e.stopPropagation(), appContext.switchMaximized(appName)
                            )}
                            title="Restore (Alt + ⇩)">
                            <FaWindowRestore />
                        </div>
                    ) : (
                        <div
                            className="appTopBarButtonFluent"
                            onClick={(e) => (
                                e.stopPropagation(), appContext.switchMaximized(appName)
                            )}
                            title="Maximize (Alt + ⇧)">
                            <FaWindowMaximize />
                        </div>
                    )}
                    <div
                        className="appTopBarButtonFluentRed appTopBarButtonFluent"
                        onClick={(e) => (
                            e.stopPropagation(), setAction("Close")
                        )}
                        title="Close (Ctrl + Shift + F4)">
                        <AiOutlineClose />
                    </div></>}
            {themeContext.theme === "Aqua" && (
                <>
                    <div
                        className="appTopBarButtonNewAqua appTopBarButtonAquaGreen"
                        onClick={(e) => (
                            e.stopPropagation(), appContext.switchMaximized(appName)
                        )}
                        title={appContext.apps[appName].State.isMaximized ? "Restore (Alt + ⇩)" : "Maximize (Alt + ⇧)"}
                    >+</div>
                    <div
                        className="appTopBarButtonNewAqua appTopBarButtonAquaYellow"
                        onClick={(e) => (
                            e.stopPropagation(), appContext.switchMinimized(appName)
                        )}
                        title="Minimize (Alt + ⇩)"
                    >-</div>
                    <div
                        className="appTopBarButtonNewAqua appTopBarButtonAquaRed"
                        onClick={(e) => (
                            e.stopPropagation(), setAction("Close")
                        )}
                        title="Close (Ctrl + Shift + F4)"
                    >x</div>
                </>
            )}
        </app-top-bar>
    )

}