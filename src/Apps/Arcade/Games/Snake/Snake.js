import React, { useState, useRef, useEffect } from "react";
import { handleCanvasBorders } from "../../Handlers/handleCanvasBorders.js";
import { set } from "ol/transform.js";

const frequency = 4; //Hertz
const frameRate = 1000 / frequency; // frames / milisecond

const Snake = ({ controls, updateScoreboard, isSelected, gameState, setGameState }) => {
  const rows = 30;
  const cols = 30;
  let canvasRef = useRef(null);
  let [fruit, setFruit] = useState(false);
  let [fruitPos] = useState({ x: 0, y: 0 });
  let [score, setScore] = useState(0);
  let [snakeHeadPos] = useState({
    direction: "right",
    x: 0,
    y: 0,
  });
  let [previousDir, setPreviousDir] = useState("right");
  let [snakeBody, setSnakeBody] = useState({ x: [], y: [] });
  let [initialPos, setInitialPos] = useState(false);
  let [frameCount, setFrameCount] = useState(0);
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    if (controls.pause) {
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
    }
  }, [controls]);

  useEffect(() => {
    if (gameState === "Restart") {
      setTime(0);
    } else if (gameState === "Play") {
      setStartTime(performance.now());
    } else if (gameState === "Pause" ||
      gameState === "End") {
      setTime(performance.now() - startTime);
    }
  }, [gameState]);

  useEffect(() => {
    if (snakeBody.x[0] === undefined) {
      if (controls.up) {
        snakeHeadPos.direction = "up";
      } else if (controls.down) {
        snakeHeadPos.direction = "down";
      } else if (controls.left) {
        snakeHeadPos.direction = "left";
      } else if (controls.right) {
        snakeHeadPos.direction = "right";
      }
    } else {
      if (controls.up && previousDir !== "down") {
        snakeHeadPos.direction = "up";
      } else if (controls.down && previousDir !== "up") {
        snakeHeadPos.direction = "down";
      } else if (controls.left && previousDir !== "right") {
        snakeHeadPos.direction = "left";
      } else if (controls.right && previousDir !== "left") {
        snakeHeadPos.direction = "right";
      }
    }
  }, [controls, frameCount]);

  const drawBoard = (ctx, canvasWidth, canvasHeight) => {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  const drawFruit = (ctx, blockWidth, blockHeight) => {
    let newX, newY;
    let overlapX,
      overlapY = false;
    if (!fruit) {
      fruitPos.x = Math.floor(Math.random() * cols);
      fruitPos.y = Math.floor(Math.random() * rows);
      if (snakeBody.x[0] === undefined) {
        while (fruitPos.x === snakeHeadPos.x && fruitPos.y === snakeHeadPos.y) {
          fruitPos.x = Math.floor(Math.random() * cols);
          fruitPos.y = Math.floor(Math.random() * rows);
        }
      } else {
        for (let i = 0; i < snakeBody.x.length; i++) {
          if (fruitPos.x === snakeBody.x[i]) {
            overlapX = true;
          }
          if (fruitPos.y === snakeBody.y[i]) {
            overlapY = true;
          }
        }
        while (overlapX === true && overlapY === true) {
          fruitPos.x = Math.floor(Math.random() * cols);
          fruitPos.y = Math.floor(Math.random() * rows);
          let flagX = false;
          let flagY = false;
          for (let i = 0; i < snakeBody.x.length; i++) {
            if (fruitPos.x === snakeBody.x[i]) {
              flagX = true;
            }
            if (fruitPos.y === snakeBody.y[i]) {
              flagY = true;
            }
          }
          overlapX = flagX;
          overlapY = flagY;
        }
      }
      newX = fruitPos.x;
      newY = fruitPos.y;
      setFruit(true);
    } else {
      newX = fruitPos.x;
      newY = fruitPos.y;
    }
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(
      newX * blockWidth,
      newY * blockHeight,
      blockWidth,
      blockHeight,
    );
  };

  const drawSnakeHead = (ctx, blockWidth, blockHeight) => {
    let step = 1;
    let newX, newY;
    if (!initialPos) {
      newX = 10 * blockWidth;
      newY = 10 * blockHeight;
      setInitialPos(true);
      snakeHeadPos.x = 10;
      snakeHeadPos.y = 10;
    } else {
      switch (snakeHeadPos.direction) {
        case "right":
          newX = snakeHeadPos.x + step;
          newY = snakeHeadPos.y;
          snakeHeadPos.x = snakeHeadPos.x + step;
          break;
        case "left":
          newX = snakeHeadPos.x - step;
          newY = snakeHeadPos.y;
          snakeHeadPos.x = snakeHeadPos.x - step;
          break;
        case "up":
          newX = snakeHeadPos.x;
          newY = snakeHeadPos.y - step;
          snakeHeadPos.y = snakeHeadPos.y - step;
          break;
        case "down":
          newX = snakeHeadPos.x;
          newY = snakeHeadPos.y + step;
          snakeHeadPos.y = snakeHeadPos.y + step;
          break;
        default:
          break;
      }
    }
    setPreviousDir(snakeHeadPos.direction);
    if (snakeBody.x[2] !== undefined) {
      for (let i = 2; i < snakeBody.x.length; i++) {
        if (
          snakeBody.x[i] === snakeHeadPos.x &&
          snakeBody.y[i] === snakeHeadPos.y
        ) {
          setGameState("End");
        }
      }
    }
    if (
      snakeHeadPos.x >= rows ||
      snakeHeadPos.x < 0 ||
      snakeHeadPos.y < 0 ||
      snakeHeadPos.y >= cols
    ) {
      setGameState("End");
    } else if (fruitPos.x === snakeHeadPos.x && fruitPos.y === snakeHeadPos.y) {
      setFruit(false);
      setScore(score + 1);
      snakeBody.x.unshift(snakeHeadPos.x);
      snakeBody.y.unshift(snakeHeadPos.y);
    }
    ctx.fillStyle = "#00FFFF";
    ctx.fillRect(
      newX * blockWidth,
      newY * blockHeight,
      blockWidth,
      blockHeight,
    );
  };

  const drawSnakeBody = (ctx, blockWidth, blockHeight) => {
    for (let i = 0; i < snakeBody.x.length; i++) {
      ctx.fillStyle = "#00FFFF";
      ctx.fillRect(
        snakeBody.x[i] * blockWidth,
        snakeBody.y[i] * blockHeight,
        blockWidth,
        blockHeight,
      );
    }
    snakeBody.x.unshift(snakeHeadPos.x);
    snakeBody.y.unshift(snakeHeadPos.y);
    snakeBody.x.pop();
    snakeBody.y.pop();
  };

  const drawEndGame = (ctx, blockWidth, blockHeight) => {
    drawBoard(ctx, blockWidth, blockHeight);
    ctx.fillStyle = "#FF0000";
    ctx.font = "50px monospace";
    ctx.fillText("Game Over", 3 * blockWidth, 8 * blockHeight, 500);
    ctx.font = "28px monospace";
    ctx.fillText("Score: " + score, 7 * blockWidth, 15 * blockHeight, 500);
    ctx.fillText("Time: " + Math.floor(time/1000), 7 * blockWidth, 20 * blockHeight, 500);
    ctx.font = "16px monospace";
    ctx.fillText("Press Play to Restart", 5.5 * blockWidth, 25 * blockHeight, 500);
    console.log(time);
  };

  const drawPauseGame = (ctx, blockWidth, blockHeight) => {
    drawBoard(ctx, blockWidth, blockHeight);
    ctx.fillStyle = "#FF0000";
    ctx.font = "50px monospace";
    ctx.fillText("Paused", 7 * blockWidth, 17 * blockHeight, 500);
  };

  const drawStartGame = (ctx, blockWidth, blockHeight) => {
    drawBoard(ctx, blockWidth, blockHeight);
    ctx.fillStyle = "#FF0000";
    ctx.font = "26px monospace";
    ctx.fillText("Press Play to Start", 1.5 * blockWidth, 17 * blockHeight, 500);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let blockWidth = context.canvas.width / cols;
    let blockHeight = context.canvas.height / rows;
    let animationFrameId;
    if (gameState === "Play") {
      drawBoard(context, context.canvas.width, context.canvas.height);
      drawFruit(context, blockWidth, blockHeight);
      drawSnakeHead(context, blockWidth, blockHeight);
      drawSnakeBody(context, blockWidth, blockHeight);
      handleCanvasBorders(context, context.canvas.width, context.canvas.height);
      setTimeout(() => {
        setFrameCount(frameCount + 1);
      }, [frameRate]);
    } else if (gameState === "Pause") {
      drawPauseGame(context, blockWidth, blockHeight);
      handleCanvasBorders(context, context.canvas.width, context.canvas.height);
    } else if (gameState === "End") {
      drawBoard(context, context.canvas.width, context.canvas.height);
      drawEndGame(context, blockWidth, blockHeight);
      handleCanvasBorders(context, context.canvas.width, context.canvas.height);
    } else if (gameState === "Restart") {
      setGameState("Play");
      setFrameCount(1);
      setFruit(false);
      setInitialPos(false);
      setScore(0);
      setSnakeBody({ x: [], y: [] });
    } else if (gameState === "Start") {
      drawStartGame(context, blockWidth, blockHeight);
      handleCanvasBorders(context, context.canvas.width, context.canvas.height);
      setFrameCount(1);
      setFruit(false);
      setInitialPos(false);
      setScore(0);
      setSnakeBody({ x: [], y: [] });
    }
    const render = () => {
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [frameCount, gameState]);

  return <canvas height="300" width="300" ref={canvasRef}
    onTouchStart={(e) => e.preventDefault()}
    onTouchMove={(e) => e.preventDefault()}
    onTouchEnd={(e) => e.preventDefault()}
    onTouchCancel={(e) => e.preventDefault()}></canvas>;
};
export default Snake;
