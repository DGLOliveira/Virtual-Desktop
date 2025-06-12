import { useContext, useState } from "react";
import { AppContext } from "../Context/context.jsx";
import { DeviceContext } from "../../DeviceManager/context.jsx";

import "../Styles/Resizer.css";

export const AppResizer = ({ appName }) => {
    const appContext = useContext(AppContext);
    const deviceContext = useContext(DeviceContext);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [startWindowPos, setStartWindowPos] = useState({ x: 0, y: 0 });
    const [startSize, setStartSize] = useState({ x: 0, y: 0 });

    const resizeStart = (e) => {
        if (e.type === "touchstart") {
            setStartPos({ 
                x: e.touches[0].clientX, 
                y: e.touches[0].clientY 
            });
        } else {
            setStartPos({ 
                x: e.clientX, 
                y: e.clientY 
            });
        }
        setStartSize({
            x: appContext.apps[appName].Size.Current.width,
            y: appContext.apps[appName].Size.Current.height
        });
        setStartWindowPos({
            x: appContext.apps[appName].Location.Current.left,
            y: appContext.apps[appName].Location.Current.top
        })
    };

    const resize = (e, direction) => {
        e.preventDefault();
        let clientX, clientY;
        if (e.type === "touchstart") {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        if (e.clientX !== 0 && e.clientY !== 0) {
        let x = startPos.x - clientX;
        let y = startPos.y - clientY;
        appContext.setResize(appName, direction, x, y, startSize.y, startSize.x, startWindowPos.y, startWindowPos.x);
        }
    };

    const resizeEnd = (e, direction) => {
        e.preventDefault();
        resize(e, direction);
        setStartPos({ x: 0, y: 0 });
        setStartSize({ x: 0, y: 0 });
        setStartWindowPos({ x: 0, y: 0 });
    };

    const directions = ["n", "e", "s", "w", "ne", "se", "sw", "nw"];

    return <>
        {!appContext.apps[appName].State.isMaximized &&
            !appContext.apps[appName].State.isMinimized &&
            deviceContext.deviceType === "Desktop" &&
            <>{
                directions.map((direction) => {
                    return (
                        <app-resizer
                            class={direction}
                            key={direction}
                            draggable
                            onDragStart={(e) => resizeStart(e)}
                            onDrag={(e) => resize(e, direction)}
                            onDragEnd={(e) => resizeEnd(e, direction)}
                            onTouchStart={(e) => resizeStart(e)}
                            onTouchEnd={(e) => resize(e, direction)}
                        ></app-resizer>
                    );
                })
            }
            </>}
    </>;
};

