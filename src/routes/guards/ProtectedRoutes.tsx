import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoutes = () => {

  const isAuthorized = false

  if(isAuthorized) {
    return <Outlet />
  }
  return <Navigate to = {'/auth/login'} />
}