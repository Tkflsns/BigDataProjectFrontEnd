import ReactDOMServer from 'react-dom/server';
import OverlayContent from './OverlayContent';

export default function Setmarker({tm, markerImgSrc, map}) {  
    console.log("SMtm : ", tm);
    console.log("img : ", markerImgSrc);
    console.log("map : ", map);
    if(!tm || tm.length === 0) return;

   

    const createMarkerImage = (src, size, option) => {
        return new kakao.maps.MarkerImage(src, size, option);
    }

    const createMarker = (position, image) => {
        return new kakao.maps.Marker({
            position: position,
            image: image
        });
    };

    tm.forEach(item => {
            let overlay;
            const content = ReactDOMServer.renderToString(
                <OverlayContent item={item} onClose={() => overlay.setMap(null)} />
            );

            let imageSize = new kakao.maps.Size(30, 40);
            let imageOption = {offset: new kakao.maps.Point(18, 46)};
            let markerImage = createMarkerImage(markerImgSrc, imageSize, imageOption);
            let position = new kakao.maps.LatLng(item.lat, item.lot);
            let marker = createMarker(position, markerImage);
            overlay = new kakao.maps.CustomOverlay({
                content: content,
                map: null,
                position: marker.getPosition()
            });

            let infowindow = new kakao.maps.InfoWindow({
                content: `<div>${item.rsrcNm}</div>`
            });

            kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
            kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());
            kakao.maps.event.addListener(marker, 'click', () => {overlay.setMap(map)});
            
            marker.setMap(map)
        });

};
