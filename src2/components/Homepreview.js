import React from 'react'
import { Link } from 'react-router-dom'

const Homepreview = ({ roomName, roomID, roomPath }) => {
  return (
    <Link to={`/room/${roomID}`} className='flex justify-start'>
      <div className='relative rounded-full w-12 h-12 flex-shrink-0'>
        <img
          className='rounded-full w-full h-full object-cover ring ring-light-main'
          src='https://randomuser.me/api/portraits/men/10.jpg'
          alt='pic'
        />
        <p className='absolute bg-[#fb6d62] text-gray-100 text-[9px] font-bold rounded-full h-5 w-5 flex justify-center items-center -top-1 -right-1'>
          <span className='-mb-[3px]'>12</span>
        </p>
      </div>
      <div className='ml-4 mr-6 grid grid-col flex-grow'>
        <h2 className='text-light-title font-bold text-normal'>{roomName}</h2>
        <p className='row-span-2 truncate whitespace-pre-wrap text-light-text text-[10px] h-6 leading-[0.75rem]'>
          {roomPath}
        </p>
      </div>
      <p className='text-[10px] text-light-text'>11:54</p>
    </Link>
  )
}

export default Homepreview
