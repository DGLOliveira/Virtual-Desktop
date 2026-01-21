import { useState, useEffect } from "react";
import Tool from "./Components/Tool.jsx";
import ToolIcon from "./Components/ToolIcon.jsx";
import handleTopMenu from "./Handlers/handleTopMenu.js";
import handleAction from "./Handlers/handleAction.js";
import "./style.css";

export default function Android_Tools(props) {
    const action = props.action;
    const setAction = props.setAction;
    const appMenu = props.appMenu;
    const setAppMenu = props.setAppMenu;
    const [tool, setTool] = useState("Home");
    const [subAction, setSubAction] = useState(false);
    const [subMenu, setSubMenu] = useState(null);

    const TOOLS = ["Compass", "Gyroscope"];

    useEffect(() => {
        handleAction(action, setAction, tool, setTool, setSubMenu, setSubAction);
    }, [action]);

    useEffect(() => {
        console.log(subMenu);
        handleTopMenu(appMenu, setAppMenu, tool, subMenu);
    }, [tool, subMenu])

    return (
        <>
            {tool === "Home" ?
                <div id="androidToolsMenu">
                    {TOOLS.map((tool) => {
                        return (
                            <button key={tool} onClick={() => setTool(tool)}>
                                <ToolIcon tool={tool} />
                                {tool}
                            </button>
                        )
                    })}
                </div>
                :
                <Tool tool={tool} action={subAction} setAction={setSubAction} appMenu={subMenu} setAppMenu={setSubMenu} />
            }
        </>

    );
}