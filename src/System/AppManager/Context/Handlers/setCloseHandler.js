export const setCloseHandler = (name, appStatus, setAppStatus) => {
    let newAppStatus = {};
    Object.keys(appStatus).forEach((app) => {
        if (app !== name) {
          newAppStatus[app] = {
            ...appStatus[app],
            State: {
              ...appStatus[app].State,
              isSelected: false,
            },
            Location: {
              ...appStatus[app].Location,
              zIndex: appStatus[app].Location.zIndex + 1,
            }
          };
        }
    });
    setAppStatus(newAppStatus);
  }