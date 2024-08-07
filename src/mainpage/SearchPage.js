import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SearchPage() {
  const [parking, setParking] = useState(false);
  const [classroom, setClassroom] = useState(false);
  const [cultural, setCultural] = useState(false);
  const [sports, setSports] = useState(false);
  const Navigate = useNavigate();

  const handleClick = () => {
    Navigate('/kakaomap', {state:{parking, classroom, cultural, sports}});
  };

  return (
    <div className='w-full h-full'>
        <form className='flex items-center justify-center min-h-screen '>
            <table className='bg-gray-200 border-2 border-blue-700 rounded'>
                <tbody>
                <tr><th>공공개방시설 검색</th></tr>
                <tr><td><input type='checkbox' id='parking' onChange={() => setParking(!parking)}/>주차장</td></tr>
                <tr><td><input type='checkbox' id='classroom' onChange={() => setClassroom(!classroom)} />강의실, 회의실</td></tr>
                <tr><td><input type='checkbox' id='cultural' onChange={() => setCultural(!cultural)}/>문화, 숙박</td></tr>
                <tr><td><input type='checkbox' id='sports' onChange={() => setSports(!sports)}/>체육시설</td></tr>
                </tbody>
            </table>
            <input type='button' onClick={handleClick} id='searchButton' value='검색' className='text-white border bg-blue-500 hover:bg-blue-700 w-15 h-10 p-1 ml-2 rounded'/>
        </form>
    </div>
  )
}
