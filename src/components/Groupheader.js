import React from 'react'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'
import { ViewListIcon } from '@heroicons/react/solid'
import '../images/1.png'

const Groupheader = ({ name }) => {
  const navigate = useNavigate()

  return (
    <div className='fixed top-0 left-0 right-0 h-20 px-2 py-4 bg-[#fafafa] flex flex-col border-b border-light-bubble1'>
      <div className='relative pl-16 flex items-center'>
        <button
          className='absolute -left-2 text-light-main text-sm flex items-center'
          onClick={() => navigate(-1)}
        >
          <span>
            <ChevronLeftIcon className='w-8 h-8 pointer-cursor' />
          </span>
          Home
        </button>
        <div className='flex-shrink-0 h-12 w-12 ml-2'>
          <img
            src={require('../images/1.png')}
            alt=''
            className='h-full w-full rounded-full'
          />
        </div>
        <h1 className='ml-4 mr-2 font-bold text-light-main text-lg tracking-widest truncate'>
          {name}
        </h1>
        <button
          className='ml-auto flex flex-shrink-0 mr-2'
          onClick={() => navigate('settings')}
        >
          <ViewListIcon className='text-gray-400 w-8 animate-bounce' />
        </button>
      </div>
    </div>
  )
}

export default Groupheader
