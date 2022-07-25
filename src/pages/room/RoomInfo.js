import React from 'react'
import {
  PencilIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { query, orderBy, limit, collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { toast } from 'react-toastify'
import { useNavigate, useOutletContext } from 'react-router-dom'
import uuid from 'react-uuid'

import { firestoreDB } from '../../firebase/firebase'
import { useUserContext } from '../../context'

const RoomInfo = () => {
  const navigate = useNavigate()
  const { notify } = useUserContext()
  const [input, setInput] = React.useState('')
  const { roomID, values: roomData } = useOutletContext()
  const { name, creator } = roomData
  const [values, loading, error, snapShot] = useCollectionData(
    query(collection(firestoreDB, `rooms/${roomID}/users`))
  )

  const handleChange = (e) => {
    setInput(e.target.value)
  }
  const handleSubmit = () => {}

  return (
    <main className='flex flex-col space-y-4 py-4 px-4'>
      <div className='flex items-center -ml-2'>
        <button onClick={() => navigate(-1)}>
          <ChevronLeftIcon className='h-8 w-8 text-light-main' />
        </button>
        <h1 className='text-light-main'>{name}</h1>
      </div>
      <div className='flex place-content-center'>
        <img
          src={require('../../assets/images/3.png')}
          alt='profile'
          className='h-32 w-32'
        />
      </div>
      <ul className='grid grid-cols-1 divide-y text-gray-500'>
        <li className='flex items-center pt-4 pb-1'>
          <input
            type='text'
            placeholder='Edit room name'
            className='pl-0 bg-transparent'
            value={input}
            onChange={handleChange}
          />
          {input ? (
            <button
              className='flex items-center ml-auto space-x-2'
              onClick={handleSubmit}
            >
              <PaperAirplaneIcon className='h-5 w-5 tranform rotate-90' />
            </button>
          ) : (
            <div className='flex items-center ml-auto space-x-2'>
              <PencilIcon className='h-5 w-5' />
            </div>
          )}
        </li>
        <li className='flex items-center justify-between pt-4 pb-1'>
          <h4 className='truncate text-sm text-light-main'>{`room/${roomID}/${name}`}</h4>
          <button
            className='border border-light-title rounded-full ml-4 px-2 text-sm text-light-title py-0 bg-opacity-40 active:scale-90 animate-bounce'
            onClick={() => {
              navigator.clipboard.writeText(`room/${roomID}/${name}`)
              notify(toast.info, 'Room link copied to clipboard', 2000)
            }}
          >
            copy
          </button>
        </li>
        <li className='flex items-center pt-4 pb-1'>
          <h4>Saved Messages</h4>
          <div className='flex items-center ml-auto space-x-2'>
            <ChevronRightIcon className='h-5 w-5' />
          </div>
        </li>
        <li className='flex flex-col pt-4 pb-1'>
          <div className='flex justify-between items-center'>
            <h4>People</h4>
            <button>
              {/* <ChevronRightIcon className='h-5 w-5' /> */}
              <ChevronDownIcon className='h-5 w-5' />
            </button>
          </div>
          <ul className='ml-2 my-2 divide-y'>
            {values &&
              values.map((roomUser) => {
                return (
                  <li
                    key={uuid()}
                    className='py-2 flex items-center justify-between'
                  >
                    <div className='space-x-2 flex items-center'>
                      <img
                        src={require(`../../assets/images/${Math.ceil(
                          Math.random() * 6
                        )}.png`)}
                        alt='profile'
                        className='flex-shrink-0 h-8 w-8'
                      />
                      <p className='truncate'>{roomUser.username}</p>
                    </div>
                    {creator === roomUser.userID && (
                      <div className='h-4 w-4 rounded-full bg-emerald-400'></div>
                    )}
                  </li>
                )
              })}
          </ul>
        </li>
      </ul>
    </main>
  )
}

export default RoomInfo
