import React, { useEffect, useState } from 'react'

export default function SideContent(tmData) {
  const [SCon, setSCon] = useState();
  console.log("tm : ", tmData);

  useEffect(() => {
    if (!tmData) return;
    let tm2 = (
      <div>
        <div className="py-2 px-3 h-8 bg-gray-200 border-b border-gray-300 text-lg font-bold">
          {tmData.rsrcNm}
        </div>
        <div>
          <div className="float-left m-3 mt-5">
            <img src={tmData.imgFileUrlAddr} width="73" height="70" alt={tmData.rsrcNm} />
          </div>
          <div className="ml-24 mt-3">
            <div className="overflow-hidden break-all">
              {tmData.addr} {tmData.daddr}
            </div>
            <div className="text-xs text-gray-600 mt-1">(우) {tmData.zip}</div>
            <a href={tmData.instUrlAddr} target="_blank" rel="noopener noreferrer" className="text-blue-600">
              예약페이지
            </a>
          </div>
        </div>
      </div>
    );
    setSCon(tm2);
  }, [tmData]);

  return (
    <div className='border-2 rounded-md bg-white-100 shadow-xl '>
      {SCon}
    </div>
  )
}
