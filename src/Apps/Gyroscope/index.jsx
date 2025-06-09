import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import Gyro from "./Components/Gyro.jsx";
import "./style.css";

export default function Gyroscope() {
    const [state, setState] = useState("ready");
    const [angles, setAngles] = useState({
        heading: 0,
        pitch: 0,
        roll: 0,
        screenOrientationAngle: screen.orientation.angle
    });
    var sensor = null;
    var zoom = 50;
    const SENSOR_UPDATE_FREQUENCY = 4; //keep value low to avoid battery drain

    //3D model of Gyroscope

    //converts quaternion to angles in radians
    function quaternionToAngles(x, y, z, w) {
        const heading = Math.atan2(2 * (x * y + z * w), 1 - 2 * (y * y + z * z));
        const pitch = Math.asin(2 * (x * z - w * y));
        const roll = Math.atan2(2 * (x * w + y * z), 1 - 2 * (x * x + y * y));
        return {
            heading: heading,
            pitch: pitch,
            roll: roll,
        };
    };

    //runs gyroscope
    const runGyroscope = () => {
        const options = { frequency: SENSOR_UPDATE_FREQUENCY, referenceFrame: "device" };
        sensor = new RelativeOrientationSensor(options);
        sensor.start();
        console.log("gyroscope started");
        sensor.onreading = () => {
            let newAngles = quaternionToAngles(
                sensor.quaternion[0],
                sensor.quaternion[1],
                sensor.quaternion[2],
                sensor.quaternion[3]
            );
            let newOrientationAngle = screen.orientation.angle;
            setAngles({ ...newAngles, screenOrientationAngle: newOrientationAngle });
        }
    };

    //state machine
    useEffect(() => {
        if (state === "start") {
            if ("AbsoluteOrientationSensor" in window) {
                Promise.all([
                    navigator.permissions.query({ name: "gyroscope" }),
                    navigator.permissions.query({ name: "accelerometer" })
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
            runGyroscope();
        }
    }, [state]);

    useEffect(() => {
        return () => {
            if (sensor) {
                sensor.stop();
                console.log("stopped sensor");
            }
        }
    }, []);

    return (<>
        <Canvas
            id="gyroscopeCanvas"
        >
            <ambientLight intensity={1} />
            <pointLight position={[-10, -10, 10]} intensity={500} />
            <Suspense fallback={null}>
                <Gyro state={state} angles={angles} />
            </Suspense>
            <OrthographicCamera makeDefault={true} zoom={zoom} position={[0, 0, 10]} />
        </Canvas>
        {state === "ready" &&
            <button className="gyroscopeStartButton" onClick={() => setState('start')}>
                Start
            </button>
        }
        {state === "not supported" &&
            <div className="gyroscopeWarning">
                This feature is not supported on your device and/or browser
            </div>
        }
        {state === "not allowed" &&
            <div className="gyroscopeWarning">
                This feature does not have permission to access your device sensors
            </div>
        }
    </>);
}