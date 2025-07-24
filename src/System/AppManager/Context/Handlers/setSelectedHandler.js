export const setSelectedHandler = (name, appStatus, setAppStatus) => {
  //Unselect app if any is selected
  if(name===""){
    let currSelected = "";
    let newAppStatus = {};
    Object.keys(appStatus).forEach((app) => {
      if(appStatus[app].State.isSelected){
        currSelected = app;
      }
    })
    if(currSelected!==""){
      Object.keys(appStatus).forEach((app) => {
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
      })
      setAppStatus(newAppStatus);
    }
  }
  //Select app and set minimization to false
  else if (!appStatus[name].State.isSelected) {
    let newAppStatus = {};
    Object.keys(appStatus).forEach((app) => {
      if (app === name) {
        newAppStatus[app] = {
          ...appStatus[app],
          State: {
            ...appStatus[app].State,
            isSelected: true,
            isMinimized: false,
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
    setAppStatus(newAppStatus);

  }
}