import { useState, useEffect } from "react";
import RoseFull from "./Components/Pointers/RoseFull.jsx";
import DoubleSphere from "./Components/RollPitch/DoubleSphere.jsx";
import DegreesFull from "./Components/Degrees/DegreesFull.jsx";
import "./style.css";

export default function Compass() {
    const [state, setState] = useState("ready");
    //Note: all angles are in radians
    //cumulativeRotation is used to prevent compass from doing a full 360 rotation
    //when heading goes from -PI to PI, and makes this number go from 0 to 2PI at the start
    const [angles, setAngles] = useState({
        heading: 0,
        pitch: 0,
        roll: 0,
        cumulativeRotation: Math.PI * 2
    });
    var sensor = null;
    const SENSOR_UPDATE_FREQUENCY = 4; //keep value low to avoid battery drain
    const TRANSITION_TIME = 0.25; //seconds

    //converts quaternion to angles in radians and updates angles
    //compensates for heading going from -PI to PI
    function quaternionToAngles() {
        const x = sensor.quaternion[0];
        const y = sensor.quaternion[1];
        const z = sensor.quaternion[2];
        const w = sensor.quaternion[3];
        const heading = Math.atan2(2 * (x * y + z * w), 1 - 2 * (y * y + z * z));
        const pitch = Math.asin(2 * (x * z - w * y));
        const roll = Math.atan2(2 * (x * w + y * z), 1 - 2 * (x * x + y * y));
        let cumulativeRotation = angles.cumulativeRotation;
        if (angles.heading < 0 && heading > 0) {
            cumulativeRotation += Math.PI * 2;
        }
        else if (angles.heading > 0 && heading < 0) {
            cumulativeRotation -= Math.PI * 2;
        }
        setAngles({
            heading: heading,
            pitch: pitch,
            roll: roll,
            cumulativeRotation: cumulativeRotation
        });
    }

    // start absolute orientation sensors
    function runSensors() {
        const options = { frequency: SENSOR_UPDATE_FREQUENCY, referenceFrame: "device" };
        sensor = new AbsoluteOrientationSensor(options);
        sensor.start();
        sensor.onreading = () => {
            quaternionToAngles();
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
    });

    return (
        <>
            {state === "ready" &&
                <button
                    className="compassStartButton"
                    onClick={() => setState("start")}
                    title="Start"
                >
                    Start
                </button>
            }
            {state === "not supported" &&
                <div className="compassWarning">
                    This feature is not supported on your device and/or browser
                </div>
            }
            {state === "not allowed" &&
                <div className="compassWarning">
                    This feature does not have permission to access your device sensors
                </div>
            }
            <svg className="compassContainer" shapeRendering="geometricprecision" width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="100" y="5" textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="red" >
                    {(angles.heading * 180 / Math.PI).toPrecision(2)}°
                </text>
                <DegreesFull />
                <RoseFull TRANSITION_TIME={TRANSITION_TIME} rotation={angles.heading} />
                <DoubleSphere pitch={angles.pitch} roll={angles.roll} TRANSITION_TIME={TRANSITION_TIME} />
            </svg>
        </>
    );
}