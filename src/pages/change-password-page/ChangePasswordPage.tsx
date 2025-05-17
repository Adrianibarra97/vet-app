import { MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'
import { BkgButton } from './ChangePasswordPageStyle'
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

  const handleChangePassword = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    if(AuthServiceManager.getIntance().validNewPassword(password, confirmPassword)) {
      setErrorActive(true)
    } else {
      setErrorActive(false)
      confirmChangePassword()
    }
  }

  return (
    <main className="auth__main">
      <div className="login">
        <h1 className="main__title">Cambiar Contraseña</h1>
        <form className="login__form">
          <label className={ errorActive ? "auth__text" : "auth__text--none" }>Las contraseñas no coninciden!</label>
          {/* <FormControlModalLogin
            isActive={ true } errorActive={ errorActive } label={ 'Nueva Contraseña' } type={ 'password' }
            defaultValue={ '' } labelColor={ 'primary' } handleInputChanges={ (e) => setPassword(e.target.value) }
          />
          <FormControlModalLogin
            isActive={ true } errorActive={ errorActive } label={ 'Confirmar Contraseña' } type={ 'password' }
            defaultValue={ '' } labelColor={ 'primary' } handleInputChanges={ (e) => setConfirmPassword(e.target.value) }
          /> */}
          <Button sx={ BkgButton } onClick={ handleChangePassword }>Cambiar</Button>
        </form>
      </div>
    </main>
  )
}