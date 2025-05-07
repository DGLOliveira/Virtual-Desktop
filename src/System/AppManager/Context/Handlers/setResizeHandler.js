export const setResizeHandler = (name, appStatus, setAppStatus, direction, y, x, MIN_WIDTH, MIN_HEIGHT) => {

    switch (direction) {
        case "n":
            setAppStatus({
                ...appStatus,
                [name]: {
                    ...appStatus[name],
                    Location: {
                        ...appStatus[name].Location,
                        Current: {
                            ...appStatus[name].Location.Current,
                            top: appStatus[name].Size.Current.height - y > MIN_HEIGHT ?
                                appStatus[name].Location.Current.top - y
                                : appStatus[name].Location.Current.top,
                        }
                    },
                    Size: {
                        ...appStatus[name].Size,
                        Current: {
                            ...appStatus[name].Size.Current,
                            height: (appStatus[name].Size.Current.height - y > MIN_HEIGHT ?
                                appStatus[name].Size.Current.height - y
                                : MIN_HEIGHT),
                        }
                    }
                },
            });
            break;
        case "s":
            setAppStatus({
                ...appStatus,
                [name]: {
                    ...appStatus[name],
                    Size: {
                        ...appStatus[name].Size,
                        Current: {
                            ...appStatus[name].Size.Current,
                            height: appStatus[name].Size.Current.height + y > MIN_HEIGHT ?
                                appStatus[name].Size.Current.height + y
                                : MIN_HEIGHT,
                        }
                    }
                },
            });
            break;
        case "e":
            break;
        case "w":
            break;
        case "ne":
            break;
        case "nw":
            break;
        case "se":
            break;
        case "sw":
            break;
        default:
            break;
    }
}