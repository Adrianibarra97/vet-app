import { useState } from 'react'
import { Pet } from '../../domain/Pet'
import { Avatar, Button, FormControl } from '@mui/material'
import { avatar, formControl, formControlNone, iconButton } from './FormControlModalImageStyle'
import { ImageModal } from '../image-modal/ImageModal'

interface FromControlModalProps {
  isActive: boolean
  pet: Pet
  onPhotoChange: (newPhoto: string) => void
}

export const FormControlModalImage = (formControlProps: FromControlModalProps) => {

  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <FormControl sx={ formControlProps.isActive ? formControl : formControlNone }>
        <Avatar alt="Mascota" src={ formControlProps.pet.photo } sx={ avatar }/>
        <Button sx={ iconButton } onClick={ () => setOpenModal(true) }>Cambiar</Button>
      </FormControl>
      <ImageModal
        open={ openModal } onPhotoChange={ formControlProps.onPhotoChange }
        onClose={ () => setOpenModal(false) } pet={ formControlProps.pet }
      />
    </>
  )
}