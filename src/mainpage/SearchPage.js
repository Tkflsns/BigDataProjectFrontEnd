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
		<div className='flex flex-col items-center justify-between h-1/3 w-1/2 rounded-lg bg-opacity-40 bg-gray-300 border-4 border-white p-4'>
			<h1 className='font-medium text-5xl mb-6'>공공개방시설 검색</h1>
			<div className='flex justify-evenly w-full'>
				<button 
					className={`text-3xl border-4 cursor-pointer rounded-lg p-4 ${parking ? 'bg-green-400 text-white' : 'bg-transparent bg-gray-500 bg-opacity-30 text-black'} transition-colors duration-300 select-none font-semibold`}
					onClick={() => setParking(!parking)}>
					주차장
				</button>
				<button 
					className={`text-3xl border-4 cursor-pointer rounded-lg p-4 ${classroom ? 'bg-indigo-400 text-white' : 'bg-transparent bg-gray-500 bg-opacity-30 text-black'} transition-colors duration-300 select-none font-semibold`}
					onClick={() => setClassroom(!classroom)}>
					강의실, 회의실
				</button>
				<button 
					className={`text-3xl border-4 cursor-pointer rounded-lg p-4 ${cultural ? 'bg-amber-400 text-white' : 'bg-transparent bg-gray-500 bg-opacity-30 text-black'} transition-colors duration-300 select-none font-semibold`}
					onClick={() => setCultural(!cultural)}>
					문화, 숙박
				</button>
				<button 
					className={`text-3xl border-4 cursor-pointer rounded-lg p-4 ${sports ? 'bg-rose-400 text-white' : 'bg-transparent bg-gray-500 bg-opacity-30 text-black'} transition-colors duration-300 select-none font-semibold`}
					onClick={() => setSports(!sports)}>
					체육시설
				</button>
			</div>
			<button 
				className='text-xl cursor-pointer text-black border bg-sky-300 bg-opacity-25 hover:bg-sky-500 hover:bg-opacity-50 hover:text-white font-extrabold font w-1/3 h-20 p-1 ml-2 rounded mt-6'
				onClick={handleClick}>
				검색
			</button>
		</div>
	</div>
	)
}
