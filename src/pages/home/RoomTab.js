import React from 'react'
import { UserGroupIcon } from '@heroicons/react/outline'

export function RoomTab({ tab, setTab }) {
  return (
    <div
      className={`flex justify-center place-content-center ${
        tab === 'rooms'
          ? 'border-b-2 border-light-main text-light-title'
          : 'text-gray-400'
      }`}
      onClick={() => setTab('rooms')}
    >
      <div className='font-semibold text-xl select-none cursor-pointer mb-2'>
        <UserGroupIcon
          className={`w-6 h-6 ${
            tab === 'rooms' ? 'stroke-light-main' : 'stroke-gray-400'
          }`}
        />
      </div>
    </div>
  )
}
