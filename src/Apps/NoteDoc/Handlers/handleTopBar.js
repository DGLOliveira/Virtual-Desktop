export default function handleTopBar(appTopBar, setAppTopBar, args) {

    const defaultTopBar = {
        "File": {
            "New": {
                "action": "New",
                "keybind": "Alt+N",
                "disabled": true
            },
            "Open": {
                "action": "Open",
                "keybind": "Alt+O",
                "disabled": true
            },
            "Save": {
                "action": "Save",
                "keybind": "Alt+S",
                "disabled": true
            },
            "Save As": {
                "action": "Save As",
                "keybind": "Alt+Shift+S",
                "disabled": true
            },
        },
        "Edit": {
            "Undo": {
                "action": "Undo",
                "keybind": "Ctrl+Z",
                "disabled": false
            },
            "Redo": {
                "action": "Redo",
                "keybind": "Ctrl+Shift+Z",
                "disabled": false
            },
            "LineBreak1": {},
            "Cut": {
                "action": "Cut",
                "keybind": "Ctrl+X",
                "disabled": true
            },
            "Copy": {
                "action": "Copy",
                "keybind": "Ctrl+C",
                "disabled": true
            },
            "Paste": {
                "action": "Paste",
                "keybind": "Ctrl+V",
                "disabled": true
            },
        },
        "View": {
            "Zoom In": {
                "action": "Zoom In",
                "keybind": "Ctrl++",
                "disabled": true
            },
            "Zoom Out": {
                "action": "Zoom Out",
                "keybind": "Ctrl+-",
                "disabled": true
            },
            "Zoom Reset": {
                "action": "Zoom Reset",
                "keybind": "Ctrl+0",
                "disabled": true
            },
            "LineBreak1": {},
            "Text Wrap": {
                "action": "Text Wrap",
                "checkbox": args.settings.textWrap==="nowrap" ? false : true,
                "disabled": false
            },
        },
        "Theme": {
            "Default": {
                "action": "System",
                "radio": args.settings.theme.type === "System" ? true : false,
                "name": "theme",
                "disabled": false
            },
            "Light": {
                "action": "Light",
                "radio": args.settings.theme.type === "Light" ? true : false,
                "name": "theme",
                "disabled": false
            },
            "Dark": {
                "action": "Dark",
                "radio": args.settings.theme.type === "Dark" ? true : false,
                "name": "theme",
                "disabled": false
            },
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
                "keybind": "F2",
                "disabled": true,
                "title": "Not Implemented"
            },
        }
    };
    if (!appTopBar) {
        setAppTopBar(defaultTopBar);
    }else{
        setAppTopBar({
            ...appTopBar,
            "View": {
                ...appTopBar["View"],
                "Text Wrap": {
                    ...appTopBar["View"]["Text Wrap"],
                    "checkbox": args.settings.textWrap==="nowrap" ? false : true
                }
            },
            "Theme": {
                ...appTopBar["Theme"],
                "Default": {
                    ...appTopBar["Theme"]["Default"],
                    "radio": args.settings.theme.type === "System" ? true : false
                },
                "Light": {
                    ...appTopBar["Theme"]["Light"],
                    "radio": args.settings.theme.type === "Light" ? true : false
                },
                "Dark": {
                    ...appTopBar["Theme"]["Dark"],
                    "radio": args.settings.theme.type === "Dark" ? true : false
                },
            }
        });
    }

}