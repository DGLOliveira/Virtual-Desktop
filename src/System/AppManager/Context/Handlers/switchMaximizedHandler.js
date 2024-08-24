export const switchMaximizedHandler = (name, appStatus, setAppStatus) => {
  let newAppStatus = {};
  var body = document.body,  html = document.documentElement;
  var totalHeight = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);
  var desktopHeight = totalHeight -
    getComputedStyle(root).getPropertyValue("--TaskbarHeight").slice(0, -2);
  if (appStatus[name].State.isSelected) {
    if (!appStatus[name].State.isMaximized) {
      setAppStatus({
        ...appStatus,
        [name]: {
          State:{
            ...appStatus[name].State,
            isMaximized: true
          },
          Location:{
            ...appStatus[name].Location,
            Current:{
              top: 0,
              left:0
            },
            Previous:{
              top: appStatus[name].Location.Current.top,
              left: appStatus[name].Location.Current.left
            }
          },
          Size:{
            ...appStatus[name].Size,
            Current:{
            width: "100%",
            height: desktopHeight,
            }
          }
        },
      });
    } else {
      setAppStatus({
        ...appStatus,
        [name]: {
          ...appStatus[name],
          State:{
            ...appStatus[name].State,
            isMaximized: false
          },
          Location:{
            ...appStatus[name].Location,
            Current:{
              top: appStatus[name].Location.Previous.top,
              left: appStatus[name].Location.Previous.left
            }
          },
          Size:{
            ...appStatus[name].Size,
            Current:{
              width: appStatus[name].Size.Previous.width,
              height: appStatus[name].Size.Previous.height
            }
          }
        },
      });
    }
  } else {
    if (!appStatus[name].State.isMaximized) {
      Object.keys(appStatus).forEach((app) => {
          if (app === name) {
            newAppStatus[app] = {
              ...appStatus[app],
              State: {
                ...appStatus[app].State,
                isMinimized: false,
                isMaximized: true,
                isSelected: true,
              },
              Location: {
                zIndex: 100,
                Current:{
                  top: 0,
                  left: 0
                },
                Previous:{
                  top: appStatus[name].Location.Current.top,
                  left: appStatus[name].Location.Current.left
                }
              },
              Size: {
                Current:{
                  width: "100%",
                  height: desktopHeight
                },
                Previous:{
                  width: appStatus[name].Size.Current.width,
                  height: appStatus[name].Size.Current.height
                }
              }
            };
          } else {
            newAppStatus[app] = {
              ...appStatus[app],
              State:{
                ...appStatus[app].State,
                isSelected: false
              },
              Location:{
                ...appStatus[app].Location,
                zIndex: appStatus[app].zIndex - 1
              }
            };
          }
        setAppStatus(newAppStatus);
      });
    } else {
      Object.keys(appStatus).forEach((app) => {
          if (app === name) {
            newAppStatus[app] = {
              State:{
                ...appStatus[name].State,
                isMinimized: false,
                isMaximized: false,
                isSelected: true,
              },
              Location:{
                ...appStatus[name].Location,
                zIndex: 100,
                Current:{
                  top: appStatus[name].Location.Previous.top,
                  left: appStatus[name].Location.Previous.left
                }
              },
              Size:{
                ...appStatus[name].Size,
                Current:{
                  width: appStatus[name].Size.Previous.width,
                  height: appStatus[name].Size.Previous.height
                }
              }
            };
          } else {
            newAppStatus[app] = {
              ...appStatus[app],
              State:{
                ...appStatus[app].State,
                isSelected: false
              },
              Location:{
                ...appStatus[app].Location,
                zIndex: appStatus[app].zIndex - 1
              }
            };
          }
        setAppStatus(newAppStatus);
      });
    }
  }
}