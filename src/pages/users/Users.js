import React, { useState, memo } from 'react'
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
import { faker } from '@faker-js/faker'
import uuid from 'react-uuid'

import { useAddFriend } from '../../firebase/firebaseUtils'

const Users = ({ className = '' }) => {
  const [retry, setRetry] = useState(false)
  const { values, error, loading } = useOutletContext()

  if (error)
    return <PageError1 error='Error while fetching users' reset={setRetry} /> // render fallback component here
  if (loading) return <div className='sub-loading'></div>

  return (
    <section>
      <ErrorBoundary // FallbackComponent={ErrorFallback}
        FallbackComponent={ErrorFallbackCustom}
        onReset={() => {
          setRetry((x) => !x)
        }}
        resetKeys={[retry]}
      >
        <ul className='ml-4 my-2'>
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
  const { addFriend, success, loading, error } = useAddFriend()

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
        <CheckCircleIcon className='icon-list h-6 w-6 stroke-1 stroke-light-main' />
      )
    return (
      <UserAddIcon className='icon-list h-6 w-6 stroke-1 stroke-light-main' />
    )
  }

  return (
    <ErrorBoundary
      // FallbackComponent={ErrorFallback}
      fallback={
        <p className='text-red-500 text-sm text-center p-4'>
          An error occured while fetching this user
        </p>
      }
      onReset={() => {
        setRetry((x) => !x)
      }}
      resetKeys={[retry]}
    >
      <li className='py-4 flex items-center justify-between'>
        <div className='space-x-2 flex items-center'>
          <img
            src={
              isNaN(parseInt(photoUrl))
                ? photoUrl
                : require(`../../assets/images/${photoUrl}.png`)
            }
            alt='profile'
            className='flex-shrink-0 rounded-full border-2 border-light-main h-12 w-12'
          />
          <div className='flex flex-col'>
            <p className='truncate text-light-text'>
              {firstname}
              <span> </span>
              {lastname}
            </p>
            <p className='text-sm flex items-center'>
              <AtSymbolIcon className='h-4 w-4 text-light-main' />
              <span className='text-gray-400'>{username}</span>
            </p>
          </div>
        </div>
        <div className='mr-4 flex items-center text-gray-400 space-x-2'>
          <button
            className=''
            onClick={() => {
              navigate(`${userID}`)
            }}
          >
            <EyeIcon className='icon-list h-6 w-6 stroke-1 stroke-light-main' />
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
