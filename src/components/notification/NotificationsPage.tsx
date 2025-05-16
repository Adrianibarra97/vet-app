import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  List,
  Button,
  Stack,

} from '@mui/material'
import { WhatsApp, Email } from '@mui/icons-material'
import PetOwnerServiceManager from '../../services/pet-owner-service/PetOwnerServiceManager'
import VetServiceManager from '../../services/vet-service/VetServiceManager'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { getUserID } from '../../services/auth-service/AuthService'
import { NotificationModel } from '../../domain/Notification'
import { NotificationCard } from '../../components/notification-card/NotificationCard'
import { MedicalShift } from '../../domain/MedicalShift'

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<NotificationModel[]>([])
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const isVet = AuthServiceManager.getIntance().isVet()
  const service = isVet
    ? VetServiceManager.getInstance()
    : PetOwnerServiceManager.getInstance()

  useEffect(() => {
    const fetchNotifications = async () => {
      const id = getUserID()
      const notes = await service.getNotificationsByUserId(id)

      let shifts: MedicalShift[] = []

      if (isVet && 'getShiftsByVetId' in service) {
        shifts = await service.getShiftsByVetId(id)
      } else if (!isVet && 'getShiftsByPetOwnerId' in service) {
        shifts = await service.getShiftsByPetOwnerId(id)
      }

      const today = new Date().toISOString().slice(0, 10) 
      const hasShiftToday = shifts.some(
        (shift: MedicalShift) => shift.date === today,
      )

      const updatedNotifications = hasShiftToday
        ? [
            new NotificationModel(
              Date.now(),
              'system',
              'Tenés turnos para hoy',
              new Date().toISOString(),
              false,
            ),
            ...notes,
          ]
        : notes

      setNotifications(updatedNotifications)
    }

    fetchNotifications()
  }, [])

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }
  return (
    <Box
      sx={{
        padding: '2em 1em',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <List sx={{ width: '100%', maxWidth: '800px' }}>
        {notifications.map((n, i) => (
          <NotificationCard
            key={n.id}
            notification={n}
            expanded={expandedIndex === i}
            onToggleExpand={() => toggleExpand(i)}
          />
        ))}
      </List>

      {!isVet && (
        <Box
          sx={{
            mt: 4,
            backgroundColor: 'var(--secondary-color)',
            padding: '1.5em',
            borderRadius: '12px',
            maxWidth: 500,
            width: '100%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            color="var(--footer-color)"
          >
            Datos de contacto
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Si necesitás comunicarte con tu veterinario, podés hacerlo a través
            de:
          </Typography>
          <Stack spacing={2} justifyContent="center">
            <Button
              variant="contained"
              startIcon={<WhatsApp />}
              href="https://wa.me/5491144556677"
              target="_blank"
              sx={{
                backgroundColor: '#25D366',
                '&:hover': { backgroundColor: '#1ebe5d' },
              }}
            >
              WhatsApp
            </Button>
            <Button
              variant="outlined"
              startIcon={<Email />}
              href="mailto:maria.gomez@veterinaria.com"
              sx={{ textTransform: 'none' }}
            >
              maria.gomez@veterinaria.com
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  )
}
