import React, { useEffect, useState } from 'react'
import BoardWrite from './BoardWrite';
import axios from 'axios';
import { useSelector } from 'react-redux';

const BoardModal = ({ isOpen, onClose }) => {
	const [boardData, setBoardData] = useState([]);
	const [detailOpen, setDetailOpen] = useState(false);
    const [writeOpen, setWriteOpen] = useState(false); // 글쓰기 페이지 열림/닫힘 상태
    const [editOpen, setEditOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemLen = 10;

    if (!isOpen) return null;

    const totalPages = Math.ceil(boardData.length / itemLen);
    const lastPage = currentPage * itemLen;
    const firstPage = lastPage - itemLen;
    const currentItems = boardData.slice(firstPage, lastPage);

    const pageNum = [];

    const loginAuth = useSelector((state) => state.login.isAuthenticated);

	const loadBoardData = async () => {
		try {
			const resp = await axios.get('https://raw.githubusercontent.com/Tkflsns/BigDataProjectFrontEnd/main/src/board/boardData.json');
			setBoardData(resp.data.board);
			console.log("Board Data: ", resp.data.board);
		} catch (error) {
			console.error("보드데이터 불러오기 실패", error);
		}
	};

	useEffect(() => {
		loadBoardData();
	}, []);
	
    for (let i = 1; i <= totalPages; i++) {
        pageNum.push(i);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setDetailOpen(true);
        setWriteOpen(false); // 글쓰기 창 닫기
        setEditOpen(false);
    };

    const handleDetailClose = () => {
        setDetailOpen(false);
        setSelectedItem(null);
    };

    const handleWriteClick = () => {
        if (!loginAuth) {
            alert("로그인후 글쓰기가 가능합니다.");
            return;
        }
        setSelectedItem(null);
        setWriteOpen(true);  // 글쓰기 창 열기
        setDetailOpen(false); // 상세 페이지 닫기
        setEditOpen(false);
    };

    const handleWriteClose = () => {
        setWriteOpen(false);  // 글쓰기 창 닫기
    };

    const handleEditClick = () => {
        if (!loginAuth) {
            alert("로그인후 글수정이 가능합니다.");
            return;
        }
        setEditOpen(true);
        setDetailOpen(false);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const handleDelete = () => {
        if (!loginAuth) {
            alert("로그인후 글삭제가 가능합니다.");
            return;
        }
        const updateBoardData = boardData.filter(item => item.idx !== selectedItem.idx);
        setBoardData(updateBoardData);
        setDetailOpen(false);
        setSelectedItem(null);
    }

    const handleSubmit = (newPost) => {
        console.log("newPost : ", newPost);
        if (editOpen){
            const updateBoardData = boardData.map(item =>
                item.idx === newPost.idx ? newPost : item
            );
            setBoardData(updateBoardData);
            setEditOpen(false);
            setDetailOpen(true);
        } else {
            setBoardData([newPost, ...boardData]); // 새 글을 앞에 추가
            setWriteOpen(false); // 글쓰기 창 닫기
        };
        setSelectedItem(newPost);
    };

    return (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex flex-col items-center justify-center z-30 font-["NanumGodic"]'>
            <div className='bg-white p-5 rounded-md shadow-lg w-3/4 relative bg-gradient-to-t from-white to-blue-50'>
            <img src='./img/Exit.png' onClick={onClose} className='absolute top-5 right-5 w-7 h-7 border-2 border-black rounded-md cursor-pointer'></img>

                {/* 글쓰기 페이지 */}
                {writeOpen || editOpen ? (
                    <BoardWrite onSubmit={handleSubmit} onClose={writeOpen ? handleWriteClose : handleEditClose} initialData={selectedItem || {}} />
                ) : detailOpen && selectedItem ? (
                    <div className="detail-container p-6 rounded-lg bg-gray-100 shadow-md">
                        <h2 className="text-2xl font-bold text-blue-700 mb-4">{selectedItem.title}</h2>
                        <div className="flex justify-between mb-4">
                            <p className="text-sm text-gray-500">글번호: {selectedItem.idx}</p>
                            <p className="text-sm text-gray-500">조회수: {selectedItem.visit_count}</p>
                        </div>
                        <p className="text-md text-gray-700 mb-6"><strong>작성자:</strong> {selectedItem.username}</p>
                        <p className="text-md text-gray-700 mb-6"><strong>작성일:</strong> {new Date(selectedItem.regidate_date).toLocaleString()}</p>
                        <p className="text-md text-gray-800 mb-6"><strong>내용:</strong> {selectedItem.content}</p>
                        <div className='flex justify-end space-x-4'>
                            <button onClick={handleEditClick} className='px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600'>
                                수정하기
                            </button>
                            <button onClick={handleDelete} className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'>
                                삭제하기
                            </button>
                            <button onClick={handleDetailClose} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
                                닫기
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-5xl my-8 text-center font-extrabold font-['DanJo']">게 시 판</h2>
                        <button onClick={handleWriteClick} className='mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'>글쓰기</button>
                        <table className='w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden my-4'>
                            <thead className='bg-gray-200'>
                                <tr>
                                    <th className='p-3 text-left text-sm font-semibold text-gray-700'>글번호</th>
                                    <th className='p-3 text-left text-sm font-semibold text-gray-700'>제목</th>
                                    <th className='p-3 text-left text-sm font-semibold text-gray-700'>닉네임</th>
                                    <th className='p-3 text-left text-sm font-semibold text-gray-700'>게시한 날짜</th>
                                    <th className='p-3 text-left text-sm font-semibold text-gray-700'>조회수</th>
                                </tr>
                            </thead>
                            <tbody className='cursor-pointer'>
                                {currentItems.length > 0 ? (
                                    currentItems.map(item => (
                                        <tr key={item.idx} className='odd:bg-gray-100 even:bg-white hover:bg-blue-50 transition-colors'
                                            onClick={() => handleItemClick(item)}>
                                            <td className='p-3 text-sm text-gray-800'>{item.idx}</td>
                                            <td className='p-3 text-sm text-gray-800'>{item.title}</td>
                                            <td className='p-3 text-sm text-gray-800'>{item.username}</td>
                                            <td className='p-3 text-sm text-gray-800'>{new Date(item.regidate_date).toLocaleDateString()}</td>
                                            <td className='p-3 text-sm text-gray-800'>{item.visit_count}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className='p-3 text-center text-sm text-gray-800'>데이터가 없습니다.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className='flex justify-center mt-4'>
                            <button className='px-4 py-2 mx-2 border rounded hover:bg-gray-200'
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}>
                                이전
                            </button>
                            {pageNum.map(num => (
                                <button key={num}
                                    className={`px-4 py-2 mx-1 border rounded ${currentPage === num ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                                    onClick={() => setCurrentPage(num)}>
                                    {num}
                                </button>
                            ))}
                            <button className='px-4 py-2 mx-2 border rounded hover:bg-gray-200'
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}>
                                다음
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
	)
}

export default BoardModal
