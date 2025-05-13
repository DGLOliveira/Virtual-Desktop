import { UAParser } from 'ua-parser-js';
import { useState, useEffect, Suspense, lazy } from "react";
import StartupScreen from "./StartupScreen.jsx";

export default function Boot() {
  const [ready, setReady] = useState(false);
  const OS = lazy(() => import("./OS.jsx").catch(
    (error) => {
      let errorMessage = "Failed to load 3d Scene";
      console.error(error);
      return { default: () => <h1>{"Something Went Wrong :("}</h1> };
    }
  ));

  const uap = new UAParser();
  useEffect(() => {
    const message = document.getElementById("bootTerminal");
    const browserInfo = document.createElement("div");
    message.append(browserInfo);
    browserInfo.append("Browser: " + uap.getBrowser().name + " v" + uap.getBrowser().version);
    const cpuInfo = document.createElement("div");
    message.append(cpuInfo);
    cpuInfo.append("CPU: " + uap.getCPU());
    const deviceInfo = document.createElement("div");
    message.append(deviceInfo);
    if (!uap.getDevice().type) {
      deviceInfo.append("Device: Unknown");
    }
    else {
      deviceInfo.append("Device: " + uap.getDevice().type);
    }
    const osInfo = document.createElement("div");
    message.append(osInfo);
    osInfo.append("OS: " + uap.getOS().name + " " + uap.getOS().version);
  })

  /*setTimeout(() => {
    setReady(true);
  }, 5000);*/
  return (<>
    {!ready &&
      <div style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", color: "white", background: "black", cursor: "wait" }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
          <div>Header left placeholder</div>
          <div>Header right placeholder</div>
        </div>
        <div id="bootTerminal" style={{ display: "flex", flexDirection: "column" }}>
          <div>Checking Device...</div>
        </div>
      </div>}
    {ready && <Suspense fallback={<StartupScreen />}>
      <OS />
    </Suspense>}
  </>
  );
}