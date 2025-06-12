import { useState, useEffect, createContext } from "react";

export const DeviceContext = createContext({
    device: {},
    browser: {},
    deviceType: "Desktop",
    setDeviceType: () => {},
    deviceTypeList: [],
});

export function DeviceProvider({ children }) {
    let device = {};
    let browser = {};
    const [deviceType, setDeviceType] = useState("Desktop");
    const deviceTypeList = ["Desktop", "TV", "Mobile", "Tablet"];

    useEffect(() => {
        //Populate device and browser info from initial boot screen
        Array.from(document.getElementById("DeviceSpecs").children).forEach((child) => {
            device[child.id] = child.attributes["data-info"].nodeValue;
        });
        Array.from(document.getElementById("BrowserSpecs").children).forEach((child) => {
            browser[child.id] = child.attributes["data-info"].nodeValue;});
        //Set device Type based on browser data
        switch(device["Type"]){
            case "tablet":
                setDeviceType("Tablet");
                break;
            case "mobile":
                setDeviceType("Mobile");
                break;
            case "smarttv":
                setDeviceType("TV");
                break;
            default:
                setDeviceType("Desktop");
                break;
        }
    }, []);

  const contextValue = {
    device,
    browser,
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