

export default function markerFilter({markerdata, setParkingTm, setClassroomTm, setCulturalTm, setSportsTm}) {
    setClassroomTm(null);
    setCulturalTm(null);
    setParkingTm(null);
    setSportsTm(null);
    console.log("markerdata : ", markerdata);
    let tm1 = markerdata.filter(item => item.code === 'parking'); //주차장 필터링
    let tm2 = markerdata.filter(item => item.code === 'classroom'); //강의실,회의실 필터링
    let tm3 = markerdata.filter(item => item.code === 'cultural');    //문화숙박 필터링
    let tm4 = markerdata.filter(item => item.code === 'sports');    //체육시설 필터링

    if(tm1){
        console.log("tm1 : ", tm1);
        setParkingTm(tm1);
    }
    if(tm2){
        console.log("tm2 : ", tm2);
        setClassroomTm(tm2);
    }
    if(tm3){
        console.log("tm3 : ", tm3);
        setCulturalTm(tm3);
    }
    if(tm4){
        console.log("tm4 : ", tm4);
        setSportsTm(tm4);
    }
}
