import { useState, useEffect, createContext } from "react";

export const DeviceContext = createContext({
    device: {},
    browser: {},
    deviceMode: "Desktop",
    setDeviceMode: () => {}
});

export function DeviceProvider({ children }) {
    let device = {};
    let browser = {};
    const [deviceMode, setDeviceMode] = useState("Desktop");

    useEffect(() => {
        //Populate device and browser info from initial boot screen
        Array.from(document.getElementById("DeviceSpecs").children).forEach((child) => {
            device[child.id] = child.attributes["data-info"].nodeValue;
        });
        Array.from(document.getElementById("BrowserSpecs").children).forEach((child) => {
            browser[child.id] = child.attributes["data-info"].nodeValue;});
        //Set device mode based on browser data
        switch(device["Type"]){
            case "tablet":
                setDeviceMode("Tablet");
                break;
            case "mobile":
                setDeviceMode("Mobile");
                break;
            case "smarttv":
                setDeviceMode("TV");
                break;
            default:
                setDeviceMode("Desktop");
                break;
        }
    }, []);

  const contextValue = {
    device,
    browser,
    deviceMode,
    setDeviceMode
  };

  return (
    <DeviceContext.Provider value={contextValue}>
      {children}
    </DeviceContext.Provider>
  );
}
export default DeviceProvider;