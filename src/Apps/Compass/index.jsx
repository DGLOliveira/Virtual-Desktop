import { useState, useEffect } from "react";

export default function Compass() {
    const [state, setState] = useState("ready");
    const [angle, setAngle] = useState(0);

    function runSensors() {
        const options = { frequency: 2, referenceFrame: "device" };
        const sensor = new AbsoluteOrientationSensor(options);
        sensor.start();
        sensor.onreading = () => {
            console.log(sensor);
            const { x, y, z, w } = sensor.quaternion;
            const heading = Math.atan2(2 * (x * y + z * w), 1 - 2 * (y * y + z * z));
            //const pitch = Math.asin(2 * (x * z - w * y));
            //const roll = Math.atan2(2 * (x * w + y * z), 1 - 2 * (x * x + y * y));
            console.log(heading);
            console.log(heading * 180 / Math.PI);
            setAngle(heading * 180 / Math.PI);
        }
    }

    useEffect(() => {
        if (state === "start") {
            if ("AbsoluteOrientationSensor" in window) {
                Promise.all([
                    navigator.permissions.query({ name: "accelerometer" }),
                    navigator.permissions.query({ name: "magnetometer" }),
                    navigator.permissions.query({ name: "gyroscope" }),
                ]).then((results) => {
                    if (results.every((result) => result.state === "granted")) {
                        setState("running");
                    } else {
                        setState("not allowed");
                    }
                });
            } else {
                setState("not supported");
            }

        }
        if(state === "running") {
            runSensors();
        }
    }, [state]);

    return (
        <>
            {state === "ready" &&
                <button
                    style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                    onClick={() => setState("start")}
                    title="Start"
                >
                    Start
                </button>
            }
            {state === "not supported" &&
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "red", backgroundColor: "white", border: "1px black solid", padding: "5px", boxSizing: "border-box" }}>
                    This feature is not supported on your device and/or browser
                </div>
            }
            {state === "not allowed" &&
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "red", backgroundColor: "white", border: "1px black solid", padding: "5px", boxSizing: "border-box" }}>
                    This feature does not have permission to access your device sensors
                </div>
            }
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", padding: "5px", boxSizing: "border-box" }}>
                <svg style={{ width: "inherit", height: "inherit" }} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="49" fill="lightgray" stroke="black" strokeWidth="1" />
                    <circle cx="50" cy="50" r="34" fill="white" stroke="black" strokeWidth="1" />
                    <circle cx="50" cy="50" r="30" stroke="black" strokeWidth="1" />
                    <rect style={{ transformOrigin: "center", transform: `rotate(15deg)` }} x="49" y="83.5" width="1" height="4" fill="black" />
                    <rect style={{ transformOrigin: "center", transform: `rotate(30deg)` }} x="49" y="80" width="1" height="9" fill="black" />
                    <rect style={{ transformOrigin: "center", transform: `rotate(45deg)` }} x="49" y="83.5" width="1" height="4" fill="black" />
                    <rect style={{ transformOrigin: "center", transform: `rotate(60deg)` }} x="49" y="80" width="1" height="9" fill="black" />
                    <rect style={{ transformOrigin: "center", transform: `rotate(75deg)` }} x="49" y="83.5" width="1" height="4" fill="black" />
                    <rect style={{ transformOrigin: "center", transform: `rotate(105deg)` }} x="49" y="83.5" width="1" height="4" fill="black" />
                    <rect style={{ transformOrigin: "center", transform: `rotate(120deg)` }} x="49" y="80" width="1" height="9" fill="black" />
                    <rect style={{ transformOrigin: "center", transform: `rotate(135deg)` }} x="49" y="83.5" width="1" height="4" fill="black" />
                    <rect style={{ transformOrigin: "center", transform: `rotate(150deg)` }} x="49" y="80" width="1" height="9" fill="black" />
                    <rect style={{ transformOrigin: "center", transform: `rotate(165deg)` }} x="49" y="83.5" width="1" height="4" fill="black" />
                    <rect style={{ transformOrigin: "center", transform: `rotate(195deg)` }} x="49" y="83.5" width="1" height="4" fill="black" />
                    <rect style={{ transformOrigin: "center", transform: `rotate(210deg)` }} x="49" y="80" width="1" height="9" fill="black" />
                    <rect style={{ transformOrigin: "center", transform: `rotate(225deg)` }} x="49" y="83.5" width="1" height="4" fill="black" />
                    <rect style={{ transformOrigin: "center", transform: `rotate(240deg)` }} x="49" y="80" width="1" height="9" fill="black" />
                    <rect style={{ transformOrigin: "center", transform: `rotate(255deg)` }} x="49" y="83.5" width="1" height="4" fill="black" />
                    <rect style={{ transformOrigin: "center", transform: `rotate(285deg)` }} x="49" y="83.5" width="1" height="4" fill="black" />
                    <rect style={{ transformOrigin: "center", transform: `rotate(300deg)` }} x="49" y="80" width="1" height="9" fill="black" />
                    <rect style={{ transformOrigin: "center", transform: `rotate(315deg)` }} x="49" y="83.5" width="1" height="4" fill="black" />
                    <rect style={{ transformOrigin: "center", transform: `rotate(330deg)` }} x="49" y="80" width="1" height="9" fill="black" />
                    <rect style={{ transformOrigin: "center", transform: `rotate(345deg)` }} x="49" y="83.5" width="1" height="4" fill="black" />
                    <text x="47" y="8.5" fill="black" fontSize="8" style={{ fontFamily: "times new roman", fontWeight: "bold" }}>N</text>
                    <text x="48" y="97" fill="black" fontSize="7" style={{ fontFamily: "times new roman", fontWeight: "bold" }}>S</text>
                    <text x="92" y="52.5" fill="black" fontSize="7" style={{ fontFamily: "times new roman", fontWeight: "bold" }}>E</text>
                    <text x="2" y="52.5" fill="black" fontSize="7" style={{ fontFamily: "times new roman", fontWeight: "bold" }}>W</text>
                    <polygon style={{ transformOrigin: "center", transform: `rotate(45deg)` }} points="50,80 56,57 50,50 43,56" fill="white" stroke="black" strokeWidth="1" />
                    <polygon style={{ transformOrigin: "center", transform: `rotate(45deg)` }} points="50,80 43,56 50,50" fill="black" />
                    <polygon style={{ transformOrigin: "center", transform: `rotate(135deg)` }} points="50,80 56,57 50,50 43,56" fill="white" stroke="black" strokeWidth="1" />
                    <polygon style={{ transformOrigin: "center", transform: `rotate(135deg)` }} points="50,80 43,56 50,50" fill="black" />
                    <polygon style={{ transformOrigin: "center", transform: `rotate(225deg)` }} points="50,80 56,57 50,50 43,56" fill="white" stroke="black" strokeWidth="1" />
                    <polygon style={{ transformOrigin: "center", transform: `rotate(225deg)` }} points="50,80 43,56 50,50" fill="black" />
                    <polygon style={{ transformOrigin: "center", transform: `rotate(315deg)` }} points="50,80 56,57 50,50 43,56" fill="white" stroke="black" strokeWidth="1" />
                    <polygon style={{ transformOrigin: "center", transform: `rotate(315deg)` }} points="50,80 43,56 50,50" fill="black" />
                    <polygon style={{ transformOrigin: "center", transform: `rotate(0deg)` }} points="50,90 56,57 50,50 43,56" fill="white" stroke="black" strokeWidth="1" />
                    <polygon style={{ transformOrigin: "center", transform: `rotate(0deg)` }} points="50,90 43,56 50,50" fill="black" />
                    <polygon style={{ transformOrigin: "center", transform: `rotate(90deg)` }} points="50,90 56,57 50,50 43,56" fill="white" stroke="black" strokeWidth="1" />
                    <polygon style={{ transformOrigin: "center", transform: `rotate(90deg)` }} points="50,90 43,56 50,50" fill="black" />
                    <polygon style={{ transformOrigin: "center", transform: `rotate(180deg)` }} points="50,90 56,57 50,50 43,56" fill="white" stroke="black" strokeWidth="1" />
                    <polygon style={{ transformOrigin: "center", transform: `rotate(180deg)` }} points="50,90 43,56 50,50" fill="black" />
                    <polygon style={{ transformOrigin: "center", transform: `rotate(270deg)` }} points="50,90 56,57 50,50 43,56" fill="white" stroke="black" strokeWidth="1" />
                    <polygon style={{ transformOrigin: "center", transform: `rotate(270deg)` }} points="50,90 43,56 50,50" fill="black" />
                    <polygon style={{ transformOrigin: "center", transform: `rotate(${angle + 180}deg)` }} points="50,82 45,50 50,50 55,50" fill="red" />
                    <polygon style={{ transformOrigin: "center", transform: `rotate(${angle}deg)` }} points="50,75 45,50 50,50 55,50" fill="dodgerblue" />
                    <circle cx="50" cy="50" r="5" fill="black" />
                    <circle cx="50" cy="50" r="3" fill="white" />
                </svg>
            </div>
        </>
    );
}