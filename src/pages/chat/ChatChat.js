import React, { useEffect, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { query, orderBy, limit, collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { uuidv4 } from '@firebase/util'

import { MessageBubble, MessageInput } from '../../components'
import ChatHeader from './ChatHeader'
import { firestoreDB } from '../../firebase/firebase'
// import {pageError2}

const ChatChat = () => {
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const { chatID, roomData } = useOutletContext()
  const { uid } = useStoreState((state) => state.user)
  const [messages, messagesLoading] = useCollectionData(
    query(
      collection(firestoreDB, `chats/${chatID}/messages`),
      orderBy('createdAt'),
      limit(25)
    )
  )

  const data = Object.values(roomData.people)
  const friendData = data.filter((item) => item.uid !== uid)[0]

  const sendMessage = useStoreActions((actions) => actions.sendMessage)

  const handleSubmit = (e) => {
    e.preventDefault()
    // guard clause to prevent empty submits
    sendMessage({
      path: `chats/${chatID}`,
      message: inputRef.current.value,
    })
    inputRef.current.value = ''
  }

  useEffect(() => {
    if (!bottomRef.current) return
    bottomRef.current.scrollIntoView(true)

    // eslint-disable-next-line
  }, [messages])

  return (
    <div className='mt-20 grid grid-cols-1 pb-16 pt-4'>
      <div className='space-y-4 px-4'>
        <ChatHeader
          name={friendData.username}
          profileUrl={friendData.profileUrl}
        />
        <div className='space-y-4 overflow-y-auto'>
          {messagesLoading ? (
            <div className='sub-loading'></div>
          ) : messages.length ? (
            messages.map((message) => {
              return (
                <MessageBubble
                  key={uuidv4()}
                  type={message.userID === uid ? 'right' : 'left'}
                  text={message.message}
                  time={message.time}
                />
              )
            })
          ) : (
            <div className='text-center text-gray-500'>
              No message in this chat yet
            </div>
          )}
          <div ref={bottomRef}></div>
        </div>
      </div>
      <div className='input-footer'>
        <MessageInput {...{ inputRef, handleSubmit }} />
      </div>
    </div>
  )
}

export default ChatChat
