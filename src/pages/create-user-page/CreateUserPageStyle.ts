export const formContainer = {
  display: 'grid',
  maxHeight: { xs: '90vh', sm: '80vh' },
  width: { xs: '95%', sm: '80%' },
  p: 2,
  gap: 2,
  backgroundColor: 'var(--header-color)',
  border: '1px solid var(--primary-color)',
  borderRadius: 2,
  boxShadow: '1px 1px 10px var(--primary-color)',
  overflowY: 'scroll'
}

export const formItemTitle = {
  display: 'flex',
  flexDirection: 'column',
  width: { xs: '95%', sm: '35em' },
  height: 'auto',
  margin: '1em auto'
}

export const sectionMainTitle = {
  display: 'flex',
  width: '100%',
  height: '4vh',
  justifyContent: 'center',
  alignItem: 'center'
}

export const sectionType = {
  display: 'flex',
  width: '100%',
  height: '9vh',
  mt: '2vh',
  overflow: 'visible'
}

export const formItem = {
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  width: '100%',
  justifyContent: 'center',
  overflow: 'visible'
}

export const formItemNone = {
  display: 'none'
}