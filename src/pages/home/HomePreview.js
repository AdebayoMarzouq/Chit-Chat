import React from 'react'

export function HomePreview({ tab, setModal }) {
  return (
    <>
      {tab === 'rooms' && (
        <div className='space-y-6 overflow-y-auto p-1 pr-0'>
          <div>
            You have not joined any room yet, join some and they will appear
            here
          </div>
        </div>
      )}
    </>
  )
}
