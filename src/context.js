import React from 'react'
import { useMyAuthState } from './firebase/firebaseUtils'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [user, loading, error] = useMyAuthState()

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => React.useContext(UserContext)
