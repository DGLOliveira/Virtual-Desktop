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
import nameToHsl from "./Converters/nameToHsl";
import "../styles.css";

export default function ColorPicker({ color, setColor, useAlpha }) {
    const colorPickerRef = useRef(null);
    const hueLumRef = useRef(null);
    const saturationRef = useRef(null);
    const alphaRef = useRef(null);
    const [colorSelectorPos, setColorSelectorPos] = useState({ x: 0, y: 0 });
    const [saturationSliderPos, setSaturationSliderPos] = useState(0);
    const [alphaSliderPos, setAlphaSliderPos] = useState(0);
    const [open, setOpen] = useState(false);
    const [format, setFormat] = useState("HSLA");
    const [HSLA, setHSLA] = useState([0, 0, 0, 0]);
    const [RGBA, setRGBA] = useState([0, 0, 0, 0]);
    const [HEX, setHEX] = useState("#00000000");


    const [hue, setHue] = useState(0);
    const [lightness, setLightness] = useState(50);
    const [saturation, setSaturation] = useState(100);
    const [alpha, setAlpha] = useState(100);


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
                setHue(Number(hslaColor[0]));
                setSaturation(Number(hslaColor[1].slice(0, hslaColor[1].length - 1)));
                setLightness(Number(hslaColor[2].slice(0, hslaColor[2].length - 1)));
                setAlpha(Number(hslaColor[3]));
                if (open) {
                    const hueLumRect = hueLumRef.current.getBoundingClientRect();
                    setColorSelectorPos({
                        x: hslaColor[0] / 360 * hueLumRect.width,
                        y: (100 - hslaColor[2].slice(0, hslaColor[2].length - 1)) / 100 * hueLumRect.height
                    });
                    const saturationRect = saturationRef.current.getBoundingClientRect();
                    setSaturationSliderPos(((100 - hslaColor[1].slice(0, hslaColor[1].length - 1)) / 100) * saturationRect.height);
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
                setHue(Number(hslColor[0]));
                setSaturation(Number(hslColor[1].slice(0, hslColor[1].length - 1)));
                setLightness(Number(hslColor[2].slice(0, hslColor[2].length - 1)));
                if (open) {
                    const hueLumRect = hueLumRef.current.getBoundingClientRect();
                    setColorSelectorPos({
                        x: hslColor[0] / 360 * hueLumRect.width,
                        y: (100 - hslColor[2].slice(0, hslColor[2].length - 1)) / 100 * hueLumRect.height
                    });
                    const saturationRect = saturationRef.current.getBoundingClientRect();
                    setSaturationSliderPos(((100 - hslColor[1].slice(0, hslColor[1].length - 1)) / 100) * saturationRect.height);
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
                ctx.fillStyle = `hsl(${i},${saturation}%,${100 - j}%)`;
                ctx.fillRect(i * blockwidth, j * blockheight, (i + 1) * blockwidth, (j + 1) * blockheight);
            }
        }
    };

    //Updates color map when saturation changes
    useEffect(() => {
        if (hueLumRef.current) {
            const ctxColorPicker = hueLumRef.current.getContext("2d", { alpha: false });
            drawColorMap(ctxColorPicker);
        }

    }, [open, saturation]);

    //Updates hue and luminance map slider positions when mouse moves, as well as their respective values
    const handleHueLumMap = (event) => {
        if (event.buttons !== 0) {
            const rect = hueLumRef.current.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                setColorSelectorPos({ x, y });
                setHue(Math.floor(360 * x / rect.width));
                setLightness(100 - Math.floor(100 * y / rect.height));
            }
        }
    };
    const touchHueLumMap = (event) => {
        if (event.touches.length === 1) {
            const rect = hueLumRef.current.getBoundingClientRect();
            let x = event.touches[0].clientX - rect.left;
            let y = event.touches[0].clientY - rect.top;
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                setColorSelectorPos({ x, y });
                setHue(Math.floor(360 * x / rect.width));
                setLightness(100 - Math.floor(100 * y / rect.height));
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
                setSaturation(100 - Math.floor(100 * y / rect.height));
                setSaturationSliderPos(y);
            }
        }
    };
    const touchSaturationSlider = (event) => {
        if (event.touches.length === 1) {
            const rect = saturationRef.current.getBoundingClientRect();
            let x = event.touches[0].clientX - rect.left;
            let y = event.touches[0].clientY - rect.top;
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                setSaturation(100 - Math.floor(100 * y / rect.height));
                setSaturationSliderPos(y);
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
                setAlpha((Math.floor(100 * x / rect.width)) / 100);
                setAlphaSliderPos(x);
            }
        }
    };
    const touchAlphaSlider = (event) => {
        if (event.touches.length === 1) {
            const rect = alphaRef.current.getBoundingClientRect();
            let x = event.touches[0].clientX - rect.left;
            let y = event.touches[0].clientY - rect.top;
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                setAlpha((Math.floor(100 * x / rect.width)) / 100);
                setAlphaSliderPos(x);
            }
        }
    };


    const handleHueInput = (value) => {
        setHue(value);
        const rect = hueLumRef.current.getBoundingClientRect();
        setColorSelectorPos({ ...colorSelectorPos, x: value / 360 * rect.width });
    };

    const handleLumInput = (value) => {
        setLightness(value);
        const rect = hueLumRef.current.getBoundingClientRect();
        setColorSelectorPos({ ...colorSelectorPos, y: (100 - value) / 100 * rect.height });
    };

    const handleSaturationInput = (value) => {
        setSaturation(value);
        const rect = saturationRef.current.getBoundingClientRect();
        setSaturationSliderPos(((100 - value) / 100) * rect.height);
    };

    const handleAlphaInput = (value) => {
        setAlpha(value);
        const rect = alphaRef.current.getBoundingClientRect();
        setAlphaSliderPos(value * rect.width);
    };

    //Updates all color formatted values
    const updateAllColors = (target, value) => {
        let newRGBA = []
        let newHSLA = []
        let newHEX = ""
        switch (target) {
            case "HEX":
                newHEX = value;
                newRGBA = hexToRgba(value);
                newHSLA = rgbaToHsla(newRGBA);
                break;
            case "HSLA":
                newHSLA = value;
                newRGBA = hslaToRgba(value);
                newHEX = rgbaToHex(newRGBA);
                break;
            case "RGBA":
                newRGBA = value;
                newHSLA = rgbaToHsla(value);
                newHEX = rgbaToHex(value);
                break;
        }
        setHEX(newHEX);
        setHSLA(newHSLA);
        setRGBA(newRGBA);
        //if (selected) setColors({ ...colors, [selected]: newHex });
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
                                style={{ opacity: useAlpha ? alpha : 1 }}
                            />
                            <slider-thumb
                                style={{
                                    top: colorSelectorPos.y,
                                    left: colorSelectorPos.x,
                                    background:
                                        useAlpha ?
                                            `hsla(${hue},${saturation}%,${lightness}%, ${alpha})` :
                                            `hsl(${hue},${saturation}%,${lightness}%)`
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
                                        `linear-gradient(0deg, hsl(${hue},0%,${lightness}%), hsla(${hue},100%,${lightness}%))`
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
                                    background: `hsla(${hue},${saturation}%,${lightness}%, ${alpha})`
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
                                        `linear-gradient(90deg, hsla(${hue},${saturation}%,${lightness}%, 0), hsla(${hue},${saturation}%,${lightness}%, 1))`
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
                                    background: `hsl(${hue},${saturation}%,${lightness}%, ${alpha})`
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
                            onClick={() => setFormat("HSLA")}
                            className={format === "HSLA" ? "buttonActive" : ""}>
                            {useAlpha ? "HSLA" : "HSL"}
                        </button>
                        <button
                            onClick={() => setFormat("RGBA")}
                            className={format === "RGBA" ? "buttonActive" : ""}>
                            {useAlpha ? "RGBA" : "RGB"}
                        </button>
                        <button
                            onClick={() => setFormat("HEX")}
                            className={format === "HEX" ? "buttonActive" : ""}>
                            HEX
                        </button>
                    </color-format>
                    <color-inputs>
                {format === "HSLA" &&
                    <>
                        <div>
                            <label htmlFor="hue">Hue</label>
                            <input type="number" id="hue" value={HSLA[0]} min="0" max="360" onChange={(e) => {/*handleHSLInput("h", e.target.value)*/}} />
                        </div>
                        <div>
                            <label htmlFor="saturation" title="Saturation">Sat.</label>
                            <input type="number" id="saturation" value={HSLA[1]} min="0" max="100" onChange={(e) => {/*handleHSLInput("s", e.target.value)*/}} />
                        </div>
                        <div>
                            <label htmlFor="luminosity" title="Luminosity">Lum.</label>
                            <input type="number" id="luminosity" value={HSLA[2]} min="0" max="100" onChange={(e) => {/*handleHSLInput("l", e.target.value)*/}} />
                        </div>
                        {useAlpha &&
                        <div>
                            <label htmlFor="alpha">Alpha</label>
                            <input type="number" id="alpha" value={HSLA[3]} min="0" max="1" step="0.01" onChange={(e) => {/*handleHSLInput("b", e.target.value)*/}} />
                        </div>}
                    </>}
                {format === "RGBA" &&
                    <>
                        <div>
                            <label htmlFor="red">Red</label>
                            <input type="number" id="red" value={RGBA[0]} min="0" max="255" onChange={(e) => {/*handleRGBInput("r", e.target.value)*/}} />
                        </div>
                        <div>
                            <label htmlFor="green">Green</label>
                            <input type="number" id="green" value={RGBA[1]} min="0" max="255" onChange={(e) => {/*handleRGBInput("g", e.target.value)*/}} />
                        </div>
                        <div>
                            <label htmlFor="blue">Blue</label>
                            <input type="number" id="blue" value={RGBA[2]} min="0" max="255" onChange={(e) => {/*handleRGBInput("b", e.target.value)*/}} />
                        </div>
                        {useAlpha &&
                        <div>
                            <label htmlFor="alpha">Alpha</label>
                            <input type="number" id="alpha" value={RGBA[3]} min="0" max="1" step="0.01" onChange={(e) => {/*handleRGBInput("b", e.target.value)*/}} />
                        </div>}
                    </>
                }{/*
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
                    </>*/
                }
                        {/*format === "HSLA" && <>
                            <div>
                                Hue
                                <input type="number" min="0" max="360" value={hue}
                                    onChange={(e) => handleHueInput(e.target.value)} />
                            </div>
                            <div>
                                Lum.
                                <input type="number" min="0" max="100" value={lightness}
                                    onChange={(e) => handleLumInput(e.target.value)} />
                            </div>
                            <div>
                                Sat.
                                <input type="number" min="0" max="100" value={saturation}
                                    onChange={(e) => handleSaturationInput(e.target.value)} />
                            </div>
                            {useAlpha &&
                                <div>
                                    Alpha
                                    <input type="number" min="0" max="1" step="0.01" value={alpha}
                                        onChange={(e) => handleAlphaInput(e.target.value)} />
                                </div>
                            }</>*/}
                    </color-inputs>
                    <color-button >
                        <button
                            style={{
                                background: useAlpha ? `hsla(${hue},${saturation}%,${lightness}%, ${alpha})` : `hsl(${hue},${saturation}%,${lightness}%)`
                            }}
                            onClick={() => { useAlpha ? setColor(`hsla(${hue},${saturation}%,${lightness}%, ${alpha})`) : setColor(`hsl(${hue},${saturation}%,${lightness}%)`) }}
                        >
                            Apply
                        </button>
                    </color-button>
                </color-picker-window>
                , document.getElementById("root"))}
        </>
    );
}