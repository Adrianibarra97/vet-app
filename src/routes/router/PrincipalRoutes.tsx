import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoutes } from '../guards/ProtectedRoutes'
import { MainLayout } from '../../layouts/main/MainLayout'
import { ProfilePage } from '../../pages/profile-page/ProfilePage'
import { PetPage } from '../../pages/pet-page/PetPage'
import { MedicalShiftPage } from '../../pages/medical-shift-page/MedicalShiftPage'
import { ErrorPage } from '../../pages/error-page/ErrorPage'
import { AuthLayout } from '../../layouts/auth/AuthLayout'
import { LoginPage } from '../../pages/login-page/LoginPage'
import { PetDetail } from '../../pages/pet-detail-page/PetDetailPage'
import { ResetPasswordPage } from '../../pages/reset-password-page/ResetPasswordPage'
import { CreateUserPage } from '../../pages/create-user-page/CreateUserPage'
import { ChangePasswordPage } from '../../pages/change-password-page/ChangePasswordPage'
import { ValidChangePage } from '../../pages/valid-change-page/ValidChangePage'
import { ProfileLayout } from '../../layouts/profile/ProfileLayout'
import { NotificationsPage } from '../../components/notification/NotificationsPage'

export const PrincipalRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/auth" element = { <AuthLayout /> }>
          <Route path = "login" element = { <LoginPage /> }/>
          <Route path = "reset-password" element = { <ResetPasswordPage /> }/>
          <Route path = "valid-change" element = { <ValidChangePage/> }/>
          <Route path = "change-password" element = { <ChangePasswordPage /> }/>
          {/* <Route path = "create-user" element = { <CreateUserPage /> }/> */}
        </Route>
        <Route element = { <ProtectedRoutes /> }>
          <Route path = "/" element = { <MainLayout /> } >
            <Route path="profile" element={<ProfileLayout />}>
              <Route index element={<ProfilePage />} />
              <Route path="notifications" element={<NotificationsPage />} />
            </Route>
            <Route path = "pets" element = { <PetPage /> } />
            <Route path = 'pet-detail/:petID' element = {<PetDetail/>}/>
            <Route path = "medical-shift" element = { <MedicalShiftPage /> } />
            <Route path = "*" element = { <ErrorPage /> } />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}