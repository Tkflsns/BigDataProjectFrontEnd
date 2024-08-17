import React, { useState } from 'react';

const BoardWrite = ({ onSubmit, onClose }) => {
    const [title, setTitle] = useState('');
    const [username, setUsername] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            idx: Math.floor(Math.random() * 1000) + 1,  // 고유 idx 생성
            title,
            username,
            content,
            regidate_date: new Date().toISOString(),
            visit_count: 0
        };
        onSubmit(newPost);  // 부모 컴포넌트로 새 글 데이터 전달
    };

    return (
        <div className="write-container p-6 rounded-lg bg-gray-100 shadow-md">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">글 작성</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">제목</label>
                    <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">닉네임</label>
                    <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">내용</label>
                    <textarea className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        rows="5" value={content} onChange={(e) => setContent(e.target.value)} required />
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        게시하기
                    </button>
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BoardWrite;
