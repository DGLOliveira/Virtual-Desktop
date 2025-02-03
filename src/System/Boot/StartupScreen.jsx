import { useState, useEffect, useRef } from "react";
import faviconLight from "./Assets/faviconLight.ico";
import faviconDark from "./Assets/faviconDark.ico";
import "./StartupScreen.css";


//App loading Screen utilizing an animated logo using svg

const COLOR_SCHEME = {
    "light": {
      background: "#FFFFFF",
      outline: "#808080",
      primary: ["#FF00FF", "#00FFFF", "#FFFF00",]
    },
    "dark": {
      background: "#000000",
      outline: "#808080",
      primary: ["#FF0000", "#00FF00", "#0000FF"]
    }
  }
export default function StartupScreen() {
    //State to store current theme, to change favicon and logo color
    //Will eventually be moved elsewhere
    const [theme, setTheme] = useState("light");
    //Changes favicon on theme change
    useEffect(() => {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      if (theme === "light") {
        link.href = faviconLight;
      }
      else {
        link.href = faviconDark;
      }
    }, [theme]);
  
    //Gets user current theme 
    useEffect(() => {
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? setTheme("dark")
        : setTheme("light");
    }, []);

    return (
        <div style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", background: COLOR_SCHEME[theme].background, cursor: "wait" }}>
            <div style={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", top: "50%", left: "50%", transform: "translate(-50%,-50%)", color: "white", fontFamily: "monospace" }}>
                <svg className="combined-animation" width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="hex hex1" style={{ mixBlendMode: theme === "light" ? "multiply" : "screen" }} d="M41.0481 108.077L105 71.1547L168.952 108.077V181.923L105 218.845L41.0481 181.923V108.077Z" fill={COLOR_SCHEME[theme].primary[0]} stroke={COLOR_SCHEME[theme].outline} stroke-width="4" />
                    <path className="hex hex2" style={{ mixBlendMode: theme === "light" ? "multiply" : "screen" }} d="M231.048 108.077L295 71.1547L358.952 108.077V181.923L295 218.845L231.048 181.923V108.077Z" fill={COLOR_SCHEME[theme].primary[1]} stroke={COLOR_SCHEME[theme].outline} stroke-width="4" />
                    <path className="hex hex3" style={{ mixBlendMode: theme === "light" ? "multiply" : "screen" }} d="M136.048 273.077L200 236.155L263.952 273.077V346.923L200 383.845L136.048 346.923V273.077Z" fill={COLOR_SCHEME[theme].primary[2]} stroke={COLOR_SCHEME[theme].outline} stroke-width="4" />
                    <path className="axis" d="M200 200L200 60" stroke={COLOR_SCHEME[theme].outline} stroke-width="4" />
                    <path className="axis" d="M200 200L78.7564 270" stroke={COLOR_SCHEME[theme].outline} stroke-width="4" />
                    <path className="axis" d="M200 200L321.244 270" stroke={COLOR_SCHEME[theme].outline} stroke-width="4" />
                </svg>
                <h1 style={{color: theme === "light" ? "black" : "white"}}>{"Loading"}</h1>
                <p style={{color: theme === "light" ? "black" : "white"}}>Please Wait</p>
            </div>
        </div>
    );
}