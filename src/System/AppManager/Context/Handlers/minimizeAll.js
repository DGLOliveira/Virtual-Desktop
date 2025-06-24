export const setMinimizeAll = (appStatus, setAppStatus) => {
    Object.keys(appStatus).forEach((app) => {
        appStatus[app].State.isMinimized = true;
    })
    setAppStatus(appStatus);
}