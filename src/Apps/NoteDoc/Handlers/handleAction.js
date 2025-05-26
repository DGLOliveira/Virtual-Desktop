export default function handleAction(action, setAction, args) {

    switch (action) {
        case "New":
        case "Open":
        case "Save":
        case "Save As":
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