import { useState, useEffect, useContext, useCallback, lazy, Suspense } from "react";
import { ThemeContext } from "../../../../System/ThemeManager/context.jsx";
import DefaultLogo from "../../../../System/Taskbar/Components/Start/DefaultLogo.jsx";

import ColorPicker from "../../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

export const TaskbarMobileBottomPreview = () => {
    const themeContext = useContext(ThemeContext);
    const [liveAppsState, setLiveAppsState] = useState(false);
    const [startButtonState, setStartButtonState] = useState(false);
    const Logo = useCallback((
        lazy(() => import(`../../../../System/ThemeManager/${themeContext.StartButtonPath}`).catch(
            (error) => {
                let errorMessage = "Failed to load Start Button Logo";
                console.error(errorMessage);
                return { default: DefaultLogo }
            }
        ))
    ), [themeContext.StartButtonPath]);
    return (
        <div
            style={{
                position: "absolute",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                bottom: "0",
                left: "0",
                width: "100%",
                height: "var(--TaskbarHeight)",
                backgroundColor: "var(--TaskbarBkgr)",
                backgroundImage: "var(--TaskbarBkgrImage)",
                backgroundPosition: "var(--TaskbarBkgrPosition)",
                backgroundSize: "var(--TaskbarBkgrSize)",
                backgroundRepeat: "var(--TaskbarBkgrRepeat)",
                backdropFilter: "var(--TaskbarBackdropFilter)",
                zIndex: 1,
            }}
        >
            <start-button
                style={{
                    width: "100%"
                }}>
                <button
                style={{
                    width: "100%"
                }}
                    onClick={() => setStartButtonState(!startButtonState)}
                >
                    <Suspense fallback={<DefaultLogo />}>
                        <Logo isOpen={startButtonState} />
                    </Suspense>
                </button>
            </start-button>
            <vertical-rect />
            <live-apps-button>
                <button
                    style={{
                        width: "100%"
                    }}
                    onClick={() => setLiveAppsState(!liveAppsState)}
                >
                    <div>
                        <div>
                            <live-apps-button-circle class={liveAppsState ? "live-apps-button-circle-red" : "live-apps-button-circle-off"} />
                            <live-apps-button-circle class={liveAppsState ? "live-apps-button-circle-green" : "live-apps-button-circle-off"} />
                        </div>
                        <div>
                            <live-apps-button-circle class={liveAppsState ? "live-apps-button-circle-blue" : "live-apps-button-circle-off"} />
                            <live-apps-button-circle class={liveAppsState ? "live-apps-button-circle-white" : "live-apps-button-circle-off"} />
                        </div>
                    </div>
                </button>
            </live-apps-button>
            <vertical-rect />
            <to-desktop-button
                style={{
                    display: "flex",
                    width: "100%",
                }}
            >
                <button>
                    {">>>"}
                </button>
            </to-desktop-button>

        </div>
    );
};


export const TaskbarMobileBottom = () => {
    return (
        <>
        Under Construction
        </>
    );
};