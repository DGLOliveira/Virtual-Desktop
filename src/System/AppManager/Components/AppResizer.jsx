import { useContext, useState } from "react";
import { AppContext } from "../Context/context.jsx";

import "../Styles/Resizer.css";

export const AppResizer = ({ appName }) => {
    const appContext = useContext(AppContext);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [startSize, setStartSize] = useState({ x: 0, y: 0 });

    const handleMouseResizeStart = (e) => {
        setStartPos({ x: e.clientX, y: e.clientY });
        setStartSize({
            x: appContext.apps[appName].Size.Current.width,
            y: appContext.apps[appName].Size.Current.height
        });
    };

    const handleMouseResize = (e, direction) => {
        e.preventDefault();
        if (e.clientX !== 0 && e.clientY !== 0) {
            let x = startPos.x - e.clientX;
            let y = startPos.y - e.clientY;
            appContext.setResize(appName, direction, x, y, startSize.y, startSize.x);
        }
    };

    const handleMouseResizeEnd = (e, direction) => {
        e.preventDefault();
        handleMouseResize(e, direction);
        setStartPos({ x: 0, y: 0 });
        setStartSize({ x:0, y:0 });
    };

    const handleTouchResizeStart = (e) => {
        e.preventDefault();
        setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        console.log(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleTouchResize = (e, direction) => {
        e.preventDefault();
        console.log(e);
    };

    return <>
        {!appContext.apps[appName].State.isMaximized &&
            !appContext.apps[appName].State.isMinimized &&
            <>
                <app-resize-n
                    draggable={true}
                    onDragStart={(e) => handleMouseResizeStart(e)}
                    onDrag={(e) => handleMouseResize(e, "n")}
                    onDragEnd={(e) => handleMouseResizeEnd(e, "n")}
                    onTouchStart={(e) => handleTouchResizeStart(e)}
                    onTouchMove={(e) => handleTouchResize(e, "n")}
                />
                <app-resize-e
                    draggable={true}
                    onDragStart={(e) => handleMouseResizeStart(e)}
                    onDrag={(e) => handleMouseResize(e, "e")}
                    onDragEnd={(e) => handleMouseResizeEnd(e, "e")}
                    onTouchStart={(e) => handleTouchResizeStart(e)}
                    onTouchMove={(e) => handleTouchResize(e, "e")}
                />
                <app-resize-s
                    draggable={true}
                    onDragStart={(e) => handleMouseResizeStart(e)}
                    onDrag={(e) => handleMouseResize(e, "s")}
                    onDragEnd={(e) => handleMouseResizeEnd(e, "s")}
                    onTouchStart={(e) => handleTouchResizeStart(e)}
                    onTouchMove={(e) => handleTouchResize(e, "s")}
                />
                <app-resize-w
                    draggable={true}
                    onDragStart={(e) => handleMouseResizeStart(e)}
                    onDrag={(e) => handleMouseResize(e, "w")}
                    onDragEnd={(e) => handleMouseResizeEnd(e, "w")}
                    onTouchStart={(e) => handleTouchResizeStart(e)}
                    onTouchMove={(e) => handleTouchResize(e, "w")}
                />
                <app-resize-ne
                    draggable={true}
                    onDragStart={(e) => handleMouseResizeStart(e)}
                    onDrag={(e) => handleMouseResize(e, "ne")}
                    onDragEnd={(e) => handleMouseResizeEnd(e, "ne")}
                    onTouchStart={(e) => handleTouchResizeStart(e)}
                    onTouchMove={(e) => handleTouchResize(e, "ne")}
                />
                <app-resize-nw
                    draggable={true}
                    onDragStart={(e) => handleMouseResizeStart(e)}
                    onDrag={(e) => handleMouseResize(e, "nw")}
                    onDragEnd={(e) => handleMouseResizeEnd(e, "nw")}
                    onTouchStart={(e) => handleTouchResizeStart(e)}
                    onTouchMove={(e) => handleTouchResize(e, "nw")}
                />
                <app-resize-sw
                    draggable={true}
                    onDragStart={(e) => handleMouseResizeStart(e)}
                    onDrag={(e) => handleMouseResize(e, "sw")}
                    onDragEnd={(e) => handleMouseResizeEnd(e, "sw")}
                    onTouchStart={(e) => handleTouchResizeStart(e)}
                    onTouchMove={(e) => handleTouchResize(e, "sw")}
                />
                <app-resize-se
                    draggable={true}
                    onDragStart={(e) => handleMouseResizeStart(e)}
                    onDrag={(e) => handleMouseResize(e, "se")}
                    onDragEnd={(e) => handleMouseResizeEnd(e, "se")}
                    onTouchStart={(e) => handleTouchResizeStart(e)}
                    onTouchMove={(e) => handleTouchResize(e, "se")}
                />
            </>}
    </>;
};

