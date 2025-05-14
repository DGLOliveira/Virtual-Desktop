import { UAParser } from 'ua-parser-js';
import { useState, useEffect, Suspense, lazy } from "react";
import StartupScreen from "./StartupScreen.jsx";

export default function Boot() {
  const [ready, setReady] = useState(false);
  let deviceInfo = {};
  let browserInfo = {};
  const uap = new UAParser();
  const bootTerminal = document.getElementById("bootTerminal");

  const OS = lazy(() => import("./OS.jsx").catch(
    (error) => {
      console.error(error);
      return { default: () => <h1>{"Something Went Wrong :("}</h1> };
    }
  ));

  function createList(title, info) {
    const container = document.createElement("figure");
    const titleElement = document.createElement("figcaption");
    titleElement.append("Checking " + title + "...");
    container.append(titleElement);
    const listElement = document.createElement("ul");
    container.append(listElement);
    Object.keys(info).forEach((key) => {
      const listItem = document.createElement("li");
      let text = "";
      if(typeof info[key] === "object") {
        let flag = false;
        text = key + ": ";
        Object.keys(info[key]).forEach((subkey) => {
          if(info[key][subkey] !== "Unknown"){
          text += info[key][subkey] + " ";
            flag = true;
          };
        });
        if(!flag){
          text += "Unknown";
        }
      }else{
        text = key + ": " + info[key];
      }
      listItem.append(text);
      listElement.append(listItem);
    });
    bootTerminal.append(container);
  }

  function checkFalsy(value) {
    if (value) {
      return value;
    } else {
      return "Unknown";
    }
  }

  function checkDevice() {
    //There is no follproof way to check for touch support across all devices
    //Touch interface should always be included when needed
    const touch = (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0)) ? "Yes" : "No";
    //RAM values currently not available in Firefox and Safari
    //https://developer.mozilla.org/en-US/docs/Web/API/Device_Memory_API
    const ram = navigator.deviceMemory ? navigator.deviceMemory + " GB" : "Unknown";
    deviceInfo = {
      "Device": {
        name: checkFalsy(uap.getDevice().model),
        vendor: checkFalsy(uap.getDevice().vendor),
      },
      "Type": checkFalsy(uap.getDevice().type),
      "CPU Architecture": checkFalsy(uap.getCPU().architecture),
      "RAM": ram,
      "OS": {
        name: checkFalsy(uap.getOS().name),
        version: checkFalsy(uap.getOS().version)
      },
      "Touch Support": touch
    }
    return deviceInfo;
  }

  function checkBrowser() {
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "Yes" : "No";
    const cookiesEnabled = navigator.cookieEnabled ? "Yes" : "No";
    browserInfo = {
      "Browser": {
        name: checkFalsy(uap.getBrowser().name),
        version: checkFalsy(uap.getBrowser().version)
      },
      "Dark Mode": darkMode,
      "Cookies Enabled": cookiesEnabled,
    }
    return browserInfo;
  }

  //-----------------------------------------------------------//
  //-----------------------------------------------------------//
  //-----------------------------------------------------------//
  // Functions bellow under construction and/or for testing

  console.log(navigator);
  console.log(uap.getResult());

  //Currently not available in Firefox and Safari
  //https://developer.mozilla.org/en-US/docs/Web/API/BatteryManager
  if(navigator.getBattery){
    navigator.getBattery().then((battery) => {
      console.log(battery);
    });
  }

  //No current or future use expected
  if(navigator.mediaDevices){
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      console.log(devices);
    });
  }

  //No current or future use expected
  //Currently experimental feature, only parcially available in Chrome
  //https://developer.mozilla.org/en-US/docs/Web/API/Navigator/bluetooth
  if(navigator.bluetooth){
    navigator.bluetooth.getAvailability().then((availability) => {
      console.log("bluetooth: " + availability);
    })
  }

  //No current or future use expected
  //Currently experimental feature, compatibility table unknown
  //https://developer.mozilla.org/en-US/docs/Web/API/WebUSB_API
  if(navigator.usb){
    navigator.usb.getDevices().then((devices) => {
      console.log(devices);
    });
  }

  //-----------------------------------------------------------//
  //-----------------------------------------------------------//
  //-----------------------------------------------------------//

  useEffect(() => {
    createList("Device", checkDevice());
    createList("Browser", checkBrowser());
  })

  /*setTimeout(() => {
    setReady(true);
  }, 5000);*/

  return (<>
    {ready && <Suspense fallback={<StartupScreen />}>
      <OS />
    </Suspense>}
  </>
  );
}