import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrthographicCamera } from "@react-three/drei";
import GyroscopeObject from "./Assets/Gyroscope.glb";
import "./style.css";
export default function Gyroscope() {
    const [state, setState] = useState("ready");
    const [angles, setAngles] = useState({
        heading: 0,
        pitch: 0,
        roll: 0,
        screenOrientationType: screen.orientation.type,
        screenOrientationAngle: screen.orientation.angle
    });
    var sensor = null;
    const SENSOR_UPDATE_FREQUENCY = 4; //keep value low to avoid battery drain

    //3D model of Gyroscope
    const Gyro = () => {
        const object = useGLTF(GyroscopeObject);
        const ref = useRef();
        let externalGimbal, internalGimbal, axis, rotor;
        object.scene.children.forEach((child) => {
            child.name === "External_Gimbal" ? (externalGimbal = child) : null;
            child.name === "Internal_Gimbal" ? (internalGimbal = child) : null;
            child.name === "Axis" ? (axis = child) : null;
        })
        let accDelta = 0;
        //Animates 3D model
        //Sensor quaternion values cannot be used directly, they must be converted to euler angles in order to use their individual angles
        //Note that euler angles must be converted back to quaternion in order to prevent Gimbal lock
        useFrame((state, delta) => {
            if (state === "running") {
                accDelta += delta * 10;
            }
            if (externalGimbal !== undefined && internalGimbal !== undefined && axis !== undefined) {
                let alpha = angles.roll + Math.PI;
                let beta = angles.pitch + Math.PI / 2 + accDelta;
                let gama = accDelta;
                externalGimbal.quaternion.w = Math.cos(alpha / 2);
                externalGimbal.quaternion.y = Math.sin(alpha / 2);
                externalGimbal.quaternion.x = 0;
                externalGimbal.quaternion.z = 0;
                internalGimbal.quaternion.w = Math.cos(alpha / 2) * Math.cos(beta / 2);
                internalGimbal.quaternion.y = Math.sin(alpha / 2) * Math.cos(beta / 2);
                internalGimbal.quaternion.x = Math.cos(alpha / 2) * Math.sin(beta / 2);
                internalGimbal.quaternion.z = - Math.sin(alpha / 2) * Math.sin(beta / 2);
                axis.quaternion.w = Math.cos(alpha / 2) * Math.cos((beta + Math.PI / 2) / 2) * Math.cos(gama / 2) + Math.sin(alpha / 2) * Math.sin((beta + Math.PI / 2) / 2) * Math.sin(gama / 2);
                axis.quaternion.y = Math.sin(alpha / 2) * Math.cos((beta + Math.PI / 2) / 2) * Math.cos(gama / 2) - Math.cos(alpha / 2) * Math.sin((beta + Math.PI / 2) / 2) * Math.sin(gama / 2);
                axis.quaternion.x = Math.cos(alpha / 2) * Math.sin((beta + Math.PI / 2) / 2) * Math.cos(gama / 2) + Math.sin(alpha / 2) * Math.cos((beta + Math.PI / 2) / 2) * Math.sin(gama / 2);
                axis.quaternion.z = Math.cos(alpha / 2) * Math.cos((beta + Math.PI / 2) / 2) * Math.sin(gama / 2) - Math.sin(alpha / 2) * Math.sin((beta + Math.PI / 2) / 2) * Math.cos(gama / 2);
            }
        })
        return <primitive ref={ref} object={object.scene} scale={1.6} />
    }

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
            let newOrientationType = screen.orientation.type;
            let newOrientationAngle = screen.orientation.angle;
            setAngles({...newAngles, newOrientationType, newOrientationAngle});
            console.log(angles);
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
            }
        }
    },[]);

    return (<>
        <Canvas>
            <ambientLight intensity={1} />
            <pointLight position={[-10, -10, 10]} intensity={500} />
            <Gyro />
            <OrthographicCamera makeDefault={true} zoom={50} position={[0, 0, 10]} />
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