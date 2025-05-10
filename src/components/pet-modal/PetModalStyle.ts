export const modal = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export const formContainer = {
  width: 900,
  maxWidth: '95vw',
  p: 3,
  backgroundColor: 'white',
  borderRadius: 2,
  maxHeight: { xs: '97vh', sm: '80vh' },
  overflowY: { xs: 'scroll', sm: 'hidden' }
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