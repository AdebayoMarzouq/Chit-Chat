import React, { useEffect, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import { query, orderBy, limit, collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useStoreActions, useStoreState } from 'easy-peasy'
import uuid from 'react-uuid'

import RoomHeader from './RoomHeader'
import { MessageInput, MessageBubble } from '../../components'
import { firestoreDB } from '../../firebase/firebase'
import { store } from '../../redux/store'

const RoomChat = () => {
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const { uid } = useStoreState((state) => state.user)
  const sendMessage = useStoreActions((actions) => actions.sendMessage)
  const {
    roomID,
    values: roomData,
    error: roomError,
    loading: roomLoading,
  } = useOutletContext()
  const { name } = roomData
  const [values, loading, error, snapShot] = useCollectionData(
    query(
      collection(firestoreDB, `rooms/${roomID}/messages`),
      orderBy('createdAt'),
      limit(25)
    )
  )

  const handleSubmit = (e) => {
    e.preventDefault()
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
    <main className='min-h-screen grid grid-cols-1 pb-16'>
      <section className='relative pt-20 space-y-4 px-4'>
        <RoomHeader name={name} />
        <div className='space-y-4 overflow-y-auto'>
          {roomLoading ? (
            <div className='sub-loading'></div>
          ) : values ? (
            values.map((message) => {
              return (
                <MessageBubble
                  key={uuid()}
                  type={message.userID === uid ? 'right' : 'left'}
                  text={message.message}
                  time={message.time}
                  name={message.userID !== uid && message.username}
                />
              )
            })
          ) : (
            <p>An error occured</p>
          )}
          <div ref={bottomRef}></div>
        </div>
      </section>
      <section className='input-footer'>
        <MessageInput {...{ inputRef, handleSubmit }} />
      </section>
    </main>
  )
}

export default RoomChat
