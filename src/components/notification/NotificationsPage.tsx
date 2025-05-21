import { useEffect, useState, useCallback } from 'react'
import { List, Button, Box } from '@mui/material'
import { WhatsApp, Email } from '@mui/icons-material'
import PetOwnerServiceManager from '../../services/pet-owner-service/PetOwnerServiceManager'
import VetServiceManager from '../../services/vet-service/VetServiceManager'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { getUserID } from '../../services/auth-service/AuthService'
import { NotificationModel } from '../../domain/Notification'
import { NotificationCard } from '../../components/notification-card/NotificationCard'
import { Vet } from '../../domain/Vet'
import {
  ContactCard,
  ContactTitle,
  ContactText,
  ContactStack,
  WhatsAppStyledButton,
} from './NotificationsPAgeStyle'
import { VetServiceInter } from '../../services/vet-service/VetServiceInter'
import { PetOwnerServiceInter } from '../../services/pet-owner-service/PetOwnerServiceInter'

const notificationPriority: Record<string, number> = {
  system: 0,
  SHIFT_TODAY: 1,
  SHIFT_DELETE: 2,
  SHIFT_UPDATE: 3,
  SHIFT_CREATE: 4,
  vaccine: 5,
  appointment: 6,
  info: 7,
}

export const useNotificationsData = () => {
  const [notificationList, setNotificationList] = useState<NotificationModel[]>(
    [],
  )
  const [vetData, setVetData] = useState<Vet | null>(null)
  const refresh = async () => await loadData()

  const isVet = AuthServiceManager.getIntance().isVet()
  const service = isVet
    ? VetServiceManager.getInstance()
    : PetOwnerServiceManager.getInstance()
  const loadData = useCallback(async () => {
    const id = getUserID()
    let notes: NotificationModel[] = []

    if (isVet) {
      const vetService = service as VetServiceInter

      notes = await vetService.getNotificationsByVetId(id)

    } else {
      const petOwnerService = service as PetOwnerServiceInter
      notes = await petOwnerService.getNotificationsByPetOwnerId(id)

      const allVets = await VetServiceManager.getInstance().getAll()
      const vetNamesInNotifications = notes
        .map((n) => n.vetName)
        .filter(Boolean)

      const foundVet = allVets.find((v) =>
        vetNamesInNotifications.some((name) =>
          `${v.name} ${v.surname}`.includes(name || ''),
        ),
      )

      if (foundVet) setVetData(foundVet)
    }

    setNotificationList(notes)
  }, [service, isVet])

  useEffect(() => {
    loadData()
  }, [loadData])

  return { notifications: notificationList, vetData, isVet, refresh }
}

export const NotificationsPage = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const { notifications, vetData, isVet } = useNotificationsData()

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index))
  }

  const vetEmail = vetData?.professionalEmail || 'sin-email@veterinaria.com'
  const vetPhone = vetData?.professionalTelephone || '000000000'

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1100px',
        justifyContent: 'center',
        px: 3,
        py: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <List sx={{ width: '100%' }}>
          {[...notifications]
            .sort((a, b) => {
              const priorityA = notificationPriority[a.type] ?? 99
              const priorityB = notificationPriority[b.type] ?? 99
              return priorityA - priorityB
            })
            .map((n, i) => (
              <NotificationCard
                key={n.id}
                notification={n}
                expanded={expandedIndex === i}
                onToggleExpand={() => toggleExpand(i)}
                vetEmail={vetEmail}
                vetPhone={vetPhone}
              />
            ))}
        </List>

        {!isVet && (
          <ContactCard>
            <ContactTitle variant="h6" gutterBottom>
              Datos de contacto
            </ContactTitle>
            <ContactText variant="body2">
              Si necesitás comunicarte con tu veterinario, podés hacerlo a
              través de:
            </ContactText>
            <ContactStack spacing={2}>
              <WhatsAppStyledButton
                component="a"
                rel="noopener noreferrer"
                href={`https://wa.me/549${vetPhone}`}
                variant="contained"
                startIcon={<WhatsApp />}
              >
                WhatsApp
              </WhatsAppStyledButton>

              <Button
                variant="outlined"
                startIcon={<Email />}
                href={`mailto:${vetEmail}`}
                sx={{ textTransform: 'none' }}
              >
                {vetEmail}
              </Button>
            </ContactStack>
          </ContactCard>
        )}
      </Box>
    </Box>
  )
}
