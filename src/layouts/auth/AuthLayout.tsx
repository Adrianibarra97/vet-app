import { Outlet } from 'react-router-dom'
import { Footer } from '../../components/footer/Footer'

import '../../css/index.css'

export const AuthLayout = () => {
  return (
    <>
      <Outlet />
			<Footer />
    </>
  )
}