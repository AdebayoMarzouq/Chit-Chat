import React from 'react'
import { useNavigate } from 'react-router-dom'

function Error() {
  const navigate = useNavigate()

  return (
    <div
      role='alert'
      className='flex flex-col items-center justify-center my-24 space-y-4 text-gray-400'
    >
      <div className='w-[10/12] dark:bg-dark-mainalt'>
        <img
          src={require('../assets/pngwing.com.png')}
          alt='Error 404 anime girl'
          className='object-cover w-[10/12]'
        />
      </div>
      <p className='text-xl text-center icon-list text-light-textmuted dark:text-dark-textmuted'>
        Oops!
      </p>
      <button
        onClick={() => {
          navigate('/')
        }}
        className='px-4 py-2 border rounded-lg border-light-main text-light-main'
      >
        Home
      </button>
    </div>
  )
}

export default Error
