export const setOpenHandler = (name, appStatus, setAppStatus) => {
  let newAppStatus = {};
  //Set all open apps to not selected and reduce the z-index
  Object.keys(appStatus).forEach((app) => {
    newAppStatus = {
      ...newAppStatus,
      [app]: {
        State: {
          ...appStatus[app].State,
          isSelected: false,
        },
        Location: {
          ...appStatus[app].Location,
          zIndex: appStatus[app].Location.zIndex - 1,
        },
        Size: {
          ...appStatus[app].Size,
        }
      }
    }
  })
  //Create state for newly opened app and set it to selected
  let index = Object.keys(appStatus).length;
  newAppStatus = {
    ...newAppStatus,
    [name]: {
      State: {
        action: false,
        isMaximized: false,
        isMinimized: false,
        isSelected: true,
      },
      Location: {
        zIndex: 100,
        Current: {
          top: 10 + index * 10,
          left: 10 + index * 10,
        },
        Previous: {
          top: 10 + index * 10,
          left: 10 + index * 10,
        }
      },
      Size: {
        Current: {
          width: 500,
          height: 500,
        },
        Previous: {
          width: 500,
          height: 500,
        }
      }
    }
  }
  //update state
  setAppStatus(newAppStatus);
}