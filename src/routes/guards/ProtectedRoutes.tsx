import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const ProtectedRoutes = () => {

  const { isAuthorized } = useAuth()

  if(isAuthorized) {
    return <Outlet />
  }
  return <Navigate to="/auth/login" />
}