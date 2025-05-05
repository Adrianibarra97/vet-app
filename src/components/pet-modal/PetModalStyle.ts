export const formContainer = {
  width: 900,
  maxWidth: '95vw',
  margin: 'auto',
  mt: '20vh',
  p: 3,
  backgroundColor: 'white',
  borderRadius: 2,
  maxHeight: '90vh',
  overflow: 'auto'
}

export const modalTitle = {
  mb: 2,
  color: 'var(--primary-color)'
}

export const modalItems = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  width: '100%',
  justifyContent: 'space-between'
}

export const formControl = {
  display: 'flex',
  height: '3em',
  width: { xs: '100%', sm: '45%' }
}

export const inputLabelControl = {
  color: 'var(--footer-color)',
  '&.Mui-focused': { color: 'var(--footer-color)' }
}

export const button__Container = { 
  display: 'flex',
  mt: 2,
  width: { xs: '100%', sm: 'auto' },
  justifyContent: 'space-between'
}

export const BkgCancelButton = {
  backgroundColor: 'var(--primary-color)'
}

export const BkgConfirmButton = {
  backgroundColor: 'var(--footer-color)'
}