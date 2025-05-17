import { Box, Button } from '@mui/material'
import {
  buttonContainer, BkgConfirmButton, BkgCancelButton
} from './ButtonsModalStyle'

interface ButtonsModalProps {
  confirm: () => void,
  cancel: () => void
}

export const ButtonsModal = (buttonsProp: ButtonsModalProps) => {
  return (
    <Box sx={ buttonContainer }>
      <Button variant="contained" sx={ BkgCancelButton } onClick={ () => buttonsProp.cancel() }>Cancelar</Button>
      <Button variant="contained" sx={ BkgConfirmButton } onClick={ () => buttonsProp.confirm() }>Confirmar</Button>
    </Box>
  )
}