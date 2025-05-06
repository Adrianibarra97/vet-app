import { Navigate, Outlet } from 'react-router-dom'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'

export const ProtectedRoutes = async () => {
  if(await AuthServiceManager.getIntance().isAuthorized()) {
    return <Outlet />
  }
  return <Navigate to = {'/auth/login'} />
}