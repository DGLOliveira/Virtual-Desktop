export const setActionHandler = (name, appStatus, setAppStatus, action) => {
    setAppStatus({
        ...appStatus,
        [name]: {
            ...appStatus[name],
            State:{
                ...appStatus[name].State,
                action: action
            }
        }
    })
}