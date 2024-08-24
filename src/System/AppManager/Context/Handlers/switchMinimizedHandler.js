export const switchMinimizedHandler = (name, appStatus, setAppStatus) => {
  let newAppStatus = {};
  if (!appStatus[name].State.isMinimized) {
    if (appStatus[name].State.isSelected) {
      Object.keys(appStatus).forEach((app) => {
        if (app === name) {
          newAppStatus[app] = {
            ...appStatus[app],
            State: {
              ...appStatus[app].State,
              isSelected: false,
              isMinimized: true,
            },
            Location: {
              ...appStatus[app].Location,
              zIndex: 1,
            }
          };
        } else {
          newAppStatus[app] = {
            ...appStatus[app],
            Location: {
              ...appStatus[app].Location,
              zIndex: appStatus[app].Location.zIndex + 1,
            }
          };
        }
      });
    } else {
      newAppStatus = {
        ...appStatus,
        [name]: {
          ...appStatus[name],
          State:{
            ...appStatus[name].State,
            isMinimized: true,
          },
          Location:{
            ...appStatus[name].Location,
            zIndex: 1,
          }
        },
      };
    }
  } else {
    Object.keys(appStatus).forEach((app) => {
      if (app === name) {
        newAppStatus[app] = {
          ...appStatus[app],
          State: {
            ...appStatus[app].State,
            isMinimized: false,
            isSelected: true,
          },
          Location: {
            ...appStatus[app].Location,
            zIndex: 100,
          }
        };
      } else {
        newAppStatus[app] = {
          ...appStatus[app],
          State: {
            ...appStatus[app].State,
            isSelected: false,
          },
          Location: {
            ...appStatus[app].Location,
            zIndex: appStatus[app].Location.zIndex - 1,
          } 
        };
      }
    });
  }
  setAppStatus(newAppStatus);
}