import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/solid'

const ChatHeader = ({ name, photoUrl }) => {
  const navigate = useNavigate()
  return (
    <div className='dark:bg-dark-main flex h-20 flex-col bg-light-main px-2 py-4'>
      <div className='relative flex items-center pl-8'>
        <button
          className='absolute flex items-center text-sm text-gray-100 -left-2'
          onClick={() => navigate(-1)}
        >
          <span>
            <ChevronLeftIcon className='w-8 h-8 pointer-cursor' />
          </span>
        </button>
        <div
          className='flex-shrink-0 w-12 h-12'
          onClick={() => navigate('info')}
        >
          <img
            src={require('../../assets/images/1.png')}
            alt=''
            className='cursor-pointer w-full h-full rounded-full'
          />
        </div>
        {name ? (
          <h1
            className='cursor-pointer ml-4 mr-2 text-lg font-bold tracking-wider text-gray-100 truncate'
            onClick={() => navigate('info')}
          >
            {name}
          </h1>
        ) : (
          <div className='w-full h-8 ml-4 mr-2 bg-gray-100 rounded-lg animate-pulse'></div>
        )}
      </div>
    </div>
  )
}

export default ChatHeader
