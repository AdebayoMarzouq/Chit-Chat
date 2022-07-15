import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeftIcon, SearchIcon } from '@heroicons/react/outline'

const Usercontainer = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <main className='min-h-screen'>
      <header className='grid grid-cols-3 justify-center items-center h-20 border-b border-light-main'>
        <button
          onClick={() => {
            if (pathname === '/users') {
              navigate('/')
              return
            }
            navigate(-1)
          }}
        >
          <ChevronLeftIcon className='h-8 w-8 text-light-main' />
        </button>
        <h1 className='text-center text-xl text-light-title font-bold'>
          Users
        </h1>
        <div></div>
      </header>
      {pathname === '/users' && (
        <div className='relative px-12 h-12 border-b'>
          <input
            type='text'
            placeholder='Search...'
            className='placeholder-light-text placeholder-opacity-40 text-sm py-2 focus:outline-none rounded-none pl-0'
          />
          <button className='text-gray-400'>
            <SearchIcon className='absolute w-5 h-5 flex-shrink-0 ml-auto top-[30%] right-12 cursor-pointer' />
          </button>
        </div>
      )}
      <Outlet />
    </main>
  )
}

export default Usercontainer
