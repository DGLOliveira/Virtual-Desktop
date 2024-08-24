export const handleAction = (action, setAction, appDialog, setAppDialog, args) =>{
    switch (action) {
        case "Keybinds":
            args.setShowKeybindDialog(!args.showKeybindDialog);
            setAction(false);
            break;
        case "Play / Pause":
            if(args.gameState === "Play"){
                args.setGameState("Pause");
            }else if(args.gameState === "Pause"){
                args.setGameState("Play");
            }
            setAction(false);
            break;
        case "New":
            args.setGameState("Restart");
            setAction(false);
            break;
        case "scoreboard":
            args.setShowScoreboard(!args.showScoreboard);
            setAction(false);
            break;
        case "touchscreenControls":{
            args.setShowControls(!args.showControls);
            setAction(false);
            break;
        }
        case false:
            break;
        default:
            setAction(false);
            break;
    }
}