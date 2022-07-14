import React from 'react'
import { CogIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context'

const Profilepage = () => {
  const { user } = useAppContext()
  const navigate = useNavigate()

  return (
    <main className='flex flex-col space-y-4 p-8'>
      <div className='relative flex items-center space-x-4'>
        <img
          className='rounded-full h-24 w-24 ring-4 ring-light-main shrink-0'
          src='https://randomuser.me/api/portraits/men/32.jpg'
          alt='profile_image'
        />
        <div className='grid grid-col space-y-[1px]'>
          <h2 className='text-xl text-light-title'>John Doe</h2>
          <h3 className='text-light-main'>@theJDoe</h3>
        </div>
        <button
          className='absolute flex justify-center items-center rounded-full h-8 w-8 bottom-1 right-2 shadow-lg'
          onClick={() => {
            navigate('settings')
          }}
        >
          <CogIcon className='h-6 w-6 text-light-main' />
        </button>
      </div>
      <div className='space-y-1'>
        <h4 className='text-sm text-light-chat'>Username</h4>
        <h2 className='text-xl text-light-title'>theJDoe</h2>
      </div>
      <div className='space-y-1'>
        <h4 className='text-sm text-light-chat'>Email</h4>
        <h2 className='text-xl text-light-title'>{user.email}</h2>
      </div>
      <div className='space-y-1'>
        <h4 className='text-sm text-light-chat'>About</h4>
        <h2 className='text-sm text-light-title'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio at
          ullam voluptatem! Corrupti cum quibusdam doloremque! Aut eos tempora
          cumque ab? Earum deserunt quisquam quibusdam distinctio assumenda,
          soluta sint nihil, odio, suscipit iure ipsam odit consequatur at qui.
          Dolores, animi.
        </h2>
      </div>
    </main>
  )
}

export default Profilepage
