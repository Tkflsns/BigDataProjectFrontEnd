import React from 'react'

const OverlayContent = ({ item, onClose }) => {
  const OLCon = () => (
    <div className="absolute -left-40 bottom-12 rounded-lg border border-gray-300 border-b-2 border-b-gray-400
                      bg-white text-sm leading-relaxed z-30 overflow-hidden w-80 h-auto">
      <div className="py-2 px-3 h-8 bg-gray-200 border-b border-gray-300 text-lg font-bold relative">
        {item.rsrcNm}&nbsp;&nbsp;
        <div
          className="absolute top-1 right-2 cursor-pointer"
          onClick={onClose}
          title="닫기"
        >
          X
        </div>
      </div>
      <div className="flex w-full">
        <div className="flex flex-col justify-center items-center w-1/4 h-fit">
          <img src={item.imgFileUrlAddr} width="73" height="70" alt={item.rsrcNm} />
        </div>
        <div className="mt-2 w-3/4 h-full ">
          <div className="overflow-hidden break-words w-full">
            {item.addr} {item.daddr}
          </div>
          <div className="text-xs text-gray-600 mt-1">(우) {item.zip}</div>
          <a href={item.instUrlAddr} target="_blank" rel="noopener noreferrer" className="text-blue-600">
            예약페이지
          </a>
        </div>
      </div>
    </div>
  )
  return (
    <div>
      {OLCon()}
    </div>
  )
}

export default OverlayContent
