import React, { useRef, useState } from 'react'
import LoginModal from './LoginModal';

export default function NavBar() {
	const [loginOpen, setLoginOpen] = useState(false);
	
	const openLoginPage = () => setLoginOpen(true);
	const closeLoginPage = () => setLoginOpen(false);


	return (
		<>
			<div className="bg-white shadow-md">
				<div className="container mx-auto">
					<header className="flex flex-wrap items-center justify-between py-4 px-6">
						<div className="flex items-center">
							<span className="text-xl font-bold">K-Digital 7기</span>
						</div>

						<ul className="flex space-x-6">
							<li><a href="/" className="text-gray-700 hover:text-blue-600 transition duration-200 font-bold">검색페이지</a></li>
							<li><a href="/" className="text-gray-700 hover:text-blue-600 transition duration-200 font-bold">게시판</a></li>
							<li><a href="/" className="text-gray-700 hover:text-blue-600 transition duration-200 font-bold">소개</a></li>
						</ul>
						<div className="flex items-center space-x-4">
							<button type="button"
								className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200 px-4 py-2 rounded"
								onClick={openLoginPage}>로그인</button>
							<button type="button" className="bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-200 px-4 py-2 rounded">회원가입</button>
						</div>
					</header>
				</div>
			</div>
			<LoginModal isOpen={loginOpen} onClose={closeLoginPage} />
		</>
	)
}

