import React from 'react'
import { useNavigate } from 'react-router-dom'

function Error() {
  const navigate = useNavigate()

  return (
    <div
      role='alert'
      className='flex flex-col my-24 items-center justify-center text-gray-400 space-y-4'
    >
      <img
        src={require('../assets/pngwing.com.png')}
        alt='pepe the frog sad face'
        className='w-96 object-cover'
      />
      <p className='text-center text-gray-500'>Oops!</p>
      <button
        onClick={() => {
          navigate('/')
        }}
        className='text-light-text border border-light-main py-2 px-4 rounded-lg text-light-main'
      >
        Home
      </button>
    </div>
  )
}

export default Error
