import React from 'react'
import Moment from 'react-moment'

const MessageBubble = ({ type, text, time, name = false }) => {
  return (
    <div
      className={`w-8/12 ${type === 'right' && 'ml-auto'}`}
      onDoubleClick={() => {}}
    >
      <div
        className={`flex max-w-fit flex-col ${type === 'right' && 'ml-auto'}`}
      >
        <div
          className={`${
            type === 'right' ? 'bg-light-bubble2' : 'bg-light-bubble1'
          } flex-shrink break-words rounded-lg px-3 py-2 text-[14px] text-light-chat shadow-lg`}
        >
          {name && (
            <h3 className='text-sm font-bold capitalize tracking-wide text-light-title'>
              {name}
            </h3>
          )}
          {text}
        </div>
        <p className='mx-2 ml-auto mt-1 text-xs text-light-text'>
          <Moment fromNow>{time}</Moment>
        </p>
      </div>
    </div>
  )
}

export default MessageBubble
