import React from 'react'
import { SearchIcon } from '@heroicons/react/solid'

const Homeheader = ({ name, className }) => {
  return (
    <div
      className={`space-y-2 flex flex-col border-b border-light-bubble1 ${className}`}
    >
      <div className='flex justify-between'>
        <h1 className='font-bold text-light-bubble1 text-lg tracking-widest truncate'>
          {name}
        </h1>
      </div>
      <div className='relative'>
        <input
          type='text'
          placeholder='Search...'
          className='placeholder-light-text placeholder-opacity-40 text-sm py-2 focus:outline-none rounded-none pl-0'
        />
        <button className='text-gray-400'>
          <SearchIcon className='absolute w-6 h-6 flex-shrink-0 ml-auto top-1 right-1 cursor-pointer' />
        </button>
      </div>
    </div>
  )
}

export default Homeheader
