export default function Keypad({ handleInput, calculatorState }) {
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
                                    ? "calculatorButton calculatorTypeButtonSelected"
                                    : "calculatorButton"
                            }
                            onClick={() => setCalculatorState({ ...calculatorState, alt: !calculatorState.alt, })}
                        >
                            Alt
                        </div>
                        <div
                            className={calculatorState.trig ? "calculatorButton calculatorTypeButtonSelected" : "calculatorButton"}
                            onClick={() => setCalculatorState({ ...calculatorState, trig: !calculatorState.trig, })}
                        >
                            Trig
                        </div>
                    </>
                ) : (
                    <></>
                )}
                {calculatorState.type !== "Graphic" ? (
                    <div style={{ background: "royalblue" }} className="calculatorButton" onClick={() => handleInput("Ans")}>Ans</div>
                ) : (
                    <div style={{ background: "royalblue" }} className="calculatorButton" onClick={() => handleInput("𝑥")}>𝑥</div>
                )}
                <div style={{ background: "red" }} className="calculatorButton" onClick={() => handleInput("C")}>C</div>
                <div style={{ background: "darkorange" }} className="calculatorButton" onClick={() => handleInput("←")}>←</div>
                {calculatorState.type !== "Graphic" ? (
                    <div style={{ background: "green" }} className="calculatorButton" onClick={() => handleInput("=")}>=</div>
                ) : (
                    <>
                        <div style={{ background: "green" }} className="calculatorButton" onClick={() => handleInput("=")}>Draw</div>
                        <div
                            className={
                                calculatorState.window
                                    ? "calculatorButton"
                                    : "calculatorButton calculatorButtonSmall"
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
                        <div className="calculatorButton" onClick={() => handleInput(7)}>7</div>
                        <div className="calculatorButton" onClick={() => handleInput(8)}>8</div>
                        <div className="calculatorButton" onClick={() => handleInput(9)}>9</div>
                    </div>
                    <div className="calculatorNumpadRow">
                        <div className="calculatorButton" onClick={() => handleInput(4)}>4</div>
                        <div className="calculatorButton" onClick={() => handleInput(5)}>5</div>
                        <div className="calculatorButton" onClick={() => handleInput(6)}>6</div>
                    </div>
                    <div className="calculatorNumpadRow">
                        <div className="calculatorButton" onClick={() => handleInput(1)}>1</div>
                        <div className="calculatorButton" onClick={() => handleInput(2)}>2</div>
                        <div className="calculatorButton" onClick={() => handleInput(3)}>3</div>
                    </div>
                    <div className="calculatorNumpadRow">
                        <div className="calculatorButton" onClick={() => handleInput(0)} style={{ flexGrow: "2" }}>0</div>
                        <div className="calculatorButton" onClick={() => handleInput(".")} style={{ flexGrow: "1" }}>.</div>
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
                        <div className="calculatorButton" onClick={() => handleInput("+")}>+</div>
                        <div className="calculatorButton" onClick={() => handleInput("-")}>-</div>
                        <div className="calculatorButton" onClick={() => handleInput("×")}>×</div>
                        <div className="calculatorButton" onClick={() => handleInput("÷")}>÷</div>
                    </div>
                    {calculatorState.type !== "Basic" ? (
                        <>
                            <div className="calculatorExpressionsColumn">
                                {!calculatorState.alt ? (
                                    <div className="calculatorButton" onClick={() => handleInput("²")}>𝑥²</div>
                                ) : (
                                    <div className="calculatorButton" onClick={() => handleInput("³")}>𝑥³</div>
                                )}
                                {!calculatorState.alt ? (
                                    <div className="calculatorButton" onClick={() => handleInput("√²")}>√²</div>
                                ) : (
                                    <div className="calculatorButton" onClick={() => handleInput("√³")}>√³</div>
                                )}
                                <div className="calculatorButton" onClick={() => handleInput("^")}>
                                    <div>
                                        𝑦<sup>𝑥</sup>
                                    </div>
                                </div>
                                {!calculatorState.alt ? (
                                    <div className="calculatorButton" onClick={() => handleInput("log₁₀")}>
                                        <div>
                                            log<sub>₁₀</sub>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="calculatorButton" onClick={() => handleInput("logₑ")}>
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
                                            <div className="calculatorButton" onClick={() => handleInput("sin")}>sin</div>
                                            <div className="calculatorButton" onClick={() => handleInput("cos")}>cos</div>
                                            <div className="calculatorButton" onClick={() => handleInput("tan")}>tan</div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="calculatorButton" onClick={() => handleInput("sinh")}>sinh</div>
                                            <div className="calculatorButton" onClick={() => handleInput("cosh")}>cosh</div>
                                            <div className="calculatorButton" onClick={() => handleInput("tanh")}>tanh</div>
                                        </>
                                    )
                                ) : !calculatorState.trig ? (
                                    <>
                                        <div className="calculatorButton calculatorButtonSmall" onClick={() => handleInput("sin⁻¹")}>sin⁻¹</div>
                                        <div className="calculatorButton calculatorButtonSmall" onClick={() => handleInput("cos⁻¹")}>cos⁻¹</div>
                                        <div className="calculatorButton calculatorButtonSmall" onClick={() => handleInput("tan⁻¹")}>tan⁻¹</div>
                                    </>
                                ) : (
                                    <>
                                        <div className="calculatorButton calculatorButtonSmall" onClick={() => handleInput("sinh⁻¹")}>sinh⁻¹</div>
                                        <div className="calculatorButton calculatorButtonSmall" onClick={() => handleInput("cosh⁻¹")}>cosh⁻¹</div>
                                        <div className="calculatorButton calculatorButtonSmall" onClick={() => handleInput("tanh⁻¹")}>tanh⁻¹</div>
                                    </>
                                )}
                                {!calculatorState.alt ? (
                                    <div className="calculatorButton" onClick={() => handleInput("°")}>°</div>
                                ) : (
                                    <div className="calculatorButton" onClick={() => handleInput("rad")}>rad</div>
                                )}
                            </div>
                            <div className="calculatorExpressionsColumn">
                                {calculatorState.alt ? (
                                    <div className="calculatorButton" onClick={() => handleInput(")")}>)</div>
                                ) : (
                                    <div className="calculatorButton" onClick={() => handleInput("(")}>(</div>
                                )}
                                <div className="calculatorButton" onClick={() => handleInput("!")}>𝑥!</div>
                                <div className="calculatorButton" onClick={() => handleInput("π")}>π</div>
                                <div className="calculatorButton" onClick={() => handleInput("𝑒")}>𝑒</div>
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