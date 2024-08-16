import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SearchPage from './mainpage/SearchPage';
import Kakaomap_main from './kakaomap/Kakaomap_main';
import NavBar from './mainpage/NavBar';
import BoardModal from './board/BoardModal';
import BoardDetail from './board/BoardDetail';


function App() {

	return (
		<BrowserRouter>
			<div className='w-full h-full'>
				<NavBar />
				<Routes>
					<Route path='/' element={<SearchPage />} />
					<Route path='/kakaomap' element={<Kakaomap_main />} />
					<Route path='/board' element={<BoardModal />}>
						<Route path='/board/:idx' element={<BoardDetail />} />
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
