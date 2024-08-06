import React from 'react'

export default function markerFilter({markerdata, setParkingTm, setClassroomTm, setCulturalTm, setSportsTm}) {
    const classroomFilter = ['010100', '010200'];
    let tm1 = markerdata.filter(item => item.code === '010700'); //주차장 필터링
    let tm2 = markerdata.filter(item => classroomFilter.includes(item.code)); //강의실,회의실 필터링
    let tm3 = markerdata.filter(item => item.code === '010000');    //문화숙박 필터링
    let tm4 = markerdata.filter(item => item.code === '010500');    //체육시설 필터링

    if(tm1){
        setParkingTm(tm1);
    }
    if(tm2){
        setClassroomTm(tm2);
    }
    if(tm3){
        setCulturalTm(tm3);
    }
    if(tm4){
        setSportsTm(tm4);
    }

  return (
    <div>
      
    </div>
  )
}
