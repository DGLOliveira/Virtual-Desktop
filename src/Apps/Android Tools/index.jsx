import { useState, useEffect } from "react";
import { GiSpinningTop } from "react-icons/gi";
import { GiCompass } from "react-icons/gi";
import handleTopMenu from "./Handlers/handleTopMenu.js";
import handleAction from "./Handlers/handleAction.js";
import Compass from "./Tools/Compass/index.jsx";
import Gyroscope from "./Tools/Gyroscope/index.jsx";


export default function Android_Tools(props) {
    const action = props.action;
    const setAction = props.setAction;
    const appMenu = props.appMenu;
    const setAppMenu = props.setAppMenu;
    const [tool, setTool] = useState("Home");
    const [subAction, setSubAction] = useState(false);
    const [subMenu, setSubMenu] = useState(null);

    useEffect(() => {
        handleAction(action, setAction, tool, setTool, setSubMenu, setSubAction);
    }, [action]);

    useEffect(() => {
        console.log(subMenu);
        handleTopMenu(appMenu, setAppMenu, tool, subMenu);
    }, [tool, subMenu])

    return (
        <>
            {tool === "Home" && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                    <h1>Android Tools</h1>
                </div>
            )}
            {tool === "Compass" && (
                <Compass action={subAction} setAction={setSubAction} appMenu={subMenu} setAppMenu={setSubMenu} />
            )}
            {tool === "Gyroscope" && (
                <Gyroscope action={subAction} setAction={setSubAction} appMenu={subMenu} setAppMenu={setSubMenu} />
            )}
        </>

    );
}