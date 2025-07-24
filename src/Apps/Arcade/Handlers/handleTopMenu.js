export const handleTopMenu = (appMenu, setAppMenu, args) => {
    //Default App Menu  
    const defaultAppMenu = {
        "Game": {
            "New Game": {
                "action": "New",
                "keybind": "Alt+N",
                "disabled": true
            },
            "Play / Pause": {
                "action": "Play / Pause",
                "keybind": "P",
                "disabled": true
            },
            "LineBreak1":{},
            "Keybinds": {
                "action": "Keybinds",
                "disabled": false
            },
            "LineBreak2":{},
            "Close": {
                "action": "Close",
                "keybind": "Alt+Shift+F4",
                "disabled": false
            }
        },
        "View": {
            "Touchscreen Controls": {
                "action": "touchscreenControls",
                "checkbox": true,
                "disabled": false
            }
        }/*,
        "Help": {
            "Help": {
                "action": "help",
                "keybind": "F1",
                "disabled": true,
                "title": "Not Implemented"
            },
            "About": {
                "action": "about",
                "disabled": true,
                "title": "Not Implemented"
            }
        }*/
    }
    if (appMenu === null) {
        setAppMenu(defaultAppMenu);
    }
    else {
        let updatedAppMenu = { 
            ...appMenu,
                    "Game": {
                        ...appMenu["Game"],
                        "New Game": {
                            ...appMenu["Game"]["New Game"],
                            "disabled": !args.gameChoice
                        },
                        "Play / Pause": {
                            ...appMenu["Game"]["Play / Pause"],
                            "disabled": !args.gameChoice
                        }
                    },
                    "View": {
                        ...appMenu["View"],
                        "Touchscreen Controls": {
                            ...appMenu["View"]["Touchscreen Controls"],
                            "checkbox": args.showControls
                        }
                    }
         };
        setAppMenu(updatedAppMenu);
    }
}