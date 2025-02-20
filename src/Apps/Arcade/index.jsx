import React, { useEffect, useState, useRef } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { BsFillPlayFill, BsPauseFill, BsEjectFill, BsZoomIn, BsZoomOut } from "react-icons/bs";
import Controls from "./Controls/Keyboard.js";
import MainMenu from "./Components/MainMenu.js";
import Breakout from "./Games/Breakout/Breakout.js";
import Snake from "./Games/Snake/Snake.js";
import SpaceInvaders from "./Games/Space Invaders/SpaceInvaders.js";
import { handleAction } from "./Handlers/handleAction.js";
import { handleTopMenu } from "./Handlers/handleTopMenu.js";
import { KeybindDialog } from "./Components/KeybindDialog.jsx";
import "./style.css";

export default function Arcade(props) {
  const isSelected = props.isSelected;
  const action = props.action;
  const setAction = props.setAction;
  const appDialog = props.appDialog;
  const setAppDialog = props.setAppDialog;
  const appMenu = props.appMenu;
  const setAppMenu = props.setAppMenu;
  const contextMenu = props.contextMenu;

  const canvasContainer = useRef();
  const [keyboard, setKeyboard] = useState({
    up: { keys: ["w", "W", "ArrowUp"], active: true },
    down: { keys: ["s", "S", "ArrowDown"], active: true },
    left: { keys: ["a", "A", "ArrowLeft"], active: true },
    right: { keys: ["d", "D", "ArrowRight"], active: true },
    one: { keys: ["1"], active: true },
    two: { keys: ["2"], active: true },
    pause: { keys: ["p", "P", "Pause"], active: true },
    eject: { keys: ["Escape"], active: true },
  });
  const controls = Controls(isSelected, keyboard);
  const [gameState, setGameState] = useState("Start");
  const [gameChoice, setGameChoice] = useState("None");
  const [canvasZoom, setCanvasZoom] = useState(1);
  const [playButtonFlag, setPlayButtonFlag] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [showKeybindDialog, setShowKeybindDialog] = useState(false);
  const handleScreenButton = (key, state, repeat) => {
    document.dispatchEvent(new KeyboardEvent(state, { key: keyboard[key].keys[0], repeat: repeat }),)
  };

  const handleTouchEvent = (event, target) => {
    if (event.type === "touchstart") {
      controls[target] = true;
    }
    else if (event.type === "touchend") {
      controls[target] = false;
    }
    else if (event.type === "touchcancel") {
      controls[target] = false;
    }
    else if (event.type === "touchmove") {
      Object.values(event.touches).forEach((t) => {
        let keys = [];
        let pos = { x: t.clientX, y: t.clientY };
        let boundingRects = {
          up: document.getElementById("arcadeButtonUp").getBoundingClientRect(),
          down: document.getElementById("arcadeButtonDown").getBoundingClientRect(),
          left: document.getElementById("arcadeButtonLeft").getBoundingClientRect(),
          right: document.getElementById("arcadeButtonRight").getBoundingClientRect(),
          one: document.getElementById("arcadeButtonA").getBoundingClientRect(),
          two: document.getElementById("arcadeButtonB").getBoundingClientRect(),
        };
        Object.keys(boundingRects).forEach((key) => {
          if (pos.x >= boundingRects[key].x && pos.x <= boundingRects[key].x + boundingRects[key].width && pos.y >= boundingRects[key].y && pos.y <= boundingRects[key].y + boundingRects[key].height) {
            keys.push(key);
          }
        })
        Object.keys(keyboard).forEach((key) => {
          if (keys.includes(key)) {
            controls[key] = true;
          } else {
            controls[key] = false;
          }
        })
      })
    }
  };

  const handleContextMenu = (event, target) => {
    let content = {};
    event.preventDefault();
    if (target === "keypad") {
      content = {
        "Hide": { action: () => { setShowControls(false); } },
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

  useEffect(()=>{
    if(controls.eject){
      setGameChoice("None");
      setGameState("Start");
    }
  },[controls.eject])

  useEffect(() => {
    const args = {
      gameState: gameState,
      setGameState: setGameState,
      showControls: showControls,
      setShowControls: setShowControls,
      showKeybindDialog: showKeybindDialog,
      setShowKeybindDialog: setShowKeybindDialog
    }
    handleAction(action, setAction, appDialog, setAppDialog, args);
  }, [action]);

  useEffect(() => {
    const args = {
      gameState: gameState,
      showControls: showControls,
      gameChoice: gameChoice
    };
    handleTopMenu(appMenu, setAppMenu, args);
  }, [gameState, gameChoice, showControls]);

  return (
    <div id="arcadeContainer">
      <div
        id="arcadeCanvasContainer" 
        style={{ transform: `scale(${canvasZoom})` }}
        ref={canvasContainer}
        onContextMenu={(e) => handleContextMenu(e, "canvas")}
      >
        {gameChoice === "None" ?
          <MainMenu controls={controls} setGameChoice={setGameChoice} setGameState={setGameState} canvasZoom={canvasZoom} /> :
          gameChoice === "Snake" ? (
            <Snake controls={controls} isSelected={isSelected} gameState={gameState} setGameState={setGameState} canvasZoom={canvasZoom} />
          ) :
            gameChoice === "Breakout" ? (
              <Breakout controls={controls} isSelected={isSelected} gameState={gameState} setGameState={setGameState} canvasZoom={canvasZoom} />
            ) :
              gameChoice === "Space Invaders" ? (
                <SpaceInvaders controls={controls} isSelected={isSelected} gameState={gameState} setGameState={setGameState} canvasZoom={canvasZoom} />
              ) : (
                <></>
              )}
      </div>
      {showControls &&
        <>
          <div id="arcadeZoomControls">
            <div
              id="arcadeZoomInButton"
              className="arcadeButton arcadeButtonOff"
              onClick={() => {if(canvasZoom < 2) {setCanvasZoom(canvasZoom + 0.1)}}}
            >
              <BsZoomIn />
            </div>
            <div
              id="arcadeZoomOutButton"
              className="arcadeButton arcadeButtonOff"
              onClick={() => {if(canvasZoom > 0.1) {setCanvasZoom(canvasZoom - 0.1)}}}
            >
              <BsZoomOut />
            </div>
          </div>
          <div id="arcadeStateControls">
            <div
              id="arcadeEjectButton"
              className="arcadeButton arcadeButtonOff"
              onClick={() => { setGameChoice("None"); setGameState("Start"); }}
            >
              <BsEjectFill />
            </div>
            <div
              id="arcadePlayButton"
              className="arcadeButton arcadeButtonOff"
              onClick={() => {
                handleScreenButton("pause", "keydown", false);
                setTimeout(() => handleScreenButton("pause", "keyup", false), 50);
              }}
            >
              {playButtonFlag ? <BsFillPlayFill /> : <BsPauseFill />}
            </div>
          </div>
          <div id="arcadeArrowControls">
            <div
              id="arcadeButtonLeft"
              className={controls.left ? "arcadeButton arcadeButtonOn" : "arcadeButton arcadeButtonOff"}
              onMouseDown={() => handleScreenButton("left", "keydown", true)}
              onMouseUp={() => handleScreenButton("left", "keyup", true)}
              onTouchStart={(e) => {e.preventDefault();handleTouchEvent(e, "left")}}
              onTouchMove={(e) => {e.preventDefault();handleTouchEvent(e, "left")}}
              onTouchEnd={(e) => {e.preventDefault();handleTouchEvent(e, "left")}}
              onTouchCancel={(e) => {e.preventDefault();handleTouchEvent(e, "left")}}
            >
              <FaArrowLeft />
            </div>
            <div>
              <div
                id="arcadeButtonUp"
                className={controls.up ? "arcadeButton arcadeButtonOn" : "arcadeButton arcadeButtonOff"}
                onMouseDown={() => handleScreenButton("up", "keydown", true)}
                onMouseUp={() => handleScreenButton("up", "keyup", true)}
                onTouchStart={(e) => {e.preventDefault();handleTouchEvent(e, "up")}}
                onTouchMove={(e) => {e.preventDefault();handleTouchEvent(e, "up")}}
                onTouchEnd={(e) => {e.preventDefault();handleTouchEvent(e, "up")}}
                onTouchCancel={(e) => {e.preventDefault();handleTouchEvent(e, "up")}}
              >
                <FaArrowUp />
              </div>
              <div
                id="arcadeButtonDown"
                className={controls.down ? "arcadeButton arcadeButtonOn" : "arcadeButton arcadeButtonOff"}
                onMouseDown={() => handleScreenButton("down", "keydown", true)}
                onMouseUp={() => handleScreenButton("down", "keyup", true)}
                onTouchStart={(e) => {e.preventDefault();handleTouchEvent(e, "down")}}
                onTouchMove={(e) => {e.preventDefault();handleTouchEvent(e, "down")}}
                onTouchEnd={(e) => {e.preventDefault();handleTouchEvent(e, "down")}}
                onTouchCancel={(e) => {e.preventDefault();handleTouchEvent(e, "down")}}
              >
                <FaArrowDown />
              </div>
            </div>
            <div
              id="arcadeButtonRight"
              className={controls.right ? "arcadeButton arcadeButtonOn" : "arcadeButton arcadeButtonOff"}
              onMouseDown={() => handleScreenButton("right", "keydown", true)}
              onMouseUp={() => handleScreenButton("right", "keyup", true)}
              onTouchStart={(e) => {e.preventDefault();handleTouchEvent(e, "right")}}
              onTouchMove={(e) => {e.preventDefault();handleTouchEvent(e, "right")}}
              onTouchEnd={(e) => {e.preventDefault();handleTouchEvent(e, "right")}}
              onTouchCancel={(e) => {e.preventDefault();handleTouchEvent(e, "right")}}
            >
              <FaArrowRight />
            </div>
          </div>
          <div id="arcadeFireControls">
            <div id="arcadeButtonA"
              className={controls.one ? "arcadeButton arcadeButtonOn" : "arcadeButton arcadeButtonOff"}
              onMouseDown={() => handleScreenButton("one", "keydown", true)}
              onMouseUp={() => handleScreenButton("one", "keyup", true)}
              onTouchStart={(e) => {e.preventDefault();handleTouchEvent(e, "one")}}
              onTouchMove={(e) => {e.preventDefault();handleTouchEvent(e, "one")}}
              onTouchEnd={(e) => {e.preventDefault();handleTouchEvent(e, "one")}}
              onTouchCancel={(e) => {e.preventDefault();handleTouchEvent(e, "one")}}
            >A</div>
            <div id="arcadeButtonB"
              className={controls.two ? "arcadeButton arcadeButtonOn" : "arcadeButton arcadeButtonOff"}
              onMouseDown={() => handleScreenButton("two", "keydown", true)}
              onMouseUp={() => handleScreenButton("two", "keyup", true)}
              onTouchStart={(e) => {e.preventDefault();handleTouchEvent(e, "two")}}
              onTouchMove={(e) => {e.preventDefault();handleTouchEvent(e, "two")}}
              onTouchEnd={(e) => {e.preventDefault();handleTouchEvent(e, "two")}}
              onTouchCancel={(e) => {e.preventDefault();handleTouchEvent(e, "two")}}
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
