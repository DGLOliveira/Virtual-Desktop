export const setPositionDefaultHandler = (name, appStatus, setAppStatus, left, top) => {
    setAppStatus({
      ...appStatus,
      [name]: {
        ...appStatus[name],
        Location: {
          ...appStatus[name].Location,
          Previous:{
            top: top,
            left: left
          }
        }
      },
    });
  }