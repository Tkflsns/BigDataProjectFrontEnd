import React, { useRef } from 'react'

const SearchKeyWord = ({map}) => {
	const keyWordRef = useRef(null);
	
	const handleSearchClick = () => {
		if (!kakao || !kakao.maps || !kakao.maps.services) {
            console.error('Kakao Maps API가 로드되지 않았습니다.');
            return;
        }

		const ps = new kakao.maps.services.Places();

		if (!keyword) {
            console.warn('검색어를 입력하세요.');
            return;
        }

		ps.keywordSearch(keyWordRef.current.value, placesSearchDB);

		const placesSearchDB = (data, status, pagination) => {
			if (status === window.kakao.maps.services.Status.OK){
				const bounds = new window.kakao.maps.LatLngBounds();

				data.forEach((place) => {
					const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
					bounds.extend(placePosition);
				})

				map.setBounds(bounds);
			} else {
				console.warn('검색된 결과가 없습니다.');
			}
		}
	}

	return (
		<div className='w-full h-full flex items-center justify-center bg-blue-200 rounded-2xl'>
			<span className='text-xl mx-3 font-bold'>장소검색 : </span>
			<input ref={keyWordRef} type='text' className='border-2 border-black rounded'/>
			<button onClick={handleSearchClick} className='p-1 mx-3 bg-blue-500 text-white rounded hover:bg-blue-600'>검색</button>
		</div>
	)
}

export default SearchKeyWord

