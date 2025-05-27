import dialogChangeName from "../Dialog/changeName.jsx";
import dialogNew from "../Dialog/new.jsx";

export default function handleAction(action, setAction, setAppDialog, setTitle, args) {

    switch (action) {
        case "New":
            dialogNew(setAction, setAppDialog, args);
            setAction(false);
            break;
        case "New Confirm":
            args.setSettings({ ...args.settings, title: args.settings.newTitle });
            setTitle(args.settings.newTitle);
            args.setText("");
            setAppDialog(null);
            setAction(false);
            break;
        case "New Cancel":
            args.setSettings({ ...args.settings, newTitle: "" });
            setAppDialog(null);
            setAction(false);
            break;
        case "Open":
        case "Save":
        case "Save As":
            break;
        case "Change Title":
            dialogChangeName(setAction, setAppDialog, args);
            setAction(false);
            break;
        case "Change Title Confirm":
            args.setSettings({ ...args.settings, title: args.settings.newTitle });
            setTitle(args.settings.newTitle);
            setAppDialog(null);
            setAction(false);
            break;
        case "Change Title Cancel":
            args.setSettings({ ...args.settings, newTitle: "" });
            setAppDialog(null);
            setAction(false);
            break;
        case "Undo":
            args.ref.current.focus();
            document.execCommand("undo", false);
            setAction(false);
            break;
        case "Redo":
            args.ref.current.focus();
            document.execCommand("redo", false);
            setAction(false);
            break;
        case "Cut":
            args.ref.current.focus();
            var text = args.ref.current.value.substring(
                    args.ref.current.selectionStart, args.ref.current.selectionEnd);
            navigator.clipboard.writeText(text);
            document.execCommand("delete", false);
            setAction(false);
            break;
        case "Copy":
            args.ref.current.focus();
            var text = args.ref.current.value.substring(
                    args.ref.current.selectionStart, args.ref.current.selectionEnd);
            navigator.clipboard.writeText(text);
            console.log(args.selectedText);
            setAction(false);
            break;
        case "Paste":
            args.ref.current.focus();
            navigator.clipboard.readText().then((text) => {
                console.log(text);
                document.execCommand("insertText", false, text);
            })
            setAction(false);
            break;
        case "Zoom In":
            if (args.settings.zoom < args.MAX_ZOOM) {
                args.setSettings({ ...args.settings, zoom: args.settings.zoom * 2 });
            }
            setAction(false);
            break;
        case "Zoom Out":
            if (args.settings.zoom > args.MIN_ZOOM) {
                args.setSettings({ ...args.settings, zoom: args.settings.zoom / 2 });
            }
            setAction(false);
            break;
        case "Zoom Reset":
            if (args.settings.zoom !== 1) {
                args.setSettings({ ...args.settings, zoom: 1 });
            }
            setAction(false);
            break;
        case "System":
            args.setSettings({
                ...args.settings,
                theme: { type: action, backgroundColor: "var(--AppBkgrColor)", color: "var(--AppFontColor)" }
            });
            setAction(false);
            break;
        case "Light":
            args.setSettings({
                ...args.settings,
                theme: { type: action, backgroundColor: "white", color: "black" }
            });
            setAction(false);
            break;
        case "Dark":
            args.setSettings({
                ...args.settings,
                theme: { type: action, backgroundColor: "black", color: "white" }
            });
            setAction(false);
            break;
        case "Text Wrap":
            args.setSettings({ ...args.settings, textWrap: args.settings.textWrap === "wrap" ? "nowrap" : "wrap" });
            setAction(false);
            break;
        case false:
            break;
        default:
            setAction(false);
            break;
    }
}