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
      <header className='header-bg grid grid-cols-3 justify-center items-center h-20 text-gray-100'>
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
          <ChevronLeftIcon className='h-8 w-8 text-white' />
        </button>
        <h1 className='text-xl font-bold tracking-widest'>My Profile</h1>
        {pathname === '/profile' && (
          <button
            className='flex justify-end space-x-2 text-gray-200 mr-2'
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
