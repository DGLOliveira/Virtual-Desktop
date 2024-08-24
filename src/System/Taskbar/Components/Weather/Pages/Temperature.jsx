import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { FaTemperatureHalf } from "react-icons/fa6";

import { CategoryScale } from "chart.js";
export const Temperature = ({ weatherData, currentHour }) => {
    const [data, setData] = useState(null);
    const [options, setOptions] = useState({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                title: {
                    display: true,
                    text: weatherData.hourly_units.temperature_2m,
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
        },
    });
    Chart.register(CategoryScale);
    if (weatherData === null) return (<></>);
    else {
        useEffect(() => {
            setData({
                labels: weatherData.hourly.time,
                datasets: [
                    {
                        label: "Real",
                        data: weatherData.hourly.temperature_2m,
                        fill: false,
                        borderColor: "red",
                        tension: 0.1,
                    },
                    {
                        label: "Feel",
                        data: weatherData.hourly.apparent_temperature,
                        fill: false,
                        borderColor: "orange",
                        tension: 0.1,
                    },
                ]
            });
        }, [weatherData]);
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
                            <col span={1} style={{ width: "45px" }}/>
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
                                <td style={{background: "rgba(255, 0, 0, 0.25)"}}>(R)Max</td>
                                {weatherData.daily.temperature_2m_max.map((result, index) => (
                                    <td key={index} style={{background: "rgba(255, 0, 0, 0.25)"}}>{result}</td>))}
                            </tr>
                            <tr >
                                <td style={{background: "rgba(0, 187, 255, 0.25)"}}>(R)Min</td>
                                {weatherData.daily.temperature_2m_min.map((result, index) => (
                                    <td key={index} style={{background: "rgba(0, 187, 255, 0.25)"}}>{result}</td>))
                                }
                            </tr>
                            <tr>
                                <td style={{background: "rgba(255, 152, 0, 0.25)"}}>(F)Max</td>
                                {weatherData.daily.apparent_temperature_max.map((result, index) => (
                                    <td key={index} style={{background: "rgba(255, 152, 0, 0.25)"}}>{result}</td>))}
                            </tr>
                            <tr>
                                <td style={{background: "rgba(0, 187, 255, 0.25)"}}>(F)Min</td>
                                {weatherData.daily.apparent_temperature_min.map((result, index) => (
                                    <td key={index} style={{background: "rgba(0, 187, 255, 0.25)"}}>{result}</td>))
                                }
                            </tr>
                        </tbody>
                    </table>
            </>
        );
    }
}