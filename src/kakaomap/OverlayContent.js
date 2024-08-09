export default function ContentOverlay({ item, onClose }) {
    return (
      <div className="absolute left-0 bottom-10 rounded-lg border border-gray-300 border-b-2 border-b-gray-400 bg-white text-sm leading-relaxed z-30 overflow-hidden w-72">
        <div className="py-2 px-3 h-8 bg-gray-200 border-b border-gray-300 text-lg font-bold relative">
          {item.rsrcNm}
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={onClose}
            title="닫기"
          >
            X
          </div>
        </div>
        <div className="relative">
          <div className="float-left m-3">
            <img src={item.imgFileUrlAddr} width="73" height="70" alt={item.rsrcNm} />
          </div>
          <div className="ml-24 mt-3">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              {item.addr} {item.daddr}
            </div>
            <div className="text-xs text-gray-600 mt-1">(우) {item.zip}</div>
            <a href={item.instUrlAddr} target="_blank" rel="noopener noreferrer" className="text-blue-600">
              예약페이지
            </a>
          </div>
        </div>
      </div>
    );
  }