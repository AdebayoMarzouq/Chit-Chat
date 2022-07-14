import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Homepreview, Homeheader, Modal } from '../components'
import {
  ChatIcon,
  PlusSmIcon,
  UserIcon,
  UserGroupIcon,
} from '@heroicons/react/outline'
import { useAppContext } from '../context/context'

const Home = () => {
  const { getRooms, rooms, page_loading } = useAppContext()
  const [tab, setTab] = useState('chats')
  const [modal, setModal] = useState(false)

  useEffect(() => {
    if (page_loading) return
    const unsubscribe = getRooms()
    return () => {
      unsubscribe()
    }
  }, [getRooms, page_loading])

  return (
    <main className='min-h-screen grid grid-cols-1'>
      <section className='space-y-2 px-4'>
        <div className='flex items-end space-x-2 py-2'>
          <Homeheader className='flex-grow' />
        </div>
        <div className='grid grid-cols-2 pt-2 pb-4'>
          <div
            className={`flex justify-center place-content-center ${
              tab === 'chats'
                ? 'border-b-2 border-light-main text-light-title'
                : 'text-gray-400'
            }`}
            onClick={() => setTab('chats')}
          >
            <div className='font-semibold text-xl select-none cursor-pointer flex items-center space-x-2 mb-2'>
              <ChatIcon
                className={`w-6 h-6 ${
                  tab === 'chats' ? 'stroke-[#3ed7ee]' : 'stroke-gray-400'
                }`}
              />
            </div>
          </div>
          <div
            className={`flex justify-center place-content-center ${
              tab === 'rooms'
                ? 'border-b-2 border-light-main text-light-title'
                : 'text-gray-400'
            }`}
            onClick={() => setTab('rooms')}
          >
            <div className='font-semibold text-xl select-none cursor-pointer mb-2'>
              <UserGroupIcon
                className={`w-6 h-6 ${
                  tab === 'rooms' ? 'stroke-[#3ed7ee]' : 'stroke-gray-400'
                }`}
              />
            </div>
          </div>
          <div className='mt-2 py-2 col-span-2 flex justify-between text-light-text border-b'>
            <Link to='/profile' className='flex items-center'>
              Profile <UserIcon className='h-4 w-4' />
            </Link>
            {tab === 'rooms' && (
              <>
                <button
                  className='flex items-center'
                  onClick={() => setModal({ show: true, type: 'join' })}
                >
                  Join Room <PlusSmIcon className='h-4 w-4' />
                </button>
                <button
                  className='flex items-center'
                  onClick={() => setModal({ show: true, type: 'create' })}
                >
                  New room <PlusSmIcon className='h-4 w-4' />
                </button>
              </>
            )}
          </div>
        </div>
        {tab === 'chats' && (
          <div className='space-y-6 overflow-y-auto p-1 pr-0'>
            <Homepreview />
          </div>
        )}
        {tab === 'rooms' && (
          <>
            <div className='flex justify-end'>
              {modal.show && <Modal type={modal.type} setModal={setModal} />}
            </div>
            <div className='space-y-6 overflow-y-auto p-1 pr-0'>
              {rooms.map((room) => {
                return <Homepreview key={room.roomID} {...room} />
              })}
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default Home
