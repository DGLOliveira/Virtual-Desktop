import { useState, useEffect, useRef } from "react"
import handleAction from "./Handlers/handleAction";
import handleTopBar from "./Handlers/handleTopBar";
import "./style.css"

export default function NoteDoc(props) {
    const ref = useRef(null);
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
        zoom: 1,
        title: "Untitled",
        newTitle: "Untitled"
    });
    const MAX_ZOOM = 4;
    const MIN_ZOOM = 0.25;

    const action = props.action;
    const setAction = props.setAction;
    const appMenu = props.appMenu;
    const setAppMenu = props.setAppMenu;
    const appDialog = props.appDialog;
    const setAppDialog = props.setAppDialog;
    const contextMenu = props.contextMenu;
    const setContextMenu = props.setContextMenu;
    const isSelected = props.isSelected;
    const title = props.title;
    const setTitle = props.setTitle;
    const canClose = props.canClose;
    const setCanClose = props.setCanClose;

    //Handles window actions
    const args = {
        ref,
        settings,
        setSettings,
        text,
        setText,
        MAX_ZOOM,
        MIN_ZOOM
    };

    useEffect(() => {
        console.log(action);
        if (action) {
            handleAction(action, setAction, setAppDialog, setTitle, args);
        }
    }, [action]);

    useEffect(() => {
        handleTopBar(appMenu, setAppMenu, args);
    }, [settings, text]);

    const observer = new MutationObserver(() => {
        setText(ref.current.innerHTML);
        /*if (ref.current.innerHTML === "") {
            setCanClose(true);
        } else {
            setCanClose(false);
        }*/
    });
    observer.observe(ref.current, { attributes: true, childList: true, subtree: true });


    return (
        <div
            ref={ref}
            contentEditable="plaintext-only"
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
            onChange={(e) => setText(e.target.innerHTML)}
        />
    )
}