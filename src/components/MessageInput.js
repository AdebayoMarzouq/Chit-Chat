import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { PaperAirplaneIcon } from '@heroicons/react/solid'

const MessageInput = ({ inputRef, handleSubmit }) => {
  return (
    <form
      className='flex w-full space-x-2'
      onSubmit={(e) => e.preventDefault()}
    >
      <TextareaAutosize
        minRows={1}
        maxRows={3}
        ref={inputRef}
        className='my-textarea resize-none overflow-hidden rounded-md py-2 text-sm'
      />
      <button
        className='self-end text-light-main focus-visible:outline-light-bubble1'
        onClick={handleSubmit}
      >
        <PaperAirplaneIcon className='transfrom h-6 w-6 rotate-90' />
      </button>
    </form>
  )
}

export default MessageInput
