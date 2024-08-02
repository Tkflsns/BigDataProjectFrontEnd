import React, { useEffect, useState } from 'react';
import MyPosition from './MyPosition';

const Kakaomap_main = () => {
  const [map, setMap] = useState();
  const [bounds, setBounds] = useState();

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
      setBounds(map.getBounds());
      console.log("bounds : ", bounds);
      // 현재 위치 이동
      MyPosition(map);
    }
  }, [map]);

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
};

export default Kakaomap_main;
