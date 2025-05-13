import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import '../profile-menu/Profile-menu.css'
import { User } from '../../domain/User'
import { useRef, useState } from 'react'
import { PhotoCamera } from '@mui/icons-material'
import { PetOwner } from '../../domain/PetOwner'
import { Vet } from '../../domain/Vet'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import PetOwnerServiceManager from '../../services/pet-owner-service/PetOwnerServiceManager'
import VetServiceManager from '../../services/vet-service/VetServiceManager'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'

interface Props {
  user: User
  onPhotoChange: (newPhoto: string) => void
}

export const ProfileMenu = ({ user, onPhotoChange }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedFile(null)
    setPreviewUrl(null)
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
      const newPhotoUrl = URL.createObjectURL(selectedFile)

      const updatedUser = Object.assign(
        Object.create(Object.getPrototypeOf(user)),
        { ...user, photo: newPhotoUrl },
      )

      if (AuthServiceManager.getIntance().isVet()) {
        await VetServiceManager.getInstance().update(updatedUser as Vet)
      } else {
        await PetOwnerServiceManager.getInstance().update(
          updatedUser as PetOwner,
        )
      }
      onPhotoChange(newPhotoUrl)
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
    <>
      <Box sx={{ position: 'relative', width: 'fit-content' }}>
        <Avatar
          alt="Foto de perfil"
          src={user.photo}
          sx={{
            width: 200,
            height: 200,
          }}
        />
        <IconButton
          onClick={handleOpenModal}
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: 'var(--footer-color)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'var(--primary-color)',
            },
          }}
        >
          <PhotoCamera fontSize="small" />
        </IconButton>
      </Box>

      <ul className="menu__ul">
        <Link className="menu__ul--link" to="/profile">
          Perfil
        </Link>
        <Link className="menu__ul--link" to="/pets">
          {user.typeOfUser === 'petOwner' ? 'Mis mascotas' : 'Mis pacientes'}
        </Link>
        <Link className="menu__ul--link" to="/medical-shift">
          Turnos
        </Link>
      </ul>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            backgroundColor: 'var(--header-color)',
            padding: 4,
            borderRadius: 3,
            width: '90%',
            maxWidth: 400,
            mx: 'auto',
            my: '10%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Typography variant="h6" sx={{ color: 'var(--font-color)' }}>
            Cambiar Foto de Perfil
          </Typography>

          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Vista previa"
              style={{
                width: 200,
                height: 200,
                objectFit: 'cover',
                borderRadius: '50%',
                border: '3px solid var(--footer-color)',
              }}
            />
          ) : (
            <Avatar
              src={user.photo}
              sx={{
                width: 200,
                height: 200,
                border: '3px solid var(--footer-color)',
              }}
            />
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
            sx={{
              backgroundColor: 'var(--primary-color)',
              color: 'var(--font-color)',
              '&:hover': { backgroundColor: 'var(--footer-color)' },
              width: '100%',
            }}
          >
            Seleccionar Foto
          </Button>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Button
              variant="outlined"
              onClick={handleCloseModal}
              sx={{
                borderColor: 'var(--footer-color)',
                color: 'var(--font-color)',
                width: '48%',
                '&:hover': { borderColor: 'var(--primary-color)' },
              }}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              onClick={handleSavePhoto}
              disabled={!selectedFile || isUploading}
              sx={{
                backgroundColor: 'var(--primary-color)',
                color: 'var(--font-color)',
                width: '48%',
                '&:hover': { backgroundColor: 'var(--footer-color)' },
              }}
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
