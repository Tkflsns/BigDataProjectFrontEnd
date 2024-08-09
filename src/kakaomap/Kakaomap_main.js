import React, { useEffect, useRef, useState } from 'react';
import MyPosition from './MyPosition';
import { useLocation } from 'react-router-dom';
import jsonData from './jsonData';
import MarkerFilter from './MarkerFilter';
import SetMarker from './SetMarker';
import SideOverlay from './SideOverlay';
import SideContent from './SideContent';
import parkingJson from './parking.json'

export default function Kakaomap_main() {
  const [map, setMap] = useState(null);
  const [swNePosition, setSwNePosition] = useState();
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [markerdata, setMarkerdata] = useState([]);
  const [parkingTm, setParkingTm] = useState([]);
  const [classroomTm, setClassroomTm] = useState([]);
  const [culturalTm, setCulturalTm] = useState([]);
  const [sportsTm, setSportsTm] = useState([]);
  const mapRef = useRef();

  const location = useLocation();
  const parking = location.state.parking;
  const classroom = location.state.classroom;
  const cultural = location.state.cultural;
  const sports = location.state.sports;


  useEffect(() => {
    window.addEventListener("resize", resizeListener);
    const script = document.createElement('script');
    script.onload = () => {
      kakao.maps.load(() => {
        const container = mapRef.current;
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 4
        };
        const newMap = new kakao.maps.Map(container, options)
        setMap(newMap);
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

    kakao.maps.event.addListener(map, 'tilesloaded', () => getbound());

    // console.log("parkingdata : ", parkingJson);
    // let tm = parkingJson.data;
    // console.log("ptm : ", parkingTm);
    // let tm2 = [...tm];
    // console.log("tm2 : ", tm2);
    // setParkingTm(tm2);
    // console.log("ptm : ", parkingTm);

  }, [map]);

  useEffect(() => {
    if (!markerdata || markerdata.length === 0) return;
    // console.log("marker : ", markerdata);
    MarkerFilter({ markerdata, setParkingTm, setClassroomTm, setCulturalTm, setSportsTm });
  }, [markerdata])

  useEffect(() => {
    // console.log("parkingTm : ", parkingTm);
    // console.log("swnepos : ", swNePosition);
    if (!parkingTm || parkingTm.length === 0) return;
    console.log("parkingTm : ", parkingTm);
    const tm = parkingTm;
    const markerImgSrc = './img/parking.png';
    // const tm = parkingTm.filter(item =>
    //     item.lat >= swNePosition.ha &&
    //     item.lat <= swNePosition.oa &&
    //     item.lot >= swNePosition.qa &&
    //     item.lot <= swNePosition.pa
    //   );
        // console.log("tm : ", tm);

    SetMarker({tm, markerImgSrc, map});
  }, [parkingTm]);

  useEffect(() => {
    console.log("classroomTm : ", classroomTm);
    if (!classroomTm || classroomTm.length === 0) return;
    const tm = classroomTm;
    const markerImgSrc = './img/classroom.png';
    SetMarker({ tm, markerImgSrc, map });
  }, [classroomTm]);

  useEffect(() => {
    console.log("culturalTm : ", culturalTm);
    if (!culturalTm || culturalTm.length === 0) return;
    const markerImgSrc = './img/cultural.png';
    const tm = culturalTm;
    SetMarker({ tm, markerImgSrc, map });
  }, [culturalTm]);

  useEffect(() => {
    console.log("sportsTm : ", sportsTm);
    if (!sportsTm || sportsTm.length === 0) return;
    const markerImgSrc = './img/sports.png';
    const tm = sportsTm;
    SetMarker({ tm, markerImgSrc, map });
  }, [sportsTm]);

  const resizeListener = () => {
    setInnerHeight(window.innerHeight);
  }

  const getbound = () => {
    const bounds = map.getBounds();
    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();
    
    const ha = swLatLng.getLat(); // 남서쪽 위도
    const qa = swLatLng.getLng(); // 남서쪽 경도
    const oa = neLatLng.getLat(); // 북동쪽 위도
    const pa = neLatLng.getLng(); // 북동쪽 경도

    setSwNePosition({ha, qa, oa, pa});
    console.log("bounds : ", bounds);
    // parking:주차장, classroom:강의실,회의실, cultural:문화,숙박, sports:체육시설
    // ha:남서쪽위도swLat, qa:남서쪽경도swLng, oa:북동쪽위도neLat, pa:북동쪽경도neLng
    const data = { parking, classroom, cultural, sports, ha, pa, oa, qa};
    // json으로 data전송
    jsonData({ data, setMarkerdata });
  };

  return (
    <div>
      <div className='fixed h-full w-1/5 right-0 top-15'>
        <SideContent />
      </div>
      <div ref={mapRef} className='w-4/5' style={{ height: innerHeight - 73 }} >
      </div>
    </div>
  )
};


