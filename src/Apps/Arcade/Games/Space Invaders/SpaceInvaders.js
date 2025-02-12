import React, { useState, useRef, useEffect } from "react";
import { handleCanvasBorders } from "../../Handlers/handleCanvasBorders.js";
import Maps from "./Maps.json";

const frequency = 60; //Hertz
const frameRate = 1000 / frequency; // frames / milisecond
const rows = 150;
const cols = 300;
const blockSize = 10;
const defaultInvaderOne = {
    id: 1,
    x: 10,
    y: 10,
    row: 0,
    life: 1,
    currSprite: 1,
    totalSprites: 2,
    w: 10,
    h: 10,
    hit: false,
    color: "green",
    sprites: {
        1: [
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
            [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        ],
        2: [
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
            [0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 1, 1],
        ]
    }
}
const defaultInvaderTwo = {
    id: 2,
    x: 10,
    y: 10,
    row: 0,
    life: 2,
    hit: false,
    currSprite: 1,
    totalSprites: 2,
    w: 10,
    h: 10,
    color: "red",
    sprites: {
        1: [
            [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
            [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
            [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        ],
        2: [
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
            [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
        ]
    }
}
const defaultInvaderThree = {
    id: 3,
    x: 10,
    y: 10,
    row: 0,
    life: 3,
    hit: false,
    currSprite: 1,
    totalSprites: 2,
    w: 10,
    h: 10,
    color: "cyan",
    sprites: {
        1: [
            [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        ],
        2: [
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
        ]
    }
}
const defaultBonusInvader = {
    id: 8,
    x: 10,
    y: 10,
    life: 1,
    hit: false,
    currSprite: 1,
    totalSprites: 2,
    w: 20,
    h: 10,
    color: "magenta",
    sprites: {
        1: [
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0],
        ],
        2: [
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0],

        ]
    }
}
const defaultPlayer = {
    id: 10,
    x: 10,
    y: 130,
    speed: 2,
    move: "none",
    shooting: false,
    cooling: 0,
    currSprite: 1,
    w: 10,
    h: 10,
    color: "white",
    cooldown: 250, //milliseconds
    sprites: {
        1: [
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        ]
    },
}
const defaultBlock = {
    id: 9,
    x: 10,
    y: 10,
    currSprite: 1,
    w: 10,
    h: 10,
    color: "gray",
    sprites: {
        1: [
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        ]
    },
}
const defaultPlayerBullet = {
    id: "player",
    x: 10,
    y: 10,
    h: 9,
    w: 2,
    speed: 5,
    color: "white",
    currSprite: 1,
    totalSprites: 2,
    sprites: {
        1: [
            [1, 1],
            [1, 0],
            [1, 1],
            [0, 1],
            [1, 1],
            [1, 0],
            [1, 1],
            [0, 1],
            [1, 1],
        ],
        2: [
            [1, 1],
            [0, 1],
            [1, 1],
            [1, 0],
            [1, 1],
            [0, 1],
            [1, 1],
            [1, 0],
            [1, 1],
        ]
    }
}
const defaultInvaderBullet = {
    id: "invader",
    x: 10,
    y: 10,
    currSprite: 1,
    totalSprites: 1,
    w: 2,
    h: 9,
    speed: 2,
    color: "yellow",
    sprites: {
        1: [
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
        ]
    },
}

export default function SpaceInvaders({ controls, updateScoreboard, isSelected, gameState, setGameState }) {

    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [level, setLevel] = useState(1);
    const [frameCount, setFrameCount] = useState(0);
    const [enemies, setEnemies] = useState(0);
    const [enemyMoveParam, setEnemyMoveParam] = useState({
        index: 0,
        rows: [],
    });
    const [entities, setEntities] = useState([]);
    const [bullets, setBullets] = useState([]);
    const [explosions, setExplosions] = useState([]);
    const explosionLifetime = 500;
    //let entities = [];
    //let bullets = [];
    let [player, setPlayer] = useState(Object.create(defaultPlayer));
    const scoreboard = { time: 0, score: 0, gameState: "Start" };
    const invaderSpeed = 1;

    //Game state
    useEffect(() => {
        if (controls.pause) {
            switch (gameState) {
                case "Play":
                    setGameState("Pause");
                    break;
                case "Pause":
                    setGameState("Play");
                    break;
                case "Win":
                case "End":
                case "Start":
                    setGameState("Restart");
                    break;
                default:
                    break;
            }
        }
    }, [controls]);
    //Player controls
    useEffect(() => {
        if (gameState === "Play") {
            if (
                controls.left &&
                !controls.right &&
                player.x + player.w > player.w
            ) {
                player.x = player.x - player.speed;
            } else if (
                controls.right &&
                !controls.left &&
                player.x + player.w < cols
            ) {
                player.x = player.x + player.speed;
            } else if (controls.left && controls.right
            ) {
                player.move = "none";
            } else if (!controls.left && !controls.right) {
                player.move = "none";
            }
            if (controls.up || controls.one
            ) {
                if (player.cooling === 0) {
                    player.shooting = true;

                }
            }
        }
    }, [controls, frameCount]);


    //Drawing functions
    const drawBoard = (ctx) => {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };
    const drawSprite = (ctx, object) => {
        if (object.hit === true) {
            ctx.fillStyle = "white";
        } else {
            ctx.fillStyle = object.color;
        }
        for (let i = 0; i < object.sprites[object.currSprite].length; i++) {
            for (let j = 0; j < object.sprites[object.currSprite][i].length; j++) {
                if (object.sprites[object.currSprite][i][j] === 1) {
                    ctx.fillRect(object.x + j, object.y + i, 1, 1);
                }
            }
        }
        if (object.sprites.length > 1) {
            if (object.currSprite < object.sprites.length - 1) {
                object.currSprite++;
            } else {
                object.currSprite = 1;
            }
        }
    }
    const drawExplosions = (ctx) => {
        let redshift = 0;
        let greenshift = 0;
        let blueshift = 0;
        if (explosions.length > 0) {
            for (let i = 0; i < explosions.length; i++) {
                if (explosions[i].decay <= explosionLifetime / 3) {
                    redshift = Math.floor((explosions[i].decay) * 255 / (explosionLifetime / 3));
                } else if (explosions[i].decay <= explosionLifetime * 2 / 3) {
                    redshift = 255;
                    greenshift = Math.floor((explosions[i].decay - explosionLifetime / 3) * 255 / (explosionLifetime / 3));
                } else {
                    redshift = 255;
                    greenshift = 255;
                    blueshift = Math.floor((explosions[i].decay - explosionLifetime * 2 / 3) * 255 / (explosionLifetime / 3));
                }
                ctx.fillStyle = "rgb(" + redshift + "," + greenshift + "," + blueshift + ")";
                let spread = 2 * explosions[i].decay / (explosionLifetime + explosions[i].decay);
                let radius = explosions[i].w / 2 * spread - 10;
                ctx.fillRect(explosions[i].x + radius * 2 / 3, explosions[i].y + radius * 2 / 3, 2, 2);
                ctx.fillRect(explosions[i].x - radius * 2 / 3, explosions[i].y + radius * 2 / 3, 2, 2);
                ctx.fillRect(explosions[i].x + radius * 2 / 3, explosions[i].y - radius * 2 / 3, 2, 2);
                ctx.fillRect(explosions[i].x - radius * 2 / 3, explosions[i].y - radius * 2 / 3, 2, 2);
                ctx.fillRect(explosions[i].x + radius, explosions[i].y, 2, 2);
                ctx.fillRect(explosions[i].x - radius, explosions[i].y, 2, 2);
                ctx.fillRect(explosions[i].x, explosions[i].y + radius, 2, 2);
                ctx.fillRect(explosions[i].x, explosions[i].y - radius, 2, 2);
            }

        }
    }
    const drawStartGame = (ctx, blockWidth, blockHeight) => {
      drawBoard(ctx, blockWidth, blockHeight);
      ctx.fillStyle = "#FF0000";
      ctx.font = "24px monospace";
      ctx.fillText("Press Play to Start", 2.5 * blockWidth, 8 * blockHeight, 500);
    };
    const drawGameOver = (ctx, blockWidth, blockHeight) => {
        ctx.fillStyle = "red";
        ctx.font = "40px monospace"; 
        ctx.fillText("Game Over", 5 * blockWidth, 5 * blockHeight, 500);
        ctx.font = "16px monospace";
        ctx.fillText("Score: " + score, 11 * blockWidth, 8 * blockHeight, 500);
        ctx.fillText("Time: " + Math.floor(frameCount/frequency), 11 * blockWidth, 10 * blockHeight, 500);
        ctx.font = "12px monospace";
        ctx.fillText("Press Play to Restart", 8 * blockWidth, 13 * blockHeight, 500);
    };
    const drawPauseGame = (ctx, blockWidth, blockHeight) => {
        ctx.fillStyle = "red";
        ctx.font = "40px monospace"; 
        ctx.fillText("Paused", 8 * blockWidth, 8 * blockHeight, 500);
    };
    const drawWinGame = (ctx, blockWidth, blockHeight) => {
        drawBoard(ctx);
        ctx.fillStyle = "red";
        ctx.font = "40px monospace";
        ctx.fillText("You Win", 7 * blockWidth, 4 * blockHeight, 500);
        ctx.font = "16px monospace";
        ctx.fillText("Score: " + score, 10 * blockWidth, 7 * blockHeight, 500);
        ctx.fillText("Time: " + Math.floor(frameCount/frequency), 10 * blockWidth, 9 * blockHeight, 500);
        ctx.fillText("Lives: " + lives, 10 * blockWidth, 11 * blockHeight, 500);
        ctx.font = "12px monospace";
        ctx.fillText("Press Play to Restart", 8 * blockWidth, 14 * blockHeight, 500);
    };
    const drawBottomText = (ctx, blockWidth, blockHeight) => {
        ctx.fillStyle = "red";
        ctx.font = "10px monospace";
        ctx.fillText("LIFE:" + lives, blockWidth / 2, rows - blockHeight / 4, 500);
    }
    const drawObjects = (context) => {
        for (let i = 0; i < entities.length; i++) {
            drawSprite(context, entities[i]);
        }
        for (let i = 0; i < bullets.length; i++) {
            drawSprite(context, bullets[i]);
        }
        drawSprite(context, player);
        drawExplosions(context);
    }
    //Game functions
    const setUpLevel = () => {
        let currEntity = {};
        let newEntities = [];
        let newEnemyMoveParam = { index: 0, rows: [] };
        for (let i = 0; i < Maps[level].Matrix.length; i++) {
            for (let j = 0; j < Maps[level].Matrix[i].length; j++) {
                switch (Maps[level].Matrix[i][j]) {
                    case 1:
                        currEntity = Object.create(defaultInvaderOne);
                        currEntity.x = j * blockSize * 1.2;
                        currEntity.y = 15 + i * blockSize * 1.2;
                        currEntity.row = i;
                        newEntities.push(currEntity);
                        if (newEnemyMoveParam.rows[i] === undefined) {
                            newEnemyMoveParam.rows.push("right");
                        }
                        break;
                    case 2:
                        currEntity = Object.create(defaultInvaderTwo);
                        currEntity.x = j * blockSize * 1.2;
                        currEntity.y = 15 + i * blockSize * 1.2;
                        currEntity.row = i;
                        newEntities.push(currEntity);
                        if (newEnemyMoveParam.rows[i] === undefined) {
                            newEnemyMoveParam.rows.push("right");
                        }
                        break;
                    case 3:
                        currEntity = Object.create(defaultInvaderThree);
                        currEntity.x = j * blockSize * 1.2;
                        currEntity.y = 15 + i * blockSize * 1.2;
                        currEntity.row = i;
                        newEntities.push(currEntity);
                        if (newEnemyMoveParam.rows[i] === undefined) {
                            newEnemyMoveParam.rows.push("right");
                        }
                        break;
                    case 9:
                        currEntity = Object.create(defaultBlock);
                        currEntity.x = j * blockSize * 1.2;
                        currEntity.y = 5 + i * blockSize * 1.2;
                        newEntities.push(currEntity);
                        break;
                    case 0:
                    default:
                        break;
                }
            }
        }
        setEnemies(Maps[level].Enemies);
        setEntities(newEntities);
        setEnemyMoveParam(newEnemyMoveParam);
    }
    const invaderMove = () => {
        if (enemyMoveParam.index >= enemies) {
            enemyMoveParam.index = 0;
        }
        switch (enemyMoveParam.rows[entities[enemyMoveParam.index].row]) {
            case "left":
                if (entities[enemyMoveParam.index].x > 2) {
                    entities[enemyMoveParam.index].x = entities[enemyMoveParam.index].x - invaderSpeed;
                }
                else {
                    enemyMoveParam.rows[entities[enemyMoveParam.index].row] = "right";
                    entities[enemyMoveParam.index].x = entities[enemyMoveParam.index].x + invaderSpeed;
                }
                break;
            case "right":
                if (entities[enemyMoveParam.index].x + entities[enemyMoveParam.index].w < cols - 1) {
                    entities[enemyMoveParam.index].x = entities[enemyMoveParam.index].x + invaderSpeed;
                }
                else {
                    enemyMoveParam.rows[entities[enemyMoveParam.index].row] = "left";
                }
                break;
            default:
                break;
        }
        if (entities[enemyMoveParam.index].currSprite < entities[enemyMoveParam.index].totalSprites) {
            entities[enemyMoveParam.index].currSprite = entities[enemyMoveParam.index].currSprite + 1;
        } else {
            entities[enemyMoveParam.index].currSprite = 1;
        }
        enemyMoveParam.index++;
        //console.log(entities[enemyMoveParam.index].sprites.length);
        for (let i = 0; i < entities.length; i++) {
            if (entities[i].id === 8) {
                if (entities[i].x + entities[i].w > 0 && entities[i].x < cols) {
                    entities[i].x = entities[i].x + entities[i].speed;
                    if (entities[i].currSprite < entities[i].totalSprites) {
                        entities[i].currSprite = entities[i].currSprite + 1;
                    } else {
                        entities[i].currSprite = 1;
                    }
                } else {
                    entities.splice(i, 1);
                }
            }
        }
        setEntities(entities);
        setEnemyMoveParam(enemyMoveParam);
    }
    const spawnBonusInvader = () => {
        let newEntity = Object.create(defaultBonusInvader);
        let side = Math.random();
        if (side > 0.5) {
            newEntity.x = 0;
            newEntity.speed = invaderSpeed;
        } else {
            newEntity.x = cols - newEntity.w;
            newEntity.speed = -invaderSpeed;
        }
        newEntity.y = 2;
        entities.push(newEntity);
        setEntities(entities);
    }
    const createExplosion = (target) => {
        let newExplosion = {
            x: target.x + target.w / 2 - 1,
            y: target.y + target.h / 2 - 1,
            w: target.w,
            h: target.h,
            decay: explosionLifetime
        }
        explosions.push(newExplosion);
        setExplosions(explosions);
    }
    const playerShooting = () => {
        let newBullet = {};
        if (player.shooting === true &&
            player.cooling === 0) {
            newBullet = Object.create(defaultPlayerBullet);
            newBullet.x = player.x - 1 + player.w / 2;
            newBullet.y = player.y;
            bullets.push(newBullet);
            player.cooling = player.cooldown;
            setTimeout(() => {
                player.cooling = 0;
            }, [player.cooldown]);
            setBullets(bullets);
            player.shooting = false;
        }
    }
    const invaderShooting = () => {
        let newBullet = {};
        let chance = Math.random();
        let invaderShooter = Math.floor(Math.random() * enemies);
        if (chance > 0.95) {
            newBullet = Object.create(defaultInvaderBullet);
            newBullet.x = entities[invaderShooter].x + player.w / 2;
            newBullet.y = entities[invaderShooter].y;
            bullets.push(newBullet);
            setBullets(bullets);
        }
    }
    const playerHit = () => {
        if (lives - 1 >= 0) {
            setLives(lives - 1);
            createExplosion(player);
        } else {
            setGameState("End");
        }
    }
    const invaderHit = (invaderIndex) => {
        if (entities[invaderIndex].life - 1 > 0) {
            entities[invaderIndex].life = entities[invaderIndex].life - 1;
            entities[invaderIndex].hit = true;
            setScore(score + 5);
            setTimeout(() => {
                entities[invaderIndex].hit = false;
            }, [player.cooldown / 2]);
        } else {
            createExplosion(entities[invaderIndex]);
            if (entities[invaderIndex].id !== 8) {
                setEnemies(enemies - 1);
                setScore(score + 10);
            } else {
                setScore(score + 150);
            }
            entities.splice(invaderIndex, 1);
        }
        setEntities(entities);
    }
    const blockHit = (blockIndex) => {
        createExplosion(entities[blockIndex]);
        //entities.splice(blockIndex, 1);
        //setEntities(entities);
    }
    const checkColisions = (bulletIndex) => {
        let colision = false;
        for (let i = 0; i < entities.length; i++) {
            if (bullets[bulletIndex].id === "player") {
                if (bullets[bulletIndex].x > entities[i].x &&
                    bullets[bulletIndex].x < entities[i].x + entities[i].w &&
                    bullets[bulletIndex].y > entities[i].y &&
                    bullets[bulletIndex].y < entities[i].y + entities[i].h) {
                    colision = true;
                    if (entities[i].id === 9) {
                        blockHit(i);
                    } else {
                        invaderHit(i);
                    }
                }
            } else {
                if (bullets[bulletIndex].x > player.x &&
                    bullets[bulletIndex].x < player.x + player.w &&
                    bullets[bulletIndex].y > player.y - player.h &&
                    bullets[bulletIndex].y < player.y) {
                    colision = true;
                    playerHit();
                } else if (bullets[bulletIndex].x > entities[i].x &&
                    bullets[bulletIndex].x < entities[i].x + entities[i].w &&
                    bullets[bulletIndex].y > entities[i].y - entities[i].h &&
                    bullets[bulletIndex].y < entities[i].y &&
                    entities[i].id === 9) {
                    colision = true;
                    blockHit(i);
                }
            }
        }
        return colision;
    }
    const handleBullets = () => {
        let newArray = [];
        if (bullets.length > 0) {
            //console.log(bullets);
            for (let i = 0; i < bullets.length; i++) {
                if (!checkColisions(i)) {
                    if (bullets[i].id === "player") {
                        if (bullets[i].y > 0) {
                            bullets[i].y -= bullets[i].speed;
                            if (bullets[i].currSprite < bullets[i].totalSprites) {
                                bullets[i].currSprite = bullets[i].currSprite + 1;
                            } else {
                                bullets[i].currSprite = 1;
                            }
                            newArray.push(bullets[i]);
                        }
                    } else {
                        if (bullets[i].y < rows) {
                            bullets[i].y += bullets[i].speed;
                            newArray.push(bullets[i]);
                        }
                    }
                }
            }
            setBullets(newArray);
        }
    }
    const handleExplosions = () => {
        if (explosions.length > 0) {
            for (let i = 0; i < explosions.length; i++) {
                if (explosions[i].decay - frameRate > 0) {
                    explosions[i].decay = explosions[i].decay - frameRate;
                } else {
                    explosions.splice(i, 1);
                }
            }
            setExplosions(explosions);
        }
    }
    const handleEvents = () => {
        if ((frameCount * frameRate) % (1200 * frameRate) === 0) {
            spawnBonusInvader();
        }
        playerShooting();
        invaderShooting();
        handleBullets();
        handleExplosions();
        invaderMove();
    }

    //Game Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        let animationFrameId;
        switch (gameState) {
            case "Play":
                if (lives >= 0 && enemies > 0) {
                    drawBoard(context);
                    handleCanvasBorders(context, context.canvas.width, context.canvas.height);
                    handleEvents();
                    drawObjects(context);
                    drawBottomText(context, blockSize, blockSize);
                    setTimeout(() => {
                        setFrameCount(frameCount + 1);
                    }, [frameRate]);
                }
                else if (lives < 0) {
                    setGameState("End");
                }
                else if (enemies === 0) {
                    setGameState("Win");
                }
                break;
            case "Pause":
                drawPauseGame(context, blockSize, blockSize);
                handleCanvasBorders(context, context.canvas.width, context.canvas.height);
                break;
            case "Win":
                drawBoard(context);
                drawWinGame(context, blockSize, blockSize);
                handleCanvasBorders(context, context.canvas.width, context.canvas.height);
                break;
            case "End":
                drawBoard(context);
                drawGameOver(context, blockSize, blockSize);
                handleCanvasBorders(context, context.canvas.width, context.canvas.height);
                break;
            case "Start":
                setLevel(1);
                setScore(0);
                setLives(3);
                setExplosions([]);
                setBullets([]);
                setUpLevel();
                setPlayer(Object.create(defaultPlayer));
                setFrameCount(1);
                drawBoard(context);
                drawStartGame(context, blockSize, blockSize);
                handleCanvasBorders(context, context.canvas.width, context.canvas.height);
                break;
            case "Restart":
                setLevel(1);
                setScore(0);
                setLives(3);
                setExplosions([]);
                setBullets([]);
                setUpLevel();
                setPlayer(Object.create(defaultPlayer));
                setFrameCount(1);
                setGameState("Play");
                break;
            default:
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
    }, [gameState, frameCount]);

    return <canvas ref={canvasRef} width={300} height={150}
        onTouchStart={(e) => e.preventDefault()}
        onTouchMove={(e) => e.preventDefault()}
        onTouchEnd={(e) => e.preventDefault()}
        onTouchCancel={(e) => e.preventDefault()}
        ></canvas>;
}