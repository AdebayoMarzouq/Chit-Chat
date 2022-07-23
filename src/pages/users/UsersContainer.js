import React, { useRef } from 'react'
import { ChevronLeftIcon, SearchIcon } from '@heroicons/react/outline'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { query, where, collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firestoreDB } from '../../firebase/firebase'
import { useStoreState } from 'easy-peasy'

const UsersContainer = () => {
  const searchRef = useRef(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const user = useStoreState((state) => state.user)
  const [values, loading, error, snapshot] = useCollectionData(
    query(collection(firestoreDB, 'users'), where('userID', '!=', user.uid))
  )

  const handleSearch = () => {}

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
            ref={searchRef}
          />
          <button className='text-gray-400' onClick={handleSearch}>
            <SearchIcon className='absolute w-5 h-5 flex-shrink-0 ml-auto top-[30%] right-12 cursor-pointer' />
          </button>
        </div>
      )}
      <Outlet context={{ values, error, loading }} />
    </main>
  )
}

export default UsersContainer
