import React from 'react'
import { Link } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { query, collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useStoreState } from 'easy-peasy'

import { ErrorFallback } from '../../components'
import { firestoreDB } from '../../firebase/firebase'
import { useState } from 'react'

export function ChatPreview() {
  const [retry, setRetry] = useState(false)
  const { uid } = useStoreState((state) => state.user)
  const [values, loading] = useCollectionData(
    query(
      collection(firestoreDB, `users/${uid}/chats`)
      // orderBy('updated', 'desc')
    )
  )

  if (loading) return <div className='sub-loading'></div>

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        setRetry((x) => !x)
      }}
      resetKeys={[retry]}
    >
      <div className='space-y-6 overflow-y-auto p-1'>
        {values && !values.length ? (
          <p className='m-8 text-center text-light-chat'>
            You have not added any friends yet, add some and they will appear
            here
          </p>
        ) : (
          values.map((chat) => <PreviewItem key={chat.chatID} {...chat} />)
        )}
      </div>
    </ErrorBoundary>
  )
}

const PreviewItem = ({ chatID, friendData: { username, photoUrl, about } }) => (
  <Link to={`/chat/${chatID}`} className='flex justify-start'>
    <div className='relative h-12 w-12 flex-shrink-0 rounded-full'>
      <img
        src={require(`../../assets/images/${photoUrl}.png`)}
        alt='profile'
        className='h-12 w-12 flex-shrink-0 rounded-full border-2 border-light-main'
      />
      <p className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#fb6d62] text-[9px] font-bold text-gray-100'>
        <span className='-mb-[3px]'>12</span>
      </p>
    </div>
    <div className='grid-col ml-4 mr-6 grid flex-grow'>
      <h2 className='text-normal text-sm font-bold text-light-title'>
        {username}
      </h2>
      <p className='row-span-2 h-6 truncate whitespace-pre-wrap text-[10px] leading-[0.75rem] text-light-text'>
        {about}
      </p>
    </div>
    <p className='text-[10px] text-light-text'>11:54</p>
  </Link>
)
