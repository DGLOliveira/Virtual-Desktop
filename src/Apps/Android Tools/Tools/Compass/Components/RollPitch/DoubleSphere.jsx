//Generates two spheres that invert their colors when interceptin each other,
//used to visualize roll and pitch
export default function DoubleSphere({ deltaX, deltaY, TRANSITION_TIME }) {
    return (
        <g id="rollPitch" style={{ isolation: "isolate", filter: " invert(100%)" }}>
            <circle
                cx="100"
                cy="100"
                r="13"
                fill="white"
                stroke="black"
                strokeWidth="2"
                style={{ filter: " invert(100%)" }}
            />
            <circle
                cx={deltaX * 5 + 100}
                cy={deltaY * 5 + 100}
                r="5"
                fill="black"
                style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`, mixBlendMode: "difference", filter: " invert(100%)" }}
            />
            <circle
                cx={-deltaX * 5.5 + 100}
                cy={-deltaY * 5.5 + 100}
                r="4.5"
                fill="black"
                style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`, mixBlendMode: "difference", filter: "invert(100%)" }}
            />
        </g>
    );
}