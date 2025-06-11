import { useState, useEffect, useContext } from "react";
import { 
    TbDeviceDesktop, 
    TbDeviceTv, 
    TbDeviceMobile, 
    TbDeviceTablet} 
    from "react-icons/tb";
import { DeviceContext } from "../../../DeviceManager/context.jsx";

export const DeviceSet = () => {
    const device = useContext(DeviceContext);

    const deviceIcons = {
        "Desktop": <TbDeviceDesktop title="Device Mode: Desktop"/>,
        "TV": <TbDeviceTv title="Device Mode: Smart TV"/>,
        "Mobile": <TbDeviceMobile title="Device Mode: Mobile"/>,
        "Tablet": <TbDeviceTablet title="Device Mode: Tablet"/>
    }

    function changeDeviceMode() {
        if(device.deviceMode === "Desktop") {
            device.setDeviceMode("TV");
        }else if(device.deviceMode === "TV") {
            device.setDeviceMode("Tablet");
        }else if(device.deviceMode === "Tablet") {
            device.setDeviceMode("Mobile");
        }else if(device.deviceMode === "Mobile") {
            device.setDeviceMode("Desktop");
        }
    }

    return(<>
        <button onClick={changeDeviceMode}>
            {deviceIcons[device.deviceMode]}
        </button>
    </>)
}