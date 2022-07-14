import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/solid'

const Chatheader = () => {
  const navigate = useNavigate()
  return (
    <div className='py-2 space-x-4 flex border-b border-light-bubble1 items-center'>
      <button
        className='-ml-2 text-light-main flex items-center'
        onClick={() => navigate(-1)}
      >
        <span>
          <ChevronLeftIcon className='w-6 h-6 pointer-cursor' />
        </span>
        <span className='text-sm'>Home</span>
      </button>
      <img
        className='rounded-full w-12 h-12 flex-shrink-0'
        src='https://randomuser.me/api/portraits/women/30.jpg'
        alt='test_img'
      />
      <div className='flex flex-col'>
        <h2 className='text-light-title font-bold'>Olamide Subomi</h2>
        <p className='text-light-textalt text-xs'>Online Now</p>
      </div>
    </div>
  )
}

export default Chatheader
