import React from 'react'

const LoginModal = ({isOpen, onClose}) => {
    if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50'>
        <div className='bg-white p-6 rounded shadow-lg w-96'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl'>Login</h2>
                <button onClick={onClose} className='text-gray-500 hover:text-gray-800'>X</button>
            </div>
            <button
                onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
                className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full'
            >
                Login with Google
            </button>
            <button
                onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
                className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full'
            >
                Login with Google
            </button>
            <button
                onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
                className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full'
            >
                Login with Google
            </button>
        </div>
    </div>
  );
};

export default LoginModal