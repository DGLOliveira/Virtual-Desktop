import { useContext, useState } from "react";
import { AppContext } from "../Context/context.jsx";

import "../Styles/Resizer.css";

export const AppResizer = ({ appName }) => {
    const appContext = useContext(AppContext);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [startSize, setStartSize] = useState({ x: 0, y: 0 });

    const handleMouseResizeStart = (e) => {
        setStartPos({ x: e.clientX, y: e.clientY });
        console.log(e.clientX, e.clientY);
    };

    const handleMouseResize = (e, direction) => {
        e.preventDefault();
        if (e.clientX !== 0 && e.clientY !== 0) {
            //appContext.setResize(appName, direction, x, y);
        }
    };

    const handleMouseResizeEnd = (e, direction) => {
        e.preventDefault();
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
                    onDragStart={(e) => handleMouseResizeStart(e)}
                    onTouchStart={(e) => handleTouchResizeStart(e)}
                    onDrag={(e) => handleMouseResize(e, "e")}
                    onTouchMove={(e) => handleTouchResize(e, "e")}
                    draggable={true}
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
                    onDragStart={(e) => handleMouseResizeStart(e)}
                    onTouchStart={(e) => handleTouchResizeStart(e)}
                    onDrag={(e) => handleMouseResize(e, "w")}
                    onTouchMove={(e) => handleTouchResize(e, "w")}
                    draggable={true}
                />
                <app-resize-ne
                    onDragStart={(e) => handleMouseResizeStart(e)}
                    onTouchStart={(e) => handleTouchResizeStart(e)}
                    onDrag={(e) => handleMouseResize(e, "ne")}
                    onTouchMove={(e) => handleTouchResize(e, "ne")}
                    draggable={true}
                />
                <app-resize-nw
                    onDragStart={(e) => handleMouseResizeStart(e)}
                    onTouchStart={(e) => handleTouchResizeStart(e)}
                    onDrag={(e) => handleMouseResize(e, "nw")}
                    onTouchMove={(e) => handleTouchResize(e, "nw")}
                    draggable={true}
                />
                <app-resize-sw
                    onDragStart={(e) => handleMouseResizeStart(e)}
                    onTouchStart={(e) => handleTouchResizeStart(e)}
                    onDrag={(e) => handleMouseResize(e, "sw")}
                    onTouchMove={(e) => handleTouchResize(e, "sw")}
                    draggable={true}
                />
                <app-resize-se
                    onDragStart={(e) => handleMouseResizeStart(e)}
                    onTouchStart={(e) => handleTouchResizeStart(e)}
                    onDrag={(e) => handleMouseResize(e, "se")}
                    onTouchMove={(e) => handleTouchResize(e, "se")}
                    draggable={true}
                />
            </>}
    </>;
};

