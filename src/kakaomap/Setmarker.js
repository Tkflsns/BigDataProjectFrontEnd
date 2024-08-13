import { useState } from "react";

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

tm.map(item => {
        const content = () => `
            <div style="position: absolute; left: -40px; bottom: 12px; border-radius: 8px; border: 1px solid #ccc; background-color: white; padding: 10px; font-size: 14px; width: 25rem;">
                <div style="display: flex; justify-content: space-between; padding: 5px; background-color: #f0f0f0; border-bottom: 1px solid #ccc;">
                    <div>${item.rsrcNm}</div>
                    <button style="border: none; background: none; cursor: pointer;" onclick="this.parentElement.parentElement.style.display='none'">X</button>
                </div>
                <div style="display: flex; margin-top: 10px;">
                    <img src="${item.imgFileUrlAddr}" width="73" height="70" alt="${item.rsrcNm}" style="margin-right: 10px;" />
                    <div>
                        <div style="word-break: break-all;"><p>${item.addr}</p><p>${item.daddr}</p></div>
                        <div style="font-size: 12px; color: gray;">(우) ${item.zip}</div>
                        <a href="${item.instUrlAddr}" target="_blank" style="color: blue;">예약페이지</a>
                    </div>
                </div>
            </div>
        `;
        let imageSize = new kakao.maps.Size(40, 50);
        let imageOption = { offset: new kakao.maps.Point(18, 46) };
        let markerImage = createMarkerImage(markerImgSrc, imageSize, imageOption);
        let position = new kakao.maps.LatLng(item.lat, item.lot);
        let marker = createMarker(position, markerImage);
        let overlay = new kakao.maps.CustomOverlay({
            content: content(),
            clickable: true,
            zIndex: 20,
            map: null,
            position: marker.getPosition()
        });

        let infowindow = new kakao.maps.InfoWindow({
            content: `<div>${item.rsrcNm}</div>`
        });

        kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
        kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());
        kakao.maps.event.addListener(marker, 'click', () => { overlay.setMap(map) });

        marker.setMap(map)
    });

};
