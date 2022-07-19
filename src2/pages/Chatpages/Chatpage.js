import { useRef, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Chatheader, Chatbubble, Chatinput } from '../../components'
import uuid from 'react-uuid'

const Chatpage = () => {
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const { friendID, user, user_currentChat, sendChatMessage, loading } =
    useOutletContext()
  console.log(user_currentChat, 'loading ===> ', loading)
  const { friend, settings, messages } = user_currentChat

  const handleSubmit = (e) => {
    e.preventDefault()
    sendChatMessage(friendID, inputRef.current.value)
    inputRef.current.value = ''
  }

  useEffect(() => {
    if (!bottomRef.current) return
    bottomRef.current.scrollIntoView(true)

    // eslint-disable-next-line
    //messages
  }, [messages])

  if (loading || !user_currentChat.friendID)
    return <div className='sub-loading'></div>

  const { about, profileUrl, username } = friend
  return (
    <main className='min-h-screen grid grid-cols-1 pb-16'>
      <section className='relative pt-20 space-y-4 px-4'>
        <Chatheader name={username || 'moyin'} profileUrl={profileUrl || '1'} />
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

export default Chatpage
