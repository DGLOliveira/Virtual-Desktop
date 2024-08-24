import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
export const WeatherChart = ({ weatherData, target, scale, startIndex }) => {
    const weatherChartRef = useRef(null);
    if (weatherData === null) {
        return (<></>);
    } else {
        useEffect(() => {
            const ctx = weatherChartRef.current.getContext("2d");
            const chart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: weatherData.map((data, index) => index),
                    datasets: [
                        {
                            label: target,
                            data: weatherData.map((data) => data[target]),
                            fill: false,
                            borderColor: "rgb(75, 192, 192)",
                            tension: 0.1
                        }
                    ]
                }
            })
        })
        return (<canvas ref={weatherChartRef}/>);
    }
}