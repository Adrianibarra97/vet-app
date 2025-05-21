// src/components/profile-photo-modal/ProfilePhotoModalStyle.ts

export const avatarStyle = {
  width: 200,
  height: 200,
}

export const modalStyle = {
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
}

export const modalTitle = {
  color: 'var(--font-color)',
}

export const previewImage = {
  width: 200,
  height: 200,
  objectFit: 'cover',
  borderRadius: '50%',
  border: '3px solid var(--footer-color)',
}

export const inputButtonStyle = {
  backgroundColor: 'var(--primary-color)',
  color: 'var(--font-color)',
  '&:hover': { backgroundColor: 'var(--footer-color)' },
  width: '100%',
}

export const buttonGroup = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
}

export const outlinedButton = {
  borderColor: 'var(--footer-color)',
  color: 'var(--font-color)',
  width: '48%',
  '&:hover': { borderColor: 'var(--primary-color)' },
}

export const containedButton = {
  backgroundColor: 'var(--primary-color)',
  color: 'var(--font-color)',
  width: '48%',
  '&:hover': { backgroundColor: 'var(--footer-color)' },
}


export const iconButtonStyle = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: 'var(--footer-color)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'var(--primary-color)',
  },
}
