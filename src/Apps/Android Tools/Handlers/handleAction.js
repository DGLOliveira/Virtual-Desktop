export default function handleAction(action, setAction, tool, setTool, setSubMenu, setSubAction) {
    switch (action) {
        case "Compass":
            if (tool !== "Compass") {
                setTool(action);
                setSubMenu(null);
            }
            setAction(false);
            break;
        case "Gyroscope":
            if (tool !== "Gyroscope") {
                setTool(action);
                setSubMenu(null);
            }
            setAction(false);
            break;
        case "Home":
            if (tool !== "Home") {
                setTool(action);
                setSubMenu(null);
            }
            setAction(false);
            break;
        case false:
            break;
        default:
            setAction(false);
            setSubAction(action);
            break;
    }
}