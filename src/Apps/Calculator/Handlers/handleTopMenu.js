export const handleTopMenu = (appMenu, setAppMenu, args) => {
    //Default App Menu  
    const defaultAppMenu = {
        "Mode": {
            "Basic": {
                "action": "Basic",
                "radio": false,
                "name": "type",
                "disabled": false
            },
            "Scientific": {
                "action": "Scientific",
                "radio": true,
                "name": "type",
                "disabled": false
            },
            "Graphic": {
                "action": "Graphic",
                "radio": false,
                "name": "type",
                "disabled": false
            }
        },
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
        }
    }
    if (appMenu === null) {
        setAppMenu(defaultAppMenu);
    }
    else {
        const updatedAppMenu = { 
            ...appMenu,
            "Mode":
            {
                ...appMenu["Mode"],
                "Basic":
                {
                    ...appMenu["Mode"]["Basic"],
                    "radio": args.calculatorState.type === "Basic"
                },
                "Scientific":
                {
                    ...appMenu["Mode"]["Scientific"],
                    "radio": args.calculatorState.type === "Scientific"
                },
                "Graphic":
                {
                    ...appMenu["Mode"]["Graphic"],
                    "radio": args.calculatorState.type === "Graphic"
                }
            }
        };
        setAppMenu(updatedAppMenu);
    }
}