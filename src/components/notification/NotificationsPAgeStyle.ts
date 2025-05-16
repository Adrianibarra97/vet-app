import { SxProps, Theme } from '@mui/material'

export const notificationWrapperStyle: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: { xs: '1rem', md: '2rem' },
  boxSizing: 'border-box',
}

export const notificationTitleStyle: SxProps<Theme> = {
  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
  fontWeight: 800,
  background: 'linear-gradient(to right, var(--footer-color), var(--primary-color))',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  textShadow: '1px 1px 4px rgba(0,0,0,0.1)',
  marginBottom: '2rem',
  borderBottom: '3px solid var(--primary-color)',
  paddingBottom: '0.3rem',
  width: '100%',
  maxWidth: '600px',
}
