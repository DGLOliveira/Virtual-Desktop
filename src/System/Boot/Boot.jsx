import { UAParser } from 'ua-parser-js';
import { useState, useEffect, Suspense, lazy } from "react";
import StartupScreen from "./StartupScreen.jsx";

export default function Boot() {
  const [ready, setReady] = useState(false);
  const OS = lazy(() => import("./OS.jsx").catch(
    (error) => {
      console.error(error);
      return { default: () => <h1>{"Something Went Wrong :("}</h1> };
    }
  ));

  const uap = new UAParser();
  const message = document.getElementById("bootTerminal");

  function checkDevice() {
    const deviceInfo = document.createElement("p");
    message.append(deviceInfo);
    if (!uap.getDevice().type) {
      deviceInfo.append("Device: Unknown");
    }
    else {
      deviceInfo.append("Device: " + uap.getDevice().type);
    }
    const cpuInfo = document.createElement("p");
    message.append(cpuInfo);
    cpuInfo.append("CPU: " + uap.getCPU());
    const osInfo = document.createElement("p");
    message.append(osInfo);
    osInfo.append("OS: " + uap.getOS().name + " " + uap.getOS().version);
    const touchInfo = document.createElement("p");
    message.append(touchInfo);
    if (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0)) {
      touchInfo.append("Touch: Yes");
    } else {
      touchInfo.append("Touch: No");
    }
  }

  function checkBrowser() {
    const browserCheck = document.createElement("h5");
    message.append(browserCheck);
    browserCheck.append("Checking Browser...");
    const browserInfo = document.createElement("p");
    message.append(browserInfo);
    browserInfo.append("Browser: " + uap.getBrowser().name + " v" + uap.getBrowser().version);
    const darkMode = document.createElement("p");
    message.append(darkMode);
    darkMode.append("Dark Mode: " + window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  useEffect(() => {
    checkDevice();
    checkBrowser();
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