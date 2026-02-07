export const handleDraw = (canvas, cursor, param, preview) => {
    let ctx;
    if (preview) {
        ctx = canvas.getContext('2d', { alpha: true });
    } else {
        ctx = canvas.getContext('2d', { alpha: false });
    }
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    const height = ctx.canvas.height;
    const width = ctx.canvas.width;

    const x = cursor.current.x;
    const y = cursor.current.y;
    const startX = cursor.start.x;
    const startY = cursor.start.y;
    const endX = cursor.end.x;
    const endY = cursor.end.y;

    const drawBrush = () => {
        ctx.fillStyle = param.selectedColor;
        ctx.strokeStyle = param.selectedColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(
            x,
            y,
            param.size,
            0,
            Math.PI * 2,
        );
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    };

    const drawEraser = () => {
        ctx.strokeStyle = param.selectedColor;
        ctx.fillStyle = param.selectedColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(
            x,
            y,
            param.size,
            0,
            Math.PI * 2,
        );
        if (!preview) {
            ctx.fill();
        } else {
            ctx.stroke();
        }
        ctx.closePath();
    }

    const drawSpray = () => {
        let randomX = Math.random() * param.size;
        let randomNegativeX = Math.random();
        let randomY = Math.random() * param.size;
        let randomNegativeY = Math.random();
        while (Math.sqrt(Math.pow(randomX, 2) + Math.pow(randomY, 2)) > param.size) {
            randomX = Math.random() * param.size;
            randomY = Math.random() * param.size;
        }
        if (randomNegativeY > 0.5) {
            randomY = randomY * -1;
        }
        if (randomNegativeX > 0.5) {
            randomX = randomX * -1;
        }
        ctx.fillStyle = param.selectedColor;
        ctx.fillRect(
            x + randomX,
            y + randomY,
            1,
            1,
        );
    };

    const drawPipette = () => {
        let pixel = ctx.getImageData(
            x,
            y,
            1,
            1,
        );
        // convert from rgb to hsl
        let r = pixel.data[0],
            g = pixel.data[1],
            b = pixel.data[2];
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = ((cmax + cmin) / 2);
        if (delta === 0) {
            s = 0;
            h = 0;
        } else {
            if (l <= 0.5) {
                s = delta / (cmax + cmin);
            } else {
                s = delta / (2 - cmax - cmin);
            };
            if (cmax === r) {
                h = (g - b) / delta;
            } else if (cmax === g) {
                h = ((b - r) / delta) + 2;
            } else if (cmax === b) {
                h = ((r - g) / delta) + 4;
            }
        }
        h = Math.round(h * 60);
        if (h < 0) {
            h += 360;
        }
        s = Math.abs(s * 100).toFixed(0);
        l = (l * 100).toFixed(0);
        let color = "hsl(" + h + "," + s + "%," + l + "%)";
        //assign color
        if (param.tool === "Pipette") {
            if (param.selectedColor === param.color1) {
                param.setColor1(color);
            } else {
                param.setColor2(color);
            }
        } else {
            return color;
        }
    };

    //Bucket code based on Spawn Fill algorithm in 
    //https://stackoverflow.com/questions/2106995/how-can-i-perform-flood-fill-with-html-canvas/56221940#56221940
    //answer from user gman.
    //Regular flood fill algorithm is too slow as it looks at individual pixels.
    //This solution looks at entire lines and fills them in.
    //Code has been edited to work with hsla color values
    const drawBucket = () => {
        let r, g, b, h, s, l;
        let hslaColor = [];
        for (let i = 0; i < param.selectedColor.length; i++) {
            var start;
            var end;
            if (param.selectedColor[i] === "(") {
                start = i + 1;
            } else if (param.selectedColor[i] === ")") {
                end = i;
                hslaColor.push(param.selectedColor.slice(start, end));
            } else if (param.selectedColor[i] === ",") {
                hslaColor.push(param.selectedColor.slice(start, i));
                start = i + 1;
            }
        }
        h = hslaColor[0] / 360;
        s = hslaColor[1].slice(0, -1) / 100;
        l = hslaColor[2].slice(0, -1) / 100;
        if (s === 0) {
            r = l * 255;
            g = l * 255;
            b = l * 255;
        } else {
            let temp1, temp2, tempR, tempG, tempB;
            if (l < 0.5) {
                temp1 = l * (1 + s);
            } else {
                temp1 = (l + s) - (l * s);
            }
            temp2 = 2 * l - temp1;
            function secondTest(value) {
                if (value < 0) {
                    return value + 1;
                } else if (value > 1) {
                    return value - 1;
                } else {
                    return value;
                }
            }
            tempR = secondTest(h + 1 / 3);
            tempG = secondTest(h);
            tempB = secondTest(h - 1 / 3);
            function finalTest(temp1, temp2, tempColor) {
                if (6 * tempColor < 1) {
                    return temp2 + (temp1 - temp2) * 6 * tempColor;
                } else if (2 * tempColor < 1) {
                    return temp1;
                } else if (3 * tempColor < 2) {
                    return temp2 + (temp1 - temp2) * (2 / 3 - tempColor) * 6;
                } else {
                    return temp2;
                }
            }
            r = Math.round(finalTest(temp1, temp2, tempR) * 255);
            g = Math.round(finalTest(temp1, temp2, tempG) * 255);
            b = Math.round(finalTest(temp1, temp2, tempB) * 255);
        }
        function componentToHex(c) {
            var hex = Number(c).toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
        let hexColor = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        let spans = [];
        let selectedColor = parseInt("FF" + hexColor.slice(5, 7) + hexColor.slice(3, 5) + hexColor.slice(1, 3), 16);
        //get copy of canvas and convert to a more performant format
        //canvas data has no negative values and none of the data points require the standard 64 bit
        const imageData = ctx.getImageData(0, 0, width, height);
        const pixelData = {
            width: imageData.width,
            height: imageData.height,
            data: new Uint32Array(imageData.data.buffer),
        };
        //get color from pixel in buffer
        function getPixel(currX, currY) {
            if (currX < 0 || currY < 0 || currX >= pixelData.width || currY >= pixelData.height) {
                return -1;  // out of bounds
            }
            return pixelData.data[currY * imageData.width + currX];
        };
        //break drawBucket if color is the same as target, or if it is out of bounds
        let targetColor = getPixel(Math.floor(x), Math.floor(y));
        if (targetColor === -1 || targetColor === selectedColor) return;
        //add line to check to spans
        const addSpan = (left, right, line, direction) => {
            spans.push({
                left,
                right,
                line,
                direction
            });
        };
        //check span for color and length
        const checkSpan = (left, right, line, direction) => {
            let flag = false;
            let start;
            let column;
            if (line >= height || line < 0) return;
            for (column = left; column < right; ++column) {
                const color = getPixel(column, line);
                if (color === targetColor) {
                    if (!flag) {
                        flag = true;
                        start = column;
                    }
                } else {
                    if (flag) {
                        flag = false;
                        addSpan(start, column - 1, line, direction);
                    }
                }
            }
            if (flag) {
                flag = false;
                addSpan(start, right - 1, line, direction);
            }
        };
        addSpan(Math.floor(x), Math.floor(x), Math.floor(y), 0);
        let depth = 0;
        let MAX_DEPTH = 5000;
        while (spans.length > 0 && depth < MAX_DEPTH) {
            depth++;
            const { left, right, line, direction } = spans.pop();
            let l = left;
            for (l; l >= 0; l--) {
                if (getPixel(l, line) !== targetColor) {
                    break;
                }
            }
            ++l;
            let r = right;
            for (r; r < width; ++r) {
                if (getPixel(r, line) !== targetColor) {
                    break;
                }
            }
            const lineOffset = line * width;
            if (lineOffset + r > pixelData.data.length) {
                console.log("Attempt to access pixel data array beyond its maximum length");
                pixelData.data.fill(selectedColor, lineOffset + l, pixelData.data.length);
            } else {
                pixelData.data.fill(selectedColor, lineOffset + l, lineOffset + r);
            }
            if (direction <= 0) {
                checkSpan(l, r, line - 1, -1);
            } else {
                checkSpan(l, left, line - 1, -1);
                checkSpan(right, r, line - 1, -1);
            }
            if (direction >= 0) {
                checkSpan(l, r, line + 1, +1);
            } else {
                checkSpan(l, left, line + 1, +1);
                checkSpan(right, r, line + 1, +1);
            }
        }
        if (depth >= MAX_DEPTH) console.error("Bucket Tool maximum iterations exceeded, consider using a smaller canvas.");
        ctx.putImageData(imageData, 0, 0);
    };

    const drawText = () => {
        ctx.fillStyle = param.selectedColor
        ctx.strokeStyle = param.selectedColor === param.color1 ? param.color2 : param.color1
        ctx.lineWidth = param.text.strokeWidth
        ctx.font = String(param.size + "px " + param.text.fontFamily)
        let linesArr = param.text.text.split("\n")
        let lineIndex = 0
        let maxWidth = endX > startX ? endX - startX : startX - endX
        let left = endX > startX ? startX : endX
        let top = endY > startY ? startY : endY
        let whileBreak = 0
        const MAX_DEPTH = 500
        while (lineIndex < linesArr.length && whileBreak < MAX_DEPTH) {
            if (ctx.measureText(linesArr[lineIndex]).width > maxWidth) {
                let firstText = linesArr[lineIndex][0]
                let firstTextIndex = 1
                let whileBreak2 = 0
                while (ctx.measureText(firstText).width < maxWidth && whileBreak2 < MAX_DEPTH) {
                    firstText += linesArr[lineIndex][firstTextIndex]
                    firstTextIndex++
                    whileBreak2++
                }
                let lastText = linesArr[lineIndex].substring(firstTextIndex - 1, linesArr[lineIndex].length)
                linesArr[lineIndex] = firstText.substring(0, firstTextIndex - 1)
                linesArr = linesArr.toSpliced(lineIndex + 1, 0, lastText)
            }
            lineIndex++
            whileBreak++
        };
        linesArr.forEach((value, index) => {
            if (param.text.fill) {
                ctx.fillText(
                    value,
                    left,
                    top + param.size + (param.size * param.text.lineHeight * index)
                );
            }
            if (param.text.stroke) {
                ctx.strokeText(
                    value,
                    left,
                    top + param.size + (param.size * param.text.lineHeight * index)
                );
            }
        })

    };

    const drawSelect = () => {
        switch (param.clipboard.state) {
            case "copy":
                if (!preview && endX - startX !== 0 && endY - startY !== 0) {
                    let data = ctx.getImageData(
                        startX,
                        startY,
                        endX - startX,
                        endY - startY
                    );
                    param.setClipboard({
                        data: data,
                        state: "carry"
                    });
                }
                break;
            case "cut":
                if (!preview && endX - startX !== 0 && endY - startY !== 0) {
                    let data = ctx.getImageData(
                        startX,
                        startY,
                        endX - startX,
                        endY - startY
                    );
                    param.setClipboard({
                        data: data,
                        state: "carry"
                    });
                    if (param.selectedColor === param.color1) {
                        ctx.fillStyle = param.color2;
                    } else {
                        ctx.fillStyle = param.color1;
                    }
                    ctx.fillRect(
                        startX,
                        startY,
                        endX - startX,
                        endY - startY
                    );
                }
                break;
            case "carry":
                if (cursor.down) {
                    ctx.putImageData(
                        param.clipboard.data,
                        x,
                        y
                    );
                } else {
                    ctx.putImageData(
                        param.clipboard.data,
                        endX,
                        endY
                    );
                }
                break;
            case "paste":
                if (!preview) {
                    const carryCanvas = document.createElement("canvas");
                    carryCanvas.width = param.clipboard.data.width;
                    carryCanvas.height = param.clipboard.data.height;
                    const carryCtx = carryCanvas.getContext("2d");
                    carryCtx.putImageData(param.clipboard.data, 0, 0);
                    ctx.drawImage(carryCanvas, endX, endY);
                    param.setClipboard({
                        ...param.clipboard,
                        state: "none"
                    });
                }
                break;
            case "none":
            default:
                break;
        }
    };

    const drawShape = () => {
        ctx.strokeStyle = param.color1;
        ctx.fillStyle = param.color2;
        ctx.setLineDash([]);
        ctx.lineWidth = param.size;
        let centerX = (endX - startX) / 2;
        let centerY = (endY - startY) / 2;
        let radius;
        if (Math.sqrt(Math.pow(endX - startX, 2)) / 2 < Math.sqrt(Math.pow(endY - startY, 2)) / 2) {
            radius = Math.sqrt(Math.pow(endX - startX, 2)) / 2;
        } else {
            radius = Math.sqrt(Math.pow(endY - startY, 2)) / 2;
        }
        let stretchX = Math.sqrt(Math.pow((endX - startX) / (endY - startY), 2));
        let stretchY = Math.sqrt(Math.pow((endY - startY) / (endX - startX), 2));
        if (param.subTool.stretch) {
            if (stretchX > stretchY) {
                stretchY = 1;
            } else {
                stretchX = 1;
            }
        } else {
            stretchX = 1;
            stretchY = 1;
        }
        if (param.subTool.shape !== "Curve" && param.subTool.shape !== "Line") {
            ctx.save();
            ctx.translate(startX + centerX, startY + centerY);
            ctx.rotate((Math.PI * param.subTool.angle) / 180);
        }
        if (param.subTool.shape === "Rectangle") {
            drawFunctions["draw" + param.subTool.shape](centerX, centerY);
        } else {
            drawFunctions["draw" + param.subTool.shape](stretchX, stretchY, radius);
        }
        if (param.subTool.shape !== "Line" &&
            param.subTool.shape !== "Curve") {
            ctx.restore();
        }
    }

    const drawLine = () => {
        ctx.beginPath();
        ctx.moveTo(
            startX,
            startY,
        )
        ctx.lineTo(
            endX,
            endY,
        )
        ctx.stroke();
    }

    const drawCurve = () => {
        let startPoint = { x: 0, y: 0 };
        let endPoint = { x: 0, y: 0 };
        let controlPoint1 = { x: 0, y: 0 };
        let controlPoint2 = { x: 0, y: 0 };
        ctx.beginPath();
        if (param.curveControls.start.x === -1) {
            startPoint = { x: startX, y: startY };
            endPoint = { x: endX, y: endY };
            controlPoint1 = { x: startX, y: startY };
            controlPoint2 = { x: endX, y: endY };
        } else if (param.curveControls.controlPoint1.x === -1) {
            startPoint = param.curveControls.start;
            endPoint = param.curveControls.end;
            controlPoint1 = { x: endX, y: endY };
            controlPoint2 = param.curveControls.end;
        } else if (param.curveControls.controlPoint2.x === -1) {
            startPoint = param.curveControls.start;
            endPoint = param.curveControls.end;
            controlPoint1 = param.curveControls.controlPoint1;
            controlPoint2 = { x: endX, y: endY };
        } else {
            startPoint = param.curveControls.start;
            endPoint = param.curveControls.end;
            controlPoint1 = param.curveControls.controlPoint1;
            controlPoint2 = param.curveControls.controlPoint2;
        }
        ctx.moveTo(
            startPoint.x,
            startPoint.y,
        )
        ctx.bezierCurveTo(
            controlPoint1.x,
            controlPoint1.y,
            controlPoint2.x,
            controlPoint2.y,
            endPoint.x,
            endPoint.y,
        )
        ctx.stroke();
    }
    const drawRectangle = (centerX, centerY) => {
        if (param.subTool.fill) {
            ctx.fillRect(
                -centerX,
                -centerY,
                endX - startX,
                endY - startY,
            );
        }
        ctx.strokeRect(
            -centerX,
            -centerY,
            endX - startX,
            endY - startY,
        );
    }

    const drawCircle = (stretchX, stretchY, radius) => {
        ctx.beginPath();
        ctx.ellipse(
            0,
            0,
            stretchX * radius,
            stretchY * radius,
            0,
            0,
            2 * Math.PI
        );
        if (param.subTool.fill) {
            ctx.fill();
        }
        ctx.stroke();
    }

    const drawPolygon = (stretchX, stretchY, radius) => {
        ctx.beginPath();
        for (let i = 0; i < param.subTool.sides + 2; i++) {
            ctx.lineTo(
                stretchX * radius * Math.cos((2 * Math.PI * i / param.subTool.sides) - Math.PI / 2 + (Math.PI / 180 * param.subTool.startAngle)),
                stretchY * radius * Math.sin((2 * Math.PI * i / param.subTool.sides) - Math.PI / 2 + (Math.PI / 180 * param.subTool.startAngle))
            );
        };
        if (param.subTool.fill) {
            ctx.fill();
        }
        ctx.stroke();
    }

    const drawStar = (stretchX, stretchY, radius) => {
        ctx.beginPath();
        for (let i = 0; i < param.subTool.sides * 2 + 2; i++) {
            if (i % 2 === 0) {
                ctx.lineTo(
                    stretchX * radius * Math.cos((Math.PI * i / param.subTool.sides) - Math.PI / 2 + (Math.PI / 180 * param.subTool.startAngle)),
                    stretchY * radius * Math.sin((Math.PI * i / param.subTool.sides) - Math.PI / 2 + (Math.PI / 180 * param.subTool.startAngle))
                );
            } else {
                ctx.lineTo(
                    stretchX * radius / 3 * Math.cos((Math.PI * i / param.subTool.sides) - Math.PI / 2 + (Math.PI / 180 * param.subTool.startAngle)),
                    stretchY * radius / 3 * Math.sin((Math.PI * i / param.subTool.sides) - Math.PI / 2 + (Math.PI / 180 * param.subTool.startAngle))
                );
            }
        };
        if (param.subTool.fill) {
            ctx.fill();
        }
        ctx.stroke();
    }

    const drawArrow = (stretchX, stretchY, radius) => {
        ctx.beginPath();
        ctx.moveTo(stretchX * -radius * Math.cos(Math.PI / 8), stretchY * -radius * Math.sin(Math.PI / 8));
        ctx.lineTo(0, stretchY * -radius * Math.sin(Math.PI / 8));
        ctx.lineTo(0, stretchY * -radius);
        ctx.lineTo(stretchX * radius, 0);
        ctx.lineTo(0, stretchY * radius);
        ctx.lineTo(0, stretchY * radius * Math.sin(Math.PI / 8));
        ctx.lineTo(stretchX * -radius * Math.cos(Math.PI / 8), stretchY * radius * Math.sin(Math.PI / 8));
        ctx.closePath();
        if (param.subTool.fill) {
            ctx.fill();
        }
        ctx.stroke();
    }

    const drawHeart = (stretchX, stretchY, radius) => {
        if (param.subTool.stretch) {
            if (stretchX > stretchY) {
                ctx.scale(stretchX, 1);
            } else {
                ctx.scale(1, stretchY);
            }
        }
        ctx.beginPath();
        ctx.moveTo(0, radius);
        ctx.arc(-radius / 2, -radius / 5, radius / 2, 3 * Math.PI / 4, 0, false);
        ctx.arc(radius / 2, -radius / 5, radius / 2, Math.PI, Math.PI / 4, false);
        ctx.closePath();
        if (param.subTool.fill) {
            ctx.fill();
        }
        ctx.stroke();
    }

    const drawFunctions = {
        drawBrush,
        drawEraser,
        drawSpray,
        drawBucket,
        drawText,
        drawPipette,
        drawSelect,
        drawShape,
        drawLine,
        drawCurve,
        drawCircle,
        drawRectangle,
        drawPolygon,
        drawStar,
        drawArrow,
        drawHeart,
    };
    if (preview) {
        ctx.clearRect(0, 0, width, height);
        if (param.tool !== "Magnifier") {
            if (param.tool === "Bucket" || param.tool === "Pipette") {
                return;
            } else if (param.tool === "Spray") {
                drawEraser();
            }
            else {
                drawFunctions["draw" + param.tool]();
            }
        }
    } else if (param.tool !== "Magnifier") {
        drawFunctions["draw" + param.tool]();
    }
}