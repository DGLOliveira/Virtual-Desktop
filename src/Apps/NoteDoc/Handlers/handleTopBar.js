export default function handleTopBar(appTopBar, setAppTopBar, args) {

    const defaultTopBar = {
        "File": {
            "New": {
                "action": "New",
                "keybind": "Alt+N",
                "disabled": args.ref.current.innerHTML === "" ? true : false
            },
            "Open": {
                "action": "Open",
                "keybind": "Alt+O",
                "disabled": false
            },
            "Download File": {
                "action": "Save",
                "keybind": "Alt+S",
                "disabled": args.ref.current.innerHTML === "" ? true : false
            },
            "LineBreak0": {},
            "Change Title": {
                "action": "Change Title",
                "keybind": "F2",
                "disabled": false
            },
            "LineBreak1": {},
            "Close": {
                "action": "Close",
                "keybind": "Alt+Shift+F4",
                "disabled": false
            }
        },
        "Edit": {
            "Undo": {
                "action": "Undo",
                "keybind": "Ctrl+Z",
                "disabled": false,
                "keybindDisabled": true
            },
            "Redo": {
                "action": "Redo",
                "keybind": "Ctrl+Shift+Z",
                "disabled": false,
                "keybindDisabled": true
            },
            "LineBreak0": {},
            "Cut": {
                "action": "Cut",
                "keybind": "Ctrl+X",
                "disabled": false,
                "keybindDisabled": true
            },
            "Copy": {
                "action": "Copy",
                "keybind": "Ctrl+C",
                "disabled": false,
                "keybindDisabled": true
            },
            "Paste": {
                "action": "Paste",
                "keybind": "Ctrl+V",
                "disabled": false,
                "keybindDisabled": true
            },
            "LineBreak1": {},
            "Find": {
                "action": "Find",
                "keybind": "Ctrl+Alt+F",
                "disabled": false
            },
            "Replace": {
                "action": "Replace",
                "keybind": "Ctrl+Alt+R",
                "disabled": false
            },
        },
        "View": {
            "Zoom In": {
                "action": "Zoom In",
                "keybind": "Alt++",
                "disabled": args.settings.zoom >= args.MAX_ZOOM ? true : false
            },
            "Zoom Out": {
                "action": "Zoom Out",
                "keybind": "Alt+-",
                "disabled": args.settings.zoom <= args.MIN_ZOOM ? true : false
            },
            "Zoom Reset": {
                "action": "Zoom Reset",
                "keybind": "Alt+0",
                "disabled": args.settings.zoom === 1 ? true : false
            },
            "LineBreak1": {},
            "Text Wrap": {
                "action": "Text Wrap",
                "checkbox": args.settings.textWrap === "nowrap" ? false : true,
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
                "keybind": "F2",
                "disabled": true,
                "title": "Not Implemented"
            },
        }*/
    };
    if (!appTopBar) {
        setAppTopBar(defaultTopBar);
    } else {
        setAppTopBar({
            ...appTopBar,
            "File": {
                ...appTopBar["File"],
                "New": {
                    ...appTopBar["File"]["New"],
                    "disabled": args.ref.current.innerHTML === "" ? true : false
                },
                "Download": {
                    ...appTopBar["File"]["Save"],
                    "disabled": args.ref.current.innerHTML === "" ? true : false
                },
            },
            "View": {
                ...appTopBar["View"],
                "Zoom In": {
                    ...appTopBar["View"]["Zoom In"],
                    "disabled": args.settings.zoom >= args.MAX_ZOOM ? true : false
                },
                "Zoom Out": {
                    ...appTopBar["View"]["Zoom Out"],
                    "disabled": args.settings.zoom <= args.MIN_ZOOM ? true : false
                },
                "Zoom Reset": {
                    ...appTopBar["View"]["Zoom Reset"],
                    "disabled": args.settings.zoom === 1 ? true : false
                },
                "Text Wrap": {
                    ...appTopBar["View"]["Text Wrap"],
                    "checkbox": args.settings.textWrap === "nowrap" ? false : true
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