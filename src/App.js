import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SearchPage from './mainpage/SearchPage';
import Kakaomap_main from './kakaomap/Kakaomap_main';
import NavBar from './mainpage/NavBar';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginSuccess } from './login/LoginSlice';

function App() {
	const dispatch = useDispatch();
	//새로고침시 localStorage안에있는 사용자정보를 휘발된 슬라이스에 다시 넣어주는 코드
	useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if(token){
            const user = localStorage.getItem('userId');
            const nick = localStorage.getItem('nick');
            const role = localStorage.getItem('role');
            dispatch(loginSuccess({user, nick, role, token}));
        }
    }, [dispatch]);

	return (
		<BrowserRouter>
			<div className='w-full h-full'>
				<NavBar/>
				<Routes>
					<Route path='/' element={<SearchPage />} />
					<Route path='/kakaomap' element={<Kakaomap_main />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
