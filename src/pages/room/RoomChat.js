import React, { useEffect, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import { query, orderBy, limit, collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useStoreActions, useStoreState } from 'easy-peasy'
import uuid from 'react-uuid'

import RoomHeader from './RoomHeader'
import { MessageInput, MessageBubble } from '../../components'
import { firestoreDB } from '../../firebase/firebase'

const RoomChat = () => {
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const { uid } = useStoreState((state) => state.user)
  const sendMessage = useStoreActions((actions) => actions.sendMessage)
  const { roomID, values: roomData, loading: roomLoading } = useOutletContext()
  const { name } = roomData
  const [values, loading] = useCollectionData(
    query(
      collection(firestoreDB, `rooms/${roomID}/messages`),
      orderBy('createdAt', 'desc'),
      limit(25)
    )
  )

  const handleSubmit = (e) => {
    // guard clause to prevent empty submits
    if (!inputRef.current.value || !/\S/.test(inputRef.current.value))
      return (inputRef.current.value = '')
    sendMessage({ path: `rooms/${roomID}`, message: inputRef.current.value })
    inputRef.current.value = ''
  }

  useEffect(() => {
    if (!bottomRef.current) return
    bottomRef.current.scrollIntoView(true)
    // eslint-disable-next-line
  }, [values])

  if (roomLoading) return <div className='sub-loading'></div>

  return (
    <div className='h-screen'>
      <div className='z-10 w-full h-20 mb-auto'>
        <RoomHeader name={name} />
      </div>
      <div className='w-full h-[calc(100%-80px)] flex flex-col'>
        <div className='overflow-y-auto'>
          <div className='pt-4 pb-1 mx-4 space-y-4'>
            {loading ? (
              <div className='sub-loading'></div>
            ) : values.length ? (
              values.reverse().map((message) => {
                return (
                  <MessageBubble
                    group={true}
                    key={uuid()}
                    type={message.userID === uid ? 'right' : 'left'}
                    text={message.message}
                    time={message.time}
                    name={message.userID !== uid && message.username}
                    user={message.userID}
                  />
                )
              })
            ) : (
              <div className='text-center text-gray-500'>
                There are no messages in this room yet
              </div>
            )}
          </div>
          <div ref={bottomRef}></div>
        </div>
        <div className='flex-shrink-0 mt-auto input-footer'>
          <MessageInput {...{ inputRef, handleSubmit }} />
        </div>
      </div>
    </div>
  )
}

export default RoomChat
