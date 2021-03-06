import React from 'react'
import Moment from 'react-moment'

const MessageBubble = ({ type, text, time, name = false }) => {
  return (
    <div
      className={`w-4/5 ${type === 'right' && 'ml-auto'}`}
      onDoubleClick={() => {}}
    >
      <div
        className={`flex flex-col max-w-fit ${type === 'right' && 'ml-auto'}`}
      >
        <div
          className={`${
            type === 'right' ? 'bg-light-bubble2' : 'bg-light-bubble1'
          } rounded-lg px-2 py-1 text-xs text-light-chat flex-shrink shadow`}
        >
          {name && (
            <h3 className='font-bold text-light-title capitalize tracking-wide text-sm'>
              {name}
            </h3>
          )}
          {text}
        </div>
        <p className='text-[9px] ml-auto mt-1 text-light-text mx-2'>
          <Moment fromNow>{time}</Moment>
        </p>
      </div>
    </div>
  )
}

export default MessageBubble
