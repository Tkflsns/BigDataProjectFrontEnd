import { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";


export default function MarkerFilter({ markerdata, setParkingTm, setClassroomTm, setCulturalTm, setSportsTm }) {
    const [chartData, setChartData] = useState([]);
    const colors = ['#00ff00', '#00bfff', '#ffa500', '#FF8042'];

    useEffect(() => {
        setClassroomTm(null);
        setCulturalTm(null);
        setParkingTm(null);
        setSportsTm(null);

        // console.log("markerdata : ", markerdata);
        let tm1 = markerdata.filter(item => item.code === 'parking'); //주차장 필터링
        let tm2 = markerdata.filter(item => item.code === 'classroom'); //강의실,회의실 필터링
        let tm3 = markerdata.filter(item => item.code === 'cultural');    //문화숙박 필터링
        let tm4 = markerdata.filter(item => item.code === 'sports');    //체육시설 필터링

        setChartData([
            { itemName: '주차장', sum: tm1.length },
            { itemName: '강의실, 회의실', sum: tm2.length },
            { itemName: '문화, 숙박시설', sum: tm3.length },
            { itemName: '체육시설', sum: tm4.length }
        ]);
        console.log("chart : ", chartData);

        if (tm1) {
            console.log("tm1 : ", tm1);
            setParkingTm(tm1);
        }
        if (tm2) {
            // console.log("tm2 : ", tm2);
            setClassroomTm(tm2);
        }
        if (tm3) {
            // console.log("tm3 : ", tm3);
            setCulturalTm(tm3);
        }
        if (tm4) {
            // console.log("tm4 : ", tm4);
            setSportsTm(tm4);
        }
    }, [markerdata])

    return (
        <div className="w-44 h-full">
                <div className="w-full h-full bg-zinc-800 bg-opacity-60">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Legend layout="horizontal" verticalAlign="top" align="center"/>
                            <Pie data={chartData} dataKey="sum" nameKey="itemName" outerRadius={50} label>
                                {
                                    chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index]}/>
                                    ))
                                }
                            </Pie>
                            <Tooltip/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
        </div>
    );
};
