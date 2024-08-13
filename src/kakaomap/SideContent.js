import React, { useEffect, useState } from 'react'

export default function SideContent({tmData}) {
	const [SCon, setSCon] = useState();
	console.log("tm : ", tmData);
	useEffect(() => {
		if (!tmData) return;
		let tm2 = (
			<div className='w-full h-full'>
				<div className="py-1 px-3 bg-gray-200 border-b border-gray-300 text-lg font-bold h-auto">
					{tmData.rsrcNm}
				</div>
				<div className='flex'>
					<div className="flex items-center m-1 h-auto max-w-20">
						<img src={tmData.imgFileUrlAddr} alt={tmData.rsrcNm} />
					</div>
					<div className="ml-2 mt-1">
						<div className="overflow-hidden break-all">
							{tmData.addr} {tmData.daddr}
						</div>
						<div className="text-xs text-gray-600 mt-1">(우) {tmData.zip}</div>
						<a href={tmData.instUrlAddr} target="_blank" rel="noopener noreferrer" className="text-blue-600">
							예약페이지
						</a>
					</div>
				</div>
			</div>
		);
		setSCon(tm2);
	}, [tmData]);

	return (
		<div className='border-2 border-blue-300 rounded-md bg-white-100 shadow-xl w-full h-auto pb-2'>
			{SCon}
		</div>
	)
}
