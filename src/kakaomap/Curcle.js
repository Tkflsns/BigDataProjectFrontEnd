import React from 'react'

const Curcle = (map, myPos) => {
        // 지도에 원을 표시한다
        var circle = new kakao.maps.Circle({
        map: map, // 원을 표시할 지도 객체
        center : myPos, // 지도의 중심 좌표
        radius : 500, // 원의 반지름 (단위 : m)
        fillColor: '#FF0000', // 채움 색
        fillOpacity: 0.1, // 채움 불투명도
        strokeWeight: 2, // 선의 두께
        strokeColor: '#FF0000', // 선 색
        strokeOpacity: 0.2, // 선 투명도 
        strokeStyle: 'solid' // 선 스타일
	});	
  return (
    <div>
      
    </div>
  )
}

export default Curcle
