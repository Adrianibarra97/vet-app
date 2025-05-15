export const modal = {
  backgroundColor: 'var(--header-color)',
  padding: 4,
  borderRadius: 3,
  width: '90%',
  height: '80%',
  maxWidth: 400,
  maxHeight: 800,
  mx: 'auto',
  my: '10%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 3
}

export const title = {
  color: 'var(--font-color)'
}

export const avatar = {
  width: 200,
  height: 200,
  border: '3px solid var(--footer-color)',
}

export const buttonImage = {
  backgroundColor: 'var(--primary-color)',
  color: 'var(--font-color)',
  '&:hover': { backgroundColor: 'var(--footer-color)' },
  width: '100%',
}

export const buttonContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
}

export const cancelButton = {
  borderColor: 'var(--footer-color)',
  color: 'var(--font-color)',
  width: '48%',
  '&:hover': { borderColor: 'var(--primary-color)' },
}

export const saveButton = {
  backgroundColor: 'var(--primary-color)',
  color: 'var(--font-color)',
  width: '48%',
  '&:hover': { backgroundColor: 'var(--footer-color)' },
}