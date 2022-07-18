import React, { useState, useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import {
  UserAddIcon,
  EyeIcon,
  AtSymbolIcon,
  CheckCircleIcon,
} from '@heroicons/react/outline'
import { ErrorBoundary } from 'react-error-boundary'

import { useAppContext } from '../../context/context'
import { ErrorFallback, Errordisplay } from '../../components'

const Users = ({ className = '' }) => {
  const { addFriend } = useAppContext()
  const { loading, error, users, handleError } = useOutletContext()

  if (loading) {
    return <div className='sub-loading'></div>
  }

  return (
    <section>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={handleError}
        resetKeys={[error]}
      >
        {!error ? (
          <ul className='ml-4 my-2'>
            {users.map((user) => (
              <User key={user.userID} addFriend={addFriend} {...user} />
            ))}
          </ul>
        ) : (
          <Errordisplay
            error={{
              message:
                'An error occured while fetching users, E fit be your internet',
            }}
            resetErrorBoundary={handleError}
          />
        )}
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
  addFriend,
}) => {
  const navigate = useNavigate()
  const [addStatus, setAddStatus] = useState({
    loading: false,
    error: false,
    success: false,
  })

  const handleAdd = () => {
    setAddStatus((x) => {
      return { ...x, loading: true }
    })
    console.log('triggered')
    const and = addFriend({
      username: username,
      friendID: userID,
      photoUrl: photoUrl,
      about: about,
    }).then((result) => {
      console.log(result)
      setAddStatus(result)
    })
    console.log(and)
  }

  const SetIcon = () => {
    if (addStatus.loading) return <div className='add-loading h-4 w-4'></div>
    else if (addStatus.success)
      return (
        <CheckCircleIcon className='icon-list h-6 w-6 stroke-1 stroke-light-main' />
      )
    return (
      <UserAddIcon className='icon-list h-6 w-6 stroke-1 stroke-light-main' />
    )
  }

  return (
    <li className='py-2 flex items-center justify-between'>
      <div className='space-x-2 flex items-center'>
        <img
          src={
            isNaN(parseInt(photoUrl))
              ? photoUrl
              : require(`../../images/${photoUrl}.png`)
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
  )
}

export default Users
