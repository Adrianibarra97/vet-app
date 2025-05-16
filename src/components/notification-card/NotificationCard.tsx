import React from 'react'
import {
  Typography,
  Paper,
  Stack,
  Divider,
  Box,
  IconButton,
  Collapse,
  Button,
  useMediaQuery,
} from '@mui/material'
import {
  EventBusy,
  EventAvailable,
  EditCalendar,
  Vaccines,
  Pets,
  WhatsApp,
  ExpandMore,
  ExpandLess,
  Email,
  Info,
} from '@mui/icons-material'
import { NotificationModel } from '../../domain/Notification'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { useNavigate } from 'react-router-dom'

interface Props {
  notification: NotificationModel
  expanded?: boolean
  onToggleExpand?: () => void
}

const getIconAndColor = (message: string) => {
  const msg = message.toLowerCase()
  if (msg.includes('cancelado'))
    return { icon: <EventBusy />, color: '#ef5350' }
  if (msg.includes('nuevo turno'))
    return { icon: <EventAvailable />, color: '#66bb6a' }
  if (msg.includes('editado') || msg.includes('modificado'))
    return { icon: <EditCalendar />, color: '#ffa726' }
  if (msg.includes('vacuna')) return { icon: <Vaccines />, color: '#42a5f5' }
  return { icon: <Info />, color: '#9e9e9e' }
}

export const NotificationCard: React.FC<Props> = ({
  notification,
  expanded = false,
  onToggleExpand,
}) => {
  const { message, date, petName, vetName, appointmentDate, type } =
    notification

  const isVet = AuthServiceManager.getIntance().isVet()
  const msg = message.toLowerCase()
  const isCancelByOwner = msg.includes('cancelado') && msg.includes('dueño')
  const isMobile = useMediaQuery('(max-width:600px)')
  const navigate = useNavigate()

  const vetEmail = vetName
    ? `${vetName.toLowerCase().replace(' ', '.')}@veterinaria.com`
    : ''
  const whatsappNumber = '5491144556677'

  if (isVet && !isCancelByOwner && type !== 'system') return null

  if (type === 'system') {
    return (
      <Paper
        elevation={3}
        sx={{
          padding: '1.5em',
          marginBottom: '1.2em',
          backgroundColor: '#e8f5e9',
          borderLeft: '6px solid #4caf50',
          borderRadius: 2,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
          sx={{ mb: 1 }}
        >
          <EventAvailable sx={{ color: '#4caf50' }} />
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ color: '#2e7d32' }}
          >
            Tenés turnos para hoy
          </Typography>
        </Stack>

        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Recordá que podés verlos y filtrarlos por fecha en tu panel de turnos.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate('/medical-shift')}
          sx={{
            backgroundColor: '#4caf50',
            '&:hover': { backgroundColor: '#43a047' },
            textTransform: 'none',
          }}
        >
          Ver turnos
        </Button>

        <Stack
          direction="row"
          spacing={1}
          mt={3}
          justifyContent="center"
          alignItems="center"
        >
          <Pets sx={{ fontSize: 18, color: '#888' }} />
          <Typography variant="caption" color="#888" fontWeight="bold">
            VetApp
          </Typography>
        </Stack>
      </Paper>
    )
  }

  const { icon, color } = getIconAndColor(message)

  return (
    <Paper
      elevation={3}
      sx={{
        padding: '1.2em',
        marginBottom: '1.2em',
        backgroundColor: '#fefefe',
        borderLeft: `6px solid ${color}`,
        borderRadius: 2,
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'nowrap',
          width: '100%',
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ flexGrow: 1, minWidth: 0 }}
        >
          <Box sx={{ color, flexShrink: 0 }}>{icon}</Box>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{
              wordBreak: 'break-word',
              overflowWrap: 'anywhere',
              flexGrow: 1,
            }}
          >
            {message}
          </Typography>
        </Stack>

        {onToggleExpand && (
          <IconButton onClick={onToggleExpand} size="small">
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ pl: 1.5, pr: 0.5 }}>
          <Typography variant="body2" color="textSecondary">
            <strong>Fecha:</strong> {new Date(date).toLocaleDateString()}
          </Typography>
          {appointmentDate && (
            <Typography variant="body2" color="textSecondary">
              <strong>Turno:</strong>{' '}
              {new Date(appointmentDate).toLocaleDateString()}
            </Typography>
          )}
          {petName && (
            <Typography variant="body2" color="textSecondary">
              <strong>Mascota:</strong> {petName}
            </Typography>
          )}
          {!isVet && vetName && (
            <Typography variant="body2" color="textSecondary">
              <strong>Veterinario:</strong> {vetName}
            </Typography>
          )}

          {!isVet && vetName && (
            <Box
              sx={{
                mt: 2,
                backgroundColor: 'var(--secondary-color)',
                padding: '1.2em',
                borderRadius: 2,
                textAlign: 'center',
                color: '#000',
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                ¿Necesitás hablar con {vetName}?
              </Typography>

              <Stack
                direction={isMobile ? 'column' : 'row'}
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  startIcon={<WhatsApp />}
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  sx={{
                    backgroundColor: '#25D366',
                    '&:hover': { backgroundColor: '#1ebe5d' },
                    textTransform: 'none',
                  }}
                >
                  WhatsApp
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Email />}
                  href={`mailto:${vetEmail}`}
                  sx={{ textTransform: 'none' }}
                >
                  {vetEmail}
                </Button>
              </Stack>
            </Box>
          )}

          <Stack
            direction="row"
            spacing={1}
            mt={3}
            justifyContent="center"
            alignItems="center"
          >
            <Pets sx={{ fontSize: 18, color: '#888' }} />
            <Typography variant="caption" color="#888" fontWeight="bold">
              VetApp
            </Typography>
          </Stack>
        </Box>
      </Collapse>
    </Paper>
  )
}
