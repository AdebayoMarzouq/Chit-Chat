import React, { useState } from 'react'
import { toast, ToastContainer, Zoom } from 'react-toastify'

import { useWindowDimensions } from './utils'
import { useMyAuthState } from './firebase/firebaseUtils'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, loading, error] = useMyAuthState()
  const { width } = useWindowDimensions()

  function notify(type = toast, msg, time = 2000) {
    /*function that creates a notification using react-toastify library*/
    type(msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: time,
      className: 'rounded-0 bg-light-toasttint',
      bodyClassName: 'text-light-text',
    })
  }

  return (
    <UserContext.Provider
      value={{ width, isOpen, setIsOpen, notify, user, loading, error }}
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
