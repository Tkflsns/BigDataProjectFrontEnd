import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

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
		if(!parking && !classroom && !cultural && !sports) {
			alert("검색할 선택지를 1개이상 골라주세요.");
			return;
		}
		Navigate('/kakaomap', { state: { parking, classroom, cultural, sports } });
	};

	return (
		<div className='grow flex flex-col items-center justify-center' 
			style={{height: innerHeight-73,
					backgroundImage: "url('./img/background_image.png')",
			 		backgroundSize: 'cover',
					backgroundPosition: 'center'}}>
			<form className='flex flex-col items-center justify-between h-1/3 w-1/2 rounded-lg bg-opacity-40 bg-gray-300 border-4 border-white'>
				<table className='h-full w-full'>
					<tbody className='h-full w-full flex flex-col justify-between items-center'>
						<div className='w-full mt-2 flex flex-col items-center'>
						<tr><th className='font-semibold text-3xl'>공공개방시설 검색</th></tr>
						</div>
						<div className='w-full h-full flex justify-evenly items-center mx-7'>
						<tr><td>
						<label className={`border-2 cursor-pointer rounded-md p-2 ${parking ? 'bg-green-400 text-white' : 'bg-transparent bg-gray-500 bg-opacity-30 text-black'} transition-colors duration-500 select-none font-extrabold`}>
							<input type='checkbox' id='parking' onChange={() => setParking(!parking)} className='hidden'/>주차장
						</label>	
						</td></tr>
						<tr><td>
						<label className={`border-2 cursor-pointer rounded-md p-2 ${classroom ? 'bg-indigo-400 text-white' : 'bg-transparent bg-gray-500 bg-opacity-30 text-black'} transition-colors duration-500 select-none font-extrabold`}>
							<input type='checkbox' id='classroom' onChange={() => setClassroom(!classroom)} className='hidden'/>강의실, 회의실
						</label>
						</td></tr>
						<tr><td>
						<label className={`w-1/4 border-2 cursor-pointer rounded-md p-2 ${cultural ? 'bg-amber-400 text-white' : 'bg-transparent bg-gray-500 bg-opacity-30 text-black'} transition-colors duration-500 select-none font-extrabold`}>
							<input type='checkbox' id='cultural' onChange={() => setCultural(!cultural)} className='hidden'/>문화, 숙박
						</label>
						</td></tr>
						<tr><td>
						<label className={`w-1/4 border-2 cursor-pointer rounded-md p-2 ${sports ? 'bg-rose-400 text-white' : 'bg-transparent bg-gray-500 bg-opacity-30 text-black'} transition-colors duration-500 select-none font-extrabold`}>
							<input type='checkbox' id='sports' onChange={() => setSports(!sports)} className='hidden'/>체육시설
						</label>
						</td></tr>
						</div>
						<input type='button' onClick={handleClick} id='searchButton' value='검색' className='cursor-pointer text-black border bg-sky-300 bg-opacity-25 hover:bg-sky-500 hover:bg-opacity-50 hover:text-white font-extrabold font w-1/3 h-20 p-1 ml-2 rounded mb-2' />
					</tbody>					
				</table>				
			</form>
		</div>
	)
}
