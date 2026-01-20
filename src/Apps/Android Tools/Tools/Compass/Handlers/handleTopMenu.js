export default function handleTopMenu(appMenu, setAppMenu, args) {
    //Default App Menu  
    const defaultAppMenu = {
        "Pointers": {
            "Rose Full": {
                "action": "RoseFull",
                "radio": true,
                "name": "pointer",
                "disabled": false
            },
            "Rose Simple": {
                "action": "RoseSimple",
                "radio": false,
                "name": "pointer",
                "disabled": false
            },
            "Magnet Pointer": {
                "action": "MagnetPointer",
                "radio": false,
                "name": "pointer",
                "disabled": false
            },
            "Arrow": {
                "action": "Arrow",
                "radio": false,
                "name": "pointer",
                "disabled": false
            },
            "Modern": {
                "action": "Modern",
                "radio": false,
                "name": "pointer",
                "disabled": false
            }
        },
        "Roll/Pitch": {
            "Double Sphere": {
                "action": "DoubleSphere",
                "radio": true,
                "name": "rollpitch",
                "disabled": false
            },
            "Bubble": {
                "action": "Bubble",
                "radio": false,
                "name": "rollpitch",
                "disabled": false
            },
            "Target": {
                "action": "Target",
                "radio": false,
                "name": "rollpitch",
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
        let updatedAppMenu = { ...appMenu };
        Object.keys(updatedAppMenu["Pointers"]).forEach((key) => {
            updatedAppMenu["Pointers"][key].action === args.style.pointer ?
            updatedAppMenu["Pointers"][key].radio = true : 
            updatedAppMenu["Pointers"][key].radio = false
        });
        Object.keys(updatedAppMenu["Roll/Pitch"]).forEach((key) => {
            updatedAppMenu["Roll/Pitch"][key].action === args.style.rollpitch ?
            updatedAppMenu["Roll/Pitch"][key].radio = true : 
            updatedAppMenu["Roll/Pitch"][key].radio = false
        });
        setAppMenu(updatedAppMenu);
    }
}