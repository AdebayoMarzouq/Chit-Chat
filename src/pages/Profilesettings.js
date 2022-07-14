import React from 'react'
import { PencilIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context'

const Profilesettings = () => {
  const navigate = useNavigate()

  return (
    <main className='flex flex-col space-y-4 py-4 px-4'>
      <ul className='grid grid-cols-1 divide-y text-gray-500'>
        <li className='flex items-center pt-4 pb-1'>
          <h4>Edit Profile</h4>
          <button
            className='flex items-center ml-auto space-x-2'
            onClick={() => navigate('edit')}
          >
            <PencilIcon className='h-5 w-5' />
          </button>
        </li>
        <li className='flex items-center pt-4 pb-1'>
          <h4>Chat background</h4>
          <div className='flex items-center ml-auto space-x-2'>
            <div className='flex items-center h-5 w-8 px-1 rounded-full border bg-[#fafafa]'></div>
            <div className='flex items-center h-5 w-8 px-1 rounded-full border bg-red-300'></div>
            <div className='flex items-center h-5 w-8 px-1 rounded-full border bg-green-300'></div>
            <div className='flex items-center h-5 w-8 px-1 rounded-full border bg-cyan-300'></div>
            <div className='flex items-center h-5 w-8 px-1 rounded-full border bg-violet-300'></div>
          </div>
        </li>
        <li className='flex items-center pt-4 pb-1'>
          <h4>Alert Style</h4>
          <button
            className='flex items-center ml-auto space-x-2'
            onClick={() => navigate('alert')}
          >
            <ChevronRightIcon className='h-5 w-5' />
          </button>
        </li>
        <li className='flex items-center pt-4 pb-1'>
          <h4>Saved Messages</h4>
          <div className='flex items-center ml-auto space-x-2'>
            <ChevronRightIcon className='h-5 w-5' />
          </div>
        </li>
        <li className='flex items-center pt-4 pb-1'>
          <h4>Disable Alerts</h4>
          <div className='flex items-center ml-auto space-x-2'>
            <div className='flex items-center ml-auto h-5 w-10 rounded-full border'>
              <div className='h-5 w-5 bg-green-500 rounded-full ml-auto'></div>
            </div>
          </div>
        </li>
      </ul>
    </main>
  )
}

export default Profilesettings
