import { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
export const UltraViolet = ({ weatherData, currentHour }) => {
    const [minToday, setMinToday] = useState(0);
    const [maxToday, setMaxToday] = useState(0);
    const [data, setData] = useState(null);
    const [options, setOptions] = useState({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                title: {
                    display: true,
                    text: "UV Index",
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
    if (weatherData === null) return (<></>);
    else {
        useEffect(() => {
            setMaxToday(Math.max.apply(Math, weatherData.hourly.uv_index.slice(0, 23)));
            setMinToday(Math.min.apply(Math, weatherData.hourly.uv_index.slice(0, 23)));
            setData({
                labels: weatherData.hourly.time,
                datasets: [
                    {
                        label: "UV Index",
                        data: weatherData.hourly.uv_index,
                        fill: false,
                        borderColor: "violet",
                        tension: 0.1,
                    }
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
                            <td style={{ background: "rgba(238, 130, 238,0.25)" }}>Max Clear Sky</td>
                            {weatherData.daily.uv_index_clear_sky_max.map((result, index) => (
                                <td key={index} style={{ background: "rgba(238, 130, 238,0.25)" }}>
                                    {result}</td>))}
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }
}