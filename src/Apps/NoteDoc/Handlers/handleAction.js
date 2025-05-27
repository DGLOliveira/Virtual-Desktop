import dialogChangeName from "../Dialog/changeName.jsx";

export default function handleAction(action, setAction, setAppDialog, args) {

    switch (action) {
        case "New":
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
            setAppDialog(null);
            setAction(false);
            break;
        case "Change Title Cancel":
            args.setSettings({ ...args.settings, newTitle: "" });
            setAppDialog(null);
            setAction(false);
            break;
        case "Undo":
            document.getElementById("noteDoc").focus();
            document.execCommand("undo", true);
            setAction(false);
            break;
        case "Redo":
            document.getElementById("noteDoc").focus();
            document.execCommand("redo", true);
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