import React, { useEffect, useRef, useState } from 'react';
import MyPosition from './MyPosition';
import { useLocation } from 'react-router-dom';
import jsonData from './jsonData';
import MarkerFilter from './MarkerFilter';
import SetMarker from './SetMarker';
import SideBarMain from './SideBarMain';
import SearchKeyWord from './SearchKeyWord';

export default function Kakaomap_main() {
	const [map, setMap] = useState(null);
	const [swNePosition, setSwNePosition] = useState(null);
	const [Sm, setSm] = useState(null);
	const [searchKeyPage, setSearchKeyPage] = useState(null);
	const [innerHeight, setInnerHeight] = useState(window.innerHeight);
	const [markerdata, setMarkerdata] = useState([]);
	const [parkingTm, setParkingTm] = useState([]);
	const [classroomTm, setClassroomTm] = useState([]);
	const [culturalTm, setCulturalTm] = useState([]);
	const [sportsTm, setSportsTm] = useState([]);

	const mapRef = useRef();

	const location = useLocation();

	const { parking = false, classroom = false, cultural = false, sports = false } = location.state || {};


	useEffect(() => {
		window.addEventListener("resize", resizeListener);
		const script = document.createElement('script');
		script.onload = () => {
			console.log('Kakao Maps API 로드 완료');
			kakao.maps.load(() => {
				const container = mapRef.current;
				const options = {
					center: new kakao.maps.LatLng(35.2358704, 129.0768405),
					level: 4
				};
				const newMap = new kakao.maps.Map(container, options);
				setMap(newMap);
				console.log('Map 객체 생성 완료', newMap);
			});
		};

		script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_API_KEY}&autoload=false`;

		document.head.appendChild(script);

		return () => {
			document.head.removeChild(script);
		};
	}, []);

	useEffect(() => {
		if (!map) return;
		map.setMinLevel(1);
		map.setMaxLevel(5);
		// 현재 위치 이동
		MyPosition(map);
		getbound();

		setSearchKeyPage(() => <SearchKeyWord map={map} />);
		kakao.maps.event.addListener(map, 'tilesloaded', () => { getbound() });

	}, [map]);

	useEffect(() => {
		if (!markerdata || markerdata.length === 0) return;
		setSm(() => <SideBarMain className="w-auto h-auto" Data={markerdata} parking={parking} classroom={classroom} cultural={cultural} sports={sports} />);
		console.log("marker : ", markerdata);
	}, [markerdata])

	const resizeListener = () => {
		setInnerHeight(window.innerHeight);
	}

	const getbound = () => {
		const bounds = map.getBounds();
		const swLatLng = bounds.getSouthWest();
		const neLatLng = bounds.getNorthEast();

		const ha = swLatLng.getLat(); // 남서쪽 위도
		const qa = swLatLng.getLng(); // 남서쪽 경도
		const oa = neLatLng.getLat(); // 북동쪽 위도
		const pa = neLatLng.getLng(); // 북동쪽 경도

		setSwNePosition({ ha, qa, oa, pa });

		// parking:주차장, classroom:강의실,회의실, cultural:문화,숙박, sports:체육시설
		// ha:남서쪽위도swLat, qa:남서쪽경도swLng, oa:북동쪽위도neLat, pa:북동쪽경도neLng
		const data = { parking, classroom, cultural, sports, ha, pa, oa, qa };
		// json으로 data전송
		jsonData({ data, setMarkerdata });
	};

	return (
		<div className='w-full flex'>
			<div className='absolute z-20 h-64'>
				<MarkerFilter markerdata={markerdata} setParkingTm={setParkingTm} setClassroomTm={setClassroomTm} setCulturalTm={setCulturalTm} setSportsTm={setSportsTm} />
			</div>
			<div ref={mapRef} className='flex-grow' style={{ height: innerHeight - 73 }} />
			<div className='w-80' style={{ height: innerHeight - 73 }}>
				{Sm}
			</div>
			<div className='absolute top-18 right-80 mr-1 w-85 h-10 z-20'>
				{searchKeyPage}
			</div>
			{/* 컴포넌트 형태로 SetMarker를 사용 */}
            {parkingTm.length > 0 && <SetMarker tm={parkingTm} markerImgSrc="./img/parking.png" map={map} />}
            {classroomTm.length > 0 && <SetMarker tm={classroomTm} markerImgSrc="./img/classroom.png" map={map} />}
            {culturalTm.length > 0 && <SetMarker tm={culturalTm} markerImgSrc="./img/cultural.png" map={map} />}
            {sportsTm.length > 0 && <SetMarker tm={sportsTm} markerImgSrc="./img/sports.png" map={map} />}
		</div>
	)
};


