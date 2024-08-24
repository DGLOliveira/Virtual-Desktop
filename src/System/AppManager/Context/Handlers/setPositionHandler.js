export const setPositionHandler = (name, appStatus, setAppStatus, left, top) => {
    setAppStatus({
        ...appStatus,
        [name]: {
          ...appStatus[name],
          Location:{
            ...appStatus[name].Location,
            Current:{
              top: top,
              left: left
            }
          }
        },
      });
}