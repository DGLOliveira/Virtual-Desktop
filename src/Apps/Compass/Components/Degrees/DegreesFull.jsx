//generates all compass degrees
export default function DegreesFull() {
    var compassDegreePointers = [];
    function compassDegreesPointersCalc() {
        compassDegreePointers = [];
        for (let i = 0; i < 360; i++) {
            var xHeight, yHeight;
            if (i % 90 === 0) {
                xHeight = 20;
                yHeight = 20;
            } else if ((i + 45) % 90 === 0) {
                xHeight = 15;
                yHeight = 15;
            } else if (i % 15 === 0) {
                xHeight = 10;
                yHeight = 10;
            } else {
                xHeight = 5;
                yHeight = 5;
            }
            compassDegreePointers.push([xHeight, yHeight]);
        }
    };
    compassDegreesPointersCalc();

    return (
        <g id="degrees">
            <circle cx="100" cy="100" r="90" fill="lightgray" stroke="black" strokeWidth="1" />
            <circle cx="100" cy="100" r="70" fill="white" stroke="black" strokeWidth="1" />
            {compassDegreePointers.map((val, index) => {
                return (
                    <line
                        key={index}
                        x1={Math.cos(index * (Math.PI / 180)) * (90 - val[0]) + 100}
                        y1={Math.sin(index * (Math.PI / 180)) * (90 - val[1]) + 100}
                        x2={Math.cos(index * (Math.PI / 180)) * 90 + 100}
                        y2={Math.sin(index * (Math.PI / 180)) * 90 + 100}
                        stroke={index === 270 ? "red" : "black"}
                        strokeWidth="1"
                    />
                )
            })}
            <polygon points="100,30 96,20 100,22 104,20" fill="red" />
        </g>
    )
}