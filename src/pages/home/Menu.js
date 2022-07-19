import React from 'react'
import { PlusSmIcon, UserIcon, UsersIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

export function Menu({ tab, setModal }) {
  return (
    <div className='mt-2 py-2 col-span-2 flex justify-between text-light-text border-b'>
      <Link to='/profile' className='flex items-center'>
        Profile <UserIcon className='h-4 w-4' />
      </Link>
      {tab === 'rooms' && (
        <>
          <button
            className='flex items-center'
            onClick={() =>
              setModal({
                show: true,
                type: 'join',
              })
            }
          >
            Join room <PlusSmIcon className='h-4 w-4' />
          </button>
          <button
            className='flex items-center'
            onClick={() =>
              setModal({
                show: true,
                type: 'create',
              })
            }
          >
            New room <PlusSmIcon className='h-4 w-4' />
          </button>
        </>
      )}
      {tab === 'chats' && (
        <>
          <Link to='/users' className='flex items-center'>
            All users <UsersIcon className='h-4 w-4 ml-1' />
          </Link>
        </>
      )}
    </div>
  )
}
