
export default function IntroModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded shadow-lg w-96 relative bg-gradient-to-t from-white to-blue-50">
                <img src='./img/Exit.png' onClick={onClose} className='absolute top-4 right-4 w-7 h-7 cursor-pointer' alt="닫기" />
                <div className="mb-4 flex justify-center items-center">
                    <h2 className="text-2xl font-bold">사이트 소개</h2>
                </div>
                <div className="mb-4 text-center font-['NanumBrush']">
                    <p className="text-3xl text-gray-700">
                        우리 사이트는 사용자 위치를 기반으로 주변의 공공 개방 시설을 쉽게 찾아볼 수 있도록 돕는 서비스입니다.
                        카카오 맵을 활용해 일정 거리 내에 있는 다양한 공공 시설들을 지도에 마커로 표시해주어, 주변 시설을 빠르고 간편하게 확인할 수 있습니다.
                    </p>
                    <p className="text-3xl text-gray-700 mt-4">
                        이 서비스를 통해 지역 주민들은 자신이 몰랐던 시설들을 쉽게 발견할 수 있으며, 더 편리하게 활용할 수 있습니다.
                        특히, 주변 공공시설에 대한 정보를 잘 모르셨던 분들께 유용한 정보를 제공하여 일상 생활의 편의를 돕고자 합니다.
                    </p>
                </div>
                <div className="px-16 mt-5 mb-7">
                    <button onClick={onClose} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full mx-1">
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}