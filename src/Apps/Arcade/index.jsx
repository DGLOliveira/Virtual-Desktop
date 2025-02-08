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

  const handleTouchEvent = (event, target) => {
    event.preventDefault();
    if (event.type === "touchstart") {
      controls[target] = true;
    }
    else if (event.type === "touchend") {
      controls[target] = false;
    }
    else if (event.type === "touchcancel") {
      controls[target] = false;
    }
    else if (event.type === "touchmove") { }
  };

  const handleContextMenu = (event, target) => {
    let content = {};
    event.preventDefault();
    if (target === "keypad") {
      content = {
        "Hide": { action: () => { setShowControls(false); } },
      }
    } else if (target === "scoreboard") {
      content = {
        "Hide": { action: () => { setShowScoreboard(false); } },
      }
    } else if (target === "canvas") {
      if (gameChoice !== "None") {
        let playpause = gameState === "Play" ? "Pause" : "Play";
        content = {
          "Play/Pause": { action: () => { setGameState(playpause); } },
          "New Game": { action: () => { setGameState("Restart"); } },
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
        <>
          <div id="arcadeArrowControls"
          >
            <div
              id="arcadeLeftButton"
              className={controls.left ? "arcadeButton arcadeButtonOn" : "arcadeButton"}
              onMouseDown={() => handleScreenButton("left", "keydown", true)}
              onMouseUp={() => handleScreenButton("left", "keyup", true)}
              onTouchStart={(e) => handleTouchEvent(e, "left")}
              onTouchMove={(e) => handleTouchEvent(e, "left")}
              onTouchEnd={(e) => handleTouchEvent(e, "left")}
              onTouchCancel={(e) => handleTouchEvent(e, "left")}
            >
              <FaArrowLeft />
            </div>
            <div id="arcadeVerticalControls">
              <div
                id="arcadeUpButton"
                className={controls.up ? "arcadeButton arcadeButtonOn" : "arcadeButton"}
                onMouseDown={() => handleScreenButton("up", "keydown", true)}
                onMouseUp={() => handleScreenButton("up", "keyup", true)}
                onTouchStart={(e) => handleTouchEvent(e, "up")}
                onTouchMove={(e) => handleTouchEvent(e, "up")}
                onTouchEnd={(e) => handleTouchEvent(e, "up")}
                onTouchCancel={(e) => handleTouchEvent(e, "up")}
              >
                <FaArrowUp />
              </div>
              <div
                id="arcadeDownButton"
                className={controls.down ? "arcadeButton arcadeButtonOn" : "arcadeButton"}
                onMouseDown={() => handleScreenButton("down", "keydown", true)}
                onMouseUp={() => handleScreenButton("down", "keyup", true)}
                onTouchStart={(e) => handleTouchEvent(e, "down")}
                onTouchMove={(e) => handleTouchEvent(e, "down")}
                onTouchEnd={(e) => handleTouchEvent(e, "down")}
                onTouchCancel={(e) => handleTouchEvent(e, "down")}
              >
                <FaArrowDown />
              </div>
            </div>
            <div
              id="arcadeRightButton"
              className={controls.right ? "arcadeButton arcadeButtonOn" : "arcadeButton"}
              onMouseDown={() => handleScreenButton("right", "keydown", true)}
              onMouseUp={() => handleScreenButton("right", "keyup", true)}
              onTouchStart={(e) => handleTouchEvent(e, "right")}
              onTouchMove={(e) => handleTouchEvent(e, "right")}
              onTouchEnd={(e) => handleTouchEvent(e, "right")}
              onTouchCancel={(e) => handleTouchEvent(e, "right")}
            >
              <FaArrowRight />
            </div>
          </div>
          <div id="arcadeFireControls">
            <div id="arcadeFireAButton" 
              className={controls.one ? "arcadeButton arcadeButtonOn" : "arcadeButton"}
              onMouseDown={() => handleScreenButton("one", "keydown", true)}
              onMouseUp={() => handleScreenButton("one", "keyup", true)}
              onTouchStart={(e) => handleTouchEvent(e, "one")}
              onTouchMove={(e) => handleTouchEvent(e, "one")}
              onTouchEnd={(e) => handleTouchEvent(e, "one")}
              onTouchCancel={(e) => handleTouchEvent(e, "one")}
            >A</div>
              <div id="arcadeFireBButton" 
                className={controls.two ? "arcadeButton arcadeButtonOn" : "arcadeButton"}
                onMouseDown={() => handleScreenButton("two", "keydown", true)}
                onMouseUp={() => handleScreenButton("two", "keyup", true)}
                onTouchStart={(e) => handleTouchEvent(e, "two")}
                onTouchMove={(e) => handleTouchEvent(e, "two")}
                onTouchEnd={(e) => handleTouchEvent(e, "two")}
                onTouchCancel={(e) => handleTouchEvent(e, "two")}
              >B</div>
          </div>
        </>
      }
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
