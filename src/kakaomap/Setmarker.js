import React from 'react'

const Setmarker = (map, myPos) => {
    const marker = new kakao.maps.Marker();
    marker.setPosition(myPos);
    marker.setMap(map);
  return (
    <div>
      
    </div>
  )
}

export default Setmarker
