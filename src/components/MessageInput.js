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
        autoFocus
        minRows={1}
        maxRows={3}
        ref={inputRef}
        className='py-2 overflow-hidden text-sm rounded-sm resize-none my-textarea focus:ring-1 focus:ring-light-textmuted dark:focus:ring-dark-textmuted'
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.shiftKey === false) {
            e.preventDefault()
            handleSubmit(e)
            return
          }
        }}
      />
      <button
        className='self-end dark:text-dark-main text-light-main focus-visible:outline-light-bubble1'
        onClick={handleSubmit}
      >
        <PaperAirplaneIcon className='w-8 h-8 rotate-90 transfrom' />
      </button>
    </form>
  )
}

export default MessageInput
