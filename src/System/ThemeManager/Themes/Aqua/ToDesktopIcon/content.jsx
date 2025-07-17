import "./style.css";
export default function Icon({ isActive }) {
    return (
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="toDesktopAquaRed" gradientTransform="rotate(90)">
                    <stop offset="20%" stopColor="#FF9999" />
                    <stop offset="50%" stopColor="#FF0000" />
                    <stop offset="80%" stopColor="#9F0000" />
                </linearGradient>
                <linearGradient id="toDesktopAquaGreen" gradientTransform="rotate(90)">
                    <stop offset="20%" stopColor="#99FF99" />
                    <stop offset="50%" stopColor="#00FF00" />
                    <stop offset="80%" stopColor="#009F00" />
                </linearGradient>
                <linearGradient id="toDesktopAquaBlue" gradientTransform="rotate(90)">
                    <stop offset="20%" stopColor="#9999FF" />
                    <stop offset="50%" stopColor="#0000FF" />
                    <stop offset="80%" stopColor="#00009F" />
                </linearGradient>
            </defs>
            <path
                className="hex hex3"
                d="M306.253 213.654V336.345L200 397.689L93.7471 336.345V213.654L200 152.31L306.253 213.654Z"
                style={{
                    fill: "url(#toDesktopAquaRed)"
                }}
                stroke="#808080"
                stroke-width="8"
            />
            <path
                className={isActive ? "hex hex2 animate-to-desktop-medium-hexagon-aqua" : "hex hex2"}
                d="M284.603 118.154V215.845L200 264.689L115.397 215.845V118.154L200 69.3096L284.603 118.154Z"
                style={{
                    fill: "url(#toDesktopAquaGreen)"
                }}
                stroke="#808080"
                stroke-width="8"
            />
            <path
                className={isActive ? "hex hex1 animate-to-desktop-small-hexagon-aqua" : "hex hex1"}
                d="M262.952 46.6543V119.345L200 155.689L137.048 119.345V46.6543L200 10.3096L262.952 46.6543Z"
                style={{
                    fill: "url(#toDesktopAquaBlue)"
                }}
                stroke="#808080"
                stroke-width="8"
            />
        </svg>
    );
}