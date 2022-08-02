import React, { useState } from 'react'

import { useStoreActions } from 'easy-peasy'

const Modal = ({ type, setModal }) => {
  const [createRoom, joinRoom] = useStoreActions((actions) => [
    actions.createRoom,
    actions.joinRoom,
  ])
  const [roomName, setRoomName] = useState('')
  const [roomLink, setRoomLink] = useState('')

  const handleCreate = () => {
    setRoomName('')
    createRoom(roomName)
    setModal((prev) => !prev)
  }

  const handleCreateChange = (e) => {
    if (e.target.value.length <= 40) {
      setRoomName(e.target.value)
    }
  }

  const handleJoin = () => {
    setRoomLink('')
    joinRoom(roomLink)
    setModal((prev) => !prev)
  }

  const handleJoinChange = (e) => {
    setRoomLink(e.target.value)
  }

  return (
    <div className='absolute inset-0 z-50 flex items-center bg-black bg-opacity-30 dark:bg-opacity-70 place-content-center'>
      <div className='w-11/12 px-2 py-3 rounded-lg shadow-xl sm:px-4 bg-light-bg dark:bg-dark-mainalt min-h-32 sm:w-10/12 text-light-text'>
        <div className='grid grid-rows-2'>
          <h2 className='text-xl text-light-text dark:text-dark-text'>
            {type === 'create' ? 'Create room name' : 'Join room'}
          </h2>
          <p className='text-xs select-none text-light-textmuted dark:text-dark-textmuted top-4 left-5'>
            {type === 'create'
              ? 'Room name should not be longer than 40 characters'
              : 'Paste room link here to join'}
          </p>
        </div>
        <form
          className='flex-col space-y-4'
          onSubmit={(e) => e.preventDefault()}
        >
          <div className='h-10 border rounded-lg border-light-textmuted dark:border-[#404040]'>
            <input
              className='placeholder:select-none placeholder:text-sm'
              type='text'
              placeholder={
                type === 'create' ? 'Enter room name' : 'Paste room link'
              }
              value={type === 'create' ? roomName : roomLink}
              onChange={(e) => {
                if (type === 'create') {
                  handleCreateChange(e)
                  return
                }
                handleJoinChange(e)
              }}
            />
          </div>
          <div className='flex items-center justify-end gap-2'>
            <button
              className='px-2 py-1 text-sm select-none rounded-xl text-light-text dark:text-dark-textmuted hover:text-red-600 dark:hover:text-red-400'
              onClick={() => setModal(false)}
            >
              Cancel
            </button>
            {type === 'create' ? (
              <button
                className={`border select-none py-1 px-2 rounded-lg text-sm ${
                  !/\S/.test(roomName)
                    ? 'pointer-events-none dark:border-[#404040] text-light-textmuted dark:text-[#404040]'
                    : 'bg-light-main dark:bg-dark-main text-white border-none hover:scale-95'
                }`}
                onClick={handleCreate}
                disabled={!/\S/.test(roomName)}
              >
                Create room
              </button>
            ) : (
              <button
                className={`border select-none py-1 px-2 rounded-lg text-sm ${
                  !/\S/.test(roomLink)
                    ? 'pointer-events-none dark:border-[#404040] text-light-textmuted dark:text-[#404040]'
                    : 'bg-light-main dark:bg-dark-main text-white border-none hover:scale-95'
                }`}
                onClick={handleJoin}
                disabled={!/\S/.test(roomLink)}
              >
                Join room
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Modal
