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
    const boundary = canvas.getBoundingClientRect();
    const height = ctx.canvas.height;
    const width = ctx.canvas.width;
    const scaleX = width / boundary.width;
    const scaleY = height / boundary.height;
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
            (x - boundary.left) * scaleX,
            (y - boundary.top) * scaleY,
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
            (x - boundary.left) * scaleX,
            (y - boundary.top) * scaleY,
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
            (x - boundary.left) * scaleX + randomX,
            (y - boundary.top) * scaleY + randomY,
            1,
            1,
        );
    };

    const drawPipette = () => {
        let pixel = ctx.getImageData(
            (x - boundary.left) * scaleX,
            (y - boundary.top) * scaleY,
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
        }else {
            if (l <= 0.5) {
                s = delta / (cmax + cmin);
            } else {
                s = delta / (2 - cmax-cmin);
            };
            if (cmax === r) {
                h = (g - b) / delta;
            } else if (cmax === g) {
                h = ((b - r) / delta) + 2;
            } else if(cmax === b) {
                h = ((r - g) / delta) + 4;
            }
        }
        h = Math.round(h * 60);
        if (h < 0) {
            h += 360;
        }
        s = Math.abs(s * 100).toFixed(0);
        l = (l * 100 ).toFixed(0);
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
        h=hslaColor[0]/360;
        s=hslaColor[1].slice(0, -1)/100;
        l=hslaColor[2].slice(0, -1)/100;
        if(s === 0) {
            r = l * 255;
            g = l * 255;
            b = l * 255;
        }else{
            let temp1, temp2, tempR, tempG, tempB;
            if(l < 0.5){
                temp1 = l * (1 + s);
            }else{
                temp1 = (l + s) - (l * s);
            }
            temp2 = 2 * l - temp1;
            function secondTest(value) {
                if(value < 0){
                    return value + 1;
                }else if(value > 1){
                    return value - 1;
                }else{
                    return value;
                }
            }
            tempR = secondTest(h + 1 / 3);
            tempG = secondTest(h);
            tempB = secondTest(h - 1 / 3);
            function finalTest(temp1, temp2, tempColor) {
                if(6*tempColor < 1){
                    return temp2 + (temp1 - temp2) * 6 * tempColor;
                }else if(2*tempColor < 1){
                    return temp1;
                }else if(3*tempColor < 2){
                    return temp2 + (temp1 - temp2) * (2 / 3 - tempColor) * 6;
                }else{
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
        let hexColor =  "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
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
            if (currX < 0 || currX < 0 || currX >= pixelData.width || currX >= pixelData.height) {
                return -1;  // impossible color
            }
            return pixelData.data[currY * imageData.width + currX];
        };
        //break addBucket if color is the same
        let targetColor = getPixel((x - boundary.left) * scaleX, (y - boundary.top) * scaleY);
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
        addSpan((x - boundary.left) * scaleX, (x - boundary.left) * scaleX, (y - boundary.top) * scaleY, 0);
        let whileBreak = 0;
        while (spans.length > 0 && whileBreak < 10000) {
            whileBreak++;
            const { left, right, line, direction } = spans.pop();
            let l = left;
            for (; ;) {
                l--;
                const color = getPixel(l, line);
                if (color !== targetColor) {
                    break;
                }
            }
            ++l;
            let r = right;
            for (; ;) {
                ++r;
                const color = getPixel(r, line);
                if (color !== targetColor) {
                    break;
                }
            }
            const lineOffset = line * width;
            pixelData.data.fill(selectedColor, lineOffset + l, lineOffset + r);
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
        ctx.putImageData(imageData, 0, 0);
    };

    const drawText = () => {
        ctx.fillStyle = param.selectedColor;
        ctx.font = String(param.size + "px " + param.text.fontFamily);
        ctx.fillText(
            param.text.text,
            (endX - boundary.left) * scaleX,
            (endY - boundary.top) * scaleY,
        );
    };

    const drawSelect = () => {
        switch (param.clipboard.state) {
            case "copy":
                if (!preview && endX - startX !== 0 && endY - startY !== 0) {
                    let data = ctx.getImageData(
                        (startX - boundary.left) * scaleX,
                        (startY - boundary.top) * scaleY,
                        (endX - startX) * scaleX,
                        (endY - startY) * scaleY
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
                        (startX - boundary.left) * scaleX,
                        (startY - boundary.top) * scaleY,
                        (endX - startX) * scaleX,
                        (endY - startY) * scaleY
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
                        (startX - boundary.left) * scaleX,
                        (startY - boundary.top) * scaleY,
                        (endX - startX) * scaleX,
                        (endY - startY) * scaleY,
                    );
                }
                break;
            case "carry":
                ctx.strokeStyle = param.selectedColor;
                ctx.lineWidth = 1;
                ctx.setLineDash([5]);
                if (cursor.down) {
                    ctx.putImageData(
                        param.clipboard.data,
                        (x - boundary.left) * scaleX,
                        (y - boundary.top) * scaleY
                    );
                    ctx.strokeRect(
                        (x - boundary.left) * scaleX,
                        (y - boundary.top) * scaleY,
                        param.clipboard.data.width,
                        param.clipboard.data.height,
                    );
                } else {
                    ctx.putImageData(
                        param.clipboard.data,
                        (endX - boundary.left) * scaleX,
                        (endY - boundary.top) * scaleY
                    );
                    ctx.strokeRect(
                        (endX - boundary.left) * scaleX,
                        (endY - boundary.top) * scaleY,
                        param.clipboard.data.width,
                        param.clipboard.data.height,
                    );
                }
                break;
            case "paste":
                if (!preview) {
                    ctx.putImageData(
                        param.clipboard.data,
                        (endX - boundary.left) * scaleX,
                        (endY - boundary.top) * scaleY
                    );
                    param.setClipboard({
                        ...param.clipboard,
                        state: "none"
                    });
                }
                break;
            case "none":
            default:
                ctx.strokeStyle = param.selectedColor;
                ctx.lineWidth = 1;
                ctx.setLineDash([5]);
                ctx.strokeRect(
                    (startX - boundary.left) * scaleX,
                    (startY - boundary.top) * scaleY,
                    (endX - startX) * scaleX,
                    (endY - startY) * scaleY,
                );
                break;
        }
    };

    const drawRectangleSelection = () => {
        ctx.strokeStyle = param.selectedColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([5]);
        ctx.strokeRect(
            (startX - boundary.left) * scaleX,
            (startY - boundary.top) * scaleY,
            (endX - startX) * scaleX,
            (endY - startY) * scaleY,
        );
    }

    const drawCircleSelection = (centerX, centerY, radius) => {
        ctx.strokeStyle = param.selectedColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([5]);
        ctx.beginPath();
        ctx.arc(
            (startX + centerX - boundary.left) * scaleX,
            (startY + centerY - boundary.top) * scaleY,
            radius * scaleX,
            0,
            Math.PI * 2,
        );
        ctx.stroke();
        ctx.closePath();
    }

    const drawEllipseSelection = (centerX, centerY, stretchX, stretchY, radius) => {
        ctx.strokeStyle = param.selectedColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([5]);
        ctx.beginPath();
        ctx.ellipse(
            (startX + centerX - boundary.left) * scaleX,
            (startY + centerY - boundary.top) * scaleY,
            stretchX * radius * scaleX,
            stretchY * radius * scaleY,
            Math.PI / 180 * param.subTool.angle,
            0,
            Math.PI * 2,
        );
        ctx.stroke();
        ctx.closePath();
    }

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
            ctx.translate((startX + centerX - boundary.left) * scaleX, (startY + centerY - boundary.top) * scaleY);
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
            if (preview) {
                drawRectangleSelection();
                drawCircleSelection(centerX, centerY, radius);
                if (param.subTool.stretch) {
                    drawEllipseSelection(centerX, centerY, stretchX, stretchY, radius);
                }
            }
        }
    }

    const drawLine = () => {
        ctx.beginPath();
        ctx.moveTo(
            (startX - boundary.left) * scaleX,
            (startY - boundary.top) * scaleY,
        )
        ctx.lineTo(
            (endX - boundary.left) * scaleX,
            (endY - boundary.top) * scaleY,
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
            (startPoint.x - boundary.left) * scaleX,
            (startPoint.y - boundary.top) * scaleY,
        )
        ctx.bezierCurveTo(
            (controlPoint1.x - boundary.left) * scaleX,
            (controlPoint1.y - boundary.top) * scaleY,
            (controlPoint2.x - boundary.left) * scaleX,
            (controlPoint2.y - boundary.top) * scaleY,
            (endPoint.x - boundary.left) * scaleX,
            (endPoint.y - boundary.top) * scaleY,
        )
        ctx.stroke();
    }
    const drawRectangle = (centerX, centerY) => {
        if (param.subTool.fill) {
            ctx.fillRect(
                -centerX * scaleX,
                -centerY * scaleY,
                (endX - startX) * scaleX,
                (endY - startY) * scaleY,
            );
        }
        ctx.strokeRect(
            -centerX * scaleX,
            -centerY * scaleY,
            (endX - startX) * scaleX,
            (endY - startY) * scaleY,
        );
    }

    const drawCircle = (stretchX, stretchY, radius) => {
        ctx.beginPath();
        ctx.ellipse(
            0,
            0,
            stretchX * radius * scaleX,
            stretchY * radius * scaleY,
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
                scaleX * stretchX * radius * Math.cos((2 * Math.PI * i / param.subTool.sides) - Math.PI / 2 + (Math.PI / 180 * param.subTool.startAngle)),
                scaleY * stretchY * radius * Math.sin((2 * Math.PI * i / param.subTool.sides) - Math.PI / 2 + (Math.PI / 180 * param.subTool.startAngle))
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
                    scaleX * stretchX * radius * Math.cos((Math.PI * i / param.subTool.sides) - Math.PI / 2 + (Math.PI / 180 * param.subTool.startAngle)),
                    scaleY * stretchY * radius * Math.sin((Math.PI * i / param.subTool.sides) - Math.PI / 2 + (Math.PI / 180 * param.subTool.startAngle))
                );
            } else {
                ctx.lineTo(
                    scaleX * stretchX * radius / 3 * Math.cos((Math.PI * i / param.subTool.sides) - Math.PI / 2 + (Math.PI / 180 * param.subTool.startAngle)),
                    scaleY * stretchY * radius / 3 * Math.sin((Math.PI * i / param.subTool.sides) - Math.PI / 2 + (Math.PI / 180 * param.subTool.startAngle))
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
        ctx.moveTo(scaleX * stretchX * -radius * Math.cos(Math.PI / 8), scaleY * stretchY * -radius * Math.sin(Math.PI / 8));
        ctx.lineTo(0, scaleY * stretchY * -radius * Math.sin(Math.PI / 8));
        ctx.lineTo(0, scaleY * stretchY * -radius);
        ctx.lineTo(scaleX * stretchX * radius, 0);
        ctx.lineTo(0, scaleY * stretchY * radius);
        ctx.lineTo(0, scaleY * stretchY * radius * Math.sin(Math.PI / 8));
        ctx.lineTo(scaleX * stretchX * -radius * Math.cos(Math.PI / 8), scaleY * stretchY * radius * Math.sin(Math.PI / 8));
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
        ctx.moveTo(0, radius * scaleY);
        ctx.arc(scaleX * -radius / 2, scaleY * -radius / 5, scaleX * radius / 2, 3 * Math.PI / 4, 0, false);
        ctx.arc(scaleX * radius / 2, scaleY * -radius / 5, scaleX * radius / 2, Math.PI, Math.PI / 4, false);
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