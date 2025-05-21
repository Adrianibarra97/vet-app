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
  justifyContent: 'space-between',
  overflow: 'visible'
}

export const modalItem = {
  display: 'flex',
  height: 'auto',
  margin: '0.2em auto',
  width: { xs: '100%', sm: '45%' },
  overflow: 'visible'
}

export const buttonContent = { 
  width: '90%',
  height: '5em',
  margin: 'auto'
}