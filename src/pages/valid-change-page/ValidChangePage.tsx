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

  return (
    <main className="auth__main">
      <div className="login">
        <h1 className="main__title">Validación</h1>
        <form className="login__form">
          <label className="auth__text">Ingrese el código que le enviamos por correo para continuar.</label>
          <Box sx={ modalItem }>
            <FormControlModal
              isActive={ true } errorActive={ errorActive } label={ 'Código de validación' }
              type={ 'text' } defaultValue={ '' } labelColor={ 'success' }
              handleInputChanges={ (e) => setCode(e.toString()) }
            />
          </Box>
          <Box sx={ buttonContent }>
            <ButtonsModal
              confirLabel={ 'Validar Código' } cancelLabel={ 'Cancelar' }
              confirm={ () => navigate('/auth/login') }
              cancel={ () => handleValidation() } 
            />
          </Box>
        </form>
      </div>
    </main>
  )
}