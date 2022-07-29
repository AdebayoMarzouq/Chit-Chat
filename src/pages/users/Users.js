import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import {
  UserAddIcon,
  EyeIcon,
  AtSymbolIcon,
  CheckCircleIcon,
} from '@heroicons/react/outline'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallbackCustom } from '../../components'
import { PageError1 } from '../../components'

import { useAddFriend } from '../../firebase/firebaseUtils'

const Users = ({ className = '' }) => {
  const [retry, setRetry] = useState(false)
  const { values, error, loading } = useOutletContext()

  if (error)
    return <PageError1 error='Error while fetching users' reset={setRetry} /> // render fallback component here
  if (loading) return <div className='sub-loading'></div>

  return (
    <section>
      <ErrorBoundary
        FallbackComponent={ErrorFallbackCustom}
        onReset={() => {
          setRetry((x) => !x)
        }}
        resetKeys={[retry]}
      >
        <ul className='my-2'>
          {values.length ? (
            values.map((user) => <User key={user.userID} {...user} />)
          ) : (
            <PageError1
              error='Unable to fetch users, may be due to your network'
              reset={setRetry}
            />
          )}
        </ul>
      </ErrorBoundary>
    </section>
  )
}

const User = ({
  userID,
  username,
  firstname,
  lastname,
  profileUrl: photoUrl,
  about,
}) => {
  const navigate = useNavigate()
  const [retry, setRetry] = useState(false)
  const { addFriend, success, loading } = useAddFriend()

  const handleAdd = () => {
    addFriend({
      username: username,
      friendID: userID,
      photoUrl: photoUrl,
      about: about,
    })
  }

  const SetIcon = () => {
    // make friends checked
    if (loading) return <div className='add-loading h-4 w-4'></div>
    else if (success)
      return (
        <CheckCircleIcon className='icon-list h-6 w-6 stroke-light-main stroke-1' />
      )
    return (
      <UserAddIcon className='icon-list h-6 w-6 stroke-light-main stroke-1' />
    )
  }

  return (
    <ErrorBoundary
      // FallbackComponent={ErrorFallback}
      fallback={
        <p className='p-4 text-center text-sm text-red-500'>
          An error occured while fetching this user
        </p>
      }
      onReset={() => {
        setRetry((x) => !x)
      }}
      resetKeys={[retry]}
    >
      <li className='flex items-center justify-between py-4 px-4 md:px-8'>
        <div className='flex items-center space-x-2'>
          <img
            src={
              isNaN(parseInt(photoUrl))
                ? photoUrl
                : require(`../../assets/images/${photoUrl}.png`)
            }
            alt='profile'
            className='h-12 w-12 flex-shrink-0 rounded-full ring-2 ring-light-main ring-offset-2'
          />
          <div className='flex flex-col'>
            <p className='truncate text-light-text'>
              {firstname}
              <span> </span>
              {lastname}
            </p>
            <p className='flex items-center text-sm'>
              <AtSymbolIcon className='h-4 w-4 text-light-main' />
              <span className='text-gray-400'>{username}</span>
            </p>
          </div>
        </div>
        <div className='flex items-center space-x-2 text-gray-400'>
          <button
            className=''
            onClick={() => {
              navigate(`${userID}`)
            }}
          >
            <EyeIcon className='icon-list h-6 w-6 stroke-light-main stroke-1' />
          </button>
          <button className='' onClick={handleAdd}>
            <SetIcon />
          </button>
        </div>
      </li>
    </ErrorBoundary>
  )
}

export default Users
