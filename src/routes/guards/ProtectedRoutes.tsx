import { Navigate, Outlet } from 'react-router-dom'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'

const isAuthorizedFetch = () => {
  const value = AuthServiceManager.getIntance().isAuthorized()
  return value
}

export const ProtectedRoutes = () => {
  const value: boolean = isAuthorizedFetch()
  if(value) {
    return <Outlet />
  }
  return <Navigate to = {'/auth/login'} />
}