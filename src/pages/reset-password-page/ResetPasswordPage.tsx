
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { FormControlModal } from '../../components/form-control-modal/FormControlModal'
import { ButtonsModal } from '../../components/buttons-modal/ButtonsModal'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { AuthCredentialsLoginDTO } from '../../domain/User'
import { buttonContent, modalItem } from './ResetPasswordPageStyle'
import './ResetPasswordPage.css'

export const ResetPasswordPage = () => {

  const [userLogin, setUserLogin] = useState({ username: '', password: '' })
  const [errorActive, setErrorActive] = useState(false)
  const navigate = useNavigate()

  const handleUsername = (value: string) => {
    const authCredentialsLoginDTO: AuthCredentialsLoginDTO = {
      username: value,
      password: userLogin.password
    }
    setUserLogin(authCredentialsLoginDTO)
  }

  const handleErrorReset = () => {
    const exisUser: boolean = AuthServiceManager.getIntance().existUser(userLogin)
    if(exisUser) {
      navigate('/auth/valid-change')
    } else {
      SnackbarUtilities.error('El usuario ingresado no existe!')
    }
  }

  const handleReset = () => {
    if(!userLogin.username) {
      setErrorActive(true)
    } else {
      setErrorActive(false)
      handleErrorReset()
    }
  }

  const handleCancel = () => {
    AuthServiceManager.getIntance().cancelResetPassword()
    navigate('/auth/login')
  }

  return (
    <main className="auth__reset">
      <div className="login--reset">
        <h1 className="main__title--reset">Cambiar Contraseña</h1>
        <form className="login__form--reset">
          <label className="auth__text--reset">Ingrese su nombre de usuario para continuar.</label>
          <Box sx={ modalItem }>
            <FormControlModal
              isActive={ true } errorActive={ errorActive } label={ 'Usuario' }
              type={ 'text' } defaultValue={ '' } labelColor={ 'success' }
              handleInputChanges={ (e) => handleUsername(e.toString()) }
            />
          </Box>
          <Box sx={ buttonContent }>
            <ButtonsModal
              confirLabel={ 'Validar' } cancelLabel={ 'Cancelar' }
              confirm={ () => handleReset() }
              cancel={ () => handleCancel() }
            />
          </Box>
        </form>
      </div>
    </main>
  )
}