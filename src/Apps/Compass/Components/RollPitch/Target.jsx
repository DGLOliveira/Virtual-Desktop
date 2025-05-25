//Generates two targets that used to visualize roll and pitch
export default function Target({ pitch, roll, TRANSITION_TIME }) {
    const deltaX = Math.sin(pitch) * 5;
    const deltaY = -Math.sin(roll) * 5;
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
            <line x1="100" y1="87" x2="100" y2="113" stroke="black" strokeWidth="1"
                style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`, mixBlendMode: "difference", filter: " invert(100%)" }} />
            <line x1="87" y1="100" x2="113" y2="100" stroke="black" strokeWidth="1"
                style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`, mixBlendMode: "difference", filter: " invert(100%)" }} />
            <g>
                <line x1={101+deltaX} y1={101+deltaY} x2={106+deltaX} y2={101+deltaY} stroke="black" strokeWidth="1"
                    style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`, mixBlendMode: "difference", filter: " invert(100%)" }} />
                <line x1={101+deltaX} y1={101+deltaY} x2={101+deltaX} y2={106+deltaY} stroke="black" strokeWidth="1"
                    style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`, mixBlendMode: "difference", filter: " invert(100%)" }} />
                <line x1={101+deltaX} y1={99+deltaY} x2={101+deltaX} y2={94+deltaY} stroke="black" strokeWidth="1"
                    style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`, mixBlendMode: "difference", filter: " invert(100%)" }} />
                <line x1={101+deltaX} y1={99+deltaY} x2={106+deltaX} y2={99+deltaY} stroke="black" strokeWidth="1"
                    style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`, mixBlendMode: "difference", filter: " invert(100%)" }} />
                <line x1={99+deltaX} y1={101+deltaY} x2={99+deltaX} y2={106+deltaY} stroke="black" strokeWidth="1"
                    style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`, mixBlendMode: "difference", filter: " invert(100%)" }} />
                <line x1={99+deltaX} y1={101+deltaY} x2={94+deltaX} y2={101+deltaY} stroke="black" strokeWidth="1"
                    style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`, mixBlendMode: "difference", filter: " invert(100%)" }} />
                <line x1={99+deltaX} y1={99+deltaY} x2={94+deltaX} y2={99+deltaY} stroke="black" strokeWidth="1"
                    style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`, mixBlendMode: "difference", filter: " invert(100%)" }} />
                <line x1={99+deltaX} y1={99+deltaY} x2={99+deltaX} y2={94+deltaY} stroke="black" strokeWidth="1"
                    style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`, mixBlendMode: "difference", filter: " invert(100%)" }} />
            </g>
        </g>
    );
}