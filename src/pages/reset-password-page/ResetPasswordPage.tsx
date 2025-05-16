
import { ChangeEvent, MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { FormControlModalLogin } from '../../components/form-control-modal-login/FormControlModalLogin'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { AuthCredentialsLoginDTO } from '../../domain/User'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'
import { BkgButton } from './ResetPasswordPageStyle'
import './ResetPasswordPage.css'

export const ResetPasswordPage = () => {

  const [userLogin, setUserLogin] = useState({ username: '', password: '' })
  const [errorActive, setErrorActive] = useState(false)
  const navigate = useNavigate()


  const handleUsername = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const authCredentialsLoginDTO: AuthCredentialsLoginDTO = {
      username: e.target.value,
      password: userLogin.password
    }
    setUserLogin(authCredentialsLoginDTO)
  }

  const handleErrorReset = () => {
    if(AuthServiceManager.getIntance().existUser(userLogin)) {
      navigate('/auth/valid-change')
    } else {
      SnackbarUtilities.error('El usuario ingresado no existe!')
    }
  }

  const handleReset = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    if(!userLogin.username) {
      setErrorActive(true)
    } else {
      setErrorActive(false)
      handleErrorReset()
    }
  }

  return (
    <main className="auth__main">
      <div className="login">
        <h1 className="main__title">Cambiar Contraseña</h1>
        <form className="login__form">
          <label className="auth__text">Ingrese su nombre de usuario para continuar.</label>
          <FormControlModalLogin
            isActive={ true } errorActive={ errorActive } label={ 'Usuario' } type={ 'text' }
            defaultValue={ '' } labelColor={ 'primary' } handleInputChanges={ handleUsername }
          />
          <Button sx={ BkgButton } onClick={ handleReset }>Validar usuario</Button>
        </form>
      </div>
    </main>
  )
}