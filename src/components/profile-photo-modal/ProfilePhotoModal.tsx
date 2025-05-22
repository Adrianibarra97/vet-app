// src/components/profile-photo-modal/ProfilePhotoModal.tsx

import {
  Avatar,
  Box,
  Button,
  Modal,
  Typography,
} from '@mui/material'
import { useRef, useState } from 'react'
import { User } from '../../domain/User'
import { PetOwner } from '../../domain/PetOwner'
import { Vet } from '../../domain/Vet'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import PetOwnerServiceManager from '../../services/pet-owner-service/PetOwnerServiceManager'
import VetServiceManager from '../../services/vet-service/VetServiceManager'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'
import { useUser } from '../../context/UserContext'
import {
  avatarStyle,
  modalStyle,
  previewImage,
  inputButtonStyle,
  buttonGroup,
  outlinedButton,
  containedButton
} from './ProfilePhotoModalStyle'

interface Props {
  user: User
  open: boolean
  onClose: () => void
  onPhotoChange: (newPhoto: string) => void
}

export const ProfilePhotoModal = ({ user, open, onClose, onPhotoChange }: Props) => {

  const { updateUser } = useUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
      const newPhotoUrl = URL.createObjectURL(selectedFile)
      const updatedUser = Object.assign(
        Object.create(Object.getPrototypeOf(user)),
        { ...user, photo: newPhotoUrl }
      )
      updateUser(updatedUser)
      if (AuthServiceManager.getIntance().isVet()) {
        await VetServiceManager.getInstance().update(updatedUser as Vet)
      } else {
        await PetOwnerServiceManager.getInstance().update(updatedUser as PetOwner)
      }
      onPhotoChange(newPhotoUrl)
      SnackbarUtilities.succes('Foto de perfil actualizada correctamente')
      onClose()
    } catch (error) {
      console.error('Error updating profile photo:', error)
      SnackbarUtilities.error('Error al actualizar la foto de perfil')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" sx={{color:'var(--footer-color)', fontWeight:'bold'}}>
          Cambiar Foto de Perfil
        </Typography>

        {previewUrl ? (
        <img  src={previewUrl}  alt="Vista previa"  style={previewImage as React.CSSProperties}/>
        ) : (
          <Avatar src={user.photo} sx={avatarStyle} />
        )}

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        <Button
          variant="contained"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          sx={inputButtonStyle}
        >
          Seleccionar Foto
        </Button>

        <Box sx={buttonGroup}>
          <Button variant="outlined" onClick={onClose} sx={outlinedButton}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSavePhoto}
            disabled={!selectedFile || isUploading}
            sx={containedButton}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
