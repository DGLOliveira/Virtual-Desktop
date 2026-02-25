export default function Keypad({ handleInput, calculatorState, setCalculatorState }) {
    return (
        <div
            id="calculatorKeyboard"
            className={
                calculatorState.type == "Graphic"
                    ? "calculatorKeyboardGraphic"
                    : "calculatorKeyboardDigital"
            }
        >
            <div id="calculatorFunctions">
                {calculatorState.type !== "Basic" ? (
                    <>
                        <div
                            className={
                                calculatorState.alt
                                    ? "calculatorButton calculatorTypeButtonSelected notranslate"
                                    : "calculatorButton notranslate"
                            }
                            onClick={() => setCalculatorState({ ...calculatorState, alt: !calculatorState.alt, })}
                        >
                            Alt
                        </div>
                        <div
                            className={calculatorState.trig ? "calculatorButton calculatorTypeButtonSelected notranslate" : "calculatorButton notranslate"}
                            onClick={() => setCalculatorState({ ...calculatorState, trig: !calculatorState.trig, })}
                        >
                            Trig
                        </div>
                    </>
                ) : (
                    <></>
                )}
                {calculatorState.type !== "Graphic" ? (
                    <div style={{ background: "royalblue" }} className="calculatorButton notranslate" onClick={() => handleInput("Ans")}>Ans</div>
                ) : (
                    <div style={{ background: "royalblue" }} className="calculatorButton notranslate" onClick={() => handleInput("𝑥")}>𝑥</div>
                )}
                <div style={{ background: "red" }} className="calculatorButton notranslate" onClick={() => handleInput("C")}>C</div>
                <div style={{ background: "darkorange" }} className="calculatorButton notranslate" onClick={() => handleInput("←")}>←</div>
                {calculatorState.type !== "Graphic" ? (
                    <div style={{ background: "green" }} className="calculatorButton notranslate" onClick={() => handleInput("=")}>=</div>
                ) : (
                    <>
                        <div style={{ background: "green" }} className="calculatorButton notranslate" onClick={() => handleInput("=")}>Draw</div>
                        <div
                            className={
                                calculatorState.window
                                    ? "calculatorButton notranslate"
                                    : "calculatorButton calculatorButtonSmall notranslate"
                            }
                            onClick={() =>
                                setCalculatorState({
                                    ...calculatorState,
                                    window: !calculatorState.window,
                                })
                            }
                        >
                            {!calculatorState.window ? "Window" : "ƒ(𝑥)"}
                        </div>
                    </>
                )}
            </div>
            <div id="calculatorKeyboardRow">
                <div
                    id="calculatorNumpad"
                    className={
                        calculatorState.type === "Basic"
                            ? "calculatorNumpadBasic"
                            : "calculatorNumpadScientific"
                    }
                >
                    <div className="calculatorNumpadRow">
                        <div className="calculatorButton notranslate" onClick={() => handleInput(7)}>7</div>
                        <div className="calculatorButton notranslate" onClick={() => handleInput(8)}>8</div>
                        <div className="calculatorButton notranslate" onClick={() => handleInput(9)}>9</div>
                    </div>
                    <div className="calculatorNumpadRow">
                        <div className="calculatorButton notranslate" onClick={() => handleInput(4)}>4</div>
                        <div className="calculatorButton notranslate" onClick={() => handleInput(5)}>5</div>
                        <div className="calculatorButton notranslate" onClick={() => handleInput(6)}>6</div>
                    </div>
                    <div className="calculatorNumpadRow">
                        <div className="calculatorButton notranslate" onClick={() => handleInput(1)}>1</div>
                        <div className="calculatorButton notranslate" onClick={() => handleInput(2)}>2</div>
                        <div className="calculatorButton notranslate" onClick={() => handleInput(3)}>3</div>
                    </div>
                    <div className="calculatorNumpadRow">
                        <div className="calculatorButton notranslate" onClick={() => handleInput(0)} style={{ flexGrow: "2" }}>0</div>
                        <div className="calculatorButton notranslate" onClick={() => handleInput(".")} style={{ flexGrow: "1" }}>.</div>
                    </div>
                </div>
                <div
                    id="calculatorExpressions"
                    className={
                        calculatorState.type === "Basic"
                            ? "calculatorExpressionsBasic"
                            : "calculatorExpressionsScientific"
                    }
                >
                    <div className="calculatorExpressionsColumn">
                        <div className="calculatorButton notranslate" onClick={() => handleInput("+")}>+</div>
                        <div className="calculatorButton notranslate" onClick={() => handleInput("-")}>-</div>
                        <div className="calculatorButton notranslate" onClick={() => handleInput("×")}>×</div>
                        <div className="calculatorButton notranslate" onClick={() => handleInput("÷")}>÷</div>
                    </div>
                    {calculatorState.type !== "Basic" ? (
                        <>
                            <div className="calculatorExpressionsColumn">
                                {!calculatorState.alt ? (
                                    <div className="calculatorButton notranslate" onClick={() => handleInput("²")}>𝑥²</div>
                                ) : (
                                    <div className="calculatorButton notranslate" onClick={() => handleInput("³")}>𝑥³</div>
                                )}
                                {!calculatorState.alt ? (
                                    <div className="calculatorButton notranslate" onClick={() => handleInput("√²")}>√²</div>
                                ) : (
                                    <div className="calculatorButton notranslate" onClick={() => handleInput("√³")}>√³</div>
                                )}
                                <div className="calculatorButton notranslate" onClick={() => handleInput("^")}>
                                    <div>
                                        𝑦<sup>𝑥</sup>
                                    </div>
                                </div>
                                {!calculatorState.alt ? (
                                    <div className="calculatorButton notranslate" onClick={() => handleInput("log₁₀")}>
                                        <div>
                                            log<sub>₁₀</sub>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="calculatorButton notranslate" onClick={() => handleInput("logₑ")}>
                                        <div>
                                            log<sub>ₑ</sub>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="calculatorExpressionsColumn">
                                {!calculatorState.alt ? (
                                    !calculatorState.trig ? (
                                        <>
                                            <div className="calculatorButton notranslate" onClick={() => handleInput("sin")}>sin</div>
                                            <div className="calculatorButton notranslate" onClick={() => handleInput("cos")}>cos</div>
                                            <div className="calculatorButton notranslate" onClick={() => handleInput("tan")}>tan</div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="calculatorButton notranslate" onClick={() => handleInput("sinh")}>sinh</div>
                                            <div className="calculatorButton notranslate" onClick={() => handleInput("cosh")}>cosh</div>
                                            <div className="calculatorButton notranslate" onClick={() => handleInput("tanh")}>tanh</div>
                                        </>
                                    )
                                ) : !calculatorState.trig ? (
                                    <>
                                        <div className="calculatorButton calculatorButtonSmall notranslate" onClick={() => handleInput("sin⁻¹")}>sin⁻¹</div>
                                        <div className="calculatorButton calculatorButtonSmall notranslate" onClick={() => handleInput("cos⁻¹")}>cos⁻¹</div>
                                        <div className="calculatorButton calculatorButtonSmall notranslate" onClick={() => handleInput("tan⁻¹")}>tan⁻¹</div>
                                    </>
                                ) : (
                                    <>
                                        <div className="calculatorButton calculatorButtonSmall notranslate" onClick={() => handleInput("sinh⁻¹")}>sinh⁻¹</div>
                                        <div className="calculatorButton calculatorButtonSmall notranslate" onClick={() => handleInput("cosh⁻¹")}>cosh⁻¹</div>
                                        <div className="calculatorButton calculatorButtonSmall notranslate" onClick={() => handleInput("tanh⁻¹")}>tanh⁻¹</div>
                                    </>
                                )}
                                {!calculatorState.alt ? (
                                    <div className="calculatorButton notranslate" onClick={() => handleInput("°")}>°</div>
                                ) : (
                                    <div className="calculatorButton notranslate" onClick={() => handleInput("rad")}>rad</div>
                                )}
                            </div>
                            <div className="calculatorExpressionsColumn">
                                {calculatorState.alt ? (
                                    <div className="calculatorButton notranslate" onClick={() => handleInput(")")}>)</div>
                                ) : (
                                    <div className="calculatorButton notranslate" onClick={() => handleInput("(")}>(</div>
                                )}
                                <div className="calculatorButton notranslate" onClick={() => handleInput("!")}>𝑥!</div>
                                <div className="calculatorButton notranslate" onClick={() => handleInput("π")}>π</div>
                                <div className="calculatorButton notranslate" onClick={() => handleInput("𝑒")}>𝑒</div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    )
}