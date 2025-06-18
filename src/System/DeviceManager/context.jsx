import { get } from "ol/proj";
import { useState, useEffect, createContext } from "react";

export const DeviceContext = createContext({
    device: {},
    setDevice: () => { },
    browser: {},
    setBrowser: () => { },
    deviceType: "Desktop",
    setDeviceType: () => { },
    deviceTypeList: [],
});

export function DeviceProvider({ browserInfo, deviceInfo, children }) {
    const [device, setDevice] = useState(deviceInfo);
    const [browser, setBrowser] = useState(browserInfo);
    const getDeviceType = () => {
        switch (deviceInfo.type) {
            case "tablet":
                return "Tablet";
            case "mobile":
                return "Mobile";
            case "smarttv":
                return "TV";
            default:
                return "Desktop";
        }
    };
    const [deviceType, setDeviceType] = useState(getDeviceType);
    const deviceTypeList = ["Desktop", "TV", "Mobile", "Tablet"];


    const contextValue = {
        device,
        setDevice,
        browser,
        setBrowser,
        deviceType,
        setDeviceType,
        deviceTypeList
    };

    return (
        <DeviceContext.Provider value={contextValue}>
            {children}
        </DeviceContext.Provider>
    );
}
export default DeviceProvider;