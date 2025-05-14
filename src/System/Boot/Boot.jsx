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
        text = key + ": ";
        Object.keys(info[key]).forEach((subkey) => {
          text += info[key][subkey] + " ";
        });
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
    const touch = (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0)) ? "Yes" : "No";

    deviceInfo = {
      "Device": checkFalsy(uap.getDevice().type),
      "CPU Architecture": checkFalsy(uap.getCPU().architecture),
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
    browserInfo = {
      "Browser": {
        name: checkFalsy(uap.getBrowser().name),
        version: checkFalsy(uap.getBrowser().version)
      },
      "Dark Mode": darkMode
    }
    return browserInfo;
  }

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