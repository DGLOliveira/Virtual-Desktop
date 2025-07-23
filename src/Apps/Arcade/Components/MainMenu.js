import { useState, useEffect } from "react";
import SnakeSplash from "../Games/Snake/SnakeSplash.png";
import BreakoutSplash from "../Games/Breakout/BreakoutSplash.png";
import SpaceInvadersSplash from "../Games/Space Invaders/SpaceInvadersSplash.png";

export default function MainMenu({ controls, setGameState, setGameChoice }) {
    const [currentSelection, setCurrentSelection] = useState(0);
    const gamelist = {
        "Snake": SnakeSplash,
        "Breakout": BreakoutSplash,
        "Space Invaders": SpaceInvadersSplash
    }

    useEffect(() => {
        if(controls.down && currentSelection < Object.keys(gamelist).length - 1) {
            setCurrentSelection(currentSelection + 1);
        }else if(controls.up && currentSelection > 0) {
            setCurrentSelection(currentSelection - 1);
        }else if(controls.one || controls.pause) {
            setGameState("Start");
            setGameChoice(Object.keys(gamelist)[currentSelection]);
        }
    }, [controls]);

    return (
        <div>
        <object id="arcadeMainMenu" width={600} height={400}>
            <div id="arcadeSplashScreen">
                {Object.keys(gamelist).map((name, index) => (
                    index === currentSelection &&
                    <img key={index} src={gamelist[name]}></img>
                ))}
            </div>
            <div id="arcadeGameList">
                {Object.keys(gamelist).map((name, index) => (
                    <div 
                    key={index}
                    style={index === currentSelection ? {background: "deepskyblue", color: "black"} : {background: "black", color: "white"}}
                    onClick={() => setCurrentSelection(index)}>
                        {name}
                    </div>
                ))}
            </div>
        </object>
        </div>
        );
}