import { useRef, useState } from 'react'
import { Pet } from '../../domain/Pet'
import { Avatar, Box, Button, Modal, Typography } from '@mui/material'
import { avatar, buttonContainer, buttonImage, cancelButton, modal, saveButton, title } from './ImageModalStyle'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'
import PetServiceManager from '../../services/pet-service/PetServiceManager'

interface ImageModalProps {
  open: boolean
  pet: Pet
  onClose: () => void
  onPhotoChange: (newPhoto: string) => void
}

export const ImageModal = (imageProps: ImageModalProps) => {

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCloseModal = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    imageProps.onClose()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSavePhoto = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    try {
      const newPhotoUrl: string = URL.createObjectURL(selectedFile)
      const updatedPet: Pet = Object.assign(
        Object.create(
          Object.getPrototypeOf(imageProps.pet)),
          { ...imageProps.pet, photo: newPhotoUrl },
        )

      PetServiceManager.getIntance().update(updatedPet as Pet)
      imageProps.onPhotoChange(newPhotoUrl)
      SnackbarUtilities.succes('Foto de perfil actualizada correctamente')
      handleCloseModal()
    } catch (error) {
      console.error('Error updating profile photo:', error)
      SnackbarUtilities.error('Error al actualizar la foto de perfil')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Modal open={ imageProps.open } onClose={ handleCloseModal }>
      <Box sx={ modal }>
        <Typography variant="h6" sx={ title }>Foto Mascota</Typography>
        {previewUrl 
          ? (<img className="image" src={ previewUrl } alt="Vista previa"/>)
          : (<Avatar src={ imageProps.pet.photo } sx={ avatar }/>)
        }
        <input className="input--image"
          type="file" accept="image/*"
          ref={ fileInputRef } onChange={ handleFileChange }
        />
        <Button
          variant="contained" disabled={ isUploading }
          sx={ buttonImage } onClick={() => fileInputRef.current?.click() } 
        >Seleccionar Foto</Button>
        <Box sx={ buttonContainer }>
          <Button variant="outlined" onClick={ handleCloseModal } sx={ cancelButton }>Cancelar</Button>
          <Button
            variant="contained" onClick={ handleSavePhoto }
            disabled={ !selectedFile || isUploading } sx={ saveButton }
          >Guardar</Button>
        </Box>
      </Box>
    </Modal>
  )
}