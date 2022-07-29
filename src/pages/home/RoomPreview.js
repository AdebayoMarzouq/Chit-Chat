import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { query, collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useStoreState } from 'easy-peasy'

import { firestoreDB } from '../../firebase/firebase'
import { ErrorBoundary } from 'react-error-boundary'

import { ErrorFallback } from '../../components'

export function RoomPreview() {
  const { uid } = useStoreState((state) => state.user)
  const [retry, setRetry] = useState(false)
  const [values, loading] = useCollectionData(
    query(
      collection(firestoreDB, `users/${uid}/rooms`)
      // orderBy('updated', 'desc')
    )
  )

  if (loading) return <div className='sub-loading'></div>

  return (
    <ErrorBoundary
      Fallback={ErrorFallback}
      onReset={() => {
        setRetry((x) => !x)
      }}
      resetKeys={[retry]}
    >
      <div className='space-y-6 overflow-y-auto p-1'>
        {values && !values.length ? (
          <p className='m-8 text-center text-light-chat'>
            You have not joined any room yet, join some and they will appear
            here
          </p>
        ) : (
          values.map((room) => <PreviewItem key={room.roomID} {...room} />)
        )}
      </div>
    </ErrorBoundary>
  )
}

const PreviewItem = ({ roomName, roomID, roomPath, roomPic, roomInfo }) => (
  <Link to={`/room/${roomID}`} className='flex justify-start'>
    <div className='relative h-12 w-12 flex-shrink-0 rounded-full'>
      <img
        src={require(`../../assets/images/${roomPic}.png`)}
        alt='profile'
        className='h-12 w-12 flex-shrink-0 rounded-full border-2 border-light-main'
      />
      <p className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#fb6d62] text-[9px] font-bold text-gray-100'>
        <span className='-mb-[3px]'>12</span>
      </p>
    </div>
    <div className='grid-col ml-4 mr-6 grid flex-grow'>
      <h2 className='text-normal text-sm font-bold text-light-title'>
        {roomName}
      </h2>
      <p className='row-span-2 h-6 truncate whitespace-pre-wrap text-[10px] leading-[0.75rem] text-light-text'>
        {roomInfo}
      </p>
    </div>
    <p className='text-[10px] text-light-text'>11:54</p>
  </Link>
)
