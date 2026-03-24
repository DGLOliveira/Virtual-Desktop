/*
Custom color picker to replace default color picker from input[type="color"],
allowing for the use of alpha channel. The color picker is open on click,
and closes on blur. 
The color preview is set on color change, and applied when confirmed, by use 
of the callback function setColor, which is passed as props.
The return value is always in hsl or hsla format.
The alpha channel is used only if the useAlpha prop is true.

TODO: 
Add support for gradients,
Add support for color values RGB, RGBA, hex, and hex with alpha
*/
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import hexToRgb from "./Converters/hexToRgb";
import hexToRgba from "./Converters/hexToRgba";
import rgbToHsl from "./Converters/rgbToHsl";
import rgbaToHsla from "./Converters/rgbaToHsla";
import rgbToHex from "./Converters/rgbToHex";
import rgbaToHex from "./Converters/rgbaToHex";
import hslToRgb from "./Converters/hslToRgb";
import hslaToRgba from "./Converters/hslaToRgba";
import nameToHsl from "./Converters/nameToHsl";
import "../styles.css";
import { update } from "three/examples/jsm/libs/tween.module.js";

export default function ColorPicker({ color, setColor, useAlpha }) {
    const colorPickerRef = useRef(null);
    const hueLumRef = useRef(null);
    const saturationRef = useRef(null);
    const alphaRef = useRef(null);
    const [colorSelectorPos, setColorSelectorPos] = useState({ x: 0, y: 0 });
    const [saturationSliderPos, setSaturationSliderPos] = useState(0);
    const [alphaSliderPos, setAlphaSliderPos] = useState(0);
    const [open, setOpen] = useState(false);
    const [format, setFormat] = useState("HSL");
    const [HSL, setHSL] = useState(useAlpha ? [0, 0, 0, 0] : [0, 0, 0]);
    const [RGB, setRGB] = useState(useAlpha ? [0, 0, 0, 0] : [0, 0, 0]);
    const [HEX, setHEX] = useState(useAlpha ? "#00000000" : "#000000");
    const [hexInput, setHexInput] = useState(useAlpha ? "#00000000" : "#000000");
    const [invalidHex, setInvalidHex] = useState(false);

    // Focus color picker when open, allowing its closing on blur
    useEffect(() => {
        if (open) {
            colorPickerRef.current.focus();
        }
    }, [open]);

    // Closes color picker on blur
    const handleBlur = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setOpen(false);
        }
    };
    
    //Updates all color formatted values
    const updateAllColors = (target, value) => {
        console.log(target, value); 
        let newRGB = []
        let newHSL = []
        let newHEX = ""
        switch (target) {
            case "hex":
                newHEX = value;
                newRGB = useAlpha ? hexToRgba(newHEX) : hexToRgb(newHEX);
                newHSL = useAlpha ? rgbaToHsla(newRGB) : rgbToHsl(newRGB);
                break;
            case "hsl":
                newHSL = value;
                newRGB = useAlpha ? hslaToRgba(newHSL) : hslToRgb(newHSL);
                newHEX = useAlpha ? rgbaToHex(newRGB) : rgbToHex(newRGB);
                break;
            case "rgb":
                newRGB = value;
                newHSL = useAlpha ? rgbaToHsla(newRGB) : rgbToHsl(newRGB);
                newHEX = useAlpha ? rgbaToHex(newRGB) : rgbToHex(newRGB);
                break;
        }
        console.log(newHEX, newHSL, newRGB);
        setHEX(newHEX);
        setHexInput(newHEX);
        setHSL(newHSL);
        setRGB(newRGB);
    }

    // Set displayed color based on current hue, saturation, and lightness, and uptades slider positions
    // Note: Independent of selected format, all colors are internally stored in hsl/hsla format
    useEffect(() => {
        if (color) {
            if (useAlpha) {
                let hslaColor = [];
                if (color[0] === "#") {
                    hslaColor = rgbaToHsla(hexToRgba(color));
                } else if (color.slice(0, 4) === "rgba") {
                    hslaColor = rgbaToHsla(color);
                } else if (color.slice(0, 4) === "hsla") {
                    for (let i = 0; i < color.length; i++) {
                        var start;
                        var end;
                        if (color[i] === "(") {
                            start = i + 1;
                        } else if (color[i] === ")") {
                            end = i;
                            hslaColor.push(color.slice(start, end));
                        } else if (color[i] === ",") {
                            hslaColor.push(color.slice(start, i));
                            start = i + 1;
                        }
                    }
                }
                hslaColor = [
                    Number(hslaColor[0]), 
                    Number(hslaColor[1].slice(0, hslaColor[1].length - 1)), 
                    Number(hslaColor[2].slice(0, hslaColor[2].length - 1)), 
                    Number(hslaColor[3])
                ];
                updateAllColors("hsl", hslaColor);
                if (open) {
                    const hueLumRect = hueLumRef.current.getBoundingClientRect();
                    setColorSelectorPos({
                        x: hslaColor[0] / 360 * hueLumRect.width,
                        y: (100 - hslaColor[2]) / 100 * hueLumRect.height
                    });
                    const saturationRect = saturationRef.current.getBoundingClientRect();
                    setSaturationSliderPos(((100 - hslaColor[1]) / 100) * saturationRect.height);
                    const alphaRect = alphaRef.current.getBoundingClientRect();
                    setAlphaSliderPos(hslaColor[3] * alphaRect.width);
                }
            } else {
                let hslColor = [];
                if (color[0] === "#") {
                    hslColor = rgbToHsl(hexToRgb(color));
                } else if (color.slice(0, 3) === "rgb") {
                    hslColor = rgbToHsl(color);
                } else if (color.slice(0, 3) === "hsl") {
                    for (let i = 0; i < color.length; i++) {
                        var start;
                        var end;
                        if (color[i] === "(") {
                            start = i + 1;
                        } else if (color[i] === ")") {
                            end = i;
                            hslColor.push(color.slice(start, end));
                        } else if (color[i] === ",") {
                            hslColor.push(color.slice(start, i));
                            start = i + 1;
                        }
                    }
                } else {
                    hslColor = nameToHsl(color);
                }
                hslColor = [
                    Number(hslColor[0]), 
                    Number(hslColor[1].slice(0, hslColor[1].length - 1)), 
                    Number(hslColor[2].slice(0, hslColor[2].length - 1))
                ];
                updateAllColors("hsl", hslColor);
                if (open) {
                    const hueLumRect = hueLumRef.current.getBoundingClientRect();
                    setColorSelectorPos({
                        x: hslColor[0] / 360 * hueLumRect.width,
                        y: (100 - hslColor[2]) / 100 * hueLumRect.height
                    });
                    const saturationRect = saturationRef.current.getBoundingClientRect();
                    setSaturationSliderPos(((100 - hslColor[1]) / 100) * saturationRect.height);
                }
            }
        }
    }, [open, color, useAlpha])

    // Draw color map for hue on the x axis and lightness on the y axis, for the current saturation value
    const drawColorMap = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        let blockwidth = ctx.canvas.width / 360;
        let blockheight = ctx.canvas.height / 100;
        for (let i = 0; i < 360; i++) {
            for (let j = 0; j < 100; j++) {
                ctx.fillStyle = `hsl(${i},${HSL[1]}%,${100 - j}%)`;
                ctx.fillRect(i * blockwidth, j * blockheight, (i + 1) * blockwidth, (j + 1) * blockheight);
            }
        }
    };

    //Updates color map
    useEffect(() => {
        if (hueLumRef.current) {
            const ctxColorPicker = hueLumRef.current.getContext("2d", { alpha: false });
            drawColorMap(ctxColorPicker);
        }
    },[open, HSL[1]]);

    //Updates slider positions
    useEffect(() => {
        if (hueLumRef.current && saturationRef.current) {
            const rect = hueLumRef.current.getBoundingClientRect();
            setColorSelectorPos({ x: HSL[0] / 360 * rect.width, y: (100 - HSL[2]) / 100 * rect.height });
            const vert = saturationRef.current.getBoundingClientRect();
            setSaturationSliderPos(((100 - HSL[1]) / 100) * vert.height);
        }
        if (useAlpha && alphaRef.current) {
            const alphaRect = alphaRef.current.getBoundingClientRect();
            setAlphaSliderPos(HSL[3] * alphaRect.width);
        }

    }, [open, HEX]);

    //Updates hue and luminance map slider positions when mouse moves, as well as color values
    const handleHueLumMap = (event) => {
        if (event.buttons !== 0) {
            const rect = hueLumRef.current.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                setColorSelectorPos({ x, y });
                let newHSL = [Math.floor(360 * x / rect.width), HSL[1], 100 - Math.floor(100 * y / rect.height)];
                if(useAlpha){ 
                    newHSL[3] = HSL[3];
                }
                updateAllColors("hsl", newHSL);
            }
        }
    };
    //Updates hue and luminance map slider position on touch, as well as their respective values
    const touchHueLumMap = (event) => {
        if (event.touches.length === 1) {
            const rect = hueLumRef.current.getBoundingClientRect();
            let x = event.touches[0].clientX - rect.left;
            let y = event.touches[0].clientY - rect.top;
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                setColorSelectorPos({ x, y });
                let newHSL = [Math.floor(360 * x / rect.width), HSL[1], 100 - Math.floor(100 * y / rect.height)];
                if(useAlpha){ 
                    newHSL[3] = HSL[3];
                }
                updateAllColors("hsl", newHSL);
            }
        }
    };

    //Updates saturation slider position when mouse moves, as well as its value
    const handleSaturationSlider = (event) => {
        if (event.buttons !== 0) {
            const rect = saturationRef.current.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                setSaturationSliderPos(y);
                let newHSL = [HSL[0], 100 - Math.floor(100 * y / rect.height), HSL[2]];
                if(useAlpha){ 
                    newHSL[3] = HSL[3];
                }
                updateAllColors("hsl", newHSL);
            }
        }
    };
    //Updates saturation slider position on touch, as well as its value
    const touchSaturationSlider = (event) => {
        if (event.touches.length === 1) {
            const rect = saturationRef.current.getBoundingClientRect();
            let x = event.touches[0].clientX - rect.left;
            let y = event.touches[0].clientY - rect.top;
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                setSaturationSliderPos(y);
                let newHSL = [HSL[0], 100 - Math.floor(100 * y / rect.height), HSL[2]];
                if(useAlpha){ 
                    newHSL[3] = HSL[3];
                }
                updateAllColors("hsl", newHSL);
            }
        }
    };
    //Updates alpha slider position when mouse moves, as well as its value
    const handleAlphaSlider = (event) => {
        if (event.buttons !== 0) {
            const rect = alphaRef.current.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                setAlphaSliderPos(x);
                let newHSL = [HSL[0], HSL[1], HSL[2], (Math.floor(100 * x / rect.width)) / 100];
                updateAllColors("hsl", newHSL);
            }
        }
    };
    const touchAlphaSlider = (event) => {
        if (event.touches.length === 1) {
            const rect = alphaRef.current.getBoundingClientRect();
            let x = event.touches[0].clientX - rect.left;
            let y = event.touches[0].clientY - rect.top;
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                setAlphaSliderPos(x);
                let newHSL = [HSL[0], HSL[1], HSL[2], (Math.floor(100 * x / rect.width)) / 100];
                updateAllColors("hsl", newHSL);
            }
        }
    };

    //Updates color values based on HSL input
    const handleHSLInput = (target, value) => {
        let newHSL = HSL;
        if (target === "h") newHSL[0] = Number(value);
        if (target === "s") newHSL[1] = Number(value);
        if (target === "l") newHSL[2] = Number(value);
        if (target === "a") newHSL[3] = Number(value);
        updateAllColors("hsl", newHSL);
    }

    //Updates color values based on RGB input
    const handleRGBInput = (target, value) => {
        let newRGB = RGB;
        if (target === "r") newRGB[0] = Number(value);
        if (target === "g") newRGB[1] = Number(value);
        if (target === "b") newRGB[2] = Number(value);
        if (target === "a") newRGB[3] = Number(value);
        updateAllColors("rgb", newRGB);
    }

    //Validates hex color and updates color values if valid
    const handleHEXInput = () => {
        let newHex = "";
        if (!useAlpha) {
            if (hexInput.match(/^#([A-Fa-f0-9]{6})$/)) {
                newHex = hexInput
                updateAllColors("hex", newHex);
            }
            else if (hexInput.match(/^#([A-Fa-f0-9]{3})$/)) {
                newHex = `#${hexInput[1] + hexInput[1] + hexInput[2] + hexInput[2] + hexInput[3] + hexInput[3]}`
                updateAllColors("hex", newHex);
            } else if (hexInput.match(/^([A-Fa-f0-9]{6})$/)) {
                newHex = `#${hexInput[0] + hexInput[0] + hexInput[1] + hexInput[1] + hexInput[2] + hexInput[2]}`
                updateAllColors("hex", newHex);
            } else if (hexInput.match(/^([A-Fa-f0-9]{3})$/)) {
                newHex = `#${hexInput[0] + hexInput[0] + hexInput[1] + hexInput[1] + hexInput[2] + hexInput[2]}`
                updateAllColors("hex", newHex);
            }
        }else{
            if (hexInput.match(/^#([A-Fa-f0-9]{8})$/)) {
                newHex = hexInput
                updateAllColors("hex", newHex);
            }
            else if (hexInput.match(/^#([A-Fa-f0-9]{4})$/)) {
                newHex = `#${hexInput[1] + hexInput[1] + hexInput[2] + hexInput[2] + hexInput[3] + hexInput[3] + hexInput[4] + hexInput[4]}`
                updateAllColors("hex", newHex);
            } else if (hexInput.match(/^([A-Fa-f0-9]{8})$/)) {
                newHex = `#${hexInput[0] + hexInput[0] + hexInput[1] + hexInput[1] + hexInput[2] + hexInput[2] + hexInput[3] + hexInput[3]}`
                updateAllColors("hex", newHex);
            } else if (hexInput.match(/^([A-Fa-f0-9]{4})$/)) {
                newHex = `#${hexInput[0] + hexInput[0] + hexInput[1] + hexInput[1] + hexInput[2] + hexInput[2] + hexInput[3] + hexInput[3]}`
                updateAllColors("hex", newHex);
            }
        }
        if (newHex === "") {
            setInvalidHex(true);
        } else {
            setInvalidHex(false);
        }
    }

    return (
        <>
            <color-picker-button onClick={() => setOpen(!open)} >
                <div>
                    <button style={{ background: color }} />
                </div>
            </color-picker-button>
            {open && createPortal(
                <color-picker-window
                    tabIndex="0"
                    ref={colorPickerRef}
                    onBlur={(e) => handleBlur(e)}
                >
                    <div>
                        <hue-light-map>
                            <canvas
                                onMouseDown={(e) => handleHueLumMap(e)}
                                onMouseMove={(e) => handleHueLumMap(e)}
                                onTouchMove={(e) => touchHueLumMap(e)}
                                onTouchStart={(e) => touchHueLumMap(e)}
                                onTouchEnd={(e) => touchHueLumMap(e)}
                                ref={hueLumRef} width="180" height="180"
                                style={{ opacity: useAlpha ? HSL[3] : 1 }}
                            />
                            <slider-thumb
                                style={{
                                    top: colorSelectorPos.y,
                                    left: colorSelectorPos.x,
                                    background:
                                        useAlpha ?
                                            `hsla(${HSL[0]},${HSL[1]}%,${HSL[2]}%, ${HSL[3]})` :
                                            `hsl(${HSL[0]},${HSL[1]}%,${HSL[2]}%)`
                                }}
                                onMouseDown={(e) => handleHueLumMap(e)}
                                onMouseMove={(e) => handleHueLumMap(e)}
                                onTouchMove={(e) => touchHueLumMap(e)}
                                onTouchStart={(e) => touchHueLumMap(e)}
                                onTouchEnd={(e) => touchHueLumMap(e)}
                            />
                        </hue-light-map>
                        <saturation-slider title="Saturation">
                            <div
                                ref={saturationRef}
                                style={{
                                    background:
                                        `linear-gradient(0deg, hsl(${HSL[0]},0%,${HSL[2]}%), hsla(${HSL[0]},100%,${HSL[2]}%))`
                                }}
                                onMouseDown={(e) => handleSaturationSlider(e)}
                                onMouseMove={(e) => handleSaturationSlider(e)}
                                onTouchMove={(e) => touchSaturationSlider(e)}
                                onTouchStart={(e) => touchSaturationSlider(e)}
                                onTouchEnd={(e) => touchSaturationSlider(e)}
                            />
                            <slider-thumb
                                style={{
                                    top: saturationSliderPos,
                                    background: `hsla(${HSL[0]},${HSL[1]}%,${HSL[2]}%, ${HSL[3]})`
                                }}
                                onMouseDown={(e) => handleSaturationSlider(e)}
                                onMouseMove={(e) => handleSaturationSlider(e)}
                                onTouchMove={(e) => touchSaturationSlider(e)}
                                onTouchStart={(e) => touchSaturationSlider(e)}
                                onTouchEnd={(e) => touchSaturationSlider(e)}
                            />
                        </saturation-slider>
                    </div>
                    {useAlpha &&
                        <alpha-slider title="Alpha">
                            <div
                                ref={alphaRef}
                                style={{
                                    background:
                                        `linear-gradient(90deg, hsla(${HSL[0]},${HSL[1]}%,${HSL[2]}%, 0), hsla(${HSL[0]},${HSL[1]}%,${HSL[2]}%, 1))`
                                }}
                                onMouseDown={(e) => handleAlphaSlider(e)}
                                onMouseMove={(e) => handleAlphaSlider(e)}
                                onTouchMove={(e) => touchAlphaSlider(e)}
                                onTouchStart={(e) => touchAlphaSlider(e)}
                                onTouchEnd={(e) => touchAlphaSlider(e)}
                            />
                            <slider-thumb
                                style={{
                                    left: alphaSliderPos,
                                    background: `hsl(${HSL[0]},${HSL[1]}%,${HSL[2]}%, ${HSL[3]})`
                                }}
                                onMouseDown={(e) => handleAlphaSlider(e)}
                                onMouseMove={(e) => handleAlphaSlider(e)}
                                onTouchMove={(e) => touchAlphaSlider(e)}
                                onTouchStart={(e) => touchAlphaSlider(e)}
                                onTouchEnd={(e) => touchAlphaSlider(e)}
                            />
                        </alpha-slider>
                    }
                    <color-format>
                        <button
                            onClick={() => setFormat("HSL")}
                            className={format === "HSL" ? "buttonActive" : ""}>
                            {useAlpha ? "HSLA" : "HSL"}
                        </button>
                        <button
                            onClick={() => setFormat("RGB")}
                            className={format === "RGB" ? "buttonActive" : ""}>
                            {useAlpha ? "RGBA" : "RGB"}
                        </button>
                        <button
                            onClick={() => setFormat("HEX")}
                            className={format === "HEX" ? "buttonActive" : ""}>
                            HEX
                        </button>
                    </color-format>
                    <color-inputs>
                        {format === "HSL" &&
                            <>
                                <div>
                                    <label htmlFor="hue">Hue</label>
                                    <input type="number" id="hue" value={HSL[0]} min="0" max="360" onChange={(e) => handleHSLInput("h", e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="saturation" title="Saturation">Sat.</label>
                                    <input type="number" id="saturation" value={HSL[1]} min="0" max="100" onChange={(e) => handleHSLInput("s", e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="luminosity" title="Luminosity">Lum.</label>
                                    <input type="number" id="luminosity" value={HSL[2]} min="0" max="100" onChange={(e) => handleHSLInput("l", e.target.value)} />
                                </div>
                                {useAlpha &&
                                    <div>
                                        <label htmlFor="alpha">Alpha</label>
                                        <input type="number" id="alpha" value={HSL[3]} min="0" max="1" step="0.01" onChange={(e) => handleHSLInput("a", e.target.value)} />
                                    </div>}
                            </>}
                        {format === "RGB" &&
                            <>
                                <div>
                                    <label htmlFor="red">Red</label>
                                    <input type="number" id="red" value={RGB[0]} min="0" max="255" onChange={(e) => handleRGBInput("r", e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="green">Green</label>
                                    <input type="number" id="green" value={RGB[1]} min="0" max="255" onChange={(e) => handleRGBInput("g", e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="blue">Blue</label>
                                    <input type="number" id="blue" value={RGB[2]} min="0" max="255" onChange={(e) => handleRGBInput("b", e.target.value)} />
                                </div>
                                {useAlpha &&
                                    <div>
                                        <label htmlFor="alpha">Alpha</label>
                                        <input type="number" id="alpha" value={RGB[3]} min="0" max="1" step="0.01" onChange={(e) => handleRGBInput("a", e.target.value)} />
                                    </div>}
                            </>
                        }{
                    format === "HEX" &&
                    <>
                        <div style={{ justifyContent: "center" }}>
                            <input 
                            type="text" 
                            id="hex" 
                            pattern={useAlpha ? "#[0-9a-fA-F]{3}([0-9a-fA-F]{4})?" : "#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?"} 
                            value={hexInput} 
                            onChange={(e) => setHexInput(e.target.value)} />
                        </div>
                        <div style={{ justifyContent: "center" }}>
                            <button onClick={() => handleHEXInput()}>Confirm</button>
                        </div>
                        <div style={{ justifyContent: "center", color: "red" }}>
                            {invalidHex && "Invalid Value!"}
                        </div>
                    </>}
                    </color-inputs>
                    <color-button >
                        <button
                            style={{
                                background: useAlpha ? `hsla(${HSL[0]},${HSL[1]}%,${HSL[2]}%, ${HSL[3]})` : `hsl(${HSL[0]},${HSL[1]}%,${HSL[2]}%)`
                            }}
                            onClick={() => { useAlpha ? setColor(`hsla(${HSL[0]},${HSL[1]}%,${HSL[2]}%, ${HSL[3]})`) : setColor(`hsl(${HSL[0]},${HSL[1]}%,${HSL[2]}%)`) }}
                        >
                            Apply
                        </button>
                    </color-button>
                </color-picker-window>
                , document.getElementById("root"))}
        </>
    );
}