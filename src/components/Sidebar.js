import React, { memo, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import {
  ChatAltIcon,
  UsersIcon,
  UserIcon,
  UserGroupIcon,
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
import { useUserContext } from '../context'
import { logout } from '../firebase/firebaseUtils'

const links = [
  {
    title: 'Pages',
    links: [
      {
        title: 'chats',
        icon: <ChatAltIcon className='w-5' />,
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
  {
    name: 'theme-cyan',
    value: 'bg-cyan-500',
  },
  {
    name: 'theme-amber',
    value: 'bg-amber-500',
  },
  {
    name: 'theme-lime',
    value: 'bg-lime-500',
  },
  {
    name: 'theme-emerald',
    value: 'bg-emerald-500',
  },
  {
    name: 'theme-purple',
    value: 'bg-purple-500',
  },
  {
    name: 'theme-rose',
    value: 'bg-rose-500',
  },
]

const Sidebar = memo(({ className }) => {
  const {
    theme,
    setTheme,
    darkMode,
    setDarkMode,
    closeNav,
    isOpen,
    setIsOpen,
    width,
  } = useUserContext()
  const user = useStoreState((state) => state.user)
  const render_count = useRef(0)

  const activeLink =
    'capitalize bg-light-main flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-light-mainalt text-sm m-2 ml-0'
  const normalLink =
    'capitalize flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-sm text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-[#404040] m-2 ml-0'

  const handleSignOut = () => {
    logout()
  }

  useEffect(() => {
    render_count.current++
  })

  console.log(render_count.current)

  return (
    <aside
      className={`${className} inset-y-0 z-50 space-y-8 overflow-y-auto sm:z-0 sm:w-72 ${
        isOpen && width < 640
          ? 'w-screen'
          : 'w-0 -translate-x-full sm:translate-x-0'
      } bg-light-mainalt py-7 pl-6 pr-3 shadow-xl transition-transform dark:bg-dark-mainalt`}
    >
      <div className='flex justify-between'>
        <h1 className='flex items-center text-2xl font-bold tracking-widest truncate text-light-main'>
          <ReactComponent className='w-8 h-8 mr-1 fill-light-main' />
          ChitChat
        </h1>
        {width < 640 && (
          <button
            className='w-8 h-8 mr-1 text-light-textmuted dark:text-dark-textmuted'
            onClick={() => {
              setIsOpen(false)
            }}
          >
            <XIcon className='w-8' />
          </button>
        )}
        {/* <p className='flex items-center text-sm font-semibold'>
          The dev <ExternalLinkIcon className='w-4 h-4 ml-1' />
          put link to website here later
        </p> */}
      </div>

      <div className='relative flex items-center gap-5'>
        <img
          src={require('../assets/images/3.png')}
          alt=''
          className='w-12 h-12 rounded-full ring ring-light-main ring-offset-2 dark:ring-offset-dark-bg'
        />
        <div className='grid grid-cols-1'>
          <span className='italic text-light-textmuted dark:text-dark-textmuted'>
            Hi 👋🏼,
          </span>
          <h2 className='text-lg truncate text-light-text dark:text-dark-text'>
            {user.username}
          </h2>
        </div>
        <button
          className='absolute top-0 right-0 flex items-center justify-end space-x-1 text-sm dark-text-dark-textmuted text-light-textmuted'
          onClick={handleSignOut}
        >
          <p className='underline'>Log out</p>
          <span>
            <LogoutIcon className='w-4 h-4' />
          </span>
        </button>
      </div>

      <ul className='space-y-4'>
        {links.map((link) => (
          <div key={link.title}>
            <p className=' border-b pb-4 uppercase text-light-textmuted dark:border-[#404040] dark:text-dark-textmuted'>
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
        <p className='flex items-center gap-5 border-b pb-4 uppercase text-light-textmuted dark:border-[#404040] dark:text-dark-textmuted'>
          Settings
        </p>
        <div className='pl-4 space-y-2'>
          <p className='flex items-center gap-5 capitalize text-light-textmuted'>
            Theme mode
          </p>
          <ul className='space-y-4 text-light-text dark:text-dark-text'>
            <li>
              <button
                className='flex items-center gap-2'
                onClick={() => {
                  setDarkMode(false)
                }}
              >
                <SunIcon
                  className={`w-4 ${
                    !darkMode && 'dark:text-dark-main text-light-main'
                  }`}
                />
                <span>Light</span>
              </button>
            </li>
            <li>
              <button
                className='flex items-center gap-2'
                onClick={() => {
                  setDarkMode(true)
                }}
              >
                <MoonIcon
                  className={`w-4 ${
                    darkMode && 'dark:text-dark-main text-light-main'
                  }`}
                />
                <span>Dark</span>
              </button>
            </li>
          </ul>
        </div>
        <div className='pl-4 space-y-2'>
          <p className='flex items-center gap-5 capitalize text-light-textmuted'>
            Theme color
          </p>
          <ul className='flex gap-2'>
            {themes.map((themeItem) => (
              <li key={themeItem.name}>
                <button
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${themeItem.value}`}
                  onClick={() => {
                    setTheme(themeItem.name)
                  }}
                >
                  {theme === themeItem.name && (
                    <CheckIcon className='w-6 text-white' />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
})

export default Sidebar
