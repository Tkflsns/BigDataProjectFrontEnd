import React from 'react'

export default function Setmarker({tm, markerImgSrc, map}) {
    
    const markers = [];

    createTmMarker();
    setMakers();

    const createMarkerImage = (src, size, option) => {
        const  markerImage = new kakao.maps.MarkerImage(src, size, option);
        return markerImage;
    }

    const createMarker = (position, image) => {
        const marker = new kakao.maps.Marker({
            position: position,
            image: image
        });
        return marker;
    };

    const createTmMarker = () => {
        for(let i = 0; i < tm.length; i++){
            let imageSize = new kakao.maps.Size(37, 46);
            let imageOption = {offset: new kakao.maps.Point(18, 46)};
            let markerImage = createMarkerImage(markerImgSrc, imageSize, imageOption);
            let position = new kakao.maps.LatLng(tm[i].lot, tm[i].lat);
            let marker = createMarker(position, markerImage);

            markers.push(marker);
        }
    };

    const setMakers = () => {
        for (let i = 0; i < markers.length; i++){
            markers[i].setMap(map);
        }
    }
  return (
    <div>
      
    </div>
  )
}
