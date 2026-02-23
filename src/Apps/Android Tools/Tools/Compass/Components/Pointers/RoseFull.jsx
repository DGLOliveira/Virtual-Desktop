import {Fragment} from "react";
//Generates a complete compass rose
export default function RoseFull({ TRANSITION_TIME, rotation }) {
    var compassRosePoints = [];
    function compassRosePointsCalc() {
        compassRosePoints = [];
        const center = 100;
        let ptx1, pty1, ptx2, pty2, ptx3, pty3, ptx4, pty4, points1, points2, deg, distLong, distShort;
        for (let i = 0; i < 16; i++) {
            if (i >= 12) {
                deg = i * 90;
                distLong = 60;
                distShort = 15;
            } else if (i >= 8) {
                deg = i * 90 - 45;
                distLong = 50;
                distShort = 12.5;
            } else {
                deg = i * 360 / 8 + 360 / 16;
                distLong = 40;
                distShort = 10;
            }
            ptx1 = Math.cos(deg * (Math.PI / 180)) * distLong + center;
            pty1 = Math.sin(deg * (Math.PI / 180)) * distLong + center;
            ptx2 = Math.cos((deg + 45) * (Math.PI / 180)) * distShort + center;
            pty2 = Math.sin((deg + 45) * (Math.PI / 180)) * distShort + center;
            ptx3 = center;
            pty3 = center;
            ptx4 = Math.cos((deg - 45) * (Math.PI / 180)) * distShort + center;
            pty4 = Math.sin((deg - 45) * (Math.PI / 180)) * distShort + center;
            points1 = ptx1 + "," + pty1 + " " + ptx2 + "," + pty2 + " " + ptx3 + "," + pty3 + " " + ptx4 + "," + pty4;
            points2 = ptx1 + "," + pty1 + " " + ptx2 + "," + pty2 + " " + ptx3 + "," + pty3;
            compassRosePoints.push([points1, points2]);
        }
    }
    compassRosePointsCalc();

    return (
        <g id="rose" style={{ transformOrigin: "center", rotate: `${rotation}rad`, transition: `rotate ${TRANSITION_TIME}s ease-in-out` }}>
            <circle cx="100" cy="100" r="60" fill="lightgray" stroke="black" strokeWidth="1" />
            <circle cx="100" cy="100" r="50.5" stroke="gray" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="40.5" stroke="gray" strokeWidth="0.5" />
            {compassRosePoints.map((val, index) => {
                return (
                    <Fragment key={index}>
                        <polygon key={index + "a"} points={val[0]} fill="white" stroke="black" strokeWidth="1" />
                        <polygon key={index + "b"} points={val[1]} fill="black" />
                        {index>=12 && index<16 ?
                        <line key={index + "c"}
                        x1={Math.cos((index-12) * (Math.PI / 2)) * 60 + 100}
                        y1={Math.sin((index-12) * (Math.PI / 2)) * 60 + 100}
                        x2={Math.cos((index-12) * (Math.PI / 2)) * 70 + 100}
                        y2={Math.sin((index-12) * (Math.PI / 2)) * 70 + 100}
                        stroke="black" 
                        strokeWidth="0.5" />
                        :null}
                    </Fragment>
                )
            })}
            <polygon points="100,30 96,45 100,50 104,45" fill="white" stroke="black" strokeWidth="1" />
            <polygon points="100,30 104,45 100,45" fill="black" />
            <polygon points="100,45 96,45 100,50" fill="black" />
            <rect x="96" y="48" width="8" height="2" fill="white" stroke="black" strokeWidth="1" rx="1" />
        </g>
    )
}