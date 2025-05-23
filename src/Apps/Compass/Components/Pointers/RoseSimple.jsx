//Generates a rotating partial compass rose
export default function RoseSimple({ TRANSITION_TIME, rotation }) {

    return (
        <g id="rose" style={{ transformOrigin: "center", rotate: `${rotation}rad`, transition: `rotate ${TRANSITION_TIME}s ease-in-out` }}>
            <polygon
                points="100,30 114,100 86,100"
                fill="white"
                stroke="black"
                strokeWidth="1"
            />
            <polygon
                points="100,30 114,100 100,100"
                fill="black"
            />
            <polygon
                points="100,170 114,100 86,100"
                fill="white"
                stroke="black"
                strokeWidth="1"
            />
            <polygon
                points="100,170 86,100 100,100"
                fill="black"
            />
            <rect x="95" y="48" width="10" height="2" fill="white" stroke="black" strokeWidth="1" rx="1" />
        </g>
    )
}