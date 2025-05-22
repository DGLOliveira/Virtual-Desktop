import { useState, useEffect } from "react";

export default function Compass() {
    const [state, setState] = useState("ready");
    const [angles, setAngles] = useState({ heading: 0, pitch: 0, roll: 0 });
    const sensor = null;

    // generate compass rose
    var compassRosePoints = [];
    function compassRosePointsCalc() {
        compassRosePoints = [];
        const center = 100;
        let ptx1, pty1, ptx2, pty2, ptx3, pty3, ptx4, pty4, points1, points2, deg, distLong, distShort;
        for (let i = 0; i < 16; i++) {
            if (i >= 12) {
                deg = i * 90;
                distLong = 60;
                distShort = 15;
            } else if (i >= 8) {
                deg = i * 90 - 45;
                distLong = 50;
                distShort = 12.5;
            } else {
                deg = i * 360 / 8 + 360 / 16;
                distLong = 40;
                distShort = 10;
            }
            ptx1 = Math.cos(deg * (Math.PI / 180)) * distLong + center;
            pty1 = Math.sin(deg * (Math.PI / 180)) * distLong + center;
            ptx2 = Math.cos((deg + 45) * (Math.PI / 180)) * distShort + center;
            pty2 = Math.sin((deg + 45) * (Math.PI / 180)) * distShort + center;
            ptx3 = center;
            pty3 = center;
            ptx4 = Math.cos((deg - 45) * (Math.PI / 180)) * distShort + center;
            pty4 = Math.sin((deg - 45) * (Math.PI / 180)) * distShort + center;
            points1 = ptx1 + "," + pty1 + " " + ptx2 + "," + pty2 + " " + ptx3 + "," + pty3 + " " + ptx4 + "," + pty4;
            points2 = ptx1 + "," + pty1 + " " + ptx2 + "," + pty2 + " " + ptx3 + "," + pty3;
            compassRosePoints.push([points1, points2]);
        }
    }
    compassRosePointsCalc();

    // generate compass degree pointers
    var compassDegreePointers = [];
    function compassDegreesPointersCalc() {
        compassDegreePointers = [];
        for (let i = 0; i < 360; i++) {
            var xHeight, yHeight;
            if (i % 90 === 0) {
                xHeight = 20;
                yHeight = 20;
            } else if ((i + 45) % 90 === 0) {
                xHeight = 15;
                yHeight = 15;
            } else if (i % 15 === 0) {
                xHeight = 10;
                yHeight = 10;
            } else {
                xHeight = 5;
                yHeight = 5;
            }
            compassDegreePointers.push([xHeight, yHeight]);
        }
    };
    compassDegreesPointersCalc();

    // start absolute orientation sensors
    function runSensors() {
        const options = { frequency: 2, referenceFrame: "device" };
        sensor = new AbsoluteOrientationSensor(options);
        sensor.start();
        sensor.onreading = () => {
            const x = sensor.quaternion[0];
            const y = sensor.quaternion[1];
            const z = sensor.quaternion[2];
            const w = sensor.quaternion[3];
            const heading = Math.atan2(2 * (x * y + z * w), 1 - 2 * (y * y + z * z));
            const pitch = Math.asin(2 * (x * z - w * y));
            const roll = Math.atan2(2 * (x * w + y * z), 1 - 2 * (x * x + y * y));
            setAngles({
                heading: heading,
                pitch: pitch,
                roll: roll
            });
        }
    }

    // state machine
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
        if (state === "running") {
            runSensors();
        }
    }, [state]);

    // cleanup sensor
    useEffect(() => {
        return () => {
            if (sensor) {
                sensor.stop();
            }
        }
    }, []);

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
                <svg style={{ width: "inherit", height: "inherit", transformOrigin: "center", transition: "transform 0.5s" }} shapeRendering="geometricprecision" width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="90" fill="lightgray" stroke="black" strokeWidth="1" />
                    <circle cx="100" cy="100" r="70" fill="white" stroke="black" strokeWidth="1" />
                    <circle cx="100" cy="100" r="60" fill="lightgray" stroke="black" strokeWidth="1" />
                    <circle cx="100" cy="100" r="50.5" stroke="gray" strokeWidth="0.5" />
                    <circle cx="100" cy="100" r="40.5" stroke="gray" strokeWidth="0.5" />
                    <g id="rose" style={{ transform: `rotate(${angles.heading})` }}>
                        {compassRosePoints.map((val, index) => {
                            return (
                                <>
                                    <polygon key={index + "a"} points={val[0]} fill="white" stroke="black" strokeWidth="1" />
                                    <polygon key={index + "b"} points={val[1]} fill="black" />
                                </>
                            )
                        })}
                        <polygon points="100,30 96,45 100,50 104,45" fill="white" stroke="black" strokeWidth="1" />
                        <polygon points="100,30 104,45 100,45" fill="black" />
                        <polygon points="100,45 96,45 100,50" fill="black" />
                        <rect x="96" y="48" width="8" height="2" fill="white" stroke="black" strokeWidth="1" rx="1" />
                    </g>
                    <g id="degrees">
                        {compassDegreePointers.map((val, index) => {
                            return (
                                <line
                                    key={index}
                                    x1={Math.cos(index * (Math.PI / 180)) * (90 - val[0]) + 100}
                                    y1={Math.sin(index * (Math.PI / 180)) * (90 - val[1]) + 100}
                                    x2={Math.cos(index * (Math.PI / 180)) * 90 + 100}
                                    y2={Math.sin(index * (Math.PI / 180)) * 90 + 100}
                                    stroke={index === 270 ? "red" : "black"}
                                    strokeWidth="1"
                                />
                            )
                        })}
                        <polygon points="100,30 96,20 100,22 104,20" fill="red" />
                    </g>
                    <g id="rollPitch" style={{ isolation: "isolate", filter: " invert(100%)" }}>
                        <circle
                            cx="100"
                            cy="100"
                            r="13"
                            fill="white"
                            stroke="black"
                            strokeWidth="2"
                            style={{ filter: " invert(100%)" }}
                        />
                        <circle
                            cx={Math.sin(angles.pitch) * 5 + 100}
                            cy={Math.sin(angles.roll) * 5 + 100}
                            r="5"
                            fill="black"
                            style={{ mixBlendMode: "difference", filter: " invert(100%)" }}
                        />
                        <circle
                            cx={-Math.sin(angles.pitch) * 5.5 + 100}
                            cy={-Math.sin(angles.roll) * 5.5 + 100}
                            r="4.5"
                            fill="black"
                            style={{ mixBlendMode: "difference", filter: "invert(100%)" }}
                        />
                    </g>
                </svg>
            </div>
        </>
    );
}