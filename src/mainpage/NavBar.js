import React, { useEffect, useState } from 'react'
import LoginModal from '../login/LoginModal';
import SignModal from '../login/SignModal';
import BoardModal from '../board/BoardModal';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../login/LoginSlice';

export default function NavBar() {

	const [boardOpen, setBoardOpen] = useState(false);
	const [loginOpen, setLoginOpen] = useState(false);
	const [signOpen, setSignOpen] = useState(false);

	const dispatch = useDispatch();
	const loginAuth = useSelector(state => state.login.isAuthenticated);

	useEffect(() => {
		console.log("loginAuth : ", loginAuth);
	},[loginAuth]);

	const handleLogout = () => {
		if(!loginAuth) return;

		dispatch(logoutSuccess());
	}

	return (
		<>
			<div className="bg-gradient-to-br from-white to-blue-50 shadow-md w-full z-20 font-['HanEumB']">
				<div className="container mx-auto flex items-center py-4 px-6">
						<div className="text-2xl font-extrabold text-blue-600">
							K-Digital 7기 : 7조 공공개방시설 안내 웹서비스
						</div>

						<ul className="flex space-x-20 mx-20">
							<li><a href="/" className="text-gray-700 hover:text-blue-600 transition duration-200 font-bold text-xl">시설검색</a></li>
							<li><a onClick={() => setBoardOpen(true)} className="cursor-pointer text-gray-700 hover:text-blue-600 transition duration-200 font-bold text-xl">게시판</a></li>
							<li><a href="/" className="text-gray-700 hover:text-blue-600 transition duration-200 font-bold text-xl">소개</a></li>
						</ul>
						<div className="flex items-center space-x-4 mx-5 ml-72">
							<button type="button"
								className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200 px-4 py-2 rounded"
								onClick={loginAuth ? handleLogout : () => setLoginOpen(true)}>{loginAuth ? '로그아웃' : '로그인'}</button>
							{!loginAuth && <button type="button" className="bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-200 px-4 py-2 rounded"
								onClick={() => setSignOpen(true)}>회원가입</button>}
						</div>
				</div>
			</div>
			{loginOpen && <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />}
			{boardOpen && <BoardModal isOpen={boardOpen} onClose={() => setBoardOpen(false)} />}
			{signOpen && <SignModal isOpen={signOpen} onClose={() => setSignOpen(false)} />}
		</>
	)
}

