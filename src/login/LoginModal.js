import axios from 'axios';
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { loginSuccess } from './LoginSlice';

const LoginModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const refId = useRef(null);
    const refPass = useRef(null);
    const dispatch = useDispatch();

    const handleLoginClick = async () => {
        const data1 = {
            username: refId.current.value,
            password: refPass.current.value,
        };

        console.log("logindata : ", data1);
        try{
        const response = await axios.post('http://10.125.121.183:8010/login', data1);

        const token = response.data.token;
        const user = refId.current.value;

        dispatch(loginSuccess({user, token}));
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("userId", user);

        console.log("Token : ", localStorage.getItem("accessToken"));
        
        onClose();
        }catch(error){
            console.error("로그인 실패 : ", error);
            alert("로그인 실패");
        }
        
    }
    return (
        <nav className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 '>
            <div
                className='bg-white p-5 rounded shadow-lg w-96 relative bg-gradient-to-t from-white to-blue-50'>
                <img src='./img/Exit.png' onClick={onClose} className='absolute top-2 right-2 w-7 h-7 border-2 border-black rounded-md cursor-pointer'></img>
                <div className='mb-4 flex justify-center items-center'><h2 className='text-2xl font-bold'>로그인</h2></div>
                <div className='grid grid-cols-2 gap-2 mr-10 mb-4'>
                    <span className='text-right pr-3 font-bold'>ID : </span>
                    <input ref={refId} type='text' className='border-2 border-stone-800 rounded-lg' />
                    <span className='text-right pr-3 font-bold'>Password : </span>
                    <input ref={refPass} type='password' className='border-2 border-stone-800 rounded-lg' />
                </div>
                <div className='px-16 mt-5 mb-7'>
                    <button onClick={handleLoginClick}
                            className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full mx-1'>
                    로그인
                    </button>
                </div>
                <div className='flex'>
                    <button
                        onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
                        className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full mx-1'>
                        Login with Google
                    </button>
                    <button
                        onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
                        className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full mx-1'>
                        Login with Naver
                    </button>
                    <button
                        onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
                        className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full mx-1'>
                        Login with Kakao
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default LoginModal