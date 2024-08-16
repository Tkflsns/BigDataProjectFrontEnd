import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const BoardModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	const [boardData, setBoardData] = useState([]);
	const [boardRow, setBoardRow] = useState([]);

	const loadBoard = async () => {
		try{
		const resp = await axios.get('https://drive.google.com/file/d/1qhNjjDsPapo7avLZmJfc9Qy665HYnSPl/view?usp=sharing');
		setBoardData(resp.data);

		console.log("bddt : ", boardData);
		} catch(error){
			console.error("보드데이터 불러오기 실패", error);
		}
	};

	useEffect(() => {
		loadBoard();
		if (!boardData || boardData.length === 0) return;
		const tm = () => {
			boardData.map(item => {
				<tr key={item.idx}>
					<td>${item.idx}</td>
					<td><Link to={`/board/${item.idx}`}>${item.title}</Link></td>
					<td>${item.username}</td>
					<td>${item.regidate}</td>
					<td>${item.visit_count}</td>
				</tr>
			})
		}
		setBoardRow(tm);
	}, [])

	return (
		<div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex flex-col items-center justify-center z-50'>
			<form className='bg-white p-5 rounded shadow-lg w-3/4 relative'>
				<div className='text-5xl my-7 text-center font-extrabold'>
					<p>게시판</p>
				</div>
				<table className='w-full border-2 border-black'>
					<button onClick={onClose} className='absolute top-11 right-12 text-black hover:text-gray-800 text-4xl font-bold'>X</button>
					<thead className='text-4xl'>
						<tr>
							<th>글번호</th>
							<th>제목</th>
							<th>닉네임</th>
							<th>게시한 날짜</th>
							<th>조회수</th>
						</tr>
					</thead>
					<tbody>
						{boardRow}
					</tbody>
					<tfoot></tfoot>
				</table>
			</form>
		</div>
	)
}

export default BoardModal
