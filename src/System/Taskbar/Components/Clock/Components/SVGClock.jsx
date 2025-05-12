import { useState, useEffect } from "react";
export default function SVGClock({ time }) {

    const [twelveHourFormat, setTwelveHourFormat] = useState(time.hours > 12 ? time.hours - 12 : time.hours == 0 ? 12 : time.hours);
    const [hoursAngle, setHoursAngle] = useState((twelveHourFormat * 30) + (time.minutes * 0.5) + (time.seconds * 0.008333333333333333) + 180);
    const [minutesAngle, setMinutesAngle] = useState((time.minutes * 6) + (time.seconds * 0.1) + 180);
    const [secondsAngle, setSecondsAngle] = useState(time.seconds * 6 + 180);

    useEffect(() => {
        setTwelveHourFormat(time.hours > 12 ? time.hours - 12 : time.hours == 0 ? 12 : time.hours);
        setHoursAngle((twelveHourFormat * 30) + (time.minutes * 0.5) + (time.seconds * 0.008333333333333333) + 180);
        setMinutesAngle((time.minutes * 6) + (time.seconds * 0.1) + 180);
        setSecondsAngle(time.seconds * 6 + 180);
    }, [time.seconds]);

    return (
        <svg style={{ width: "inherit", height: "inherit" }} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="49" fill="white" stroke="black" strokeWidth="2" />
            <circle cx="49.5" cy="49.5" r="3.5" fill="black" />
            <rect style={{ transformOrigin: "center", transform: `rotate(${hoursAngle}deg)` }} x="46" y="50" width="7" height="20" fill="black" />
            <rect style={{ transformOrigin: "center", transform: `rotate(${minutesAngle}deg)` }} x="47" y="50" width="5" height="30" fill="black" rx="2.5"/>
            <rect style={{ transformOrigin: "center", transform: `rotate(${secondsAngle}deg)` }} x="48" y="50" width="3" height="43" fill="black" rx="1.5" />
            <rect style={{ transformOrigin: "center", transform: `rotate(0deg)` }} x="48" y="90" width="3" height="10" fill="black" />
            <rect style={{ transformOrigin: "center", transform: `rotate(30deg)` }} x="48" y="90" width="3" height="10" fill="black" />
            <rect style={{ transformOrigin: "center", transform: `rotate(60deg)` }} x="48" y="90" width="3" height="10" fill="black" />
            <rect style={{ transformOrigin: "center", transform: `rotate(90deg)` }} x="48" y="90" width="3" height="10" fill="black" />
            <rect style={{ transformOrigin: "center", transform: `rotate(120deg)` }} x="48" y="90" width="3" height="10" fill="black" />
            <rect style={{ transformOrigin: "center", transform: `rotate(150deg)` }} x="48" y="90" width="3" height="10" fill="black" />
            <rect style={{ transformOrigin: "center", transform: `rotate(180deg)` }} x="48" y="90" width="3" height="10" fill="black" />
            <rect style={{ transformOrigin: "center", transform: `rotate(210deg)` }} x="48" y="90" width="3" height="10" fill="black" />
            <rect style={{ transformOrigin: "center", transform: `rotate(240deg)` }} x="48" y="90" width="3" height="10" fill="black" />
            <rect style={{ transformOrigin: "center", transform: `rotate(270deg)` }} x="48" y="90" width="3" height="10" fill="black" />
            <rect style={{ transformOrigin: "center", transform: `rotate(300deg)` }} x="48" y="90" width="3" height="10" fill="black" />
            <rect style={{ transformOrigin: "center", transform: `rotate(330deg)` }} x="48" y="90" width="3" height="10" fill="black" />
        </svg>
    );
}