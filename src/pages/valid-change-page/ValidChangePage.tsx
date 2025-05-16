import { MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { FormControlModalLogin } from '../../components/form-control-modal-login/FormControlModalLogin'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'
import { BkgButton } from './ValidChangePageStyle'
import './ValidChangePage.css'

export const ValidChangePage = () => {

  const [code, setCode] = useState('')
  const [errorActive, setErrorActive] = useState(false)
  const navigate = useNavigate()

  const confirmValidation = async () => {
    if(await AuthServiceManager.getIntance().validCode(code)) {
      navigate('/auth/change-password')
    } else {
      SnackbarUtilities.error('El código ingresado no es válido!')
    }
  }

  const handleValidation= (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    if(!code) {
      setErrorActive(true)
    } else {
      setErrorActive(false)
      confirmValidation()
    }
  }

  return (
    <main className="auth__main">
      <div className="login">
        <h1 className="main__title">Validación</h1>
        <form className="login__form">
          <label className="auth__text">Ingrese el código que le enviamos por correo para continuar.</label>
          <FormControlModalLogin
            isActive={ true } errorActive={ errorActive } label={ 'Código de validación' } type={ 'text' }
            defaultValue={ '' } labelColor={ 'primary' } handleInputChanges={ (e) => setCode(e.target.value) }
          />
          <Button sx={ BkgButton } onClick={ handleValidation }>Validar Código</Button>
        </form>
      </div>
    </main>
  )
}