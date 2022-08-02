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
      orderBy('createdAt', 'desc'),
      limit(25)
    )
  )

  const data = Object.values(roomData.people)
  const friendData = data.filter((item) => item.uid !== uid)[0]

  const sendMessage = useStoreActions((actions) => actions.sendMessage)

  const handleSubmit = (e) => {
    // guard clause to prevent empty submits
    if (!inputRef.current.value || !/\S/.test(inputRef.current.value))
      return (inputRef.current.value = '')
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
    <div className='h-screen'>
      <div className='z-10 w-full h-20 mb-auto'>
        <ChatHeader
          name={friendData.username}
          profileUrl={friendData.profileUrl}
        />
      </div>
      <div className='w-full h-[calc(100%-80px)] flex flex-col'>
        <div className='overflow-y-auto'>
          <div className='pt-4 pb-1 mx-2 space-y-4 sm:mx-4'>
            {messagesLoading ? (
              <div className='sub-loading'></div>
            ) : messages.length ? (
              messages.reverse().map((message) => {
                return (
                  <MessageBubble
                    key={uuidv4()}
                    type={message.userID === uid ? 'right' : 'left'}
                    text={message.message}
                    time={message.time}
                    user={message.userID}
                  />
                )
              })
            ) : (
              <div className='text-center text-light-textmuted dark:text-dark-textmuted'>
                No message in this chat yet
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

export default ChatChat
