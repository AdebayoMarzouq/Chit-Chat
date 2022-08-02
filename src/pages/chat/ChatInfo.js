import { ChevronLeftIcon } from '@heroicons/react/outline'
import { useStoreState } from 'easy-peasy'
import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { User, ErrorFallbackCustom } from '../../components'

const ChatInfo = () => {
  const navigate = useNavigate()
  const [reset, setReset] = useState(false)
  const { uid } = useStoreState((state) => state.user)
  const { roomData } = useOutletContext()

  const data = Object.values(roomData.people)
  const friendData = data.filter((item) => item.uid !== uid)[0]

  const { firstname, lastname, photoUrl, username, about } = friendData

  return (
    <div className='flex flex-col space-y-4 py-4 px-4'>
      <div className='-ml-2 flex items-center'>
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
        <User
          profileUrl={photoUrl}
          username={username}
          firstname={firstname}
          lastname={lastname}
          about={about}
        />
      </ErrorBoundary>
    </div>
  )
}

export default ChatInfo
