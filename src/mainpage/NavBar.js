import React, { useEffect, useState } from 'react'
import LoginModal from '../login/LoginModal';
import SignModal from '../login/SignModal';
import BoardModal from '../board/BoardModal';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../login/LoginSlice';
import IntroModal from './IntroModal';
import axios from 'axios';

export default function NavBar() {

	const [boardOpen, setBoardOpen] = useState(false);
	const [loginOpen, setLoginOpen] = useState(false);
	const [signOpen, setSignOpen] = useState(false);
	const [introOpen, setIntroOpen] = useState(false);

	const dispatch = useDispatch();
	const loginAuth = useSelector(state => state.login.isAuthenticated);
	const loginNick = useSelector(state => state.login.nick);
	const loginUser = useSelector(state => state.login.user);

	useEffect(() => {
		console.log("loginAuth : ", loginAuth);
	},[loginAuth]);

	const handleLogout = () => {
		if(!loginAuth) return;

		dispatch(logoutSuccess());
		localStorage.removeItem('accessToken');
		localStorage.removeItem('userId');
		localStorage.removeItem('nick');
		localStorage.removeItem('role');
	}

	const handleDelId = async () => {
		if (!loginAuth) return;
		const confirmDelete = window.confirm("정말 회원을 탈퇴하시겠습니까?");
        if (!confirmDelete) return;
		try{
		const resp = await axios.delete(`http://10.125.121.183:8080/delete?username=${loginUser}`);
		console.log("회원탈퇴 : ", resp);
		alert("회원탈퇴 되었습니다.");

		dispatch(logoutSuccess());
		localStorage.removeItem('accessToken');
		localStorage.removeItem('userId');
		localStorage.removeItem('nick');
		localStorage.removeItem('role');
		}catch (error) {
			console.log("회원삭제 실패 : ", error);
		}
	} 

	return (
		<>
			<div className="bg-gradient-to-br from-white to-blue-50 shadow-md w-full z-20 font-['HanEumB']">
				<div className="w-full mx-2 flex items-center py-4 px-6 justify-between">
						<div className="text-2xl font-extrabold text-blue-600 -mr-56">
							K-Digital 7기 : 7조 공공개방시설 안내 웹서비스
						</div>
						<ul className="flex space-x-20">
							<li><a href="/" className="text-gray-700 hover:text-blue-600 transition duration-200 font-bold text-xl">시설검색</a></li>
							<li><a onClick={() => setBoardOpen(true)} className="cursor-pointer text-gray-700 hover:text-blue-600 transition duration-200 font-bold text-xl">게시판</a></li>
							<li><a onClick={() => setIntroOpen(true)} className="cursor-pointer text-gray-700 hover:text-blue-600 transition duration-200 font-bold text-xl">소개</a></li>
						</ul>
						<div className="flex items-center space-x-4 mx-5">
							{loginAuth ? <span>{loginNick}님 로그인</span> : null}
							<button type="button"
								className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200 px-4 py-2 rounded"
								onClick={loginAuth ? handleLogout : () => setLoginOpen(true)}>{loginAuth ? '로그아웃' : '로그인'}</button>
							{!loginAuth ? <button type="button" className="bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-200 px-4 py-2 rounded"
								onClick={() => setSignOpen(true)}>회원가입</button> : 
								<button type="button" className="bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-200 px-4 py-2 rounded"
								onClick={handleDelId}>회원탈퇴</button>
								}
						</div>
				</div>
			</div>
			{loginOpen && <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />}
			{boardOpen && <BoardModal isOpen={boardOpen} onClose={() => setBoardOpen(false)} />}
			{signOpen && <SignModal isOpen={signOpen} onClose={() => setSignOpen(false)} />}
			{introOpen && <IntroModal isOpen={introOpen} onClose={() => setIntroOpen(false)} />}
		</>
	)
}

