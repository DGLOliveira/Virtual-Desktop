import dialogChangeName from "../Dialog/changeName.jsx";
import dialogNew from "../Dialog/new.jsx";
import dialogFind from "../Dialog/find.jsx";
import handleFind from "./handleFind.js";

export default function handleAction(action, setAction, setAppDialog, setTitle, canClose, setCanClose, args) {

    switch (action) {
        case "New":
            dialogNew(setAction, setAppDialog, args);
            setAction(false);
            break;
        case "New Confirm":
            args.setSettings({ ...args.settings, title: args.settings.newTitle });
            setTitle(args.settings.newTitle);
            args.ref.current.innerHTML = "";
            setAppDialog(null);
            setAction(false);
            break;
        case "New Cancel":
            args.setSettings({ ...args.settings, newTitle: "" });
            setAppDialog(null);
            setAction(false);
            break;
        case "Open":
            let uploadLink = document.createElement("input");
            uploadLink.setAttribute("type", "file");
            uploadLink.setAttribute("accept", ".txt");
            uploadLink.click();
            uploadLink.onchange = () => {
                let reader = new FileReader();
                reader.onload = () => {
                    console.log(reader.result);
                    args.ref.current.innerText = reader.result;
                };
                reader.readAsText(uploadLink.files[0]);
                args.setSettings({ ...args.settings, title: uploadLink.files[0].name.slice(0, uploadLink.files[0].name.length - 4) });
                setTitle(uploadLink.files[0].name.slice(0, uploadLink.files[0].name.length - 4));
            };
            setAction(false);
            break;
        case "Save":
            let downloadLink = document.createElement("a");
            downloadLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(args.ref.current.innerText));
            downloadLink.setAttribute('download', args.settings.title + ".txt");
            downloadLink.click();
            setAction(false);
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
            document.execCommand("cut", false);
            setAction(false);
            break;
        case "Copy":
            args.ref.current.focus();
            document.execCommand("copy", false);
            setAction(false);
            break;
        case "Paste":
            args.ref.current.focus();
            navigator.clipboard.readText().then((text) => {
                document.execCommand("insertText", false, text);
            }).catch((e) => { console.log(e); alert(e.message) });
            setAction(false);
            break;
        case "Find":
            dialogFind(setAction, setAppDialog, args);
            setAction(false);
            break;
        case "Find Next":
        case "Find Previous":
            handleFind(action, args);
            setAction(false);
            break;
        case "Close Find":
            args.setSettings({ ...args.settings, searchParams: { ...args.settings.searchParams, string: "", results: [], index: -1 } });
            setAppDialog(null);
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
        case "Close":
            if (!canClose) {
                setAppDialog({
                    title: "Warning",
                    info: "Do you want to download the file before closing?",
                    actions: {
                        Save: () => {
                            setAction("Save");
                            setCanClose(true);
                            setAppDialog(null);
                        },
                        Close: () => {
                            setCanClose(true);
                            setAppDialog(null);
                        },
                        Cancel: () => {
                            setAppDialog(null);
                            setAction(false);
                        }
                    }
                });
            }
            break;
        case false:
            break;
        default:
            setAction(false);
            break;
    }
}