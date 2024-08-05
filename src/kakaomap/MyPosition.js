import React from 'react'
import SetMarker from './Setmarker';

const MyPosition = (map) => {
    navigator.geolocation.getCurrentPosition((pos) => {
        let myPos = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        console.log("MyPosition : ", myPos);
        map.panTo(myPos);
        // 현재 위치에 마커
        SetMarker(map, myPos);
    });
  return (
    <div>
      
    </div>
  )
}

export default MyPosition