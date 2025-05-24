import { useState, useEffect } from "react";
import handleAction from "./Handlers/handleAction.js";
import handleTopMenu from "./Handlers/handleTopMenu.js";
import DegreesFull from "./Components/Degrees/DegreesFull.jsx";
import RoseFull from "./Components/Pointers/RoseFull.jsx";
import RoseSimple from "./Components/Pointers/RoseSimple.jsx";
import MagnetPointer from "./Components/Pointers/MagnetPointer.jsx";
import Arrow from "./Components/Pointers/Arrow.jsx";
import Modern from "./Components/Pointers/Modern.jsx";
import DoubleSphere from "./Components/RollPitch/DoubleSphere.jsx";
import Target from "./Components/RollPitch/Target.jsx";
import Bubble from "./Components/RollPitch/Bubble.jsx";
import "./style.css";

export default function Compass(props) {
    const action = props.action;
    const setAction = props.setAction;
    const appMenu = props.appMenu;
    const setAppMenu = props.setAppMenu;
    const [state, setState] = useState("ready");
    const [style, setStyle] = useState({
        degrees: "DegreesFull",
        pointer: "RoseFull",
        rollpitch: "DoubleSphere"
    });
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

    const pointerProps = { 
        TRANSITION_TIME: TRANSITION_TIME, 
        rotation: angles.heading + angles.cumulativeRotation 
    };
    const POINTERS_COMPONENTS = {
        RoseFull: <RoseFull {...pointerProps} />,
        RoseSimple: <RoseSimple {...pointerProps} />,
        MagnetPointer: <MagnetPointer {...pointerProps} />,
        Arrow: <Arrow {...pointerProps} />,
        Modern: <Modern {...pointerProps} />
    };

    const rollPitchProps = { 
        pitch: angles.pitch, 
        roll: angles.roll,  
        TRANSITION_TIME: TRANSITION_TIME
    };
    const ROLLPITCH_COMPONENTS = {
        DoubleSphere: <DoubleSphere {...rollPitchProps} />,
        Target: <Target {...rollPitchProps} />,
        Bubble: <Bubble {...rollPitchProps} />
    };

    const DEGREES_COMPONENTS = {
        DegreesFull: <DegreesFull />,
    };

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
    };

    // start absolute orientation sensors
    function runSensors() {
        const options = { frequency: SENSOR_UPDATE_FREQUENCY, referenceFrame: "device" };
        sensor = new AbsoluteOrientationSensor(options);
        sensor.start();
        console.log("sensor started");
        sensor.onreading = () => {
        console.log(sensor);
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
        console.log(heading, pitch, roll, cumulativeRotation);
        }
    };

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
                console.log("stopped sensor");
            }
        }
    });

    const args = {
        style: style,
        setStyle: setStyle,
    };
    useEffect(() => {
        handleAction(action, setAction, args);
    },[action]);
    useEffect(() => {
        handleTopMenu(appMenu, setAppMenu, args);
    },[style]);

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
                    {(angles.heading * 180 / Math.PI).toFixed(2)}°
                </text>
                {DEGREES_COMPONENTS[style.degrees]}
                {POINTERS_COMPONENTS[style.pointer]}
                {ROLLPITCH_COMPONENTS[style.rollpitch]}
            </svg>
        </>
    );
}