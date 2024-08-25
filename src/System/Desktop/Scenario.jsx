import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo, useContext, Suspense } from "react";
import { BackgroundContext } from "./BackgroundContext.js";
import { OrbitControls, Plane, Stars, Sky } from "@react-three/drei";
import { extend, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Water } from "three-stdlib";
import * as WaterNormals from "./Textures/waternormals.jpeg";
import * as HillsNormals from "./Textures/DesertNormal.png";
import * as SandTexture from "./Textures/SandTexture1.jpg";

extend({ Water });

export default function Scenario() {
  const background = useContext(BackgroundContext);
  const Ocean = () => {
    const ref = useRef();
    const gl = useThree((state) => state.gl);
    const waterNormals = useLoader(THREE.TextureLoader, WaterNormals.default);
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
    const geom = useMemo(() => new THREE.PlaneGeometry(1500, 1500), []);
    const config = useMemo(
      () => ({
        textureWidth: 1036,
        textureHeight: 1036,
        waterNormals,
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 0.8,
        fog: true,
        format: gl.encoding,
      }),
      [waterNormals],
    );
    useFrame(
      (state, delta) => (ref.current.material.uniforms.time.value += delta),
    );
    return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />;
  };

  const Desert = () => {
    const ref = useRef();
    const hillsNormals = useLoader(THREE.TextureLoader, HillsNormals.default);
    hillsNormals.wrapS = hillsNormals.wrapT = THREE.ClampToEdgeWrapping;
    const sandTexture = useLoader(THREE.TextureLoader, SandTexture.default);
    sandTexture.wrapS = sandTexture.wrapT = THREE.RepeatWrapping;
    sandTexture.repeat.set(100, 100);
    return <Plane ref={ref} position={[0, -15, 0]} args={[1500, 1500, 150, 150]} rotation-x={-Math.PI / 2}>
      <meshStandardMaterial
        color="white"
        metalness={0.5}
        roughness={0.8}
        map={sandTexture}
        normalMap={hillsNormals}
        normalScale={new THREE.Vector2(0.8, 0.8)}
        displacementMap={hillsNormals}
        displacementScale={50} />
    </Plane>;
  };

  return (
    <Canvas
      style={{
        position: "absolute",
        top: "0",
        left: "0",
      }}
      dpr={window.devicePixelRatio}
      camera={{ position: [0, 25, 10], near: 2 }}
    >
      {background.state["scenario"]["fog"].isActive &&
        <fog
          attach="fog"
          color={background.state["scenario"]["fog"].color}
          near={background.state["scenario"]["fog"].near}
          far={background.state["scenario"]["fog"].far}
        />}
      <OrbitControls target={[0, 25, 0]} />
      <Suspense fallback={null}>
        {background.state["scenario"]["sun"].isActive &&
          <Sky
            distance={450000}
            inclination={background.state["scenario"]["sun"].inclination}
            azimuth={background.state["scenario"]["sun"].azimuth}
            rayleigh={background.state["scenario"]["sun"].rayleight}
            turbidity={background.state["scenario"]["sun"].turbidity}
            exposure={background.state["scenario"]["sun"].exposure}
          />}
      </Suspense>
      <Suspense fallback={null}>
        {background.state["scenario"]["stars"].isActive &&
          <Stars
            radius={440}
            count={background.state["scenario"]["stars"].count}
          />}
      </Suspense>
      {background.state["scenario"]["directionalLight"].isActive &&
        <pointLight
          color={background.state["scenario"]["directionalLight"].color}
          intensity={background.state["scenario"]["directionalLight"].intensity}
          position={[0, 10000, -1500]}
        />}
      {background.state["scenario"]["ambientLight"].isActive &&
        <ambientLight
          intensity={background.state["scenario"]["ambientLight"].intensity}
          color={background.state["scenario"]["ambientLight"].color}
        />}
      <Suspense fallback={null}>
        {background.state["scenario"]["ocean"].isActive && <Ocean />}
      </Suspense>
      <Suspense fallback={null}>
        {background.state["scenario"]["desert"].isActive && <Desert />}
      </Suspense>
    </Canvas>
  );
};
