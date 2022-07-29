import React from 'react'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { useUserContext } from '../../context'

import { Header } from '../../components'

const ProfileContainer = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { width, isOpen, setIsOpen } = useUserContext()

  return (
    <>
      <div className='border-b bg-neutral-100 px-2 md:px-4'>
        <Header
          width={width}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          name={pathname.split('/').join(' ')}
          className='h-20 flex-grow px-2 md:px-4'
          extra={
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
          }
        />
      </div>
      <Outlet />
    </>
  )
}

export default ProfileContainer
