import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAddIcon, EyeIcon, AtSymbolIcon } from '@heroicons/react/outline'

const Users = ({ className = '' }) => {
  // set loading component for when search queries are made
  return (
    <section>
      <ul className='ml-4 my-2'>
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
      </ul>
    </section>
  )
}

const User = () => {
  const navigate = useNavigate()
  return (
    <li className='py-2 flex items-center justify-between'>
      <div className='space-x-2 flex items-center'>
        <img
          src={require(`../../images/${Math.ceil(Math.random() * 6)}.png`)}
          alt='profile'
          className='flex-shrink-0 rounded-full border-2 border-light-main h-12 w-12'
        />
        <div className='flex flex-col'>
          <p className='truncate text-light-text'>dokpemu oluponu</p>
          <p className='text-sm flex items-center'>
            <AtSymbolIcon className='h-4 w-4 text-light-main' />
            <span className='text-gray-400'>noUsername</span>
          </p>
        </div>
      </div>
      <div className='mr-4 flex items-center text-gray-400 space-x-2'>
        <button
          className=''
          onClick={() => {
            navigate('userID')
          }}
        >
          <EyeIcon className='icon-list h-6 w-6 stroke-1 stroke-light-main' />
        </button>
        <button
          className=''
          onClick={() => {
            // call the add user function
          }}
        >
          <UserAddIcon className='icon-list h-6 w-6 stroke-1 stroke-light-main' />
        </button>
      </div>
    </li>
  )
}

export default Users
