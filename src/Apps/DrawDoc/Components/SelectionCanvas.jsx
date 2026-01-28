import { useState, useEffect, useContext } from "react";
import { Context } from "../Context.jsx";

export default function SelectionCanvas() {
    const context = useContext(Context);
    const cursor = context.cursor;
    const zoom = context.zoom;
    const tool = context.tool;
    const subtool = context.subTool;
    const clipboard = context.clipboard;

    const [selectionBox, setSelectionBox] = useState({
        display: "none",
        left: 0 + "px",
        top: 0 + "px",
        height: 0 + "px",
        width: 0 + "px"
    })

    const [selectionCircle, setSelectionCircle] = useState({
        display: "none",
        left: 0 + "px",
        top: 0 + "px",
        diameter: 0 + "px"
    })

    const [selectionEllipse, setSelectionEllipse] = useState({
        display: "none",
        left: 0 + "px",
        top: 0 + "px",
        width: 0 + "px",
        height: 0 + "px"
    })

    //Handles when each selection div should be displayed
    useEffect(() => {
        if (tool === "Shape" && subtool.shape !== "Line" && subtool.shape !== "Curve") {
            setSelectionBox({ ...selectionBox, display: "block" })
            if (tool === "Shape") {
                setSelectionCircle({ ...selectionCircle, display: "block" })
                if (subtool.stretch === true) {
                    setSelectionEllipse({ ...selectionEllipse, display: "block" })
                } else {
                    setSelectionEllipse({ ...selectionEllipse, display: "none" })
                }
            } else {
                setSelectionCircle({ ...selectionCircle, display: "none" })
                setSelectionEllipse({ ...selectionEllipse, display: "none" })
            }
        } else if (tool === "Select") {
            setSelectionCircle({ ...selectionCircle, display: "none" })
            setSelectionEllipse({ ...selectionEllipse, display: "none" })
            if (clipboard.state === "none") {
                setSelectionBox({ ...selectionBox, display: "block" })
            } else {
                setSelectionBox({ ...selectionBox, display: "none" })
            }
        } else {
            setSelectionBox({ ...selectionBox, display: "none" })
            setSelectionCircle({ ...selectionCircle, display: "none" })
            setSelectionEllipse({ ...selectionEllipse, display: "none" })
        }
    }, [tool, subtool, clipboard]);

    //Handles position and sizing calculations for each selection div
    useEffect(() => {
        let left = Math.min(cursor.start.x, cursor.end.x);
        let right = Math.max(cursor.start.x, cursor.end.x);
        let top = Math.min(cursor.start.y, cursor.end.y);
        let bottom = Math.max(cursor.start.y, cursor.end.y);
        let height = bottom - top;
        let width = right - left;
        setSelectionBox({
            ...selectionBox,
            left: Math.floor(left * zoom) + "px",
            top: Math.floor(top * zoom) + "px",
            width: Math.floor(width * zoom) + "px",
            height: Math.floor(height * zoom) + "px"
        })
        let centerLeft = left + Math.floor(width / 2);
        let centerTop = top + Math.floor(height / 2);
        let diameter = Math.min(width, height);
        setSelectionCircle({
            ...selectionCircle,
            left: Math.floor((centerLeft - (diameter / 2)) * zoom) + "px",
            top: Math.floor((centerTop - (diameter / 2)) * zoom) + "px",
            diameter: Math.floor(diameter * zoom) + "px"
        })
        setSelectionEllipse({
            ...selectionEllipse,
            left: Math.floor(left * zoom) + "px",
            top: Math.floor(top * zoom) + "px",
            width: Math.floor(width * zoom) + "px",
            height: Math.floor(height * zoom) + "px"
        })
    }, [cursor]);


    return (
        <>
            <div
                id="drawDocSelectionBox"
                style={{
                    position: "absolute",
                    display: selectionBox.display,
                    top: selectionBox.top,
                    left: selectionBox.left,
                    width: selectionBox.width,
                    height: selectionBox.height,
                    border: "2px dashed white",
                    mixBlendMode: "difference",
                    cursor: "move",
                    pointerEvents: "none"
                }}
            >

            </div>
            <div
                id="drawDocSelectionCircle"
                style={{
                    position: "absolute",
                    display: selectionCircle.display,
                    top: selectionCircle.top,
                    left: selectionCircle.left,
                    width: selectionCircle.diameter,
                    height: selectionCircle.diameter,
                    border: "2px dashed white",
                    borderRadius: "50%",
                    mixBlendMode: "difference",
                    pointerEvents: "none"
                }}
            />
            <div
                id="drawDocSelectionEllipse"
                style={{
                    position: "absolute",
                    display: selectionEllipse.display,
                    top: selectionEllipse.top,
                    left: selectionEllipse.left,
                    width: selectionEllipse.width,
                    height: selectionEllipse.height,
                    border: "2px dashed white",
                    borderRadius: "50%",
                    mixBlendMode: "difference",
                    pointerEvents: "none",
                    rotate: subtool.angle + "deg"
                }}
            >
            </div>
        </>
    )
}