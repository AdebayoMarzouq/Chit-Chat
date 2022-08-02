import React from 'react'
import {
  ChevronLeftIcon,
  DotsCircleHorizontalIcon,
} from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'

const RoomHeader = ({ name, img }) => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col w-full h-full px-2 py-4 dark:bg-dark-main bg-light-main'>
      <div className='relative flex items-center pl-8'>
        <button
          className='absolute flex items-center text-sm text-gray-100 -left-2'
          onClick={() => navigate(-1)}
        >
          <span>
            <ChevronLeftIcon className='w-8 h-8 pointer-cursor' />
          </span>
        </button>
        <div className='flex-shrink-0 w-12 h-12 rounded-full shadow-inner ring-1 ring-light-bg ring-offset-2'>
          <img
            src={require(`../../assets/landscape.png`)}
            // src='../../assets/landscape.png'
            alt=''
            className='w-full h-full rounded-full bg-sky-300'
          />
        </div>
        {name ? (
          <h1 className='ml-4 mr-2 text-lg tracking-wider text-gray-100 truncate'>
            {name}
          </h1>
        ) : (
          <div className='w-full h-8 ml-4 mr-2 bg-gray-100 rounded-lg animate-pulse'></div>
        )}
        <button
          className='flex flex-shrink-0 ml-auto mr-2'
          onClick={() => navigate('info')}
        >
          <DotsCircleHorizontalIcon className='w-8 text-gray-200' />
        </button>
      </div>
    </div>
  )
}

export default RoomHeader
