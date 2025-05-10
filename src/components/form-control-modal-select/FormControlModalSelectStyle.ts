export const formControl = {
  display: 'flex',
  height: '3em',
  mb: '0.1em',
  width: { xs: '100%', sm: '45%' }
}

export const formControlNone = {
  display: 'none'
}

export const formControlItem = {
  display: 'flex',
  height: '100%',
  width: '100%',
  justifyContent: 'flex-start'
}

export const formControlLabel = {
  display: 'flex',
  height: '100%',
  width: '100%',
  color: 'var(--footer-color)',
  justifyContent: 'flex-start'
}

export const formControlSelect = {
  display: 'flex',
  width: '100%',
  height: '1.5em',
  pl: '1em',
  color: 'var(--footer-color)',
  background: 'var(--header-color)',
  '& .MuiSelect-select': {
    display: 'flex',
    padding: '0'
  }
}