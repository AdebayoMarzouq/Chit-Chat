import { PaperAirplaneIcon } from '@heroicons/react/solid'
const Chatinput = ({ inputRef, handleSubmit }) => {
  return (
    <form className='flex space-x-2' onSubmit={(e) => e.preventDefault()}>
      <input
        type='text'
        placeholder='Type your message...'
        ref={inputRef}
        className='placeholder-light-text placeholder-opacity-40 text-sm py-2 rounded-full'
      />
      <button
        className='text-light-main focus-visible:outline-light-bubble1'
        onClick={handleSubmit}
      >
        <PaperAirplaneIcon className='w-6 h-6 transfrom rotate-90' />
      </button>
    </form>
  )
}

export default Chatinput
