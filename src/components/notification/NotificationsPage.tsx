import { useEffect, useState, useCallback } from 'react'
import { List, Button } from '@mui/material'
import { WhatsApp, Email } from '@mui/icons-material'
import PetOwnerServiceManager from '../../services/pet-owner-service/PetOwnerServiceManager'
import VetServiceManager from '../../services/vet-service/VetServiceManager'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { getUserID } from '../../services/auth-service/AuthService'
import { NotificationModel } from '../../domain/Notification'
import { NotificationCard } from '../../components/notification-card/NotificationCard'
import { Vet } from '../../domain/Vet'
import {
  PageWrapper,
  ContactCard,
  ContactTitle,
  ContactText,
  ContactStack,
  WhatsAppStyledButton,
} from './NotificationsPAgeStyle'
import { VetServiceInter } from '../../services/vet-service/VetServiceInter'
import { PetOwnerServiceInter } from '../../services/pet-owner-service/PetOwnerServiceInter'

const useNotificationsData = () => {
  const [notifications, setNotifications] = useState<NotificationModel[]>([])
  const [vetData, setVetData] = useState<Vet | null>(null)

  const isVet = AuthServiceManager.getIntance().isVet()
  const service = isVet
    ? VetServiceManager.getInstance()
    : PetOwnerServiceManager.getInstance()

const loadData = useCallback(async () => {
  const id = getUserID()

  let notes: NotificationModel[] = []

  if (AuthServiceManager.getIntance().isVet()) {
    const vetService = service as VetServiceInter
    notes = await vetService.getNotificationsByVetId(id)
  } else {
    const petOwnerService = service as PetOwnerServiceInter
    notes = await petOwnerService.getNotificationsByPetOwnerId(id)

    const petOwner = await petOwnerService.getOneById(id)
    if ('vetName' in petOwner && petOwner.vetName) {
      const allVets = await VetServiceManager.getInstance().getAll()
      const foundVet = allVets.find((v) => v.name === petOwner.vetName)
      if (foundVet) setVetData(foundVet)
    }
  }

  setNotifications(notes)
}, [service])


  useEffect(() => {
    loadData()
  }, [loadData])

  return { notifications, vetData, isVet }
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
    <PageWrapper>
      <List>
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
        <ContactCard>
          <ContactTitle variant="h6" gutterBottom>
            Datos de contacto
          </ContactTitle>
          <ContactText variant="body2">
            Si necesitás comunicarte con tu veterinario, podés hacerlo a través
            de:
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
    </PageWrapper>
  )
}
