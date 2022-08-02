import React from 'react'
import { Link } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { query, collection } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useStoreState } from 'easy-peasy'

import { ErrorFallback, PageError1 } from '../../components'
import { PreviewPlaceholder } from './PreviewPlaceholder'
import { firestoreDB } from '../../firebase/firebase'
import { useState } from 'react'

export function ChatPreview() {
  const [retry, setRetry] = useState(false)
  const { uid } = useStoreState((state) => state.user)
  const [chatsSnapshot, loading, error] = useCollection(
    query(
      collection(firestoreDB, `users/${uid}/chats`)
      // orderBy('updated', 'desc')
    )
  )
  let empty = true
  let values = []

  if (error) {
    return (
      <PageError1
        error='Unable to fetch data, check your internet connection'
        reset={setRetry}
      />
    )
  }

  if (chatsSnapshot) {
    empty = chatsSnapshot.empty
    chatsSnapshot.forEach((doc) => values.push(doc.data()))
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        setRetry((x) => !x)
      }}
      resetKeys={[retry]}
    >
      <div className='p-1 space-y-2 overflow-y-auto'>
        {loading ? (
          Array.from({ length: 6 }).map((item, index) => (
            <PreviewPlaceholder key={index} />
          ))
        ) : empty ? (
          <p className='m-8 text-center text-light-textmuted dark:text-dark-textmuted'>
            You don't have any chats yet, send message here here
          </p>
        ) : (
          values.map((chat) => <PreviewItem key={chat.chatID} {...chat} />)
        )}
      </div>
    </ErrorBoundary>
  )
}

const PreviewItem = ({ chatID, friendData: { username, photoUrl, about } }) => (
  <Link
    to={`/chat/${chatID}`}
    className='flex justify-start rounded-xl bg-light-mainalt p-4 hover:bg-gray-200 dark:bg-dark-mainalt dark:hover:bg-[#3a3b3c]'
  >
    <div className='relative flex-shrink-0 w-12 h-12 rounded-full'>
      <img
        src={require(`../../assets/images/${photoUrl}.png`)}
        alt='profile'
        className='flex-shrink-0 w-12 h-12 rounded-full'
      />
      {/* <p className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-light-main text-[9px] font-bold text-gray-100'>
        <span className='-mb-[3px]'>12</span>
      </p> */}
    </div>
    <div className='grid flex-grow ml-4 mr-6 grid-col'>
      <h2 className='text-sm font-bold text-light-text dark:text-dark-text sm:text-base'>
        {username}
      </h2>
      <p className='text-light-text-textmuted row-span-2 h-6 truncate whitespace-pre-wrap text-[10px] leading-[0.75rem] dark:text-dark-textmuted'>
        {about}
      </p>
    </div>
    <p className='text-[10px] font-bold text-light-textmuted'>11:54</p>
  </Link>
)
