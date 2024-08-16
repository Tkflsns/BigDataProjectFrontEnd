import React, { useRef } from 'react'

const SignModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	const refId = useRef(null);
	const refPass = useRef(null);

	return (
		<div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50'>
			<div className='bg-white p-5 rounded shadow-lg w-96 relative'>
				<button onClick={onClose} className='absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold'>X</button>
				<div className='mb-4 flex justify-center items-center'><h2 className='text-2xl font-bold'>회원가입</h2></div>
				<div className='grid grid-cols-2 gap-2 mr-10 mb-4'>
					<span className='text-right pr-3 font-bold'>ID : </span>
					<input ref={refId} type='text' className='border-2 border-stone-800 rounded-md' />
					<span className='text-right pr-3 font-bold'>Password : </span>
					<input ref={refPass} type='password' className='border-2 border-stone-800 rounded-md' />
				</div>
				<div className='flex flex-col justify-center items-center'>
					<button className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-1/2 mx-1'>가입하기</button>
				</div>
			</div>
		</div>
	)
}

export default SignModal
