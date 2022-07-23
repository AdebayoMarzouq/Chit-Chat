import { Navigate } from 'react-router-dom'
import { useStoreState } from 'easy-peasy'

export const ProtectedRoute = ({ redirectPath = '/login', children }) => {
  const user = useStoreState((state) => state.user)
  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}
