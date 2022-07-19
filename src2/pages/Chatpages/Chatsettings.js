import React from 'react'
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
} from '@heroicons/react/outline'
import { useNavigate, useOutletContext } from 'react-router-dom'

const Chatsettings = () => {
  const navigate = useNavigate()
  const { friendID, user_currentChat } = useOutletContext()
  // const {  } = user_currentChat

  return (
    <main className='flex flex-col space-y-4 py-4 px-4'>
      <div className='flex items-center -ml-2'>
        <button onClick={() => navigate(-1)}>
          <ChevronLeftIcon className='h-8 w-8 text-light-main' />
        </button>
        <h1 className='text-light-main'>{friendID}</h1>
      </div>
      <div className='flex place-content-center'>
        <img
          src={require('../../images/3.png')}
          alt='profile'
          className='h-32 w-32'
        />
      </div>
      <ul className='grid grid-cols-1 divide-y text-gray-500'>
        <li className='flex items-center pt-4 pb-1'>
          <h4>Saved Messages</h4>
          <div className='flex items-center ml-auto space-x-2'>
            <ChevronRightIcon className='h-5 w-5' />
          </div>
        </li>
        <li className='flex flex-col pt-4 pb-1'>
          <div className='flex justify-between items-center'>
            <h4>People</h4>
            <button>
              {/* <ChevronRightIcon className='h-5 w-5' /> */}
              <ChevronDownIcon className='h-5 w-5' />
            </button>
          </div>
          <ul className='ml-2 my-2 divide-y'></ul>
        </li>
      </ul>
    </main>
  )
}

export default Chatsettings
