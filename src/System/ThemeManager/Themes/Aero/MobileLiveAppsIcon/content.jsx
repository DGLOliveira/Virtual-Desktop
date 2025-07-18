import "./style.css";
export default function Icon({ isActive, darkMode }) {

  return (
    <svg className="liveAppsButtonAero"  width="400" height="400" viewBox="0 0 400 400"
      fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className="hex combMagenta"
        d="M55.6543 202H128.344L164.689 264.953L128.345 327.904H55.6543L19.3096 264.952L55.6543 202Z"
        style={{
          fill: "#FF00FFFF",
          scale: isActive ? "1" : "0.75",
          transition: "fill 0.3s ease-in-out, scale 0.3s ease-in-out"
        }}
        stroke="#808080"
        strokeWidth="8" />
      <path
        className="hex combBlue"
        d="M163.654 262.048H236.345L272.689 325L236.345 387.952H163.654L127.31 325L163.654 262.048Z"
        style={{
          fill: "#0000FFFF",
          scale: isActive ? "1" : "0.75",
          transition: "fill 0.3s ease-in-out, scale 0.3s ease-in-out"
        }}
        stroke="#808080"
        strokeWidth="8" />
      <path
        className="hex combYellow"
        d="M163.654 12.0479H236.345L272.689 75L236.345 137.952H163.654L127.31 75L163.654 12.0479Z"
        style={{
          fill:"#FFFF00FF",
          scale: isActive ? "1" : "0.75",
          transition: "fill 0.3s ease-in-out, scale 0.3s ease-in-out"
        }}
        stroke="#808080"
        strokeWidth="8" />
      <path
        className="hex combGreen"
        d="M271.654 75.0479H344.345L380.689 138L344.345 200.952H271.654L235.31 138L271.654 75.0479Z"
        style={{
          fill: "#00FF00FF",
          scale: isActive ? "1" : "0.75",
          transition: "fill 0.3s ease-in-out, scale 0.3s ease-in-out"
        }}
        stroke="#808080"
        strokeWidth="8" />
      <path
        className="hex combRed"
        d="M55.6543 75.0479H128.345L164.689 138L128.345 200.952H55.6543L19.3096 138L55.6543 75.0479Z"
        style={{
          fill: "#FF0000FF",
          scale: isActive ? "1" : "0.75",
          transition: "fill 0.3s ease-in-out, scale 0.3s ease-in-out"
        }}
        stroke="#808080"
        strokeWidth="8" />
      <path
        className="hex combCyan"
        d="M271.655 202H344.344L380.689 264.953L344.345 327.904H271.654L235.31 264.953L271.655 202Z"
        style={{
          fill: "#00FFFFFF",
          scale: isActive ? "1" : "0.75",
          transition: "fill 0.3s ease-in-out, scale 0.3s ease-in-out"
        }}
        stroke="#808080"
        strokeWidth="8" />
      <path
        className={darkMode ? "hex combWhite" : "hex combBlack"}
        d="M163.654 137.048H236.345L272.689 200L236.345 262.952H163.654L127.31 200L163.654 137.048Z"
        style={{
          fill: darkMode ? "#FFFFFFFF" : "#000000FF",
          scale: isActive ? "1" : "0.75",
          transition: "fill 0.3s ease-in-out, scale 0.3s ease-in-out"
        }}
        stroke="#808080"
        strokeWidth="8" />
    </svg>

  );

}