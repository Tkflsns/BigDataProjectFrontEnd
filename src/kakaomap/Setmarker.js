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

    const createOverlay = (content, marker) => {
        const result = new kakao.maps.CustomOverlay({
            content: content,
            map: map,
            position: marker.getPosition()
        });
        return result;
    }

    const createTmMarker = () => {
        for(let i = 0; i < tm.length; i++){
            let content = (<div className="absolute left-0 bottom-10 rounded-lg border border-gray-300 border-b-2 border-b-gray-400 bg-white text-sm leading-relaxed z-30 overflow-hidden">
                           <div className="w-72">
                               <div className="py-2 px-3 h-8 bg-gray-200 border-b border-gray-300 text-lg font-bold relative">
                                   ${tm[i].rsrcNM}
                                   <div className="absolute top-2 right-2 cursor-pointer" onClick={() => {overlay.setMap(null)}} title="닫기"></div>
                               </div>
                               <div className="relative">
                                   <div className="float-left m-3">
                                       <img src={tm[i].imgFileUrlAddr} width="73" height="70" alt={tm[i].rsrcNM}/>
                                   </div>
                                   <div className="ml-24 mt-3">
                                       <div className="overflow-hidden text-ellipsis whitespace-nowrap">${tm[i].addr} ${tm[i].daddr}</div>
                                       <div className="text-xs text-gray-600 mt-1">(우) ${tm[i].zip}</div>
                                       <a href={tm[i].instUrlAddr} target="_blank" rel="noopener noreferrer" className="text-blue-600">예약페이지</a>
                                   </div>
                               </div>
                           </div>
                        </div>
            );

            let imageSize = new kakao.maps.Size(37, 46);
            let imageOption = {offset: new kakao.maps.Point(18, 46)};
            let markerImage = createMarkerImage(markerImgSrc, imageSize, imageOption);
            let position = new kakao.maps.LatLng(tm[i].lot, tm[i].lat);
            let marker = createMarker(position, markerImage);
            let overlay = createOverlay(content, marker)

            let infowindow = new kakao.maps.InfoWindow({
                content: `<div>${tm[i].rsrcNM}</div>`
            });

            kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
            kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
            kakao.maps.event.addListener(marker, 'click', () => {overlay.setMap(map)});
            markers.push(marker);
        }
    };

    const setMakers = () => {
        for (let i = 0; i < markers.length; i++){
            markers[i].setMap(map);
        }
    };

    const makeOverListener = (map, marker, infowindow) => {
        return infowindow.open(map, marker);
    };

    const makeOutListener = (infowindow) => {
        return infowindow.close();
    };

  return (
    <div>
      
    </div>
  )
}
