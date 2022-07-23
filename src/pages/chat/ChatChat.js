import React, { useEffect, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { query, orderBy, limit, collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { uuidv4 } from '@firebase/util'

import { MessageBubble, MessageInput } from '../../components'
import ChatHeader from './ChatHeader'
import { firestoreDB } from '../../firebase/firebase'

const ChatChat = () => {
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const { friendID, friendData, friendLoading, friendError } =
    useOutletContext()
  const { uid } = useStoreState((state) => state.user)
  const [messages, messagesLoading, messagesError, messagesSnapShot] =
    useCollectionData(
      query(
        collection(firestoreDB, `chats/${friendData.chatID}/messages`),
        orderBy('createdAt'),
        limit(25)
      )
    )
  console.log('chat messages ===> ', messages)
  const sendMessage = useStoreActions((actions) => actions.sendMessage)
  console.log(friendData)
  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage({
      path: `chats/${friendData.chatID}`,
      message: inputRef.current.value,
    })
    inputRef.current.value = ''
  }

  useEffect(() => {
    if (!bottomRef.current) return
    bottomRef.current.scrollIntoView(true)

    // eslint-disable-next-line
    //messages
  }, [messages])

  return (
    <main className='min-h-screen grid grid-cols-1 pb-16'>
      <section className='relative pt-20 space-y-4 px-4'>
        {friendData && (
          <ChatHeader
            name={friendData.username || 'moyin'}
            profileUrl={friendData.profileUrl || '1'}
          />
        )}
        <div className='space-y-4 overflow-y-auto'>
          {messages &&
            messages.map((message) => {
              return (
                <MessageBubble
                  key={uuidv4()}
                  type={message.userID === uid ? 'right' : 'left'}
                  text={message.message}
                  time={message.time}
                  name={message.userID !== uid && message.username}
                />
              )
            })}
          <div ref={bottomRef}></div>
        </div>
      </section>
      <section className='input-footer'>
        <MessageInput {...{ inputRef, handleSubmit }} />
      </section>
    </main>
  )
}

export default ChatChat
