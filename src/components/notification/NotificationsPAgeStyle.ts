import { styled } from '@mui/material/styles'
import { Box, Typography, Stack, ButtonProps, Button } from '@mui/material'

export const PageWrapper = styled(Box)({
  padding: '2em 1em',
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const ContactCard = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  backgroundColor: 'var(--secondary-color)',
  padding: '1.5em',
  borderRadius: '12px',
  maxWidth: 500,
  width: '100%',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  textAlign: 'center',
}))

export const ContactTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  color: 'var(--footer-color)',
}))

export const ContactText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
}))

export const ContactStack = styled(Stack)(({ theme }) => ({
  spacing: theme.spacing(2),
  justifyContent: 'center',
}))

export const WhatsAppStyledButton = styled(Button)<ButtonProps>({
  backgroundColor: '#25D366',
  '&:hover': {
    backgroundColor: '#1ebe5d',
  },
  textTransform: 'none',
})
