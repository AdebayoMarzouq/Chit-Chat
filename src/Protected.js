import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'
import { auth } from './firebase/firebase'

export const ProtectedRoute = ({ redirectPath = '/login', children }) => {
  const [user, loading, error] = useAuthState(auth)
  console.log(user)

  if (error) return <p>auth error!!</p>
  if (loading) return <p>auth loading ...</p>
  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}
