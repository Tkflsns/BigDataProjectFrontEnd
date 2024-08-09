import React, { useRef, useState } from 'react'

export default function SideOverlay({ width=250, children}) {
  const [isOpen, setOpen] = useState(false);
  const [xPos, setX] = useState(-width);
  const side = useRef();

  const toggleMenu = () => {
    if (xPos < 0){
      setX(0);
      setOpen(true);
    }else{
      setX(-width);
      setOpen(false);
    }

  }
    
  return (
    <div className='bg-sky-50'>
      <div ref={side} className='bg-sky-50 border-l-gray-800 border-l-4 fixed top-0 bottom-0 right-0 transition ease-in-out
                                 duration-400 text-gray-800 h-full z-10'
                      style={{width: `${width}px`, transform: `translatex(${-xPos}px)`}}>
        <button onClick={() => toggleMenu()}
          className='relative -left-12 top-1/2 w-10 h-10 transition duration-[800ms] ease-linear border-2 border-gray-900 rounded-full overflow-hidden'>
            {isOpen ? <span>X</span> : <img src='../src/kakaomap/img/marker.png' alt='content open butten' className='w-full h-full'/>}
          </button>
          <div className='pl-2 pr-4 pt-4 pb-0 relative w-full'>{children}</div>
      </div>
    </div>
  )
}
