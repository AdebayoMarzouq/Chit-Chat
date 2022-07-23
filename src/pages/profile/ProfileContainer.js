import React from 'react'
import { ChevronLeftIcon, LogoutIcon } from '@heroicons/react/outline'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'

import { logout } from '../../firebase/firebaseUtils'

const ProfileContainer = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleSignOut = () => {
    logout()
  }

  return (
    <>
      <header className='grid grid-cols-3 justify-center items-center h-20'>
        <button
          onClick={() => {
            if (pathname === '/profile') {
              navigate('/')
              return
            }
            if (pathname === '/profile/settings/') {
              navigate('/profile')
              return
            }
            navigate(-1)
          }}
        >
          <ChevronLeftIcon className='h-8 w-8 text-light-main' />
        </button>
        <h1 className='text-xl text-light-title font-bold'>My Profile</h1>
        {pathname === '/profile' && (
          <button
            className='flex justify-end space-x-2 text-light-main mr-2'
            onClick={handleSignOut}
          >
            <p className='underline'>Log out</p>
            <span>
              <LogoutIcon className='h-6 w-6' />
            </span>
          </button>
        )}
      </header>
      <Outlet />
    </>
  )
}

export default ProfileContainer
