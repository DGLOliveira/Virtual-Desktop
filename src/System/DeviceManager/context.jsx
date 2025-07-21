import { useState, useEffect, createContext } from "react";

export const DeviceContext = createContext({
    device: {},
    setDevice: () => { },
    browser: {},
    setBrowser: () => { },
    deviceType: "Desktop",
    setDeviceType: () => { },
    deviceTypeList: [],
    virtualOSState: {
        isBusy: false,
        display: "none",
    },
    setVirtualOSState: () => { },
});

export function DeviceProvider({ browserInfo, deviceInfo, children }) {
    const [device, setDevice] = useState(deviceInfo);
    const [browser, setBrowser] = useState(browserInfo);
    const getDeviceType = () => {
        switch (deviceInfo.type) {
            case "tablet":
                //Disabled Tablet mode for now
                return "Mobile";
            case "mobile":
                return "Mobile";
            case "smarttv":
                //Disabled TV mode for now
                return "Mobile";
            default:
                return "Desktop";
        }
    };
    const [deviceType, setDeviceType] = useState(getDeviceType);
    const deviceTypeList = ["Desktop", "Mobile"];
    const [virtualOSState, setVirtualOSState] = useState({
        isBusy: false,
        display: "none",
    });


    const contextValue = {
        device,
        setDevice,
        browser,
        setBrowser,
        deviceType,
        setDeviceType,
        deviceTypeList,
        virtualOSState,
        setVirtualOSState
    };

    return (
        <DeviceContext.Provider value={contextValue}>
            {children}
        </DeviceContext.Provider>
    );
}
export default DeviceProvider;