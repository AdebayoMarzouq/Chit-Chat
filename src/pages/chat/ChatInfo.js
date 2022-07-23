import React from 'react'
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
} from '@heroicons/react/outline'
import { useNavigate, useOutletContext } from 'react-router-dom'

const ChatInfo = () => {
  const navigate = useNavigate()
  const { friendID, friendData, friendLoading, friendError } =
    useOutletContext()
  const { firstname, lastname, profileUrl, username, about } = friendData

  return (
    <main className='flex flex-col space-y-4 py-4 px-4'>
      <div className='flex items-center -ml-2'>
        <button onClick={() => navigate(-1)}>
          <ChevronLeftIcon className='h-8 w-8 text-light-main' />
        </button>
      </div>
      <div className='flex place-content-center'>
        <img
          src={require(`../../assets/images/${profileUrl}.png`)}
          alt='profile'
          className='h-32 w-32'
        />
      </div>
      <div className=''>
        <h2 className='text-center text-3xl text-light-title'>{username}</h2>
        <h4 className='text-center text-gray-400'>{firstname}</h4>
        <h4 className='text-center text-gray-400'>{lastname}</h4>
        <h4 className='text-center text-gray-400'>{about}</h4>
      </div>
    </main>
  )
}

export default ChatInfo
