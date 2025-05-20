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
    bootTerminal.append(container);
    const titleElement = document.createElement("figcaption");
    titleElement.append(title + " Specs:");
    container.append(titleElement);
    const listElement = document.createElement("ul");
    container.append(listElement);
    Object.keys(info).forEach((key) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("id", key);
      let text = "";
      if (typeof info[key] === "object") {
        let flag = false;
        text = key + ": ";
        Object.keys(info[key]).forEach((subkey) => {
          if (info[key][subkey] !== "Unknown") {
            text += info[key][subkey] + " ";
            flag = true;
          };
        });
        if (!flag) {
          text += "Unknown";
        }
      } else {
        text = key + ": " + info[key];
      }
      listItem.append(text);
      listElement.append(listItem);
    });
  }

  function checkFalsy(value) {
    if (value) {
      return value;
    } else {
      return "Unknown";
    }
  }

  function checkDevice() {
    const checkingDevice = document.createElement("h5");
    checkingDevice.append("Checking Device...");
    bootTerminal.append(checkingDevice);
    //There is no follproof way to check for touch support across all devices
    //Touch interface should always be included when needed
    const touch = (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0)) ? "Yes" : "No";
    //RAM values currently not available in Firefox and Safari
    //https://developer.mozilla.org/en-US/docs/Web/API/Device_Memory_API
    //Note: hardware concurrency does not necessally mean number of cores
    const ram = navigator.deviceMemory ? navigator.deviceMemory + " GB" : "Unknown";
    //Note: Sometimes browser reports an array of null gamepads
    let gamepadAvailable = 0;
    const gamepads = navigator.getGamepads().forEach((gamepad) => gamepad !== null ? gamepadAvailable++ : gamepadAvailable);
    deviceInfo = {
      "Device": {
        name: checkFalsy(uap.getDevice().model),
        vendor: checkFalsy(uap.getDevice().vendor),
      },
      "Type": checkFalsy(uap.getDevice().type),
      "CPU Architecture": checkFalsy(uap.getCPU().architecture),
      "Hardware Concurrency": navigator.hardwareConcurrency,
      "RAM": ram,
      "OS": {
        name: checkFalsy(uap.getOS().name),
        version: checkFalsy(uap.getOS().version)
      },
      "Touch Support": touch,
      "Gamepads": gamepadAvailable
    }
    return deviceInfo;
  }

  function checkBrowser() {
    const checkingBrowser = document.createElement("h5");
    checkingBrowser.append("Checking Browser...");
    bootTerminal.append(checkingBrowser);
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "Yes" : "No";
    const cookiesEnabled = navigator.cookieEnabled ? "Yes" : "No";
    browserInfo = {
      "Browser": {
        name: checkFalsy(uap.getBrowser().name),
        version: checkFalsy(uap.getBrowser().version)
      },
      "Engine": checkFalsy(uap.getEngine().name),
      "Dark Mode": darkMode,
      "Cookies Enabled": cookiesEnabled,
    }
    return browserInfo;
  }

  function countdown() {
    let count = 3;
    const countdownElement = document.createElement("h5");
    countdownElement.append("Ready in " + count + " seconds...");
    bootTerminal.append(countdownElement);
    function tick() {
      if(count > 0) {
        countdownElement.innerHTML = "Starting in " + count + " seconds...";
        count--;
        setTimeout(tick, 1000);
      }else{
        countdownElement.innerHTML = "Initializing...";
        document.getElementById("bootScreen").style.zIndex = -1;
        setReady(true);
      }
    }
    tick();
  }

  useEffect(() => {
    if(!ready){
    createList("Device", checkDevice());
    createList("Browser", checkBrowser());
    countdown();
    }
  })

  return (<>
    {ready && <Suspense fallback={<StartupScreen />}>
      <OS />
    </Suspense>}
  </>
  );
}