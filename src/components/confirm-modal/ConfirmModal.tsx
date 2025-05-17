import { Modal, Box, Typography } from '@mui/material'
import { buttonContent, modal, modalItem, textContainer } from './ConfirmModalStyle'
import { ButtonsModal } from '../buttons-modal/ButtonsModal'

interface ConfirmModalProps {
  open: boolean
  text: string
  onClose: () => void
  handleDelete: () => void
}

export const ConfirmModal = (confirmModalProp: ConfirmModalProps) => {
  return (
    <Modal open={ confirmModalProp.open } onClose={ confirmModalProp.onClose } sx={ modal }>
      <Box sx={ modalItem }>
        <Typography sx={ textContainer }>{ confirmModalProp.text }</Typography>
        <Box sx={ buttonContent }>
          <ButtonsModal
            confirLabel={ 'Confirmar' } cancelLabel={ 'Cancelar' }
            confirm={ () => confirmModalProp.handleDelete() }
            cancel={ () => confirmModalProp.onClose() }
          />
        </Box>
      </Box>
    </Modal>
  )
}