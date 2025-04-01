import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaArrowLeft, FaArrowRight, FaCog } from "react-icons/fa";
import AnalogClock from "./Components/AnalogClock.jsx";
import "./styles.css";
export const TaskbarClock = ({ contextMenu, setShowClock }) => {

  const calendarRef = useRef(null);
  const [formats, setFormats] = useState({
    hour24: true,
    date: "dd/mm/yyyy",
    time: "hh:mm",
    clock: "numeric"
  });
  const [date, setDate] = useState(new Date());
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [monthString, setMonthString] = useState("");
  const [day, setDay] = useState("");
  const [dayString, setDayString] = useState("");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const [selectedMonthYear, setSelectedMonthYear] = useState({ month: "", year: "" });
  const [displayCalendar, setDisplayCalendar] = useState(false);
  const [calendarData, setCalendarData] = useState([[], [], [], [], [], []]);
  const [calendarHover, setCalendarHover] = useState({ active: false, x: 0, y: 0 });
  const [displaySettings, setDisplaySettings] = useState(false);

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setDisplayCalendar(false);
      setDisplaySettings(false);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    let content = {
      "Settings": {
        action: () => {
          setDisplayCalendar(true);
          setDisplaySettings(true);
        }
      },
      "LineBreak": {},
      "Hide": { action: () => { setShowClock(false) }, checkbox: true },
    };
    contextMenu.setOpen();
    contextMenu.setPosition(e.clientX, e.clientY);
    contextMenu.setContent(content);

  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newDate = new Date();
      setDate(newDate);
      setYear(newDate.getFullYear());
      let letMonth = newDate.getMonth();
      setMonthString(monthList[Number(letMonth)]);
      setMonth(letMonth);
      setDay(newDate.getDate());
      setDayString(dayList[Number(newDate.getDay())]);
      let letHours = newDate.getHours();
      if (letHours < 10) {
        letHours = "0" + letHours;
      }
      setHours(letHours);
      let letMinutes = newDate.getMinutes();
      if (letMinutes < 10) {
        letMinutes = "0" + letMinutes;
      }
      setMinutes(letMinutes);
      let letSeconds = newDate.getSeconds();
      if (letSeconds < 10) {
        letSeconds = "0" + letSeconds;
      }
      setSeconds(letSeconds);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (displayCalendar) {
      calendarRef.current.focus();
      setSelectedMonthYear({ month: month, year: year });
    }
  }, [displayCalendar]);

  useEffect(() => {
    if (displayCalendar) {
      let lastDayOfPreviousMonth = new Date(selectedMonthYear.year, selectedMonthYear.month, 0);
      let firstDayOfMonth = new Date(selectedMonthYear.year, selectedMonthYear.month, 1);
      let lastDayOfMonth;
      let firstDayOfNextMonth;
      if (selectedMonthYear.month + 1 <= 11) {
        lastDayOfMonth = new Date(selectedMonthYear.year, selectedMonthYear.month + 1, 0);
        firstDayOfNextMonth = new Date(selectedMonthYear.year, selectedMonthYear.month + 1, 1);
      } else {
        lastDayOfMonth = new Date(selectedMonthYear.year + 1, 0, 0);
        firstDayOfNextMonth = new Date(selectedMonthYear.year + 1, 0, 1);
      }
      let dayCount = 1;
      let nextMonthDayCount = 1;
      for (let i = 0; i < 6; i++) {
        calendarData[i] = [];
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDayOfMonth.getDay()) {
            calendarData[i][j] = { day: lastDayOfPreviousMonth.getDate() - (firstDayOfMonth.getDay() - j), month: selectedMonthYear.month - 1 };
          }
          else if (dayCount > lastDayOfMonth.getDate()) {
            calendarData[i][j] = { day: nextMonthDayCount, month: selectedMonthYear.month + 1 };
            nextMonthDayCount++;
          } else {
            calendarData[i][j] = { day: dayCount, month: selectedMonthYear.month };
            dayCount++;
          }
        }
      }
      setCalendarData(calendarData);
    }
  }, [displayCalendar, selectedMonthYear]);

  const changeSelectedMonthYear = (direction) => {
    let newMonth = selectedMonthYear.month;
    let newYear = selectedMonthYear.year;
    if (direction === "previous") {
      if (newMonth === 0) {
        newMonth = 11;
        newYear--;
      } else {
        newMonth--;
      }
    } else if (direction === "next") {
      if (newMonth === 11) {
        newMonth = 0;
        newYear++;
      }
      else {
        newMonth++;
      }
    }
    setSelectedMonthYear({ month: newMonth, year: newYear });
  }
  const handleCalendarHover = (event) => {
    let active = true;
    let x = event.clientX;
    let y = event.clientY;
    let calendarRect = calendarRef.current.getBoundingClientRect();
    let hoverDiv = {
      width: getComputedStyle(document.getElementById("calendar-hover")).getPropertyValue("width").slice(0, -2),
      height: getComputedStyle(document.getElementById("calendar-hover")).getPropertyValue("height").slice(0, -2),
    };
    if(y>calendarRect.y+calendarRect.height-hoverDiv.height/2){
      active = false;
    }
    let newX = x - calendarRect.x - hoverDiv.width / 2;
    let newY = y - calendarRect.y + hoverDiv.height / 2;
    setCalendarHover({ active: true, x: newX, y: newY });
  }
  const handleCalendarLeave = (e) => {
    if (e.relatedTarget === null) {
      setCalendarHover({ active: false, x: 0, y: 0 });
    }
    else if (!e.currentTarget.contains(e.relatedTarget)) {
      setCalendarHover({ active: false, x: 0, y: 0 });
    }
  }
  return (
    <>
      <button
        aria-label="Clock"
        title={hours + " hours, " + minutes + " minutes"}
        className={displayCalendar ? "buttonActive" : ""}
        onClick={() => {
          setDisplayCalendar(!displayCalendar);
        }}
        onContextMenu={(e) => handleContextMenu(e)}
      >
        {formats.clock === "numeric" ?
          <>
            {!formats.hour24 && hours > 12 ? hours - 12 : hours}:{minutes}{formats.time === "hh:mm:ss" ? <>:{seconds}</> : ""}{formats.hour24 ? "" : hours > 12 ? " PM" : " AM"}
            <br />
            {formats.date === "dd/mm/yyyy" && <>{day}/{Number(month) + 1}/{year}</>}
            {formats.date === "mm/dd/yyyy" && <>{Number(month) + 1}/{day}/{year}</>}
            {formats.date === "yyyy/mm/dd" && <>{year}/{Number(month) + 1}/{day}</>}
          </> :
          <div style={{ display: "flex", height: "var(--TaskbarIconSize)", width: "var(--TaskbarIconSize)" }}>
            <AnalogClock time={{ hours: hours, minutes: minutes, seconds: seconds }} />
          </div>}
      </button>
      {displayCalendar && createPortal(
        <taskbar-window
          aria-label="Calendar"
          tabindex="0"
          onBlur={(e) => handleBlur(e)}
        >
          <taskbar-window-header>
            <calendar-date>
              <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                {!formats.hour24 && hours > 12 ? hours - 12 : hours}:{minutes}:{seconds}{formats.hour24 ? "" : hours > 12 ? " PM" : " AM"}
              </div>
              {dayString}{", "}{day}{" of "}{monthString}{", "}{year}
            </calendar-date>
            <calendar-clock>
              <AnalogClock time={{ hours: hours, minutes: minutes, seconds: seconds }} />
            </calendar-clock>
          </taskbar-window-header>
          <taskbar-window-nav>
            <button
              title="Settings"
              aria-label="Settings"
              className={displaySettings ? "buttonActive" : ""}
              onClick={() => setDisplaySettings(!displaySettings)}><FaCog /></button>
            <button
              title="Previous Month"
              aria-label="Previous Month"
              onClick={() => changeSelectedMonthYear("previous")}><FaArrowLeft /></button>
            <button
              title="Next Month"
              aria-label="Next Month"
              onClick={() => changeSelectedMonthYear("next")}><FaArrowRight /></button>
            {monthList[selectedMonthYear.month]}{", "}{selectedMonthYear.year}
          </taskbar-window-nav>
          <taskbar-window-body>
            <calendar-container>
              <calendar-container-table
                onMouseMove={(e) => handleCalendarHover(e)}
                onMouseOut={(e) => handleCalendarLeave(e)}
                ref={calendarRef}
              >
                <div id="calendar-hover" style={{ left: calendarHover.x, top: calendarHover.y, display: calendarHover.active ? "block" : "none" }} />
                <table
                >
                  <thead>
                    <tr>
                      {dayList.map(weekDay =>
                        <th key={weekDay}>{weekDay.slice(0, 3)}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {calendarData.map((week, index) =>
                      <tr key={index}>
                        {week.map((dayofWeek, jndex) =>
                          <td key={String(index) + " " + String(jndex)}
                            style={{
                              color: dayofWeek.month !== selectedMonthYear.month ? "dimgray" : "",
                              background: dayofWeek.day === day && dayofWeek.month === month && selectedMonthYear.year === year ? "blue" : ""
                            }}
                          >
                            {dayofWeek.day}
                          </td>)}
                      </tr>)
                    }
                  </tbody>
                </table>
              </calendar-container-table>
            </calendar-container>
            {displaySettings && <calendar-settings>
              <button
                title="Hour Format"
                aria-label="Hour Format"
                onClick={() => setFormats({ ...formats, hour24: !formats.hour24 })}>
                Hour Format:{formats.hour24 ? "24h" : "12h"}
              </button>
              <button
                title="Clock Type"
                aria-label="Clock Type"
                onClick={() => setFormats({ ...formats, clock: formats.clock === "numeric" ? "analog" : "numeric" })}>
                Clock Type: {formats.clock}
              </button>
              <div>
                Date Format:
                <select value={formats.date} onChange={(e) => setFormats({ ...formats, date: e.target.value })}>
                  <option value="dd/mm/yyyy">dd/mm/yyyy</option>
                  <option value="mm/dd/yyyy">mm/dd/yyyy</option>
                  <option value="yyyy/mm/dd">yyyy/mm/dd</option>
                </select>
              </div>
              <div>
                Time Format:
                <select value={formats.time} onChange={(e) => setFormats({ ...formats, time: e.target.value })}>
                  <option value="hh:mm:ss">hh:mm:ss</option>
                  <option value="hh:mm">hh:mm</option>
                </select>
              </div>
            </calendar-settings>
            }
          </taskbar-window-body>
        </taskbar-window>
        , document.getElementById("root"))}
    </>
  )
}