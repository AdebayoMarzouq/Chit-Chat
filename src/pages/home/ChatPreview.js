import React from 'react'
import { Link } from 'react-router-dom'
import { query, orderBy, collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useStoreState } from 'easy-peasy'

import { firestoreDB } from '../../firebase/firebase'

export function ChatPreview({ tab }) {
  const { uid } = useStoreState((state) => state.user)
  const [values, loading, error, snapShot] = useCollectionData(
    query(
      collection(firestoreDB, `users/${uid}/chats`)
      // orderBy('updated', 'desc')
    )
  )

  if (!values) return <div className='sub-loading'></div>

  return (
    <>
      {tab === 'chats' && (
        <div className='space-y-6 overflow-y-auto p-1 pr-0'>
          {values && !values.length ? (
            <p className='text-light-chat text-center m-8'>
              You have not added any friends yet, add some and they will appear
              here
            </p>
          ) : (
            values.map((chat) => <PreviewItem key={chat.chatID} {...chat} />)
          )}
        </div>
      )}
    </>
  )
}

const PreviewItem = ({ chatID, friendData: { username, photoUrl, about } }) => (
  <Link to={`/chat/${chatID}`} className='flex justify-start'>
    <div className='relative rounded-full w-12 h-12 flex-shrink-0'>
      <img
        src={require(`../../assets/images/${photoUrl}.png`)}
        alt='profile'
        className='flex-shrink-0 rounded-full border-2 border-light-main h-12 w-12'
      />
      <p className='absolute bg-[#fb6d62] text-gray-100 text-[9px] font-bold rounded-full h-5 w-5 flex justify-center items-center -top-1 -right-1'>
        <span className='-mb-[3px]'>12</span>
      </p>
    </div>
    <div className='ml-4 mr-6 grid grid-col flex-grow'>
      <h2 className='text-light-title font-bold text-normal text-sm'>
        {username}
      </h2>
      <p className='row-span-2 truncate whitespace-pre-wrap text-light-text text-[10px] h-6 leading-[0.75rem]'>
        {about}
        {'user about info replaces this'}
      </p>
    </div>
    <p className='text-[10px] text-light-text'>11:54</p>
  </Link>
)
