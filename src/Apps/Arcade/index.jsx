import React, { useEffect, useState, useRef } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import Controls from "./Controls/Keyboard.js";
import Breakout from "./Games/Breakout/Breakout.js";
import Snake from "./Games/Snake/Snake.js";
import SpaceInvaders from "./Games/Space Invaders/SpaceInvaders.js";
import { handleAction } from "./Handlers/handleAction.js";
import { handleTopMenu } from "./Handlers/handleTopMenu.js";
import { KeybindDialog } from "./Components/KeybindDialog.jsx";
import "./style.css";

export default function Arcade({ isSelected, action, setAction, appMenu, setAppMenu, appDialog, setAppDialog, contextMenu }) {
  const canvasContainer = useRef();
  const [keyboard, setKeyboard] = useState({
    up: { keys: ["w", "W", "ArrowUp"], active: true },
    down: { keys: ["s", "S", "ArrowDown"], active: true },
    left: { keys: ["a", "A", "ArrowLeft"], active: true },
    right: { keys: ["d", "D", "ArrowRight"], active: true },
    one: { keys: ["1"], active: false },
    two: { keys: ["2"], active: false },
    pause: { keys: ["p", "P", "Pause"], active: true },
  });
  const controls = Controls(isSelected, keyboard);
  const [gameState, setGameState] = useState("Start");
  const [gameChoice, setGameChoice] = useState("None");
  const [playButtonFlag, setPlayButtonFlag] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [showScoreboard, setShowScoreboard] = useState(true);
  const [showKeybindDialog, setShowKeybindDialog] = useState(false);
  const [scoreboard, setScoreboard] = useState({
    time: 0,
    score: 0,
    gameState: "Start",
  });
  const updateScoreboard = (scoreboard) => {
    setScoreboard(scoreboard);
  };

  const handleScreenButton = (key, state, repeat) => {
    document.dispatchEvent(new KeyboardEvent(state, { key: keyboard[key].keys[0], repeat: repeat }),)
  };

  const handleContextMenu = (event, target) => {
    let content = {};
    event.preventDefault();
    if (target === "keypad") {
      content = {
        "Hide": {action: () => { setShowControls(false);} },
      }
    } else if (target === "scoreboard") {
      content = {
        "Hide": {action: () => { setShowScoreboard(false);} },
      }
    } else if (target === "canvas") {
      if (gameChoice !== "None") {
        let playpause = gameState === "Play" ? "Pause" : "Play";
        content = {
          "Play/Pause": {action: () => { setGameState(playpause);} },
          "New Game": {action: () => { setGameState("Restart");} },
        }
      }
    }
    contextMenu.setOpen();
    contextMenu.setPosition(event.clientX, event.clientY);
    contextMenu.setContent(content);
  };

  useEffect(() => {
    if (gameState === "Play") {
      setPlayButtonFlag(false);
    } else {
      setPlayButtonFlag(true);
    }
  }, [gameState]);

  useEffect(() => {
    const args = {
      gameState: gameState,
      setGameState: setGameState,
      showControls: showControls,
      setShowControls: setShowControls,
      showScoreboard: showScoreboard,
      setShowScoreboard: setShowScoreboard,
      showKeybindDialog: showKeybindDialog, 
      setShowKeybindDialog: setShowKeybindDialog
    }
    handleAction(action, setAction, appDialog, setAppDialog, args);
  }, [action]);

  useEffect(() => {
    const args = {
      gameState: gameState,
      showControls: showControls,
      showScoreboard: showScoreboard,
      gameChoice: gameChoice
    };
    handleTopMenu(appMenu, setAppMenu, args);
  }, [gameState, gameChoice, showControls, showScoreboard]);

  return (
    <div id="arcadeContainer">
      <select
        id="gameMenu"
        onChange={(e) => {
          setGameChoice(e.target.value);
          setGameState("Start");
        }}
      >
        <option value="None" >Select Game</option>
        <option value="Snake">Snake</option>
        <option value="Breakout">Breakout</option>
        <option value="Space Invaders">Space Invaders</option>
      </select>
      {showScoreboard &&
        <div id="arcadeScoreboard"
          onContextMenu={(e) => handleContextMenu(e, "scoreboard")}
        >
          <div id="arcadeScore">
            Time: {scoreboard.time} seconds
            <br />
            Score: {scoreboard.score}
            <br />
          </div>
          <div
            id="arcadePlayButton"
            className="arcadeButton"
            onClick={() => {
              handleScreenButton("pause", "keydown", false);
              setTimeout(() => handleScreenButton("pause", "keyup", false), 50);
            }}
          >
            {playButtonFlag ? <BsFillPlayFill /> : <BsPauseFill />}
          </div>
        </div>}
      <div
        id="arcadeCanvasContainer"
        ref={canvasContainer}
        onContextMenu={(e) => handleContextMenu(e, "canvas")}
      >
        {gameChoice === "Snake" ? (
          <Snake controls={controls} updateScoreboard={updateScoreboard} isSelected={isSelected} gameState={gameState} setGameState={setGameState} />
        ) : gameChoice === "Breakout" ? (
          <Breakout controls={controls} updateScoreboard={updateScoreboard} isSelected={isSelected} gameState={gameState} setGameState={setGameState} />
        ) :
          gameChoice === "Space Invaders" ? (
            <SpaceInvaders controls={controls} updateScoreboard={updateScoreboard} isSelected={isSelected} gameState={gameState} setGameState={setGameState} />
          ) : (
            <></>
          )}
      </div>
      {showControls &&
        <div id="arcadeControls"
          onContextMenu={(e) => handleContextMenu(e, "keypad")}
        >
          <div
            id="arcadeLeftButton"
            className={controls.left ? "arcadeButton arcadeButtonOn" : "arcadeButton"}
            onMouseDown={() => handleScreenButton("left", "keydown", true)}
            onMouseUp={() => handleScreenButton("left", "keyup", true)}
            onTouchStart={() => handleScreenButton("left", "keyup", true)}
            onTouchEnd={() => handleScreenButton("left", "keyup", true)}
          >
            <FaArrowLeft />
          </div>
          <div id="arcadeVerticalControls">
            <div
              id="arcadeUpButton"
              className={controls.up ? "arcadeButton arcadeButtonOn" : "arcadeButton"}
              onMouseDown={() => handleScreenButton("up", "keydown", true)}
              onMouseUp={() => handleScreenButton("up", "keyup", true)}
              onTouchStart={() => handleScreenButton("up", "keyup", true)}
              onTouchEnd={() => handleScreenButton("up", "keyup", true)}
            >
              <FaArrowUp />
            </div>
            <div
              id="arcadeDownButton"
              className={controls.down ? "arcadeButton arcadeButtonOn" : "arcadeButton"}
              onMouseDown={() => handleScreenButton("down", "keydown", true)}
              onMouseUp={() => handleScreenButton("down", "keyup", true)}
              onTouchStart={() => handleScreenButton("down", "keyup", true)}
              onTouchEnd={() => handleScreenButton("down", "keyup", true)}
            >
              <FaArrowDown />
            </div>
          </div>
          <div
            id="arcadeRightButton"
            className={controls.right ? "arcadeButton arcadeButtonOn" : "arcadeButton"}
            onMouseDown={() => handleScreenButton("right", "keydown", true)}
            onMouseUp={() => handleScreenButton("right", "keyup", true)}
            onTouchStart={() => handleScreenButton("right", "keyup", true)}
            onTouchEnd={() => handleScreenButton("right", "keyup", true)}
          >
            <FaArrowRight />
          </div>
        </div>}
        <KeybindDialog
          showKeybindDialog={showKeybindDialog}
          setShowKeybindDialog={setShowKeybindDialog}
          setAppDialog={setAppDialog}
          keyboard={keyboard}
          setKeyboard={setKeyboard}
          />
    </div>
  );
};
