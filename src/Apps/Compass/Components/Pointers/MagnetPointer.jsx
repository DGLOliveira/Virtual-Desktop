//Generates a two colored pointers
export default function MagnetPointer({ TRANSITION_TIME, rotation }) {

    return (
        <g id="rose" style={{ transformOrigin: "center", rotate: `${rotation}rad`, transition: `rotate ${TRANSITION_TIME}s ease-in-out` }}>
            <polygon
                points="100,30 114,100 86,100"
                fill="red"
                stroke="black"
                strokeWidth="0.5"
            />
            <polygon
                points="100,170 114,100 86,100"
                fill="dodgerblue"
                stroke="black"
                strokeWidth="0.5"
            />
        </g>
    )
}