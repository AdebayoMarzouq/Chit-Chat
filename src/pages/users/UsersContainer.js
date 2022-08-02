import React, { useRef } from 'react'
import { ChevronLeftIcon, SearchIcon } from '@heroicons/react/outline'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { query, where, collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firestoreDB } from '../../firebase/firebase'
import { useStoreState } from 'easy-peasy'
import { useUserContext } from '../../context'

import { Header } from '../../components'

const UsersContainer = () => {
  const searchRef = useRef(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { width, isOpen, setIsOpen } = useUserContext()
  const user = useStoreState((state) => state.user)
  const [values, loading, error] = useCollectionData(
    query(collection(firestoreDB, 'users'), where('userID', '!=', user.uid))
  )

  const handleSearch = () => {}

  return (
    <main className='min-h-screen bg-light-bg dark:bg-dark-bg'>
      <div className='border-b px-2 dark:border-[#404040] sm:px-4'>
        <Header
          width={width}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          name={pathname === '/users' ? 'Users' : 'User'}
          className='h-20 flex-grow px-2 sm:px-4'
          extra={
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
          }
        />
      </div>
      {pathname === '/users' && (
        <div className='relative h-12 border-b px-12 dark:border-[#404040] sm:px-24'>
          <input
            type='text'
            placeholder='Search...'
            className='rounded-none bg-transparent py-2 pl-0 text-light-textmuted placeholder-light-textmuted placeholder-opacity-30 focus:outline-none dark:text-dark-textmuted dark:placeholder-dark-textmuted'
            ref={searchRef}
          />
          <button
            className='text-light-textmuted dark:text-dark-textmuted'
            onClick={handleSearch}
          >
            <SearchIcon className='absolute top-[30%] right-12 ml-auto h-5 w-5 flex-shrink-0 cursor-pointer sm:right-24' />
          </button>
        </div>
      )}
      <Outlet context={{ values, error, loading }} />
    </main>
  )
}

export default UsersContainer
