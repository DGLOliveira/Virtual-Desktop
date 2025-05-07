export const setSizeHandler = (name, appStatus, setAppStatus, width, height, MIN_WIDTH, MIN_HEIGHT) => {
    setAppStatus({
      ...appStatus,
      [name]: {
        ...appStatus[name],
        Size: {
          ...appStatus[name].Size,
          Current: {
            width: width > MIN_WIDTH ? width : MIN_WIDTH,
            height: height > MIN_HEIGHT ? height : MIN_HEIGHT,
          }
        }
      },
    });
  }