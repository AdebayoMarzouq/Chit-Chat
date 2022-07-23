import React from 'react'
import { XIcon } from '@heroicons/react/outline'

import { useStoreActions } from 'easy-peasy'

const Modal = ({ type, setModal }) => {
  const [createRoom] = useStoreActions((actions) => [actions.createRoom])
  const [roomName, setRoomName] = React.useState('')
  const [roomLink, setRoomLink] = React.useState('')

  const handleCreate = () => {
    if (!roomName) return
    setRoomName('')
    createRoom(roomName)
    setModal((prev) => !prev)
  }

  const handleCreateChange = (e) => {
    if (e.target.value.length <= 40) {
      setRoomName(e.target.value)
      return
    }
  }

  const handleJoin = () => {
    // if (!roomLink) return
    // setRoomLink('')
    // joinRoom(roomLink)
    // setModal((prev) => !prev)
  }

  const handleJoinChange = (e) => {
    setRoomLink(e.target.value)
  }

  return (
    <div className='fixed z-50 top-0 left-0 h-screen w-screen bg-black bg-opacity-30 flex items-center place-content-center'>
      <div className='relative bg-[#fafafa] min-h-32 w-11/12 p-2 rounded-lg shadow-md text-light-text'>
        <button
          className='absolute right-4 top-2'
          onClick={() => setModal(false)}
        >
          <XIcon className='h-6 w-6' />
        </button>
        <p className='absolute text-xs text-light-chat top-2 left-5'>
          {type === 'create'
            ? '40 characters max'
            : 'Paste room link here to join'}
        </p>
        <form className='space-y-2 flex-col mt-4'>
          <div className='h-14 border-b border-light-main'>
            <input
              className='placeholder:select-none'
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
          <div className='flex'>
            {type === 'create' ? (
              <button
                className={`border select-none py-1 px-2 rounded-xl text-sm ml-auto ${
                  !roomName
                    ? 'pointer-events-none text-gray-400'
                    : 'hover:text-white hover:bg-light-main border-light-main text-light-main'
                }`}
                onClick={handleCreate}
                disabled={!roomName}
              >
                Create room
              </button>
            ) : (
              <button
                className={`border select-none py-1 px-2 rounded-xl text-sm ml-auto ${
                  !roomLink
                    ? 'pointer-events-none text-gray-400'
                    : 'hover:text-white hover:bg-light-main border-light-main text-light-main'
                }`}
                onClick={handleJoin}
                disabled={!roomLink}
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
