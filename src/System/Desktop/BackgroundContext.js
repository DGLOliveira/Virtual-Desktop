//Allows changing the Desktop Background from the Definitions task, custom scenarios can be found in Data/Backgrounds

import { useState, createContext } from "react";
//TODO: Image upload for background purposes, as well as its aspect ratio
//TODO: Some custom 2D shaders
//TODO: New 3D scenarios such as the classic windows Meadows
//TODO: Allow animated backgrounds to be Static, for performance on mobile devices
export const BackgroundContext = createContext({
  state: {},
  setActive: () => { },
  setColor: () => { },
  setImage: () => { },
  setShader: () => { },
  setScenario: () => { },
});

export function BackgroundProvider({ children }) {
  const [state, setState] = useState({
    active: "color",
    color: {
      type: "color",
      color: "hsl(210, 100%, 34%)",
      gradient: {
        type: "linear",
        degree: 0,
        color1: "#000000",
        color2: "#000000",
      },
    },
    image: {
      url: {},
      position: "top left",
      size: "auto",
      repeat: "no-repeat",
    },
    shader: { type: "none" },
    scenario: {
      stars: {
        isActive: true,
        count: 5000
      },
      sun: {
        isActive: true,
        azimuth: 0.25,
        inclination: 0.55,
        turbidity: 0.3,
        rayleight: 0.1,
        exposure: 200
      },
      clouds: { isActive: false },
      fog: {
        isActive: true,
        color: "hsl(0, 0%, 100%)",
        near: 100,
        far: 1000
      },
      ocean: {
        isActive: true,
        color: 0x001e0f
      },
      desert: {
        isActive: true,
        color: 0xffffff
      },
      ambientLight:{
        isActive: true,
        intensity: 1,
        color: "hsl(0, 0%, 100%)"
      },
      directionalLight: {
        isActive: true,
        intensity: 200000000,
        color: "hsl(0, 0%, 100%)"
      }
    },
  });

  function setActive(type) {
    switch (type) {
      case "color":
        setState({
          ...state,
          active: "color",
        });
        break;
      case "image":
        setState({
          ...state,
          active: "image",
        });
        break;
      case "shader":
        setState({
          ...state,
          active: "shader",
        });
        break;
      case "scenario":
        setState({
          ...state,
          active: "scenario",
        });
        break;
      default:
        break;
    }
  }

  function setColor(type, value) {
    switch (type) {
      case "color":
        setState({
          ...state,
          color: {
            type: "color",
            color: value,
          },
        });
        break;
      case "gradient":
        setState({
          ...state,
          color: {
            type: "gradient",
            gradient: value,
          },
        });
        break;
      default:
        break;
    }
  }
  function setImage(url, position, size, repeat) {
    setState({
      ...state,
      image: {
        ...state.image,
        url: url,
        position: position,
        size: size,
        repeat: repeat
      },
    },
    );
  }
  function setScenario(arg1, arg2, value) {
    if (arg2 != undefined) {
      setState({
        ...state,
        scenario: {
          ...state.scenario,
          [arg1]: {
            ...state.scenario[arg1],
            [arg2]: value,
          },
        },
      });
    }
  }
  const contextValue = {
    state,
    setActive,
    setColor,
    setImage,
    setScenario,
  };
  return (
    <BackgroundContext.Provider value={contextValue}>
      {children}
    </BackgroundContext.Provider>
  );
}

export default BackgroundProvider;
