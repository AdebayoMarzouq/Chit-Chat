import React, { useState, useEffect } from 'react'
import { toast, ToastContainer, Zoom } from 'react-toastify'

import { useWindowDimensions } from './utils'
import { useMyAuthState } from './firebase/firebaseUtils'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)
  const [theme, setTheme] = useState('theme-cyan')
  const [isOpen, setIsOpen] = useState(false)
  const [user, loading, error] = useMyAuthState()
  const { width } = useWindowDimensions()

  function notify(
    type = toast,
    msg,
    time = 2000,
    color = 'bg-light-toasttint'
  ) {
    /*function that creates a notification using react-toastify library*/
    type(msg, {
      position:
        width < 640 ? toast.POSITION.TOP_CENTER : toast.POSITION.TOP_RIGHT,
      autoClose: time,
      className: `rounded-0 ${color}`,
      bodyClassName: 'text-light-text',
    })
  }

  const closeNav = () => setIsOpen(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <UserContext.Provider
      value={{
        theme,
        setTheme,
        darkMode,
        setDarkMode,
        closeNav,
        width,
        isOpen,
        setIsOpen,
        notify,
        user,
        loading,
        error,
      }}
    >
      <>
        {children}
        <ToastContainer
          className='bg-transparent'
          autoClose={2000}
          hideProgressBar
          limit={1}
          transition={Zoom}
          draggablePercent={60}
        />
      </>
    </UserContext.Provider>
  )
}

export const useUserContext = () => React.useContext(UserContext)
