import React from 'react'

const OverlayContent = ({ item, onClose }) => {
  const OLCon = () => (
    <div className="relative bottom-32 rounded-lg border border-gray-300 border-b-2 border-b-gray-400
                      bg-white text-sm leading-relaxed z-30 w-auto h-auto">
      <div className="flex justify-between w-auto py-2 px-3 h-auto bg-gray-200 border-b border-gray-300 text-lg font-bold break-all">
        <div className='w-auto h-auto'>{item.rsrcNm}&nbsp;&nbsp;</div>
        <div
          className="top-2 right-2 float-right"
          onClick={onClose}
          title="닫기"
        >
          X
        </div>
      </div>
      <div className="flex">
        <div className="flex items-center w-20 h-auto m-1">
          <img src={item.imgFileUrlAddr} width="73" height="70" alt={item.rsrcNm} />
        </div>
        <div className="mt-2 w-auto h-full mr-1">
          <div className="">
            <p>{item.addr}</p><p>{item.daddr}</p>
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
    <div className='h-auto w-auto'>
      {OLCon()}
    </div>
  )
}

export default OverlayContent
