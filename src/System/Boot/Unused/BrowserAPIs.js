// Functions bellow are for testing purposes and future reference
// Do not use this function in production, rather, move any desired feature to Boot.jsx
// or new file

export default function BrowserAPIs() {
    console.log(navigator);
    console.log(window);

    //Currently not available in Firefox and Safari
    //https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API
    if (navigator.connection) {
        console.log(navigator.connection);
    } else {
        console.log("Network API not available");
    }

    //No curren use expected
    if (screen.orientation) {
        console.log(screen.orientation);
    } else {
        console.log("Screen Orientation API not available");
    }


    //Currently not available in Firefox and Safari
    //https://developer.mozilla.org/en-US/docs/Web/API/BatteryManager
    if (navigator.getBattery) {
        navigator.getBattery().then((battery) => {
            console.log(battery);
        });
    } else {
        console.log("Battery API not available");
    }

    //No current or future use expected
    if (navigator.mediaDevices) {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            console.log({ "Media Devices": devices });
        });
    } else {
        console.log("Media Devices API not available");
    }

    //Detects available USB devices for WebUSB 
    //No current or future use expected
    //Currently experimental feature, only parcially available in Chrome
    //https://developer.mozilla.org/en-US/docs/Web/API/Navigator/bluetooth
    if (navigator.bluetooth) {
        navigator.bluetooth.getAvailability().then((availability) => {
            console.log("bluetooth: " + availability);
        })
    } else {
        console.log("Bluetooth API not available");
    }

    //No current or future use expected
    //Currently experimental feature, compatibility table unknown
    //https://developer.mozilla.org/en-US/docs/Web/API/WebUSB_API

    if (navigator.usb) {
        navigator.usb.getDevices().then(devices => {
            console.log({ "USB": devices });
        });
    } else {
        console.log("WebUSB API not available");
    }

    //No current or future use expected
    //Currently experimental feature, only available in Edge
    //https://developer.mozilla.org/en-US/docs/Web/API/Navigator/serial

    if (navigator.serial) {
        navigator.serial.getPorts().then((ports) => {
            console.log({ "Serial": ports });
        });
    } else {
        console.log("Serial ports API not available");
    }

    //Detects available Human Interface Devices
    //No current or future use expected
    //Currently experimental feature, only available in Edge
    //Web page should be compatible with these devices by default, do not resort to detection
    //https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API
    if (navigator.hid) {
        navigator.hid.getDevices().then((devices) => {
            console.log({ "HID": devices });
        })
    } else {
        console.log("WebHID API not available");
    }

    //Detects if device screen is in a folded state
    //No current or future use expected
    //Not available in Firefox and Safari
    //https://developer.mozilla.org/en-US/docs/Web/API/DevicePosture
    if (navigator.devicePosture) {
        console.log(navigator.devicePosture);
        //continuous or folded
    } else {
        console.log("Device Posture API not available");
    }

    //Should be replaced when web app is eventually converted to fullstack
    //Disabled to avoid IP leak
    /*
    async function getIP() {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    }
    getIP();
    */

    /*-------------------------------------------*/
    /*-------------------------------------------*/
    /*-------------Mobile exclusive--------------*/
    /*-------------------------------------------*/
    /*-------------------------------------------*/

    //https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API
    if (navigator.vibrate) {
        console.log("Vibrate API available");
    } else {
        console.log("Vibrate API not available");
    }
    //Asking permission for mobile sensors in browsers throws an error
    //Note: Gravity sensor is part of accelerometer permissions
    /*  const accelerometer = new Accelerometer({ frequency: 10 });
    accelerometer.start();
    accelerometer.addEventListener("error", (error) => {
      if (error.name === "SecurityError")
        console.log("No permissions to use accelerometer.");
    });
      navigator.permissions.query({ name: "accelerometer" }).then((result) => {
      if (result.state === "denied") {
        console.log("Permission to use accelerometer sensor is denied.");
      }else{
        console.log("Permission to use accelerometer sensor is granted." + result.state);
      }
      // Use the sensor.
    });
      navigator.permissions.query({ name: "magnetometer" }).then((result) => {
      if (result.state === "denied") {
        console.log("Permission to use magnetometer sensor is denied.");
      }else{
        console.log("Permission to use magnetometer sensor is granted." + result.state);
      }
      // Use the sensor.
    });
    navigator.permissions.query({ name: "gyroscope" }).then((result) => {
      if (result.state === "denied") {
        console.log("Permission to use gyroscope sensor is denied.");
      }else{
        console.log("Permission to use gyroscope sensor is granted." + result.state);
      }
    });
    navigator.permissions.query({ name: "ambient-light-sensor" }).then((result) => {
      if (result.state === "denied") {
        console.log("Permission to use ambient light sensor is denied.");
      }else{
        console.log("Permission to use ambient light sensor is granted." + result.state);
      }
    });*/

}