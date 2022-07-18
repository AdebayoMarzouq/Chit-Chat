import { useState, useEffect } from 'react'
import { SET_USER_ROOMS, SET_USER_FRIENDS } from '../context/action'
import { Link } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { Homepreview, FriendsPreview, Homeheader, Modal } from '../components'
import {
  ChatIcon,
  PlusSmIcon,
  UserIcon,
  UsersIcon,
  UserGroupIcon,
} from '@heroicons/react/outline'
import { useAppContext } from '../context/context'

import { ErrorFallback, Errordisplay } from '../components'

const Home = () => {
  const { dispatch, user, getRooms, getUserFriends, user_rooms, user_friends } =
    useAppContext()
  const [tab, setTab] = useState('chats')
  const [modal, setModal] = useState(false)
  const [chatStatus, setChatStatus] = useState({ loading: true, error: false })
  const [roomStatus, setRoomStatus] = useState({ loading: true, error: false })

  const handleErrorRooms = () => {
    setRoomStatus({ loading: true, error: false })
    dispatch({ type: SET_USER_ROOMS, payload: [] })
  }

  const handleErrorFriends = () => {
    setChatStatus({ loading: true, error: false })
    dispatch({ type: SET_USER_FRIENDS, payload: [] })
  }

  useEffect(() => {
    const unsubscribe = getRooms(setRoomStatus)
    const unsubscribe1 = getUserFriends(setChatStatus)
    return () => {
      unsubscribe()
      unsubscribe1()
    }
  }, [getRooms, getUserFriends])

  return (
    <main className='min-h-screen grid grid-cols-1'>
      <section className='space-y-2 px-4'>
        <div className='flex items-end space-x-2 py-2'>
          <Homeheader name='Home' className='flex-grow' />
          <div>{user.username}</div>
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
                  tab === 'chats' ? 'stroke-light-main' : 'stroke-gray-400'
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
                  tab === 'rooms' ? 'stroke-light-main' : 'stroke-gray-400'
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
                  Join room <PlusSmIcon className='h-4 w-4' />
                </button>
                <button
                  className='flex items-center'
                  onClick={() => setModal({ show: true, type: 'create' })}
                >
                  New room <PlusSmIcon className='h-4 w-4' />
                </button>
              </>
            )}
            {tab === 'chats' && (
              <>
                <Link to='/users' className='flex items-center'>
                  All users <UsersIcon className='h-4 w-4 ml-1' />
                </Link>
              </>
            )}
          </div>
        </div>
        {tab === 'chats' &&
          (chatStatus.loading ? (
            <div className='sub-loading'></div>
          ) : (
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={handleErrorFriends}
              resetKeys={[roomStatus, user_friends]}
            >
              {!chatStatus.error ? (
                <div className='space-y-6 overflow-y-auto p-1 pr-0'>
                  {user_friends.length ? (
                    user_friends.map((friend) => {
                      return <FriendsPreview key={friend.userID} {...friend} />
                    })
                  ) : (
                    <div>
                      You have not added any friends yet, add some and they will
                      appear here
                    </div>
                  )}
                </div>
              ) : (
                <Errordisplay
                  error={{
                    message:
                      "An error occured, E fit be your internet or you don't have any friends.",
                  }}
                  resetErrorBoundary={handleErrorFriends}
                />
              )}
            </ErrorBoundary>
          ))}
        {tab === 'rooms' && (
          <>
            <div className='flex justify-end'>
              {modal.show && <Modal type={modal.type} setModal={setModal} />}
            </div>
            {roomStatus.loading ? (
              <div className='sub-loading'></div>
            ) : (
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={handleErrorRooms}
                resetKeys={[roomStatus, user_rooms]}
              >
                {!roomStatus.error ? (
                  <div className='space-y-6 overflow-y-auto p-1 pr-0'>
                    {user_rooms.length ? (
                      user_rooms.map((room) => {
                        return <Homepreview key={room.roomID} {...room} />
                      })
                    ) : (
                      <div>
                        You have not joined any room yet, join some and they
                        will appear here
                      </div>
                    )}
                  </div>
                ) : (
                  <Errordisplay
                    error={{
                      message:
                        "An error occured, E fit be your internet or you haven't joined any room",
                    }}
                    resetErrorBoundary={handleErrorRooms}
                  />
                )}
              </ErrorBoundary>
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default Home
