//Generates a single arrow
export default function MagnetPointer({ TRANSITION_TIME, rotation }) {

    return (
        <g id="rose" style={{ transformOrigin: "center", rotate: `${rotation}rad`, transition: `rotate ${TRANSITION_TIME}s ease-in-out` }}>
            
            <polygon points="100,30 95,47 100,54 105,47" fill="white" stroke="black" strokeWidth="1" />
            <polygon points="100,30 105,47 100,47" fill="black" />
            <polygon points="100,47 95,47 100,54" fill="black" />
            <rect x="96" y="52" width="8" height="2" fill="white" stroke="black" strokeWidth="1" rx="1" />
            <polygon
                points="100,124 108,135 108,140 100,129 92,140 92,135"
                fill="white"
                stroke="black"
                strokeWidth="1.5"
            />
            <polygon
                points="100,129 108,140 108,145 100,134 92,145 92,140"
                fill="white"
                stroke="black"
                strokeWidth="1.5"
            />
            <polygon
                points="100,134 108,145 108,150 100,139 92,150 92,145"
                fill="white"
                stroke="black"
                strokeWidth="1.5"
            />
            <line x1="100" y1="54" x2="100" y2="147"
                fill="black"
                stroke="black"
                strokeWidth="5"
            />
            <line x1="99.5" y1="54" x2="99.5" y2="145.5"
                stroke="white"
                strokeWidth="1.5"
            />
        </g>
    )
}