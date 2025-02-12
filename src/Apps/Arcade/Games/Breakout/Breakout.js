import React, { useState, useRef, useEffect } from "react";
import LevelsJSON from "./Breakout_Maps.json";
import { handleCanvasBorders } from "../../Handlers/handleCanvasBorders.js";

const frequency = 60; //Hertz
const frameRate = 1000 / frequency; // frames / milisecond
const rows = 30;
const cols = 30;
const defaultPlayerBar = {
  x: 12,
  y: 27,
  w: 6,
  speed: 0.25,
};
const defaultBall = {
  x: 15,
  y: 50,
  r: 0.5,
  dirX: 0.25,
  dirY: -0.25,
};
const defaultFirework = {
  x: 15,
  y: 52,
  r: 0.25,
  dirX: 0,
  dirY: -0.25,
  t: -5,
  color: "",
};
export default function Breakout({ controls, updateScoreboard, isSelected, gameState, setGameState }) {
  const canvasRef = useRef(null);
  const [Maps, setMaps] = useState(JSON.parse(JSON.stringify(LevelsJSON))); //Only way to deep copy nested objects without external dependency
  const [gameLevel, setGameLevel] = useState(0);
  const [currLevel, setCurrLevel] = useState(Maps[gameLevel]);
  const [levelHealth, setLevelHealth] = useState(currLevel.Bars);
  const [frameCount, setFrameCount] = useState(0);
  const [winFrameCount, setWinFrameCount] = useState(0);
  let [playerBar, setPlayerBar] = useState(Object.create(defaultPlayerBar));
  let [ball, setBall] = useState(Object.create(defaultBall));
  let [firework1] = useState(Object.create(defaultFirework));
  firework1.color = "blue";
  let [firework2] = useState(Object.create(defaultFirework));
  firework2.color = "green";
  let [firework3] = useState(Object.create(defaultFirework));
  firework3.color = "red";
  let [firework4] = useState(Object.create(defaultFirework));
  firework4.color = "yellow";
  let [firework5] = useState(Object.create(defaultFirework));
  firework5.color = "cyan";
  let [firework6] = useState(Object.create(defaultFirework));
  firework6.color = "magenta";
  let [firework7] = useState(Object.create(defaultFirework));
  firework7.color = "white";
  const scoreboard = { time: 0, score: 0, gameState: "Start" };
  let [score, setScore] = useState(0);

useEffect(() => {
    if (controls.pause) {
      if (gameState === "Play") {
        setGameState("Pause");
      } else if (gameState === "Pause") {
        setGameState("Play");
      } else if (
        gameState === "Win" ||
        gameState === "End" ||
        gameState === "Start"
      ) {
        setGameState("Restart");
      }
    }
}, [controls]);

  useEffect(() => {
    if (gameState === "Play" || "Win") {
      if (
        controls.left &&
        !controls.right &&
        playerBar.x + playerBar.w > playerBar.w
      ) {
        playerBar.x = playerBar.x - playerBar.speed;
      }
      if (
        controls.right &&
        !controls.left &&
        playerBar.x + playerBar.w < cols
      ) {
        playerBar.x = playerBar.x + playerBar.speed;
      }
    }
  }, [controls, frameCount]);

  const clearDraws = (ctx) => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };
  const drawStartGame = (ctx, blockWidth, blockHeight) => {
    clearDraws(ctx);
    ctx.fillStyle = "#FF0000";
    ctx.font = "24px monospace";
    ctx.fillText("Press Play to Start", 2.5 * blockWidth, 15 * blockHeight, 500);
  };

  const drawGameOver = (ctx, blockWidth, blockHeight) => {
    ctx.fillStyle = "red";
    ctx.font = "40px monospace"; 
    ctx.fillText("Game Over", 5 * blockWidth, 9 * blockHeight, 500);
    ctx.font = "16px monospace";
    ctx.fillText("Score: " + score, 11 * blockWidth, 15 * blockHeight, 500);
    ctx.fillText("Time: " + Math.floor(frameCount/frequency), 11 * blockWidth, 19 * blockHeight, 500);
    ctx.font = "12px monospace";
    ctx.fillText("Press Play to Restart", 8 * blockWidth, 26 * blockHeight, 500);
  };
  const drawPauseGame = (ctx, blockWidth, blockHeight) => {
    ctx.fillStyle = "red";
    ctx.font = "40px monospace"; 
    ctx.fillText("Paused", 8 * blockWidth, 17 * blockHeight, 500);
  };
  const handleFireworks = (ctx, blockWidth, blockHeight) => {
    let currFirework;
    for (let i = 0; i <= 6; i++) {
      switch (i) {
        case 0:
          currFirework = firework1;
          break;
        case 1:
          currFirework = firework2;
          break;
        case 2:
          currFirework = firework3;
          break;
        case 3:
          currFirework = firework4;
          break;
        case 4:
          currFirework = firework5;
          break;
        case 5:
          currFirework = firework6;
          break;
        case 6:
          currFirework = firework7;
          break;
        default:
          break;
      }
      if (currFirework.t <= -5) {
        currFirework.t = Math.floor(Math.random() * 4) + 1;
        currFirework.x = playerBar.x + playerBar.w / 2;
        currFirework.y = 52;
        currFirework.dirX = (Math.random() - 0.5) / 8;
        currFirework.dirY = -0.25;
      } else if (currFirework.t > 3) {
        currFirework.t = currFirework.t - 1 / frequency;
      } else if (currFirework.t > 0) {
        currFirework.x = currFirework.x + currFirework.dirX;
        currFirework.y = currFirework.y + currFirework.dirY;
        checkColision(currFirework);
        drawBall(ctx, blockWidth, blockHeight, currFirework);
        currFirework.t = currFirework.t - 1 / frequency;
      } else if (currFirework.t > -5) {
        drawFirework(ctx, blockWidth, blockHeight, currFirework);
        currFirework.t = currFirework.t - 1 / frequency;
      }
    }
  };
  const drawFirework = (ctx, blockWidth, blockHeight, currBall) => {
    for (let i = 0; i < 12; i++) {
      ctx.fillStyle = currBall.color;
      ctx.scale(1, 0.5);
      ctx.beginPath();
      ctx.arc(
        currBall.x * blockWidth +
          Math.cos(((2 * Math.PI) / 12) * i) * currBall.t * 2 * blockWidth,
        currBall.y * blockHeight +
          Math.sin(((2 * Math.PI) / 12) * i) * 2 * currBall.t * 2 * blockHeight,
        (currBall.r / 1) * blockWidth,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.closePath();
      ctx.scale(1, 2);
    }
  };
  const drawWinGame = (ctx, blockWidth, blockHeight) => {
    ctx.fillStyle = "red";
    ctx.font = "40px monospace";
    ctx.fillText("You Win", 7 * blockWidth, 9 * blockHeight, 500);
    ctx.font = "16px monospace";
    ctx.fillText("Score: " + score, 11 * blockWidth, 15 * blockHeight, 500);
    ctx.fillText("Time: " + Math.floor(frameCount/frequency), 11 * blockWidth, 19 * blockHeight, 500);
    ctx.font = "12px monospace";
    ctx.fillText("Press Play to Restart", 8 * blockWidth, 26 * blockHeight, 500);
  };

  const drawLevelUp = (ctx, blockWidth, blockHeight, t) => {
    clearDraws(ctx);
    ctx.fillStyle = "red";
    ctx.font = "40px monospace";
    switch (t) {
      case 4:
        ctx.fillText("Next Level", 5 * blockWidth, 17 * blockHeight, 500);
        break;
      case 3:
        ctx.fillText("3 sec", 9 * blockWidth, 17 * blockHeight, 500);
        break;
      case 2:
        ctx.fillText("2 sec", 9 * blockWidth, 17 * blockHeight, 500);
        break;
      case 1:
        ctx.fillText("1 sec", 9 * blockWidth, 17 * blockHeight, 500);
        break;
      default:
        ctx.fillText("Next Level", 5 * blockWidth, 17 * blockHeight, 500);
        break;
    }
  };

  const drawPlayerBar = (ctx, blockWidth, blockHeight) => {
    let newX, newY;
    newX = playerBar.x;
    newY = playerBar.y;
    ctx.fillStyle = "cyan";
    ctx.fillRect(
      newX * blockWidth,
      newY * blockHeight,
      playerBar.w * blockWidth,
      blockHeight,
    );
  };
  const drawHitbar = (ctx, blockWidth, blockHeight, obj) => {
    let color;
    switch (obj.h) {
      case 3:
        color = "green";
        break;
      case 2:
        color = "yellow";
        break;
      case 1:
        color = "orange";
        break;
      default:
        color = "blue";
        break;
    }
    ctx.fillStyle = color;
    ctx.fillRect(
      obj.x * blockWidth,
      obj.y * blockHeight,
      obj.w * blockWidth,
      blockHeight,
    );
  };
  const drawLevel = (ctx, blockWidth, blockHeight) => {
    for (let i = 0; i < currLevel.Bars; i++) {
      if (currLevel.Matrix[i].h > 0)
        drawHitbar(ctx, blockWidth, blockHeight, currLevel.Matrix[i]);
    }
  };
  const barHit = (bar) => {
    if (bar.h - 1 >= 0) {
      bar.h = bar.h - 1;
      score = score + bar.s;
      setScore(score);
    }
    if (bar.h === 0) {
      setLevelHealth(levelHealth - 1);
      if (levelHealth - 1 === 0) {
        setGameState("LevelUp");
      }
    }
  };
  //colisions against corners count as double damage
  const checkColision = (currBall) => {
    if (currBall.x === 0 || currBall.x === cols) {
      currBall.dirX = -currBall.dirX;
    }
    if (currBall.y === 0) {
      currBall.dirY = -currBall.dirY;
    } else if (currBall.y === rows * 2) {
      setGameState("End");
    }
    if (currBall.y + currBall.r === playerBar.y * 2) {
      if (
        currBall.x >= playerBar.x &&
        currBall.x <= playerBar.x + playerBar.w
      ) {
        currBall.dirY = -currBall.dirY;
      }
    }
    let bar;
    for (let i = 0; i < currLevel.Bars; i++) {
      bar = currLevel.Matrix[i];
      if (bar.h > 0) {
        //compare boundaries
        if (
          currBall.x + currBall.r >= bar.x &&
          currBall.x - currBall.r <= bar.x + bar.w &&
          currBall.y + currBall.r >= bar.y * 2 &&
          currBall.y - currBall.r <= (bar.y + 1) * 2
        ) {
          //horizontal colision
          if (
            currBall.x + currBall.r > bar.x &&
            currBall.x - currBall.r < bar.x + bar.w
          ) {
            currBall.dirY = -currBall.dirY;
            barHit(bar);
          }
          //vertical colision
          if (
            currBall.y + currBall.r > bar.y * 2 &&
            currBall.y - currBall.r < (bar.y + 1) * 2
          ) {
            currBall.dirX = -currBall.dirX;
            barHit(bar);
          }
        }
      }
    }
  };
  // for some reason, arc is coming out as ellipse instead of simple sphere
  // rescaling on the Y axis used as fix, all values for ball on this axis must be doubled
  const drawBall = (ctx, blockWidth, blockHeight, currBall) => {
    ctx.fillStyle = "#FFFFFF";
    ctx.scale(1, 0.5);
    ctx.beginPath();
    ctx.arc(
      currBall.x * blockWidth,
      currBall.y * blockHeight,
      currBall.r * blockWidth,
      0,
      Math.PI * 2,
    );
    ctx.fill();
    ctx.closePath();
    ctx.scale(1, 2);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let blockWidth = context.canvas.width / cols;
    let blockHeight = context.canvas.height / rows;
    let animationFrameId;
    switch (gameState) {
      case "Start":
        setMaps(JSON.parse(JSON.stringify(LevelsJSON)));
        setGameLevel(0);
        setCurrLevel(Maps[gameLevel]);
        setLevelHealth(currLevel.Bars);
        setBall(Object.create(defaultBall));
        setPlayerBar(Object.create(defaultPlayerBar));
        setScore(0);
        setFrameCount(1);
        clearDraws(context);
        drawStartGame(context, blockWidth, blockHeight);
        handleCanvasBorders(context, context.canvas.width, context.canvas.height);
        break;
      case "Play":
        clearDraws(context);
        handleCanvasBorders(context, context.canvas.width, context.canvas.height);
        drawPlayerBar(context, blockWidth, blockHeight);
        drawLevel(context, blockWidth, blockHeight);
        ball.x = ball.x + ball.dirX;
        ball.y = ball.y + ball.dirY;
        checkColision(ball);
        drawBall(context, blockWidth, blockHeight, ball);
        setTimeout(() => {
          setFrameCount(frameCount + 1);
        }, [frameRate]);
        break;
      case "Pause":
        drawPauseGame(context, blockWidth, blockHeight);
        break;
      case "End":
        clearDraws(context);
        drawGameOver(context, blockWidth, blockHeight);
        handleCanvasBorders(context, context.canvas.width, context.canvas.height);
        break;
      case "Restart":
        setMaps(JSON.parse(JSON.stringify(LevelsJSON)));
        setGameLevel(0);
        setCurrLevel(Maps[gameLevel]);
        setLevelHealth(currLevel.Bars);
        setBall(Object.create(defaultBall));
        setPlayerBar(Object.create(defaultPlayerBar));
        setScore(0);
        setFrameCount(1);
        setGameState("Play");
        break;
      case "LevelUp":
        if (gameLevel + 1 === 3) {
          setGameState("Win");
        } else {
          drawLevelUp(context, blockWidth, blockHeight, 4);
          setTimeout(() => {
            clearDraws(context, blockWidth, blockHeight);
            drawLevelUp(context, blockWidth, blockHeight, 3);
          }, [1000]);
          setTimeout(() => {
            drawLevelUp(context, blockWidth, blockHeight, 2);
          }, [2000]);
          setTimeout(() => {
            drawLevelUp(context, blockWidth, blockHeight, 1);
          }, [3000]);
          setTimeout(() => {
            setGameLevel(gameLevel + 1);
            setCurrLevel(Maps[gameLevel + 1]);
            setLevelHealth(currLevel.Bars);
            setBall(Object.create(defaultBall));
            clearDraws(context);
            drawLevel(context, blockWidth, blockHeight);
            setGameState("Play");
          }, [4000]);
        }
        break;
      case "Win":
        setCurrLevel(Maps[3]);
        clearDraws(context);
        drawPlayerBar(context, blockWidth, blockHeight);
        handleFireworks(context, blockWidth, blockHeight);
        drawWinGame(context, blockWidth, blockHeight);
        handleCanvasBorders(context, context.canvas.width, context.canvas.height);
        setTimeout(() => {
          setWinFrameCount(winFrameCount + 1);
        }, [frameRate]);
        break;
      default:
        clearDraws(context);
        break;
    }
    scoreboard.time = Math.floor(frameCount / frequency);
    scoreboard.score = score;
    scoreboard.gameState = gameState;
    updateScoreboard(scoreboard);
    const render = () => {
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [frameCount, winFrameCount, gameState]);

  return <canvas ref={canvasRef} 
  onTouchStart={(e) => e.preventDefault()}
  onTouchMove={(e) => e.preventDefault()}
  onTouchEnd={(e) => e.preventDefault()}
  onTouchCancel={(e) => e.preventDefault()}></canvas>;
}
