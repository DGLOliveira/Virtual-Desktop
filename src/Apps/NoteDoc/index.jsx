import { useState, useEffect, useRef } from "react"
import handleAction from "./Handlers/handleAction";
import handleTopBar from "./Handlers/handleTopBar";
import "./style.css"
export default function NoteDoc(props) {
    const [text, setText] = useState("");
    const [settings, setSettings] = useState({
        fontSize: "14px",
        fontFamily: "Arial",
        textWrap: "nowrap",
        theme: {
            type: "System",
            backgroundColor: "var(--AppBkgrColor)",
            color: "var(--AppFontColor)"
        },
        zoom: 1
    });
    const action = props.action;
    const setAction = props.setAction;
    const appMenu = props.appMenu;
    const setAppMenu = props.setAppMenu;
    const appDialog = props.appDialog;
    const setAppDialog = props.setAppDialog;
    const contextMenu = props.contextMenu;
    const setContextMenu = props.setContextMenu;
    const isSelected = props.isSelected;
    const canClose = props.canClose;
    const setCanClose = props.setCanClose;

    //Handles window actions
    const args = {
        settings,
        setSettings,
        text,
        setText
    };
    useEffect(() => {
        if (action) {
            handleAction(action, setAction, args);
        }
    }, [action]);
    useEffect(() => {
        handleTopBar(appMenu, setAppMenu, args);
    },[settings]);

    return (
        <textarea
            onContextMenu={(e) => e.stopPropagation()}
            id="noteDoc"
            style={{
                fontSize: settings.fontSize,
                fontFamily: settings.fontFamily,
                textWrap: settings.textWrap,
                zoom: settings.zoom,
                backgroundColor: settings.theme.backgroundColor,
                color: settings.theme.color
            }}
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
    )
}