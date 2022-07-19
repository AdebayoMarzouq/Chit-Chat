import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ user, redirectPath = '/login', children }) => {
  if (!user.userID) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}
