import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AtSymbolIcon, UserAddIcon } from '@heroicons/react/solid'

const Userdetail = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col space-y-4 p-8'>
      <div className='relative flex items-center space-x-4'>
        <img
          className='rounded-full h-24 w-24 ring-4 ring-light-main shrink-0'
          src={require(`../../images/${Math.ceil(Math.random() * 6)}.png`)}
          alt='profile_image'
        />
        <div className='grid grid-col space-y-[1px]'>
          <h2 className='text-xl text-light-title'>John Doe</h2>
          <h3 className='text-light-main flex items-center'>
            <AtSymbolIcon className='h-4 w-4 text-gray-400' />
            theJDoe
          </h3>
        </div>
        <button
          className='absolute flex justify-center items-center h-10 w-10 bottom-1 right-2'
          onClick={() => {
            navigate('settings')
          }}
        >
          <UserAddIcon className='icon-list h-10 w-10 drop-shadow text-light-main' />
        </button>
      </div>
      <div className='space-y-1'>
        <h4 className='text-sm text-light-chat'>Username</h4>
        <h2 className='text-xl text-light-title'>theJDoe</h2>
      </div>
      <div className='space-y-1'>
        <h4 className='text-sm text-light-chat'>Email</h4>
        <h2 className='text-xl text-light-title'>testuser@gmail.com</h2>
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
    </div>
  )
}

export default Userdetail
