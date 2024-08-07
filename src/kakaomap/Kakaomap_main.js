import React, { useEffect, useState } from 'react';
import MyPosition from './MyPosition';
import { useLocation } from 'react-router-dom';
import jsonData from './jsonData';
import MarkerFilter from './MarkerFilter';
import SetMarker from './SetMarker';

const Kakaomap_main = () => {
  const [map, setMap] = useState();
  const [markerdata, setMarkerdata] = useState([]);
  const [parkingTm, setParkingTm] = useState([]);
  const [classroomTm, setClassroomTm] = useState([]);
  const [culturalTm, setCulturalTm] = useState([]);
  const [sportsTm, setSportsTm] = useState([]);

  const location = useLocation();
  const parking = location.state.parking;
  const classroom = location.state.classroom;
  const cultural = location.state.cultural;
  const sports = location.state.sports;


  useEffect(() => {
    const script = document.createElement('script');
    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 4
        };
        setMap(new kakao.maps.Map(container, options));
      });
    };

    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_API_KEY}&autoload=false`;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!map) return;
      map.setMinLevel(2);
      map.setMaxLevel(5);
      // 현재 위치 이동
      MyPosition(map);
      getbound();

      kakao.maps.event.addListener(map, 'tilesloaded', () => {
        getbound();
      });

  }, [map]);

  useEffect(() => {
    if (!markerdata || markerdata.length === 0) return;
    console.log("marker : ", markerdata);
    MarkerFilter(markerdata, setParkingTm, setClassroomTm, setCulturalTm, setSportsTm);
  },[markerdata])

  useEffect(() => {
    if (!parkingTm || parkingTm.length === 0) return;
    const markerImgSrc = './img/parking.png';
    const tm = parkingTm;
    SetMarker(tm, markerImgSrc, map);
  },[parkingTm]);

  useEffect(() => {
    if (!classroomTm || classroomTm.length === 0) return;
    const markerImgSrc = './img/classroom.png';
    const tm = classroomTm;
    SetMarker(tm, markerImgSrc, map);
  },[classroomTm]);

  useEffect(() => {
    if (!culturalTm || culturalTm.length === 0) return;
    const markerImgSrc = './img/cultural.png';
    const tm = culturalTm;
    SetMarker(tm, markerImgSrc, map);
  },[culturalTm]);

  useEffect(() => {
    if (!sportsTm || sportsTm.length === 0) return;
    const markerImgSrc = './img/sports.png';
    const tm = sportsTm;
    SetMarker(tm, markerImgSrc, map);
  },[sportsTm]);

  const getbound = () => {
    const bounds = map.getBounds();
    const { ha, qa, oa, pa } = bounds;
    // parking:주차장, classroom:강의실,회의실, cultural:문화,숙박, sports:체육시설
    // ha:남서쪽위도, qa:남서쪽경도, oa:북동쪽위도, pa:북동쪽경도
    const data = { parking, classroom, cultural, sports, ha, qa, oa, pa };
    console.log("data : ", data);
    //json으로 data전송
    jsonData(data, setMarkerdata);
  };

  return <div id="map" className='w-full h-screen' />;
};

export default Kakaomap_main;
