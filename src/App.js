import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SearchPage from './mainpage/SearchPage';
import Kakaomap_main from './kakaomap/Kakaomap_main';
import NavBar from './mainpage/NavBar';

function App() {
	// const dispatch = useDispatch();

	// useEffect(() => {
    //     const token = localStorage.getItem('accessToken');
    //     if(token){
    //         const user = localStorage.getItem('userId');
    //         dispatch(loginSuccess({user, token}));
    //     }
    // }, [dispatch]);

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
