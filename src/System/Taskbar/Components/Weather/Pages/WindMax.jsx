import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { FaArrowDown } from "react-icons/fa";
export const WindMax = ({ weatherData, currentHour }) => {
    const [data, setData] = useState(null);
    const [options, setOptions] = useState({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                title: {
                    display: true,
                    text: weatherData.hourly_units.windspeed_10m,
                },
                grid: {
                    color: "rgba(255,255,255,0.2)",
                }
            },
            x: {
                title: {
                    display: true,
                    text: "Hour",
                },
                display: false,
                grid: {
                    color: "rgba(255,255,255,0.2)",
                }
            },
        }
    });
    if (weatherData === null) return (<></>);
    else {
        useEffect(() => {
            setData({
                labels: weatherData.hourly.time,
                datasets: [
                    {
                        label: "Speed",
                        data: weatherData.hourly.windspeed_10m,
                        fill: false,
                        borderColor: "aquamarine",
                        tension: 0.1,
                    },
                    {
                        label: "Gusts",
                        data: weatherData.hourly.wind_gusts_10m,
                        fill: false,
                        borderColor: "cyan",
                        tension: 0.1,
                    },
                ]
            });
        }, [weatherData, currentHour]);
        return (
            <>
                <weather-page-chart>
                    {data !== null &&
                        <Line
                            data={data}
                            options={options}
                        />}
                </weather-page-chart>
                <table>
                    <colgroup>
                        <col span={1} style={{ width: "45px" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Day</th>
                            {weatherData.daily.time.map((result, index) => (
                                <th key={index}>{result.slice(8, 10)}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ background: "rgba(127, 255, 212,0.25)" }}>Max Speed</td>
                            {weatherData.daily.windspeed_10m_max.map((result, index) => (
                                <td key={index} style={{ background: "rgba(127, 255, 212,0.25)" }}>{result}</td>))}
                        </tr>
                        <tr >
                            <td style={{ background: "rgba(0, 255, 255, 0.25)" }}>Max Gust</td>
                            {weatherData.daily.windgusts_10m_max.map((result, index) => (
                                <td key={index} style={{ background: "rgba(0, 255, 255, 0.25)" }}>{result}</td>))
                            }
                        </tr>
                        <tr >
                            <td style={{ background: "rgba(0, 187, 255, 0.25)" }}>Main Dir</td>
                            {weatherData.daily.wind_direction_10m_dominant.map((result, index) => (
                                <td key={index} style={{ background: "rgba(0, 187, 255, 0.25)" }}>
                                    {result}{weatherData.daily_units.wind_direction_10m_dominant}
                                    <div style={{ rotate: `${weatherData.daily.wind_direction_10m_dominant[index]}deg` }}>
                                        <FaArrowDown />
                                    </div>
                                </td>))
                            }
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }
}