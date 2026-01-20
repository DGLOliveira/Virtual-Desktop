//Generates a two colored pointers
export default function Modern({ TRANSITION_TIME, rotation }) {

    return (
        <g id="rose" style={{ transformOrigin: "center", rotate: `${rotation}rad`, transition: `rotate ${TRANSITION_TIME}s ease-in-out`, fontFamily: "Times New Roman" }}>
            <text x="100" y="60" textAnchor="middle" fontSize="20" fill="black"
                style={{fontFamily: "Times New Roman", fontWeight: "bold"}}
            >N</text>
            <polygon
                points="100,30 110,44 90,44"
                fill="red"
                stroke="black"
                strokeWidth="0.5"
            />
            <text x="100" y="60" textAnchor="middle" fontSize="20" fill="black"
                style={{ transformOrigin: "center", rotate: "90deg", fontFamily: "Times New Roman", fontWeight: "bold" }}
            >E</text>
            <polygon
                points="100,30 110,44 90,44"
                fill="black"
                stroke="black"
                strokeWidth="0.5"
                style={{ transformOrigin: "center", rotate: "90deg" }}
            />
            <text x="100" y="60" textAnchor="middle" fontSize="20" fill="black"
                style={{ transformOrigin: "center", rotate: "180deg", fontFamily: "Times New Roman", fontWeight: "bold" }}
            >S</text>
            <polygon
                points="100,30 110,44 90,44"
                fill="black"
                stroke="black"
                strokeWidth="0.5"
                style={{ transformOrigin: "center", rotate: "180deg" }}
            />
            <text x="100" y="60" textAnchor="middle" fontSize="20" fill="black"
                style={{ transformOrigin: "center", rotate: "270deg", fontFamily: "Times New Roman", fontWeight: "bold" }}
            >W</text>
            <polygon
                points="100,30 110,44 90,44"
                fill="black"
                stroke="black"
                strokeWidth="0.5"
                style={{ transformOrigin: "center", rotate: "270deg" }}
            />
            <text x="100" y="50" textAnchor="middle" fontSize="8" fill="black"
                style={{ transformOrigin: "center", rotate: "45deg", fontFamily: "Times New Roman" }}
            >NE</text>
            <polygon
                points="100,30 105,40 95,40"
                fill="black"
                stroke="black"
                strokeWidth="0.5"
                style={{ transformOrigin: "center", rotate: "45deg" }}
            />
            <text x="100" y="50" textAnchor="middle" fontSize="8" fill="black"
                style={{ transformOrigin: "center", rotate: "135deg", fontFamily: "Times New Roman" }}
            >SE</text>
            <polygon
                points="100,30 105,40 95,40"
                fill="black"
                stroke="black"
                strokeWidth="0.5"
                style={{ transformOrigin: "center", rotate: "135deg" }}
            />
            <text x="100" y="50" textAnchor="middle" fontSize="8" fill="black"
                style={{ transformOrigin: "center", rotate: "225deg", fontFamily: "Times New Roman" }}
            >SW</text>
            <polygon
                points="100,30 105,40 95,40"
                fill="black"
                stroke="black"
                strokeWidth="0.5"
                style={{ transformOrigin: "center", rotate: "225deg" }}
            />
            <text x="100" y="50" textAnchor="middle" fontSize="8" fill="black"
                style={{ transformOrigin: "center", rotate: "315deg", fontFamily: "Times New Roman" }}
            >NW</text>
            <polygon
                points="100,30 105,40 95,40"
                fill="black"
                stroke="black"
                strokeWidth="0.5"
                style={{ transformOrigin: "center", rotate: "315deg" }}
            />
        </g>
    )
}