import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SearchPage() {
	const [parking, setParking] = useState(false);
	const [classroom, setClassroom] = useState(false);
	const [cultural, setCultural] = useState(false);
	const [sports, setSports] = useState(false);
	const [innerHeight, setInnerHeight] = useState(window.innerHeight);
	const Navigate = useNavigate();

	useEffect(() => {
		const resizeListener = () => {
			setInnerHeight(window.innerHeight);
		};
		window.addEventListener("resize", resizeListener);
		return () => {
			window.removeEventListener("resize", resizeListener);
		};
	}, [])

	const handleClick = () => {
		if (!parking && !classroom && !cultural && !sports) {
			alert("검색할 선택지를 1개이상 골라주세요.");
			return;
		}
		Navigate('/kakaomap', { state: { parking, classroom, cultural, sports } });
	};

	return (
		<div className='grow flex flex-col items-center justify-center'
		style={{
			height: innerHeight - 73,
			backgroundImage: "url('./img/background_image.png')",
			backgroundSize: 'cover',
			backgroundPosition: 'center'
		}}>
		<div className='font-["Danjo"] flex flex-col items-center justify-between h-auto w-3/4 max-w-5xl rounded-lg bg-opacity-50 bg-gray-800 shadow-xl border-4 border-gray-100 p-6'>
			<h1 className='font-bold text-5xl mb-8 text-white'>공공개방시설 검색</h1>
			<div className='font-bold text-5xl mb-8 text-white'>
				<button 
					className={`text-2xl border-4 cursor-pointer rounded-lg py-6 px-4 transition-colors duration-300 font-semibold ${parking ? 'bg-green-500 text-white border-green-600' : 'bg-transparent text-white bg-opacity-30 border-gray-400'} transition-colors duration-300 select-none font-semibold`}
					onClick={() => setParking(!parking)}>
					주차장
				</button>
				<button 
					className={`text-2xl border-4 cursor-pointer rounded-lg py-6 px-4 transition-colors duration-300 font-semibold ${classroom ? 'bg-indigo-500 text-white border-indigo-600' : 'bg-transparent text-white bg-opacity-30 border-gray-400'} transition-colors duration-300 select-none font-semibold`}
					onClick={() => setClassroom(!classroom)}>
					강의실, 회의실
				</button>
				<button 
					className={`text-2xl border-4 cursor-pointer rounded-lg py-6 px-4 transition-colors duration-300 font-semibold ${cultural ? 'bg-amber-500 text-white border-amber-600' : 'bg-transparent text-white bg-opacity-30 border-gray-400'} transition-colors duration-300 select-none font-semibold`}
					onClick={() => setCultural(!cultural)}>
					문화, 숙박
				</button>
				<button 
					className={`text-2xl border-4 cursor-pointer rounded-lg py-6 px-4 transition-colors duration-300 font-semibold ${sports ? 'bg-rose-500 text-white border-rose-600' : 'bg-transparent text-white bg-opacity-30 border-gray-400'}`}
					onClick={() => setSports(!sports)}>
					체육시설
				</button>
			</div>
			<img src='./img/ViewMap.png'
				className='text-2xl cursor-pointer shadow-2xl w-28 h-28 border-4 border-white rounded-2xl'
				onClick={handleClick}>
			</img>
		</div>
	</div>
	)
}
