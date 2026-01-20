//Generates two targets that used to visualize roll and pitch
export default function Target({ deltaX, deltaY, TRANSITION_TIME }) {
    const radius = 5;
    const shiftX = deltaX * radius;
    const shiftY = deltaY * radius;
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
                <line x1={101+shiftX} y1={101+shiftY} x2={106+shiftX} y2={101+shiftY} stroke="black" strokeWidth="1"
                    style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`, mixBlendMode: "difference", filter: " invert(100%)" }} />
                <line x1={101+shiftX} y1={101+shiftY} x2={101+shiftX} y2={106+shiftY} stroke="black" strokeWidth="1"
                    style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`, mixBlendMode: "difference", filter: " invert(100%)" }} />
                <line x1={101+shiftX} y1={99+shiftY} x2={101+shiftX} y2={94+shiftY} stroke="black" strokeWidth="1"
                    style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`, mixBlendMode: "difference", filter: " invert(100%)" }} />
                <line x1={101+shiftX} y1={99+shiftY} x2={106+shiftX} y2={99+shiftY} stroke="black" strokeWidth="1"
                    style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`, mixBlendMode: "difference", filter: " invert(100%)" }} />
                <line x1={99+shiftX} y1={101+shiftY} x2={99+shiftX} y2={106+shiftY} stroke="black" strokeWidth="1"
                    style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`, mixBlendMode: "difference", filter: " invert(100%)" }} />
                <line x1={99+shiftX} y1={101+shiftY} x2={94+shiftX} y2={101+shiftY} stroke="black" strokeWidth="1"
                    style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`, mixBlendMode: "difference", filter: " invert(100%)" }} />
                <line x1={99+shiftX} y1={99+shiftY} x2={94+shiftX} y2={99+shiftY} stroke="black" strokeWidth="1"
                    style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`, mixBlendMode: "difference", filter: " invert(100%)" }} />
                <line x1={99+shiftX} y1={99+shiftY} x2={99+shiftX} y2={94+shiftY} stroke="black" strokeWidth="1"
                    style={{ transition: `all ${TRANSITION_TIME}s ease-in-out`, mixBlendMode: "difference", filter: " invert(100%)" }} />
            </g>
        </g>
    );
}