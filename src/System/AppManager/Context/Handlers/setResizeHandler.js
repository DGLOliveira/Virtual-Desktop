export const setResizeHandler = (name, appStatus, setAppStatus, direction, x, y, startHeight, startWidth, MIN_WIDTH, MIN_HEIGHT) => {
    const currPosTop = appStatus[name].Location.Current.top;
    const currPosLeft = appStatus[name].Location.Current.left;
    const currSizeWidth = appStatus[name].Size.Current.width;
    const currSizeHeight = appStatus[name].Size.Current.height;
    let newPosTop = currPosTop;
    let newPosLeft = currPosLeft;
    let newSizeWidth = currSizeWidth;
    let newSizeHeight = currSizeHeight;

    for (let i = 0; i < direction.length; i++) {
        switch (direction[i]) {
            case "n":
                if (startHeight + y > MIN_HEIGHT) {
                    newSizeHeight = startHeight + y;
                    newPosTop = currPosTop - y;
                } else {
                    newSizeHeight = MIN_HEIGHT;
                    newPosTop = currPosTop;
                }
                break;
            case "s":
                if (startHeight - y > MIN_HEIGHT) {
                    newSizeHeight = startHeight - y;
                } else {
                    newSizeHeight = MIN_HEIGHT;
                }
                break;
            case "e":
                if (startWidth - x > MIN_WIDTH) {
                    newSizeWidth = startWidth - x;
                } else {
                    newSizeWidth = MIN_WIDTH;
                }
                break;
            case "w":
                if (startWidth + x > MIN_WIDTH) {
                    newPosLeft = currPosLeft - x;
                    newSizeWidth = startWidth + x;
                } else {
                    newPosLeft = currPosLeft;
                    newSizeWidth = MIN_WIDTH;
                }
                break;
            default:
                break;
        }
    }

    setAppStatus({
        ...appStatus,
        [name]: {
            ...appStatus[name],
            Size: {
                ...appStatus[name].Size,
                Current: {
                    width: newSizeWidth,
                    height: newSizeHeight,
                }
            },
            Location: {
                ...appStatus[name].Location,
                Current: {
                    top: newPosTop,
                    left: newPosLeft,
                }
            }
        },
    });
}