import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
export const Precipitation = ({ weatherData, currentHour }) => {
    const [data, setData] = useState(null);
    const [options, setOptions] = useState({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                title: {
                    display: true,
                    text: weatherData.hourly_units.precipitation,
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
                        label: "Rain",
                        data: weatherData.hourly.rain,
                        fill: false,
                        borderColor: "cyan",
                        tension: 0.1,
                    },
                    {
                        label: "Showers",
                        data: weatherData.hourly.showers,
                        fill: false,
                        borderColor: "aquamarine",
                        tension: 0.1,
                    },
                    {
                        label: "Snow",
                        data: weatherData.hourly.snowfall,
                        fill: false,
                        borderColor: "silver",
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
                            <td style={{ background: "rgba(0, 0, 255, 0.25)" }}>Probability</td>
                            {weatherData.daily.precipitation_probability_mean.map((result, index) => (
                                <td key={index} style={{ background: "rgba(0, 0, 255, 0.25)" }}>
                                    {result}{weatherData.daily_units.precipitation_probability_mean}</td>))}
                        </tr>
                        <tr >
                            <td style={{ background: "rgba(30, 144, 255, 0.25)" }}>
                                Total
                                {"("}{weatherData.daily_units.precipitation_sum}{")"}
                                </td>
                            {weatherData.daily.precipitation_sum.map((result, index) => (
                                <td key={index} style={{ background: "rgba(30, 144, 255, 0.25)" }}>{result}</td>))
                            }
                        </tr>
                        <tr >
                            <td style={{ background: "rgba(0, 255, 255, 0.25)" }}>
                                Rain
                                {"("}{weatherData.daily_units.rain_sum}{")"}
                                </td>
                            {weatherData.daily.rain_sum.map((result, index) => (
                                <td key={index} style={{ background: "rgba(0, 255, 255, 0.25)" }}>{result}</td>))
                            }
                        </tr>
                        <tr >
                            <td style={{ background: "rgba(128, 255, 255, 0.25)" }}>
                                Showers
                                {"("}{weatherData.daily_units.showers_sum}{")"}</td>
                            {weatherData.daily.showers_sum.map((result, index) => (
                                <td key={index} style={{ background: "rgba(128, 255, 255, 0.25)" }}>{result}</td>))
                            }
                        </tr>
                        <tr >
                            <td style={{ background: "rgba(255, 255, 255, 0.25)" }}>
                                Snow
                                {"("}{weatherData.daily_units.snowfall_sum}{")"}
                                </td>
                            {weatherData.daily.snowfall_sum.map((result, index) => (
                                <td key={index} style={{ background: "rgba(255, 255, 255, 0.25)" }}>{result}</td>))
                            }
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }
}