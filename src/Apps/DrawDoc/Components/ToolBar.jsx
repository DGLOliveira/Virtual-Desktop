import { useContext } from "react";
import { Context } from "../Context.jsx";
import { SubToolIcon } from "./SubToolIcon.jsx";
import { GiPaintBrush } from "react-icons/gi";
import {
    TfiSpray,
    TfiPaintBucket,
    TfiEraser,
} from "react-icons/tfi";
import { CgColorPicker } from "react-icons/cg";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { LuBoxSelect } from "react-icons/lu";

export const ToolBar = ({ setAction, contextMenu }) => {
    const context = useContext(Context);
    const tool = context.tool;
    const subTool = context.subTool;
    const setTool = context.setTool;
    const toolComponents = {
        Brush: <GiPaintBrush title="Brush" />,
        Eraser: <TfiEraser title="Eraser" />,
        Bucket: <TfiPaintBucket title="Bucket" />,
        Spray: <TfiSpray title="Spray Can" />,
        Text: <RxLetterCaseCapitalize title="Insert Text" />,
        Pipette: <CgColorPicker title="Color Picker" />,
        Magnifier: <HiOutlineMagnifyingGlass title="Zoom" />,
        Select: <LuBoxSelect title="Selection" />,
        Shape: <SubToolIcon subtool={subTool} />,
    };
    const handleContextMenu = (event) => {
        event.preventDefault();
        let content = { "Hide": { action:()=>setAction("toolBar")} };
        contextMenu.setOpen();
        contextMenu.setPosition(event.clientX, event.clientY);
        contextMenu.setContent(content);
    };
    if (context.view.toolBar) {
        return (
            <tool-bar onContextMenu={(event) => handleContextMenu(event)}>
                {Object.keys(toolComponents).map((name) => (
                    <button
                        key={name + "drawToolDropdown"}
                        onClick={() => setTool(name)}
                        className={tool === name ? "buttonActive" : ""}
                    >
                        {toolComponents[name]}
                    </button>
                ))}
            </tool-bar>
        )
    }
}