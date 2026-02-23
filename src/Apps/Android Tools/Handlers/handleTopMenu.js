export default function handleTopMenu(appMenu, setAppMenu, tool, subMenu) {
    const defaultAppMenu = {
        "Tools": {
            "Home": {
                "action": "Home",
                "radio": true,
                "name": "appstate",
                "disabled": false
            },
            "Compass": {
                "action": "Compass",
                "radio": false,
                "name": "appstate",
                "disabled": false
            },
            "Gyroscope": {
                "action": "Gyroscope",
                "radio": false,
                "name": "appstate",
                "disabled": false
            }
        }
    }

    if (appMenu === null || tool === "Home") {
        setAppMenu(defaultAppMenu);
    } else {
        let updatedAppMenu = { ...defaultAppMenu, ...subMenu };
        Object.keys(updatedAppMenu.Tools).forEach((key) => {
            if (key === tool) {
                updatedAppMenu["Tools"][key].radio = true;
            } else {
                updatedAppMenu["Tools"][key].radio = false;
            }
        })
        setAppMenu(updatedAppMenu);
    }
}