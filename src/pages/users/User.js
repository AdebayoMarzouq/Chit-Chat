import { useState } from 'react'
import { AtSymbolIcon, UserAddIcon } from '@heroicons/react/solid'
import { CheckCircleIcon } from '@heroicons/react/outline'

export const User = ({
  username,
  userID,
  about,
  firstname,
  lastname,
  email,
  profileUrl: photoUrl,
  add,
}) => {
  const { addFriend, loading, success } = add

  const handleAdd = () => {
    addFriend({
      username: username,
      friendID: userID,
      photoUrl: photoUrl,
      about: about,
    })
  }

  const SetIcon = () => {
    if (loading) return <div className='add-loading h-8 w-8'></div>
    else if (success)
      return (
        <CheckCircleIcon className='icon-list h-10 w-10 drop-shadow text-light-main' />
      )
    return (
      <UserAddIcon className='icon-list h-10 w-10 drop-shadow text-light-main' />
    )
  }

  return (
    <>
      <div className='relative flex items-center space-x-4'>
        <img
          className='rounded-full h-24 w-24 ring-4 ring-light-main shrink-0 object-cover'
          src={
            isNaN(parseInt(photoUrl))
              ? photoUrl
              : require(`../../assets/images/${photoUrl}.png`)
          }
          alt='profile_image'
        />
        <div className='grid grid-col space-y-[1px]'>
          <h2 className='text-xl text-light-title'>
            {firstname}
            <span> </span>
            {lastname}
          </h2>
          <h3 className='text-light-main flex items-center'>
            <AtSymbolIcon className='h-4 w-4 text-gray-400' />
            {username}
          </h3>
        </div>
        <button
          className='absolute flex justify-center items-center h-10 w-10 top-1 right-2'
          onClick={handleAdd}
          // adjust docreference in addFriend
          // add add loading to let the user know it is loading by replacing the add icon
        >
          <SetIcon />
        </button>
      </div>
      <div className='space-y-1'>
        <h4 className='text-sm text-light-chat'>Username</h4>
        <h2 className='text-xl text-light-title'>{username}</h2>
      </div>
      <div className='space-y-1'>
        <h4 className='text-sm text-light-chat'>Email</h4>
        <h2 className='text-xl text-light-title'>{email}</h2>
      </div>
      <div className='space-y-1'>
        <h4 className='text-sm text-light-chat'>About</h4>
        <h2 className='text-sm text-light-title'>{about}</h2>
      </div>
    </>
  )
}
