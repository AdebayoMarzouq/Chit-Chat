import React from 'react'
export function ChatPreview({ tab }) {
  return (
    <>
      {tab === 'chats' && (
        <div className='space-y-6 overflow-y-auto p-1 pr-0'>
          <div>
            You have not added any friends yet, add some and they will appear
            here
          </div>
        </div>
      )}
    </>
  )
}
