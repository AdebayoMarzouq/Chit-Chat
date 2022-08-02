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
    <section className=''>
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
    if (loading) return <div className='w-4 h-4 add-loading'></div>
    else if (success)
      return (
        <CheckCircleIcon className='w-6 h-6 stroke-1 icon-list stroke-light-main' />
      )
    return (
      <UserAddIcon className='w-6 h-6 stroke-1 icon-list stroke-light-main' />
    )
  }

  return (
    <ErrorBoundary
      // FallbackComponent={ErrorFallback}
      fallback={
        <p className='p-4 text-sm text-center text-red-500'>
          An error occured while fetching this user
        </p>
      }
      onReset={() => {
        setRetry((x) => !x)
      }}
      resetKeys={[retry]}
    >
      <li className='flex items-center justify-between px-4 py-4 hover:bg-gray-200 dark:hover:bg-dark-mainalt sm:px-8'>
        <div
          className='flex items-center space-x-2 cursor-pointer'
          onClick={() => {
            navigate(`${userID}`)
          }}
        >
          <img
            src={
              isNaN(parseInt(photoUrl))
                ? photoUrl
                : require(`../../assets/images/${photoUrl}.png`)
            }
            alt='profile'
            className='flex-shrink-0 w-12 h-12 rounded-full ring-1 ring-light-main ring-offset-2 dark:ring-offset-dark-bg'
          />
          <div className='flex flex-col'>
            <p className='truncate text-light-text dark:text-dark-text'>
              {firstname}
              <span> </span>
              {lastname}
            </p>
            <p className='flex items-center text-sm'>
              <AtSymbolIcon className='w-4 h-4 text-light-main' />
              <span className='text-light-textmuted dark:text-dark-textmuted'>
                {username}
              </span>
            </p>
          </div>
        </div>
        <button onClick={handleAdd}>
          <SetIcon />
        </button>
      </li>
    </ErrorBoundary>
  )
}

export default Users
