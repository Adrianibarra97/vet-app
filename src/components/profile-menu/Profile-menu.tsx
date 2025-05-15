// src/components/profile-menu/ProfileMenu.tsx
import { Avatar, Box, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { PhotoCamera } from '@mui/icons-material'
import { User } from '../../domain/User'
import { ProfilePhotoModal } from '../profile-photo-modal/ProfilePhotoModal'
import { iconButtonStyle } from '../profile-photo-modal/ProfilePhotoModalStyle'
import './Profile-menu.css'
import { avatarMenuStyle } from './ProfileMenuStyle'

interface Props {
  user: User
  onPhotoChange: (newPhoto: string) => void
}

export const ProfileMenu = ({ user, onPhotoChange }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  return (
    <>
      <Box sx={{ position: 'relative', width: 'fit-content' }}>
        <Avatar alt="Foto de perfil" src={user.photo} sx={avatarMenuStyle} />
        <IconButton onClick={handleOpenModal} sx={iconButtonStyle}>
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

      <ProfilePhotoModal
        user={user}
        open={openModal}
        onClose={handleCloseModal}
        onPhotoChange={onPhotoChange}
      />
    </>
  )
}
