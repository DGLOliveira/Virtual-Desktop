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
        "Desktop": <TbDeviceDesktop title="Device Type: Desktop"/>,
        /*"TV": <TbDeviceTv title="Device Type: Smart TV"/>,*/
        "Mobile": <TbDeviceMobile title="Device Type: Mobile"/>,
        "Tablet": <TbDeviceTablet title="Device Type: Tablet"/>
    }

    function changeDeviceType() {
        if(device.deviceType === "Desktop") {
            device.setDeviceType("Tablet");
        /*}else if(device.deviceType === "TV") {
            device.setDeviceType("Tablet");*/
        }else if(device.deviceType === "Tablet") {
            device.setDeviceType("Mobile");
        }else if(device.deviceType === "Mobile") {
            device.setDeviceType("Desktop");
        }
    }

    return(<>
        <button onClick={changeDeviceType}>
            {deviceIcons[device.deviceType]}
        </button>
    </>)
}