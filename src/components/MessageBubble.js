import React from 'react'
import Moment from 'react-moment'
import { useNavigate } from 'react-router-dom'

const MessageBubble = ({
  group = false,
  type,
  text,
  time,
  user,
  name = false,
}) => {
  const navigate = useNavigate()
  return (
    <div
      className={`flex items-start ${
        type === 'right' ? 'justify-end' : 'justify-start'
      } gap-2`}
      onDoubleClick={() => {}}
    >
      <img
        src={require(`../assets/images/${Math.ceil(Math.random() * 6)}.png`)}
        alt='profile'
        className={`cursor-pointer h-8 w-8 flex-shrink-0 ${
          type === 'right' && 'order-last cursor-auto'
        }`}
        onClick={() => {
          if (type === 'right') return
          if (!group) return navigate(`info`)
          return navigate(`${user}/info`)
        }}
      />
      <div className={`relative max-w-[70%] flex flex-col`}>
        <p
          className={`break-words rounded-lg px-3 py-2 text-[14px] shadow-lg ${
            type === 'right'
              ? 'bg-light-bubble2 text-light-chat dark:bg-[#3a3b3c] dark:text-dark-text'
              : 'bg-light-bubble1 text-white'
          }`}
        >
          {name && (
            <span
              className='absolute text-xs font-bold tracking-wide capitalize -top-[30%] text-light-textmuted dark:text-dark-textmuted' //fix later ensure to chatnge the test later
            >
              {name}
            </span>
          )}
          {text}
        </p>
        <p className='mx-2 mt-1 ml-auto text-xs text-light-textmuted dark:text-dark-textmuted'>
          <Moment fromNow>{time}</Moment>
        </p>
      </div>
    </div>
  )
}

export default MessageBubble
