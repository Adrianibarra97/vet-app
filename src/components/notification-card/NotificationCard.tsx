import React from 'react'
import {
  Email,
  WhatsApp,
  Pets,
  ExpandMore,
  ExpandLess,
  EventBusy,
  EventAvailable,
  EditCalendar,
  Vaccines,
  Info,
} from '@mui/icons-material'
import { NotificationModel } from '../../domain/Notification'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { useNavigate } from 'react-router-dom'
import {
  StyledPaper,
  SystemPaper,
  RowBetween,
  FooterStack,
  ContactBox,
  MessageTypography,
  IconBox,
  StackGrow,
  GreenTitle,
  TopSpacing,
  DescriptionText,
  GreenButton,
  WhatsAppButton,
  typeLabels,
} from './NotificationCardStyle'
import { getIconAndColorByType } from './NotificationCardStyle'

import {
  Button,
  Collapse,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'

interface Props {
  notification: NotificationModel
  expanded?: boolean
  onToggleExpand?: () => void
  vetEmail?: string
  vetPhone?: string
}

const iconMap = {
  cancel: <EventBusy />,
  new: <EventAvailable />,
  edit: <EditCalendar />,
  vacuna: <Vaccines />,
  info: <Info />,
}

export const NotificationCard: React.FC<Props> = ({
  notification,
  expanded = false,
  onToggleExpand,
  vetEmail,
  vetPhone,
}) => {
  const { message, date, petName, vetName, appointmentDate, type } =
    notification

  const isVet = AuthServiceManager.getIntance().isVet()
  const msg = message.toLowerCase()
  const isCancelByOwner = msg.includes('cancelado') && msg.includes('dueño')
  const navigate = useNavigate()

  const { icon, color } = getIconAndColorByType(type) as {
    icon: keyof typeof iconMap
    color: string
  }

  const emailToShow = vetEmail || ''
  const phoneToShow = vetPhone || ''

  //if (isVet && !isCancelByOwner && type !== 'system') return null

  if (type === 'system') {
    return (
      <SystemPaper elevation={3}>
        <TopSpacing
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
        >
          <EventAvailable sx={{ color: '#4caf50' }} />
          <GreenTitle variant="subtitle1">Tenés turnos para hoy</GreenTitle>
        </TopSpacing>

        <DescriptionText variant="body2" color="textSecondary">
          Recordá que podés verlos y filtrarlos por fecha en tu panel de turnos.
        </DescriptionText>

        <GreenButton
          variant="contained"
          onClick={() => navigate('/medical-shift')}
        >
          Ver turnos
        </GreenButton>

        <FooterStack direction="row" spacing={1}>
          <Pets sx={{ fontSize: 18, color: '#888' }} />
          <Typography variant="caption" color="#888" fontWeight="bold">
            VetApp
          </Typography>
        </FooterStack>
      </SystemPaper>
    )
  }

  return (
    <StyledPaper elevation={3} style={{ borderLeft: `6px solid ${color}` }}>
      <RowBetween>
        <StackGrow direction="row" spacing={1} alignItems="center">
          <IconBox color={color}>{iconMap[icon]}</IconBox>
          <MessageTypography variant="subtitle1" fontWeight="bold">
            {typeLabels[type] ?? 'Notificación'} para {petName}
          </MessageTypography>
        </StackGrow>

        {onToggleExpand && (
          <IconButton onClick={onToggleExpand} size="small">
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
      </RowBetween>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider sx={{ my: 1 }} />
        <Stack spacing={0.5} px={2}>
          <Typography variant="body2" color="textSecondary">
            <strong>Fecha:</strong> {new Date(date).toLocaleDateString()}
          </Typography>
          {appointmentDate && (
            <Typography variant="body2" color="textSecondary">
              <strong>Turno:</strong>{' '}
              {new Date(appointmentDate).toLocaleDateString()} a las{' '}
              {new Date(appointmentDate).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
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
        </Stack>

        {!isVet && vetName && (
          <ContactBox>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              ¿Necesitás hablar con {vetName}?
            </Typography>

            <Stack spacing={2} justifyContent="center" alignItems="center">
              <WhatsAppButton
                variant="contained"
                startIcon={<WhatsApp />}
                component="a"
                href={`https://wa.me/549${phoneToShow}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </WhatsAppButton>

              <Button
                variant="outlined"
                startIcon={<Email />}
                href={`mailto:${emailToShow}`}
                sx={{ textTransform: 'none' }}
              >
                {emailToShow}
              </Button>
            </Stack>
          </ContactBox>
        )}

        <FooterStack direction="row" spacing={1}>
          <Pets sx={{ fontSize: 18, color: '#888' }} />
          <Typography variant="caption" color="#888" fontWeight="bold">
            VetApp
          </Typography>
        </FooterStack>
      </Collapse>
    </StyledPaper>
  )
}
