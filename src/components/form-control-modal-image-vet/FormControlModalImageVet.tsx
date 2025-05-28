import { useState } from 'react'
import { Avatar, Button, FormControl } from '@mui/material'
import { ImageModalVet } from '../image-modal-vet/ImageModalVet'
import { Vet } from '../../domain/Vet'
import { avatar, formControl, formControlNone, iconButton } from './FormControlModalImageVetStyle'


interface FromControlModalProps {
  isActive: boolean
  vet: Vet
  onPhotoChange: (newPhoto: string) => void
}

export const FormControlModalImageVet = (formControlProps: FromControlModalProps) => {

  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <FormControl sx={ formControlProps.isActive ? formControl : formControlNone }>
        <Avatar alt="Mascota" src={ formControlProps.vet.photo } sx={ avatar }/>
        <Button sx={ iconButton } onClick={ () => setOpenModal(true) }>
          { formControlProps.vet.photo ? 'Cambiar' : 'Ingresar' }
        </Button>
      </FormControl>
      <ImageModalVet
        open={ openModal } onPhotoChange={ formControlProps.onPhotoChange }
        onClose={ () => setOpenModal(false) } user={ formControlProps.vet }
      />
    </>
  )
}