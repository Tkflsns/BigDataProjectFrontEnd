import React, { useEffect, useState } from 'react';
import MyPosition from './MyPosition';
import { useLocation } from 'react-router-dom';
import jsonData from './jsonData';

const Kakaomap_main = () => {
  const [map, setMap] = useState();

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
    if (map) {
      map.setMinLevel(2);
      map.setMaxLevel(5);
      // 현재 위치 이동
      MyPosition(map);
      getbound();

      kakao.maps.event.addListener(map, 'dragend', () => {
        getbound();
      });

      kakao.maps.event.addListener(map, 'zoom_changed', () => {
        getbound();
      });


    }
  }, [map]);

  const getbound = () => {
    const bounds = map.getBounds();
    const { ha, qa, oa, pa } = bounds;
    // ha:남서쪽위도, qa:남서쪽경도, oa:북동쪽위도, pa:북동쪽경도
    const data = { parking, classroom, cultural, sports, ha, qa, oa, pa };
    console.log("data : ", data);
    //json으로 data전송
    jsonData(data);
  };

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
};

export default Kakaomap_main;
