import "./style.css";
export default function Icon({ isActive }) {
    return (
        <svg className={isActive ? "toDesktopIconAero toDesktopIconAeroActive" : "toDesktopIconAero"} width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                className={isActive ? "hex hex3 animate-to-desktop-large-hexagon-aero" : "hex hex3"}
                d="M306.253 213.654V336.345L200 397.689L93.7471 336.345V213.654L200 152.31L306.253 213.654Z"
                stroke="#808080"
                strokeWidth="8"
            />
            <path
                className={isActive ? "hex hex2 animate-to-desktop-medium-hexagon-aero" : "hex hex2"}
                d="M284.603 118.154V215.845L200 264.689L115.397 215.845V118.154L200 69.3096L284.603 118.154Z"
                stroke="#808080"
                strokeWidth="8"
            />
            <path
                className={isActive ? "hex hex1 animate-to-desktop-small-hexagon-aero" : "hex hex1"}
                d="M262.952 46.6543V119.345L200 155.689L137.048 119.345V46.6543L200 10.3096L262.952 46.6543Z"
                stroke="#808080"
                strokeWidth="8"
            />
        </svg>
    );
}