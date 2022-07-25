import React from 'react'
import { toast, ToastContainer, Zoom } from 'react-toastify'

import { useMyAuthState } from './firebase/firebaseUtils'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [user, loading, error] = useMyAuthState()

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
    <UserContext.Provider value={{ notify, user, loading, error }}>
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
