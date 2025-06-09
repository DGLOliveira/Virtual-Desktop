import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import GyroscopeObject from "../Assets/Gyroscope.glb";
export default function Gyro({ state, angles }) {
    const object = useGLTF(GyroscopeObject);
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
    useFrame((stt, delta) => {
        if (state === "running") {
            accDelta += delta * 10;
        }
        if (externalGimbal !== undefined && internalGimbal !== undefined && axis !== undefined) {
            let alpha, beta;
            let gama = accDelta;
            if (angles.screenOrientationAngle === 90) {
                alpha = -angles.roll + Math.PI;
                beta = angles.pitch + Math.PI / 2;
            } else if (angles.screenOrientationAngle === 270) {
                alpha = angles.roll - Math.PI;
                beta = -angles.pitch + Math.PI / 2;
            } else if (angles.screenOrientationAngle === 0) {
                alpha = angles.pitch + Math.PI;
                beta = angles.roll + Math.PI / 2;
            } else {
                alpha = angles.pitch + Math.PI;
                beta = -angles.roll + Math.PI / 2;
            }
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
    return <primitive object={object.scene} scale={1.6} />
}