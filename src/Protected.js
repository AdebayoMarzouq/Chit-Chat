import { useAppContext } from './context'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const ProtectedRoute = ({ user, redirectPath = '/login', children }) => {
  const { errorNotify } = useAppContext()
  if (!user.userID) {
    // errorNotify(
    //   toast.warning,
    //   'Cannot access this route, you are not logged in'
    // )
    return <Navigate to={redirectPath} replace />
  }

  return children
}
