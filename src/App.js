import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SearchPage from './kakaomap/SearchPage';
import Kakaomap_main from './kakaomap/Kakaomap_main';


function App() {

  return (
    <BrowserRouter>
    <div className='w-full h-full'>
      <Routes>
        <Route path='/' element={<SearchPage/>}/>
        <Route path='/kakaomap' element={<Kakaomap_main/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
