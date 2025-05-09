import { Modal, Box, Button, Typography } from '@mui/material'
import { 
  BkgCancelButton, BkgConfirmButton, buttonContainer, modal, modalItem,
  textContainer
} from './ConfirmModalStyle'

interface ConfirmModalProps {
  open: boolean,
  text: string,
  onClose: () => void,
  handleDelete: () => void
}

export const ConfirmModal = (confirmModalProp: ConfirmModalProps) => {
  return (
    <Modal open={ confirmModalProp.open } onClose={ confirmModalProp.onClose } sx={ modal }>
      <Box sx={ modalItem }>
        <Typography sx={ textContainer }>{ confirmModalProp.text }</Typography>
        <Box sx={ buttonContainer }>
          <Button
            variant="contained"
            sx={ BkgCancelButton }
            onClick={ () => confirmModalProp.onClose() }
          >Cancelar</Button>
          <Button
            variant="contained"
            sx={ BkgConfirmButton }
            onClick={ () => confirmModalProp.handleDelete() }
          >Confirmar</Button>
        </Box>
      </Box>
    </Modal>
  )
}