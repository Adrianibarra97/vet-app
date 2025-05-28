import { useState } from 'react'
import { Avatar, Button, FormControl } from '@mui/material'
import { ImageModalPetOwner } from '../image-modal-petowner/ImageModalPetOwner'
import { PetOwner } from '../../domain/PetOwner'
import { avatar, formControl, formControlNone, iconButton } from './FormControlModalImagePetOwnerStyle'

interface FromControlModalProps {
  isActive: boolean
  petOwner: PetOwner
  onPhotoChange: (newPhoto: string) => void
}

export const FormControlModalImagePetOwner = (formControlProps: FromControlModalProps) => {

  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <FormControl sx={ formControlProps.isActive ? formControl : formControlNone }>
        <Avatar alt="Mascota" src={ formControlProps.petOwner.photo } sx={ avatar }/>
        <Button sx={ iconButton } onClick={ () => setOpenModal(true) }>
          { formControlProps.petOwner.photo ? 'Cambiar' : 'Ingresar' }
        </Button>
      </FormControl>
      <ImageModalPetOwner
        open={ openModal } onPhotoChange={ formControlProps.onPhotoChange }
        onClose={ () => setOpenModal(false) } user={ formControlProps.petOwner }
      />
    </>
  )
}