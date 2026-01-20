export default function handleAction(action, setAction, args){
    switch(action){
        case "RoseFull":
        case "RoseSimple":
        case "MagnetPointer":
        case "Arrow":
        case "Modern":
            args.setStyle({...args.style, pointer: action});
            setAction(action);
            break;
        case "Target":
        case "DoubleSphere":
        case "Bubble":
            args.setStyle({...args.style, rollpitch: action});
            setAction(action);
            break;
        case false:
            break;
        default:
            setAction(false);
            break;
    }
}