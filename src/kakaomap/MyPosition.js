import React from 'react'

const MyPosition = (map) => {
    navigator.geolocation.getCurrentPosition((pos) => {
        let myPos = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        console.log("MyPosition : ", myPos);
        map.panTo(myPos);
        // 내 현재 위치에 마커
        const marker = new kakao.maps.Marker();
        marker.setPosition(myPos);
        marker.setMap(map);
    });
  return (
    <div>
      
    </div>
  )
}

export default MyPosition