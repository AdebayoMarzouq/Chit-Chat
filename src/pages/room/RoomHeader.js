import React from 'react'
import {
  ChevronLeftIcon,
  DotsCircleHorizontalIcon,
} from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'

const RoomHeader = ({ name, img }) => {
  const navigate = useNavigate()

  return (
    <div className='fixed top-4 left-4 right-4 flex h-20 flex-col rounded-xl bg-light-main px-2 py-4 md:left-[304px]'>
      <div className='relative flex items-center pl-8'>
        <button
          className='absolute -left-2 flex items-center text-sm text-gray-100'
          onClick={() => navigate(-1)}
        >
          <span>
            <ChevronLeftIcon className='pointer-cursor h-8 w-8' />
          </span>
        </button>
        <div className='h-12 w-12 flex-shrink-0'>
          <img
            src={require(`../../assets/images/${'1'}.png`)}
            alt=''
            className='h-full w-full rounded-full'
          />
        </div>
        {name ? (
          <h1 className='ml-4 mr-2 truncate text-lg tracking-wider text-gray-100'>
            {name}
          </h1>
        ) : (
          <div className='ml-4 mr-2 h-8 w-full animate-pulse rounded-lg bg-gray-100'></div>
        )}
        <button
          className='ml-auto mr-2 flex flex-shrink-0'
          onClick={() => navigate('info')}
        >
          <DotsCircleHorizontalIcon className='w-8 text-gray-200' />
        </button>
      </div>
    </div>
  )
}

export default RoomHeader
