import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { FormControlModal } from '../../components/form-control-modal/FormControlModal'
import { ButtonsModal } from '../../components/buttons-modal/ButtonsModal'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { buttonContent, modalItem } from './ValidChangePageStyle'
import './ValidChangePage.css'

export const ValidChangePage = () => {

  const [code, setCode] = useState<string>('')
  const [errorActive, setErrorActive] = useState(false)
  const navigate = useNavigate()

  const confirmValidation = async () => {
    if(await AuthServiceManager.getIntance().validCode(code)) {
      navigate('/auth/change-password')
    } else {
      SnackbarUtilities.error('El código ingresado no es válido!')
    }
  }

  const handleValidation= () => {
    if(!code) {
      setErrorActive(true)
    } else {
      setErrorActive(false)
      confirmValidation()
    }
  }

  const handleCancel = () => {
    AuthServiceManager.getIntance().cancelResetPassword()
    navigate('/auth/login')
  }

  return (
    <main className="auth__valid">
      <div className="login--valid">
        <h1 className="main__title--valid">Validación</h1>
        <form className="login__form--valid">
          <label className="auth__text--valid">Ingrese el código que le enviamos por correo para continuar.</label>
          <Box sx={ modalItem }>
            <FormControlModal errorHelper=''
              isActive={ true } errorActive={ errorActive } label={ 'Código de validación' }
              type={ 'text' } defaultValue={ '' } labelColor={ 'success' }
              handleInputChanges={ (e) => setCode(e.toString()) }
            />
          </Box>
          <Box sx={ buttonContent }>
            <ButtonsModal
              confirLabel={ 'Validar' } cancelLabel={ 'Cancelar' }
              confirm={ () => handleValidation() }
              cancel={ () => handleCancel() } 
            />
          </Box>
        </form>
      </div>
    </main>
  )
}