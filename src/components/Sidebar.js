import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  ChatIcon,
  UsersIcon,
  UserIcon,
  UserGroupIcon,
  CogIcon,
  MoonIcon,
  SunIcon,
  CheckIcon,
  XIcon,
  EmojiHappyIcon,
  LogoutIcon,
} from '@heroicons/react/outline'
import { ExternalLinkIcon } from '@heroicons/react/solid'
import { ReactComponent } from '../assets/chat-conversation-svgrepo-com.svg'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { logout } from '../firebase/firebaseUtils'

const links = [
  {
    title: 'Pages',
    links: [
      {
        title: 'chats',
        icon: <ChatIcon className='w-5' />,
        linkto: '/',
      },
      {
        title: 'rooms',
        icon: <UserGroupIcon className='w-5' />,
        linkto: '/rooms',
      },
      {
        title: 'users',
        icon: <UsersIcon className='w-5' />,
        linkto: '/users',
      },
      {
        title: 'profile',
        icon: <UserIcon className='w-5' />,
        linkto: '/profile',
      },
      {
        title: 'friends',
        icon: <EmojiHappyIcon className='w-5' />,
        linkto: '/friends',
      },
    ],
  },
]

const themes = [
  'bg-light-main',
  'bg-purple-600',
  'bg-sky-600',
  'bg-teal-600',
  'bg-green-600',
  'bg-orange-600',
]

const Sidebar = ({ closeNav, isOpen, setIsOpen, width, className }) => {
  const activeLink =
    'capitalize bg-light-maintint flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 ml-0'
  const normalLink =
    'capitalize flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 hover:bg-gray-100 m-2 ml-0'

  const handleSignOut = () => {
    logout()
  }

  return (
    <aside
      className={`${className} inset-y-0 z-50 space-y-8 overflow-y-auto md:z-0 md:w-72 ${
        isOpen && width < 768
          ? 'w-screen'
          : 'w-0 -translate-x-full md:translate-x-0'
      } bg-white py-7 pl-6 pr-3 shadow-xl transition-transform`}
    >
      <div className='flex justify-between'>
        <h1 className='flex items-center truncate text-2xl font-bold tracking-widest text-light-main'>
          <ReactComponent className='mr-1 h-8 w-8 fill-light-main' />
          ChitChat
        </h1>
        {width < 768 && (
          <button
            className='mr-1 text-gray-400'
            onClick={() => {
              setIsOpen(false)
            }}
          >
            <XIcon className='w-8' />
          </button>
        )}
        {/* <p className='flex items-center text-sm font-semibold'>
          The dev <ExternalLinkIcon className='ml-1 h-4 w-4' />
          put link to website here later
        </p> */}
      </div>

      <div className='relative flex items-center gap-5'>
        <img
          src={require('../assets/images/3.png')}
          alt=''
          className='h-12 w-12 rounded-full ring ring-light-main ring-offset-2'
        />
        <div className='grid grid-cols-1'>
          <span className='italic text-gray-400'>Hi emoji,</span>
          <h2 className='truncate text-lg'>Marzouq</h2>
        </div>
        <button
          className='absolute top-0 right-0 flex items-center justify-end space-x-1 text-sm text-gray-400'
          onClick={handleSignOut}
        >
          <p className='underline'>Log out</p>
          <span>
            <LogoutIcon className='h-4 w-4' />
          </span>
        </button>
      </div>

      <ul className='space-y-4'>
        {links.map((link) => (
          <div key={link.title}>
            <p className=' border-b pb-4 uppercase text-gray-400'>
              {link.title}
            </p>
            {link.links.map((link) => (
              <NavLink
                to={`${link.linkto}`}
                key={link.title}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                onClick={closeNav}
              >
                {link.icon}
                {link.title}
              </NavLink>
            ))}
          </div>
        ))}
      </ul>

      <div className='space-y-4'>
        <p className='flex items-center gap-5 border-b pb-4 uppercase text-gray-400'>
          <button>
            <CogIcon className='w-5' />
          </button>
          <span>Settings</span>
        </p>
        <div className='space-y-2 pl-4'>
          <p className='flex items-center gap-5 capitalize text-gray-400'>
            Theme mode
          </p>
          <ul className='space-y-4'>
            <li>
              <button className='flex items-center gap-2'>
                <SunIcon className='w-4' />
                <span>Light</span>
              </button>
            </li>
            <li>
              <button className='flex items-center gap-2'>
                <MoonIcon className='w-4' />
                <span>Dark</span>
              </button>
            </li>
          </ul>
        </div>
        <div className='space-y-2 pl-4'>
          <p className='flex items-center gap-5 capitalize text-gray-400'>
            Theme color
          </p>
          <ul className='flex gap-2'>
            {themes.map((theme) => (
              <li key={theme}>
                <button
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${theme}`}
                >
                  <CheckIcon className='w-6 text-white' />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
