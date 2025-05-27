import { useRef, useState } from 'react'
import { Avatar, Box, Button, Modal, Typography } from '@mui/material'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'
import VetServiceManager from '../../services/vet-service/VetServiceManager'
import { Vet } from '../../domain/Vet'
import { avatar, buttonContainer, buttonImage, cancelButton, modal, saveButton, title } from './ImageModalVetStyle'
import './ImageModalVet.css'

interface ImageModalProps {
  open: boolean
  user: Vet
  onClose: () => void
  onPhotoChange: (newPhoto: string) => void
}

export const ImageModalVet = (imageProps: ImageModalProps) => {

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
      const updatedPet: Vet = Object.assign(
        Object.create(
          Object.getPrototypeOf(imageProps.user)),
          { ...imageProps.user, photo: newPhotoUrl },
        )

      VetServiceManager.getInstance().update(updatedPet as Vet)
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
          : (<Avatar src={ imageProps.user.photo } sx={ avatar }/>)
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