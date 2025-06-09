import { Box, Button } from '@mui/material'
import { buttonContainer, BkgButton } from './ButtonsModalStyle'

interface ButtonsModalProps {
  confirLabel: string
  cancelLabel: string
  confirm: (e: unknown) => void,
  cancel: (e: unknown) => void
}

export const ButtonsModal = (buttonsProp: ButtonsModalProps) => {
  return (
    <Box sx={ buttonContainer }>
      <Button
        data-testid="cancel"
        variant="contained" sx={ BkgButton }
        onClick={ (e) => buttonsProp.cancel(e) }
      >{ buttonsProp.cancelLabel }</Button>
      <Button
        variant="contained" sx={ BkgButton }
        onClick={ (e) => buttonsProp.confirm(e) }
      >{ buttonsProp.confirLabel }</Button>
    </Box>
  )
}