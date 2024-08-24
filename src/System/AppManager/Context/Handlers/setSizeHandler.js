export const setSizeHandler = (name, appStatus, setAppStatus, width, height) => {
    setAppStatus({
      ...appStatus,
      [name]: {
        ...appStatus[name],
        Size: {
          ...appStatus[name].Size,
          Current: {
            width: width,
            height: height,
          }
        }
      },
    });
  }