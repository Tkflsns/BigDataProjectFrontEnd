import React, { useEffect, useRef, useState } from 'react'
import SideContent from './SideContent';

export default function SideBarMain({Data}) {
	console.log("Data : ", Data);
	const [Sc, setSc] = useState([]);
	const selRef = useRef('ALL');

	const handleChange = () => {
		if (!Data || Data.length === 0) return;
		let ScData = [];
		if (selRef.current.value != 'ALL'){
		ScData = Data.filter(item => item.code === selRef.current.value)
							.map(item => <SideContent tmData={item}/>);
		}else{
		ScData = Data.map(item => <SideContent tmData={item}/>);
		}
		setSc(ScData);
	}

	useEffect(() => {
		const ScData = Data.map(item => <SideContent tmData={item}/>);
		setSc(ScData);
	});

	return (
		<div className='w-full h-full'>
			<div>
			<select id="op"
                ref = {selRef}
				onChange={handleChange}
				defaultValue='ALL'
                className='bg-indigo-100 border border-indigo-300
                           text-gray-900 text-sm rounded-lg
                           focus:ring-blue-500 focus:border-blue-500
                           block w-full p-2.5 font-bold text-center my-2'>
                <option Value='ALL' className='font-bold'>전체보기</option>
                <option value="parking" className='font-bold'>주차장</option>
                <option value="classroom" className='font-bold'>강의실, 회의실</option>
                <option value="cultural" className='font-bold'>문화, 숙박</option>
                <option value="sports" className='font-bold'>체육시설</option>
            </select>
			</div>
			<div className='w-full overflow-y-auto' style={{height: innerHeight - 113}}>
				{Sc}
			</div>
		</div>
	)
}
