import { useEffect, useState } from 'react'
import PetOwnerServiceManager from '../../services/pet-owner-service/PetOwnerServiceManager'
import VetServiceManager from '../../services/vet-service/VetServiceManager'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { getUserID } from '../../services/auth-service/AuthService'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material'
import { NotificationModel } from '../../domain/Notification'
import { notificationTitleStyle } from './NotificationsPAgeStyle'

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<NotificationModel[]>([])
  const isVet = AuthServiceManager.getIntance().isVet()
  const service = isVet
    ? VetServiceManager.getInstance()
    : PetOwnerServiceManager.getInstance()

  useEffect(() => {
    const fetchNotifications = async () => {
      const id = getUserID()
      const notes = await service.getNotificationsByUserId(id)
      setNotifications(notes)
    }
    fetchNotifications()
  }, [])

  return (
    <Box sx={{ padding: '1em' }}>
      <Typography component="h1" sx={notificationTitleStyle}>
        🔔 Notificaciones
      </Typography>

      <List sx={{ width: '100%', maxWidth: '600px' }}>
        {notifications.map((n, i) => (
          <ListItem
            key={i}
            sx={{
              backgroundColor: n.urgent ? '#ffe5e5' : '#f5f5f5',
              marginBottom: '1em',
              borderRadius: '0.5em',
            }}
          >
            <ListItemText
              primary={n.message}
              secondary={new Date(n.date).toLocaleDateString()}
            />
          </ListItem>
        ))}
      </List>

      {!isVet && (
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: '1rem' }}
          onClick={() => window.open('https://wa.me/5491144556677', '_blank')}
        >
          Contactar al veterinario
        </Button>
      )}
    </Box>
  )
}
