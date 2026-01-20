//Generates a bubble and its correct placement to visualize roll and pitch
export default function Bubble({ deltaX, deltaY, TRANSITION_TIME }) {
    const radius = 7;
    const shiftX = deltaX * radius;
    const shiftY = deltaY * radius;
    return (
        <g id="rollPitch" style={{ isolation: "isolate" }}>
            <circle
                cx="100"
                cy="100"
                r="13"
                fill="white"
                stroke="black"
                strokeWidth="2"
            />
            <circle
                cx={shiftX + 100}
                cy={shiftY + 100}
                r="5"
                fill="deepskyblue"
                stroke="black"
                strokeWidth="0.5"
                style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`}}
            />
            <path
                d={
                    `M ${shiftX + 100.5} ${shiftY + 97.5} 
                    C ${shiftX + 101.75} ${shiftY + 97.5}, 
                    ${shiftX + 102.5} ${shiftY + 98.25}, 
                    ${shiftX + 102.5} ${shiftY + 99.5} `
                }
                stroke="black"
                strokeWidth="0.5"
                style={{ transition: `all ${TRANSITION_TIME}s ease-in-out` }}
            />
            <circle
                cx="100"
                cy="100"
                r="6"
                stroke="black"
                strokeWidth="1"
            />
            <line x1="100" y1="106" x2="100" y2="112" stroke="black" strokeWidth="1"/>
            <line x1="100" y1="94" x2="100" y2="88" stroke="black" strokeWidth="1"/>
            <line x1="106" y1="100" x2="112" y2="100" stroke="black" strokeWidth="1"/>
            <line x1="94" y1="100" x2="88" y2="100" stroke="black" strokeWidth="1"/>
        </g>
    );
}