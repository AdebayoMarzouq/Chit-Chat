import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { ErrorFallback, Errordisplay } from '../../components'
import { Groupheader, Chatbubble, Chatinput } from '../../components'
import { useOutletContext } from 'react-router-dom'
import uuid from 'react-uuid'

const Grouppage = () => {
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const { roomID, user, user_currentRoom, sendMessage, loading } =
    useOutletContext()
  const {
    name,
    roomID: id,
    settings,
    creator,
    messages,
    users,
  } = user_currentRoom

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(roomID, inputRef.current.value)
    inputRef.current.value = ''
  }

  useEffect(() => {
    if (!bottomRef.current) return
    bottomRef.current.scrollIntoView(true)

    // eslint-disable-next-line
  }, [messages])

  if (loading) return <div className='sub-loading'></div>

  return (
    <main className='min-h-screen grid grid-cols-1 pb-16'>
      <section className='relative pt-20 space-y-4 px-4'>
        <Groupheader name={name} />
        <div className='space-y-4 overflow-y-auto'>
          {messages &&
            messages.map((message) => {
              return (
                <Chatbubble
                  key={uuid()}
                  type={message.userID === user.userID ? 'right' : 'left'}
                  text={message.message}
                  time={message.time}
                  name={message.userID !== user.userID && message.username}
                />
              )
            })}
          <div ref={bottomRef}></div>
        </div>
      </section>
      <section className='input-footer'>
        <Chatinput {...{ inputRef, handleSubmit }} />
      </section>
    </main>
  )
}

export default Grouppage
