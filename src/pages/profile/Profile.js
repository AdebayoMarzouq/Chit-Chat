import React from 'react'
import { PencilIcon, AtSymbolIcon, MailIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
import { useStoreState } from 'easy-peasy'

import { User } from '../../components/User'

const Profile = () => {
  const navigate = useNavigate()
  const user = useStoreState((state) => state.user)
  let { username, firstname, lastname, email, profileUrl, about } = user

  if (!user) return <div className='sub-loading'></div>

  return (
    <main className='flex flex-col space-y-6 p-8'>
      <div className='space-x-4'>
        <div className='flex h-56 items-center justify-center overflow-hidden rounded-xl bg-light-maintint sm:h-80'>
          <img
            src={require('../../assets/landscape.png')}
            alt='landscape'
            className='h-full w-full object-cover'
          />
        </div>
        <div className='relative flex'>
          <img
            className='-mt-12 h-24 w-24 shrink-0 rounded-full object-cover ring ring-light-main ring-offset-2 dark:ring-offset-dark-bg sm:-mt-16 sm:h-32 sm:w-32'
            src={
              isNaN(parseInt(profileUrl))
                ? profileUrl
                : require(`../../assets/images/${profileUrl}.png`)
            }
            alt='profile_image'
          />
          <div className='absolute top-2 right-2'>
            <button
              onClick={() => {
                navigate('edit')
              }}
              // adjust docreference in addFriend
              // add add loading to let the user know it is loading by replacing the add icon
            >
              <PencilIcon className='w-8 text-light-main drop-shadow sm:w-10' />
            </button>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 pl-4'>
        <h2 className='text-xl text-light-text dark:text-dark-text sm:text-2xl'>
          {firstname} {lastname}
        </h2>
        <h3 className='flex items-center '>
          <span>
            <AtSymbolIcon className='dark:text-dark-main w-5 text-light-main' />
          </span>
          <span className='text-light-textmuted dark:text-dark-textmuted'>
            {username}
          </span>
        </h3>
      </div>
      <p className='flex items-center gap-2 pl-4 text-light-text dark:text-dark-text'>
        <MailIcon className='dark:text-dark-main w-5 text-light-main' />
        {email}
      </p>
      <p className='pl-4 text-light-text dark:text-dark-text'>
        {about}? more like Muhammad the Goat Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Necessitatibus placeat quasi error
        nesciunt? Expedita repudiandae eveniet aperiam, porro nam voluptates
        tenetur perspiciatis quam placeat autem. Non adipisci molestias, quia
        quasi dolor provident ducimus atque corrupti sunt. Amet asperiores
        tempore praesentium repudiandae fugit voluptate adipisci, natus
        molestias. Inventore debitis optio distinctio!
      </p>
    </main>
  )
}

export default Profile
