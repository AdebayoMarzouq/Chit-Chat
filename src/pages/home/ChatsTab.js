import React from 'react'
import { ChatIcon } from '@heroicons/react/outline'

export function ChatsTab({ tab, setTab }) {
  return (
    <div
      className={`flex justify-center place-content-center ${
        tab === 'chats'
          ? 'border-b-2 border-light-main text-light-title'
          : 'text-gray-400'
      }`}
      onClick={() => setTab('chats')}
    >
      <div className='font-semibold text-xl select-none cursor-pointer flex items-center space-x-2 mb-2'>
        <ChatIcon
          className={`w-6 h-6 ${
            tab === 'chats' ? 'stroke-light-main' : 'stroke-gray-400'
          }`}
        />
      </div>
    </div>
  )
}
