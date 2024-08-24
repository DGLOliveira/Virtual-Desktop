export const setSizeDefaultHandler = (name, appStatus, setAppStatus, width, height) => {
    setAppStatus({
      ...appStatus,
      [name]: {
        ...appStatus[name],
        Size:{
          ...appStatus[name].Size,
          Previous:{
            width: width,
            height: height,
          }
        }
      },
    });
  }