import { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";

export const Pressure = ({ weatherData, currentHour }) => {
    const [minDaily, setMinDaily] = useState([]);
    const [maxDaily, setMaxDaily] = useState([]);
    const [data, setData] = useState(null);
    const [options, setOptions] = useState({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                title: {
                    display: true,
                    text: weatherData.hourly_units.surface_pressure,
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
            let newMinDaiy=[];
            let newMaxDaily = [];
            let j=0;
            for(let i=0; i < 7 ;i++) {
                if(i===0){
                    j=0;
                }else{
                    j=1;
                }
                newMaxDaily.push(Math.max.apply(Math, weatherData.hourly.surface_pressure.slice(i*24-j, ((i+1)*24)-1)));
                newMinDaiy.push(Math.min.apply(Math, weatherData.hourly.surface_pressure.slice(i*24-j, ((i+1)*24)-1)));
            }
            setMaxDaily(newMaxDaily);
            setMinDaily(newMinDaiy);
            setData({
                labels: weatherData.hourly.time,
                datasets: [
                    {
                        label: "Surface Pressure",
                        data: weatherData.hourly.surface_pressure,
                        fill: false,
                        borderColor: "lightskyblue",
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
                        <thead>
                            <tr>
                                <th>Day</th>
                                {weatherData.daily.time.map((result, index) => (
                                    <th key={index}>{result.slice(8, 10)}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody style={{fontSize: "11px"}}>
                            <tr>
                                <td style={{background: "rgba(255, 0, 0, 0.25)"}}>Max</td>
                                {maxDaily.map((result, index) => (
                                    <td key={index} style={{background: "rgba(255, 0, 0, 0.25)"}}>{result}</td>))}
                            </tr>
                            <tr >
                                <td style={{background: "rgba(0, 187, 255, 0.25)"}}>Min</td>
                                {minDaily.map((result, index) => (
                                    <td key={index} style={{background: "rgba(0, 187, 255, 0.25)"}}>{result}</td>))
                                }
                            </tr>
                        </tbody>
                    </table>
            </>
        );
    }
}