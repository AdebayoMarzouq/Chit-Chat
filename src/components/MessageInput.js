import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { PaperAirplaneIcon } from '@heroicons/react/solid'

const MessageInput = ({ inputRef, handleSubmit }) => {
  return (
    <form className='flex space-x-2' onSubmit={(e) => e.preventDefault()}>
      <TextareaAutosize
        minRows={1}
        maxRows={3}
        ref={inputRef}
        className='my-textarea text-sm py-2 rounded-md overflow-hidden'
      />
      <button
        className='self-end text-light-main focus-visible:outline-light-bubble1'
        onClick={handleSubmit}
      >
        <PaperAirplaneIcon className='w-6 h-6 transfrom rotate-90' />
      </button>
    </form>
  )
}

export default MessageInput
