//generates all compass degrees
export default function DegreesFull() {
    var compassDegreePointers = [];
    function compassDegreesPointersCalc() {
        compassDegreePointers = [];
        for (let i = 0; i < 360; i++) {
            var height=5;
            if (i % 90 === 0) {
                height = 20;
            } else if ((i + 45) % 90 === 0) {
                height = 15;
            } else if (i % 15 === 0) {
                height = 10;
            }
            compassDegreePointers.push(height);
        }
    };
    compassDegreesPointersCalc();

    return (
        <g id="degrees">
            <circle cx="100" cy="100" r="90" fill="lightgray" stroke="black" strokeWidth="1" />
            <circle cx="100" cy="100" r="70" fill="white" stroke="black" strokeWidth="1" />
            {compassDegreePointers.map((height, index) => {
                return (
                    <line
                        key={index}
                        x1={Math.cos(index * (Math.PI / 180)) * (70) + 100}
                        y1={Math.sin(index * (Math.PI / 180)) * (70) + 100}
                        x2={Math.cos(index * (Math.PI / 180)) * (70 + height) + 100}
                        y2={Math.sin(index * (Math.PI / 180)) * (70 + height) + 100}
                        stroke={index === 270 ? "red" : "black"}
                        strokeWidth={height === 5 ? 0.5 : 1}
                    />
                )
            })}
            <polygon points="100,25 96,10.9 100,10.8 104,10.9" fill="red" />
        </g>
    )
}