import { ChevronLeftIcon } from '@heroicons/react/outline'
import { useStoreState } from 'easy-peasy'
import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallbackCustom } from '../../components'
import { UserCard } from './UserCard'

const ChatInfo = () => {
  const navigate = useNavigate()
  const [reset, setReset] = useState(false)
  const { uid } = useStoreState((state) => state.user)
  const { roomData } = useOutletContext()

  const data = Object.values(roomData.people)
  const friendData = data.filter((item) => item.uid !== uid)[0]

  console.log(friendData)

  const { firstname, lastname, photoUrl, username, about } = friendData

  return (
    <main className='flex flex-col space-y-4 py-4 px-4'>
      <div className='flex items-center -ml-2'>
        <button onClick={() => navigate(-1)}>
          <ChevronLeftIcon className='h-8 w-8 text-light-main' />
        </button>
      </div>
      <ErrorBoundary
        FallbackComponent={ErrorFallbackCustom}
        onReset={() => {
          setReset((x) => !x)
        }}
        resetKeys={[reset]}
      >
        <UserCard
          require={require}
          photoUrl={photoUrl}
          username={username}
          firstname={firstname}
          lastname={lastname}
          about={about}
        />
      </ErrorBoundary>
    </main>
  )
}

export default ChatInfo
