import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { FormControlModal } from '../../components/form-control-modal/FormControlModal'
import { ButtonsModal } from '../../components/buttons-modal/ButtonsModal'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { buttonContent, modalItem, modalItemText } from './ChangePasswordPageStyle'
import './ChangePasswordPage.css'

export const ChangePasswordPage = () => {

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorActive, setErrorActive] = useState(false)
  const navigate = useNavigate()

  const confirmChangePassword = () => {
    try {
      AuthServiceManager.getIntance().changePassword(password)
      SnackbarUtilities.succes('La contraseña se actualizo correctamente!')
      navigate('/auth/login')
    } catch {
      SnackbarUtilities.error('Ocurrió un error al actualizar la contraseña!')
      navigate('/auth/login')
    }
  }

  const handleChangePassword = () => {
    if(AuthServiceManager.getIntance().validNewPassword(password, confirmPassword)) {
      setErrorActive(true)
    } else {
      setErrorActive(false)
      confirmChangePassword()
    }
  }

  const handleCancel = () => {
    AuthServiceManager.getIntance().cancelResetPassword()
    navigate('/auth/login')
  }

  return (
    <main className="auth__change">
      <div className="login--change">
        <h1 className="main__title--change">Cambiar Contraseña</h1>
        <form className="login__form--change">
          <Box sx={ modalItemText }>
            <label className={ errorActive ? 'auth__text--change' : 'auth__text--none' }>Las contraseñas no coninciden!</label>
          </Box>
          <Box sx={ modalItem }>
            <FormControlModal
              isActive={ true } errorActive={ errorActive } label={ 'Nueva Contraseña' }
              type={ 'password' } defaultValue={ '' } labelColor={ 'success' }
              handleInputChanges={ (e) => setPassword(e.toString()) }
            />
          </Box>
          <Box sx={ modalItem }>
            <FormControlModal
              isActive={ true } errorActive={ errorActive } label={ 'Confirmar Contraseña' }
              type={ 'password' } defaultValue={ '' } labelColor={ 'success' }
              handleInputChanges={ (e) => setConfirmPassword(e.toString()) }
            />
          </Box>
          <Box sx={ buttonContent }>
            <ButtonsModal
              confirLabel={ 'Cambiar' } cancelLabel={ 'Cancelar' }
              confirm={ () => handleChangePassword() } cancel={ () => handleCancel() }
            />
          </Box>
        </form>
      </div>
    </main>
  )
}