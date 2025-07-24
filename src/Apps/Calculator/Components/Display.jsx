import { useRef } from "react";
import Graphic from "./Graphic.js";
export default function Display({ displayState, calculatorState, graph, setGraph }) {
    const functionFRef = useRef(null);
    const functionGRef = useRef(null);
    const functionHRef = useRef(null);
    const minWindowXRef = useRef(null);
    const maxWindowXRef = useRef(null);
    const minWindowYRef = useRef(null);
    const maxWindowYRef = useRef(null);
    return (
        <>
            {calculatorState.type !== "Graphic" ? (
                <div id="calculatorDisplayContainer">
                    <div id="calculatorMinorDisplay">{displayState.minorDisplay}</div>
                    <div id="calculatorDisplay">{displayState.display}</div>
                </div>
            ) : (
                <div id="calculatorGraphicContainer">
                    <div id="calculatorGraphic">
                        <Graphic graph={graph} />
                    </div>
                    <div className="calculatorGraphicParam">
                        {!calculatorState.window ? (
                            <>
                                <div
                                    ref={functionFRef}
                                    className={
                                        graph.active === "F"
                                            ? "calculatorGraphicFunction calculatorGraphicFunctionActive"
                                            : "calculatorGraphicFunction"
                                    }
                                    onClick={(e) => (
                                        setGraph({ ...graph, active: "F" }),
                                        functionFRef.current.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center",
                                        })
                                    )}
                                >
                                    ƒ(𝑥)={graph.F.display}
                                </div>
                                <div
                                    ref={functionGRef}
                                    className={
                                        graph.active === "G"
                                            ? "calculatorGraphicFunction calculatorGraphicFunctionActive"
                                            : "calculatorGraphicFunction"
                                    }
                                    onClick={(e) => (
                                        setGraph({ ...graph, active: "G" }),
                                        functionGRef.current.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center",
                                        })
                                    )}
                                >
                                    𝑔(𝑥)={graph.G.display}
                                </div>
                                <div
                                    ref={functionHRef}
                                    className={
                                        graph.active === "H"
                                            ? "calculatorGraphicFunction calculatorGraphicFunctionActive"
                                            : "calculatorGraphicFunction"
                                    }
                                    onClick={(e) => (
                                        setGraph({ ...graph, active: "H" }),
                                        functionHRef.current.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center",
                                        })
                                    )}
                                >
                                    𝒉(𝑥)={graph.H.display}
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    ref={minWindowXRef}
                                    className={
                                        graph.window.active === "minx"
                                            ? "calculatorGraphicFunction calculatorGraphicFunctionActive"
                                            : "calculatorGraphicFunction"
                                    }
                                    onClick={(e) => (
                                        setGraph({
                                            ...graph,
                                            window: { ...graph.window, active: "minx" },
                                        }),
                                        minWindowXRef.current.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center",
                                        })
                                    )}
                                >
                                    Min X: {graph.window.x[0]}
                                </div>
                                <div
                                    ref={maxWindowXRef}
                                    className={
                                        graph.window.active === "maxx"
                                            ? "calculatorGraphicFunction calculatorGraphicFunctionActive"
                                            : "calculatorGraphicFunction"
                                    }
                                    onClick={(e) => (
                                        setGraph({
                                            ...graph,
                                            window: { ...graph.window, active: "maxx" },
                                        }),
                                        maxWindowXRef.current.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center",
                                        })
                                    )}
                                >
                                    Max X: {graph.window.x[1]}
                                </div>
                                <div
                                    ref={minWindowYRef}
                                    className={
                                        graph.window.active === "miny"
                                            ? "calculatorGraphicFunction calculatorGraphicFunctionActive"
                                            : "calculatorGraphicFunction"
                                    }
                                    onClick={(e) => (
                                        setGraph({
                                            ...graph,
                                            window: { ...graph.window, active: "miny" },
                                        }),
                                        minWindowYRef.current.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center",
                                        })
                                    )}
                                >
                                    Min Y: {graph.window.y[0]}
                                </div>
                                <div
                                    ref={maxWindowYRef}
                                    className={
                                        graph.window.active === "maxy"
                                            ? "calculatorGraphicFunction calculatorGraphicFunctionActive"
                                            : "calculatorGraphicFunction"
                                    }
                                    onClick={(e) => (
                                        setGraph({
                                            ...graph,
                                            window: { ...graph.window, active: "maxy" },
                                        }),
                                        maxWindowYRef.current.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center",
                                        })
                                    )}
                                >
                                    Max Y: {graph.window.y[1]}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}