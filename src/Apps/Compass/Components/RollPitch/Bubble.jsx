//Generates a bubble and its correct placement to visualize roll and pitch
export default function Bubble({ pitch, roll, TRANSITION_TIME }) {
    const deltaX = Math.sin(pitch) * 5;
    const deltaY = Math.sin(roll) * 5;
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
            <circle
                cx={deltaX + 100}
                cy={deltaY + 100}
                r="5"
                fill="deepskyblue"
                stroke="black"
                strokeWidth="0.5"
                style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`}}
            />
            <path
                d={
                    `M ${deltaX + 101} ${deltaY + 97.5} 
                    C ${deltaX + 102.5} ${deltaY + 97.5}, 
                    ${deltaX + 102.5} ${deltaY + 97.5}, 
                    ${deltaX + 102.5} ${deltaY + 99} `
                }
                stroke="black"
                strokeWidth="1"
                style={{ transition: `all ${TRANSITION_TIME}s ease-in-out` }}
            />
        </g>
    );
}