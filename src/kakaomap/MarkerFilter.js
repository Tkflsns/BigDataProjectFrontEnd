import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


export default function MarkerFilter({ markerdata, setParkingTm, setClassroomTm, setCulturalTm, setSportsTm }) {
    const [chartData, setChartData] = useState([]);

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
        <div className="flex flex-col w-28 h-full">
            {chartData.map((data, index) => (
                <div key={index} className="w-full my-2">
                    <ResponsiveContainer width="100%" height={100}>
                        <BarChart data={[data]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="itemName" />
                            <YAxis />
                            <Tooltip/>
                            <Bar dataKey="sum" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ))}
        </div>
    );
};
