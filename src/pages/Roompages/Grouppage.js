import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { Groupheader, Chatbubble, Chatinput } from '../../components'
import { useOutletContext } from 'react-router-dom'
import uuid from 'react-uuid'

const Grouppage = () => {
  const bottomRef = useRef(null)
  const { roomID, user, currentRoom, sendMessage, loading } = useOutletContext()
  const [message, setMessage] = useState('')
  const { name, roomID: id, settings, creator, messages, users } = currentRoom

  const text1 = 'Just reached my new location mate'
  const text2 =
    'Please come close, i can see you standing near the bar, Come 10 steps forward mate'
  const text3 =
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore quos suscipit minima placeat, maxime natus totam voluptatibus deserunt, culpa exercitationem fugiat, nobis dolor vel! Porro, libero repellendus perferendis possimus repellat exercitationem, mollitia, nisi vitae ut sed quam tenetur ea. Corrupti quaerat voluptatibus excepturi possimus officiis impedit optio perferendis ipsam blanditiis ex numquam, odio ducimus saepe at harum rerum nisi illo deleniti libero, sit facere dolore commodi. Nostrum, tempore vel! Nobis saepe ut labore architecto, laboriosam sint sunt sequi minus dolorem facere odit magni aliquam cupiditate soluta accusamus. Est repellat in, dignissimos aliquid iusto recusandae quae consequuntur cum quibusdam doloremque rem praesentium commodi minima porro optio enim corporis molestiae ad sint esse velit suscipit dolorum deleniti? Distinctio, hic, qui veniam pariatur dignissimos sapiente placeat eos eligendi temporibus, quod alias nobis rem! Voluptates libero quae, veritatis porro iure, aspernatur sapiente aperiam officiis explicabo cumque eligendi quis et quos qui facere tenetur soluta dignissimos vero id? Maxime laudantium recusandae, assumenda officiis dolores sequi atque ut dignissimos labore soluta! Numquam ipsum sed architecto ut saepe, consequuntur deserunt ipsam pariatur similique unde enim quod ullam fuga earum laudantium autem repudiandae, nihil culpa, vero voluptates. Sapiente laboriosam et alias neque distinctio, repellat optio delectus ullam autem.'
  const text4 = 'Here you go boss'

  // roomID: 87WW1bErlZSrxu5GbQA7
  // roomPath: rooms/87WW1bErlZSrxu5GbQA7
  // roomName: Python
  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(roomID, message)
    setMessage('')
  }

  useEffect(() => {
    if (!bottomRef.current) return
    bottomRef.current.scrollIntoView(true)
  }, [messages])

  return (
    <main className='min-h-screen grid grid-cols-1 pb-16'>
      {loading ? (
        <div className='page-loading'></div>
      ) : (
        <section className='relative pt-20 space-y-4 px-4'>
          <Groupheader name={name || 'Room'} />
          <div className='space-y-4 overflow-y-auto'>
            {messages &&
              messages.map((message) => {
                return (
                  <Chatbubble
                    key={uuid()}
                    type={message.userID === user.userID ? 'right' : 'left'}
                    text={message.message}
                    time={message.time}
                    name={!message.userID === user.userID && message.username}
                  />
                )
              })}
            <div ref={bottomRef}></div>
          </div>
        </section>
      )}
      <section className='input-footer'>
        <Chatinput {...{ message, setMessage, handleSubmit }} />
      </section>
    </main>
  )
}

export default Grouppage
