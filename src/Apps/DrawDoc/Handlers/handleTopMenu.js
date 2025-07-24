export const handleTopMenu = (appMenu, setAppMenu, args, flag) => {
    //Default App Menu  
    const defaultAppMenu = {
        "File": {
            "New": {
                "action": "New",
                "keybind": "Alt+N",
                "disabled": false
            },/*
            "Open": {
                "action": "Open",
                "keybind": "Alt+O",
                "disabled": true,
                "title": "Not Implemented"
            },*/
            "Download": {
                "action": "Save",
                "keybind": "Ctrl+Alt+S",
                "disabled": true
            }/*,
            "Download As": {
                "action": "Save As",
                "keybind": "Ctrl+Alt+Shift+S",
                "disabled": true,
                "title": "Not Implemented"
            }*/,
            "Change Name": {
                "action": "Change Name",
                "keybind": "F2",
                "disabled": false
            },
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
                "disabled": false
            },
            "Redo": {
                "action": "Redo",
                "keybind": "Ctrl+Y",
                "disabled": false
            }/*,
            "LineBreak1":{},
            "Cut": {
                "action": "Cut",
                "keybind": "Ctrl+X",
                "disabled": true,
                "title": "Not Implemented"
            },
            "Copy": {
                "action": "Copy",
                "keybind": "Ctrl+C",
                "disabled": true,
                "title": "Not Implemented"
            },
            "Paste": {
                "action": "Paste",
                "keybind": "Ctrl+V",
                "disabled": true,
                "title": "Not Implemented"
            },
            "LineBreak2":{},
            "Select All": {
                "action": "SelectAll",
                "keybind": "Ctrl+A",
                "disabled": true,
                "title": "Not Implemented"
            },
            "Clear": {
                "action": "SelectClear",
                "keybind": "Ctrl+Shift+C",
                "disabled": true,
                "title": "Not Implemented"
            }*/
        },
        "View": {
            "Zoom In": {
                "action": "Zoom In",
                "keybind": "Alt++",
                "disabled": false
            },
            "Zoom Out": {
                "action": "Zoom Out",
                "keybind": "Alt+-",
                "disabled": false
            },
            "Zoom Reset": {
                "action": "Zoom Reset",
                "keybind": "Alt+0",
                "disabled": true
            },
            "LineBreak1":{},
            "Tool Bar": {
                "action": "toolBar",
                "checkbox": true,
                "disabled": false
            },
            "Bottom Bar": {
                "action": "bottomNavBar",
                "checkbox": true,
                "disabled": false
            },
            "Top Bar": {
                "action": "topNavBar",
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
        let updatedAppMenu = { ...appMenu };
        switch (flag) {
            case "history":
                let hasHistory = args.history.canUndo || args.history.canRedo;
                updatedAppMenu = {
                    ...updatedAppMenu,
                    "File": {
                        ...updatedAppMenu["File"],
                        "Download": {
                            ...updatedAppMenu["File"]["Save"],
                            "disabled": !hasHistory
                        }/*,
                        "Download As": {
                            ...updatedAppMenu["File"]["Save As"],
                            "disabled": !hasHistory
                        }*/
                    },
                    "Edit": {
                        ...updatedAppMenu["Edit"],
                        "Undo": {
                            ...updatedAppMenu["Edit"]["Undo"],
                            "disabled": !args.history.canUndo
                        },
                        "Redo": {
                            ...updatedAppMenu["Edit"]["Redo"],
                            "disabled": !args.history.canRedo
                        }
                    }
                }
                break;
            case "view":
                updatedAppMenu = {
                    ...updatedAppMenu,
                    "View": {
                        ...updatedAppMenu["View"],
                        "Tool Bar": {
                            ...updatedAppMenu["View"]["Tool Bar"],
                            "checkbox": args.view.toolBar
                        },
                        "Bottom Bar": {
                            ...updatedAppMenu["View"]["Bottom Bar"],
                            "checkbox": args.view.bottomNavBar
                        },
                        "Top Bar": {
                            ...updatedAppMenu["View"]["Top Bar"],
                            "checkbox": args.view.topNavBar
                        }
                    }
                }
                break;
                case "zoom":
                updatedAppMenu = {
                    ...updatedAppMenu,
                    "View": {
                        ...updatedAppMenu["View"],
                        "Zoom In": {
                            ...updatedAppMenu["View"]["Zoom In"],
                            "disabled": args.zoom === 4
                        },
                        "Zoom Out": {
                            ...updatedAppMenu["View"]["Zoom Out"],
                            "disabled": args.zoom === 0.25
                        },
                        "Zoom Reset": {
                            ...updatedAppMenu["View"]["Zoom Reset"],
                            "disabled": args.zoom === 1
                        }
                    }
                }
                break;
            default:
                break;
        }
        setAppMenu(updatedAppMenu);
    }
}