import { useContext, useState } from "react";
import { AppContext } from "../Context/context.jsx";

import "../Styles/Resizer.css";

export const AppResizer = ({ appName }) => {
    const appContext = useContext(AppContext);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
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
        appContext.setResize(appName, direction, x, y, startSize.y, startSize.x);
        }
    };

    const resizeEnd = (e, direction) => {
        e.preventDefault();
        resize(e, direction);
        setStartPos({ x: 0, y: 0 });
        setStartSize({ x: 0, y: 0 });
    };

    return <>
        {!appContext.apps[appName].State.isMaximized &&
            !appContext.apps[appName].State.isMinimized &&
            <>
                <app-resize-n
                    draggable={true}
                    onDragStart={(e) => resizeStart(e)}
                    onDrag={(e) => resize(e, "n")}
                    onDragEnd={(e) => resizeEnd(e, "n")}
                    onTouchStart={(e) => resizeStart(e)}
                    onTouchMove={(e) => resize(e, "n")}
                />
                <app-resize-e
                    draggable={true}
                    onDragStart={(e) => resizeStart(e)}
                    onDrag={(e) => resize(e, "e")}
                    onDragEnd={(e) => resizeEnd(e, "e")}
                    onTouchStart={(e) => resizeStart(e)}
                    onTouchMove={(e) => resize(e, "e")}
                />
                <app-resize-s
                    draggable={true}
                    onDragStart={(e) => resizeStart(e)}
                    onDrag={(e) => resize(e, "s")}
                    onDragEnd={(e) => resizeEnd(e, "s")}
                    onTouchStart={(e) => resizeStart(e)}
                    onTouchMove={(e) => resize(e, "s")}
                />
                <app-resize-w
                    draggable={true}
                    onDragStart={(e) => resizeStart(e)}
                    onDrag={(e) => resize(e, "w")}
                    onDragEnd={(e) => resizeEnd(e, "w")}
                    onTouchStart={(e) => resizeStart(e)}
                    onTouchMove={(e) => resize(e, "w")}
                />
                <app-resize-ne
                    draggable={true}
                    onDragStart={(e) => resizeStart(e)}
                    onDrag={(e) => resize(e, "ne")}
                    onDragEnd={(e) => resizeEnd(e, "ne")}
                    onTouchStart={(e) => resizeStart(e)}
                    onTouchMove={(e) => resize(e, "ne")}
                />
                <app-resize-nw
                    draggable={true}
                    onDragStart={(e) => resizeStart(e)}
                    onDrag={(e) => resize(e, "nw")}
                    onDragEnd={(e) => resizeEnd(e, "nw")}
                    onTouchStart={(e) => resizeStart(e)}
                    onTouchMove={(e) => resize(e, "nw")}
                />
                <app-resize-sw
                    draggable={true}
                    onDragStart={(e) => resizeStart(e)}
                    onDrag={(e) => resize(e, "sw")}
                    onDragEnd={(e) => resizeEnd(e, "sw")}
                    onTouchStart={(e) => resizeStart(e)}
                    onTouchMove={(e) => resize(e, "sw")}
                />
                <app-resize-se
                    draggable={true}
                    onDragStart={(e) => resizeStart(e)}
                    onDrag={(e) => resize(e, "se")}
                    onDragEnd={(e) => resizeEnd(e, "se")}
                    onTouchStart={(e) => resizeStart(e)}
                    onTouchMove={(e) => resize(e, "se")}
                />
            </>}
    </>;
};

