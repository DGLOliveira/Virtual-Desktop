import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../../System/ThemeManager/context.jsx";

import { FaGear } from "react-icons/fa6";
import { MdOutlineRestartAlt } from "react-icons/md";
import { RiShutDownLine } from "react-icons/ri";
import { WiCloudy } from "react-icons/wi";
import { TbDeviceMobile } from "react-icons/tb";

import ColorPicker from "../../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

export const TrayExpandedPreview = () => {
    return (<>
        <mobile-tray-fullscreen
            style={{ top: "calc(-1*var(--MobileTrayHeight))", height: "calc(100% + var(--TaskbarHeight) + var(--MobileTrayHeight))" }}
        >
            <mobile-tray-system>
                <button>
                    <WiCloudy /> 20°C
                </button>
                <button>
                    <TbDeviceMobile />
                </button>
                <button>
                    <FaGear />
                </button>
                <button>
                    <MdOutlineRestartAlt />
                </button>
                <button>
                    <RiShutDownLine />
                </button>
            </mobile-tray-system>
            <mobile-tray-fullscreen-clock>
                <button>
                    11:59
                    <br />
                    31/12/2000
                </button>
            </mobile-tray-fullscreen-clock>
            <div>
            </div>
        </mobile-tray-fullscreen>
    </>
    );
}

export const TrayExpanded = () => {
    return (<>
        Under Construction
    </>);
}