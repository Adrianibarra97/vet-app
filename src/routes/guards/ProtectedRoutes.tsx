import { Navigate, Outlet } from 'react-router-dom'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'

export const ProtectedRoutes = () => {
  const value: boolean = AuthServiceManager.getIntance().isAuthorized()
  if(value) {
    return <Outlet />
  }
  return <Navigate to = {'/auth/login'} />
}