import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';

const BoardModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	const [boardData, setBoardData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemLen = 10;

	const loadBoard = async () => {
		try {
			const resp = await axios.get('https://raw.githubusercontent.com/Tkflsns/BigDataProjectFrontEnd/main/src/board/boardData.json');
			setBoardData(resp.data.board);

			console.log("bddt : ", resp.data.board);
		} catch (error) {
			console.error("보드데이터 불러오기 실패", error);
		}
	};

	useEffect(() => {
		loadBoard();
	}, [])

	const lastPage = currentPage * itemLen;
	const firstPage = lastPage - itemLen;
	const currentItems = boardData.slice(firstPage, lastPage);

	const totalPages = Math.ceil(boardData.length / itemLen);
	const pageNum = [];
	for(let i = 1; i <= totalPages; i++){
		pageNum.push(i);
	}

	const handlePageClick = (e, num) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentPage(num);
	}

	return (
		<div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex flex-col items-center justify-center z-50'>
			<form className='bg-white p-5 rounded shadow-lg w-3/4 relative'>
				<div className='text-5xl my-8 text-center font-extrabold'>
					<p>게시판</p>
				</div>
				<table className='w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden my-4'>
					<button onClick={onClose} className='absolute top-11 right-12 text-black hover:text-gray-800 text-4xl font-bold'>X</button>
					<thead className='bg-gray-200'>
						<tr>
							<th className='p-3 text-left text-sm font-semibold text-gray-700'>글번호</th>
							<th className='p-3 text-left text-sm font-semibold text-gray-700'>제목</th>
							<th className='p-3 text-left text-sm font-semibold text-gray-700'>닉네임</th>
							<th className='p-3 text-left text-sm font-semibold text-gray-700'>게시한 날짜</th>
							<th className='p-3 text-left text-sm font-semibold text-gray-700'>조회수</th>
						</tr>
					</thead>
					<tbody>
						{currentItems.map(item => (
							<tr key={item.idx} className='odd:bg-gray-100 even:bg-white hover:bg-blue-50 transition-colors'>
								<td className='p-3 text-sm text-gray-800'>{item.idx}</td>
								<td className='p-3 text-sm text-gray-800'><Link to={`/board/${item.idx}`}>{item.title}</Link></td>
								<td className='p-3 text-sm text-gray-800'>{item.username}</td>
								<td className='p-3 text-sm text-gray-800'>{item.regidate_date}</td>
								<td className='p-3 text-sm text-gray-800'>{item.visit_count}</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className='flex justify-center mt-4'>
						<button className='px-4 py-2 mx-2 border rounded hover:bg-gray-200'
								onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
								disabled={currentPage === 1}
						>
						이전
						</button>

						{pageNum.map(num => (
							<button key={num}
									className={`px-4 py-2 mx-1 border rounded ${currentPage === num ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
									onClick={(e) => handlePageClick(e, num)}
							>
								{num}
							</button>
						))}

						<button className='px-4 py-2 mx-2 border rounded hover:bg-gray-200'
								onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
								disabled={currentPage === totalPages}
						>
							다음
						</button>
						<Outlet/>
					</div>
			</form>
		</div>
	)
}

export default BoardModal
