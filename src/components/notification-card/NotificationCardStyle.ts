import { styled } from '@mui/material/styles'
import { Paper, Box, Stack, Typography, Button } from '@mui/material'

export const StyledPaper = styled(Paper)({
  padding: '1.2em',
  marginBottom: '1.2em',
  backgroundColor: '#fefefe',
  borderRadius: 8,
  width: '100%',
})

export const SystemPaper = styled(Paper)({
  padding: '1em',
  marginBottom: '1.2em',
  backgroundColor: '#ffffff',
  borderLeft: '6px solid #4caf50',
  borderRadius: 8,
  width: '90%',
  maxWidth: '40rem',
  textAlign: 'center',
})

export const RowBetween = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 16,
  flexWrap: 'nowrap',
  width: '100%',
})

export const FooterStack = styled(Stack)({
  marginTop: 24,
  justifyContent: 'center',
  alignItems: 'center',
})

export const ContactBox = styled(Box)({
  marginTop: '1.5em',
  backgroundColor: 'var(--secondary-color)',
  padding: '1.2em',
  borderRadius: 8,
  textAlign: 'center',
  width: '100%',
})

export const MessageTypography = styled(Typography)({
  wordBreak: 'break-word',
  overflowWrap: 'anywhere',
  flexGrow: 1,
})

export const IconBox = styled(Box)<{ color: string }>(({ color }) => ({
  color,
  flexShrink: 0,
}))

export const StackGrow = styled(Stack)({
  flexGrow: 1,
  minWidth: 0,
})

export const GreenTitle = styled(Typography)({
  color: '#2e7d32',
  fontWeight: 'bold',
})

export const TopSpacing = styled(Stack)({
  marginBottom: '1em',
})

export const DescriptionText = styled(Typography)({
  marginBottom: '1em',
})

export const GreenButton = styled(Button)({
  backgroundColor: '#4caf50',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#43a047',
  },
})

export const WhatsAppButton = styled(Button)({
  backgroundColor: '#25D366',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#1ebe5d',
  },
}) as typeof Button

export const getIconAndColorByType = (rawType: string) => {
  const type = rawType.toUpperCase() 

  const map: Record<
    string,
    { icon: 'cancel' | 'new' | 'edit' | 'vacuna' | 'info'; color: string }
  > = {
    SHIFT_TODAY: { icon: 'info', color: '#4caf50' },
    SHIFT_UPDATE: { icon: 'edit', color: '#ffa726' },
    SHIFT_DELETE: { icon: 'cancel', color: '#ef5350' },
    SHIFT_CREATE: { icon: 'new', color: '#66bb6a' },
    SHIFT_REMINDER: { icon: 'info', color: '#43a047' },
    APPOINTMENT: { icon: 'new', color: '#66bb6a' },
    VACCINE: { icon: 'vacuna', color: '#42a5f5' },
    SYSTEM: { icon: 'info', color: '#9e9e9e' },
  }

  return map[type] || { icon: 'info', color: '#9e9e9e' }
}

export const typeLabels: Record<string, string> = {
  SHIFT_TODAY: 'Tenés un turno hoy ',
  SHIFT_UPDATE: 'Turno modificado ',
  SHIFT_DELETE: 'Turno cancelado ',
  SHIFT_CREATE: 'Turno asignado ',
  SHIFT_REMINDER: 'Recordatorio de turno ',
  appointment: 'Nuevo turno ',
  vaccine: 'Vacuna próxima a vencer ',
  system: 'Recordatorio del sistema ',
}
