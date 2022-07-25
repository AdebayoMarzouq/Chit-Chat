import React from 'react'
import { CogIcon, AtSymbolIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
import { useStoreState } from 'easy-peasy'

const Profile = () => {
  const navigate = useNavigate()
  const user = useStoreState((state) => state.user)
  let { username, firstname, lastname, email, profileUrl, about } = user

  console.log('user == ', user, '<==>', user.profileUrl)
  if (!user) return <div className='sub-loading'></div>

  return (
    <main className='flex flex-col space-y-6 p-8'>
      <div className='relative flex items-center space-x-4'>
        <img
          className='rounded-full h-24 w-24 ring-4 ring-light-main shrink-0'
          src={require(`../../assets/images/${profileUrl}.png`)}
          // src={profileUrl}
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
          className='absolute z-10 flex justify-center items-center rounded-full h-8 w-8 top-1 right-2 shadow-lg'
          onClick={() => {
            navigate('settings')
          }}
        >
          <CogIcon className='h-6 w-6 text-light-main' />
        </button>
      </div>
      <div className=''>
        <h4 className='text-sm text-light-chat'>Username</h4>
        <h2 className='text-xl text-light-title'>{username}</h2>
      </div>
      <div className=''>
        <h4 className='text-sm text-light-chat'>Email</h4>
        <h2 className='text-xl text-light-title'>{email}</h2>
      </div>
      <div className=''>
        <h4 className='text-sm text-light-chat'>About</h4>
        <h2 className='text-sm text-light-title'>
          {about || 'Your bio is empty'}
        </h2>
      </div>
    </main>
  )
}

export default Profile
