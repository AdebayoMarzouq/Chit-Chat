import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon, ViewListIcon } from '@heroicons/react/solid'

const ChatHeader = ({ name, photoUrl }) => {
  const navigate = useNavigate()
  return (
    <div className='header-bg fixed top-0 left-0 right-0 h-20 px-2 py-4 flex flex-col border-b border-light-bubble1'>
      <div className='relative pl-16 flex items-center'>
        <button
          className='absolute -left-2 text-gray-100 text-sm flex items-center'
          onClick={() => navigate(-1)}
        >
          <span>
            <ChevronLeftIcon className='w-8 h-8 pointer-cursor' />
          </span>
          Home
        </button>
        <div className='flex-shrink-0 h-12 w-12 ml-2'>
          <img
            src={require('../../assets/images/1.png')}
            alt=''
            className='h-full w-full rounded-full'
          />
        </div>
        {name ? (
          <h1 className='ml-4 mr-2 font-bold text-gray-100 text-lg tracking-wider truncate'>
            {name}
          </h1>
        ) : (
          <div className='h-8 w-full ml-4 mr-2 rounded-lg animate-pulse bg-gray-100'></div>
        )}
        <button
          className='ml-auto flex flex-shrink-0 mr-2'
          onClick={() => navigate('settings')}
        >
          <ViewListIcon className='text-gray-200 w-8 animate-bounce' />
        </button>
      </div>
    </div>
  )
}

export default ChatHeader
