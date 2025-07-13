import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../../System/ThemeManager/context.jsx";

import { WiCloudy } from "react-icons/wi";
import { TbDeviceMobile } from "react-icons/tb";

import ColorPicker from "../../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

export const TrayCollapsedPreview = () => {
    return (<>
        <mobile-tray-fullscreen
            style={{ top: "calc(-100% + var(--MobileTrayHeight) + var(--TaskbarHeight))" }}
        ></mobile-tray-fullscreen>
        <mobile-tray style={{ width: "100%" }}>
            <button>
                <WiCloudy /> 20°C
            </button>
            <button>
                <TbDeviceMobile />
            </button>
            <button>
                11:59
                <br />
                31/12/2000
            </button>
        </mobile-tray>
    </>
    );
}

export const TrayCollapsed = () => {
    return (<>
        Under Construction
    </>);
}