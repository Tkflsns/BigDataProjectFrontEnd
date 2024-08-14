import ReactDOMServer from 'react-dom/server';

export default function Setmarker({ tm, markerImgSrc, map }) {
    if (!tm || tm.length === 0) return;

    // console.log("SMtm : ", tm);
    // console.log("img : ", markerImgSrc);
    // console.log("map : ", map);

    const createMarkerImage = (src, size, option) => {
        return new kakao.maps.MarkerImage(src, size, option);
    }

    const createMarker = (position, image) => {
        return new kakao.maps.Marker({
            position: position,
            image: image
        });
    };

    tm.map((item, index) => {
        let content = ReactDOMServer.renderToString(
            <div className="absolute -left-40 bottom-12 rounded-lg border border-gray-300 border-b-2 border-b-gray-400
                          bg-white text-sm leading-relaxed w-auto h-auto">
                <div className="flex justify-between w-auto py-2 px-3 h-auto bg-gray-200 border-b border-gray-300 text-lg font-bold break-all">
                    <div className='w-auto h-auto'>{item.rsrcNm}&nbsp;&nbsp;</div>
                    {/* <button id="close-overlay-${index}" className='text-gray-500 hover:text-gray-800 close-overlay'>X</button> */}
                </div>
                <div className="flex">
                    <div className="flex items-center w-20 h-auto m-1">
                        <img src={item.imgFileUrlAddr} width="73" height="70" alt={item.rsrcNm} />
                    </div>
                    <div className="mt-2 w-auto h-full mr-1">
                        <div className="">
                            <p>{item.addr}</p><p>{item.daddr}</p>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">(우) {item.zip}</div>
                        <a href={item.instUrlAddr} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-100">
                            예약페이지
                        </a>
                    </div>
                </div>
            </div>
        );
        let imageSize = new kakao.maps.Size(40, 50);
        let imageOption = { offset: new kakao.maps.Point(18, 46) };
        let markerImage = createMarkerImage(markerImgSrc, imageSize, imageOption);
        let position = new kakao.maps.LatLng(item.lat, item.lot);
        let marker = createMarker(position, markerImage);
        let overlay = new kakao.maps.CustomOverlay({
            content: content,
            clickable: true,
            zIndex: 20,
            map: null,
            position: marker.getPosition()
        });

        let infowindow = new kakao.maps.InfoWindow({
            content: `<div>${item.rsrcNm}</div>`
        });

        // function closeOverlay() {
        //     overlay.setMap(null);
        // }

        kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
        kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());
        kakao.maps.event.addListener(marker, 'click', () => {
            overlay.setMap(map);
            // document.getElementById(`close-overlay-${index}`).addEventListener('click', () => overlay.setMap(null));
         });
        kakao.maps.event.addListener(map, 'tilesloaded', () => { 
                                                        overlay.setMap(null) 
        });

        marker.setMap(map)
    });

};
