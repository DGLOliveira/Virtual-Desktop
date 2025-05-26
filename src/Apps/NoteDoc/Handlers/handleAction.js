export default function handleAction(action, setAction, args) {
    switch (action) {
        case "textwrap":
            args.setSettings({...args.settings, textwrap: !args.settings.textwrap});
            setAction(false);
            break;
        case false:
            break;
        default:
            setAction(false);
            break;
    }
}