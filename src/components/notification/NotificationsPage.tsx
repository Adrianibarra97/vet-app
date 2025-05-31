import { useEffect, useState } from 'react'
import { NotificationModel } from '../../domain/Notification'
import VetServiceManager from '../../services/vet-service/VetServiceManager'
import PetOwnerServiceManager from '../../services/pet-owner-service/PetOwnerServiceManager'
import AuthServiceManager from '../../services/auth-service/AuthServiceManager'
import { useOutletContext } from 'react-router-dom'
import {
  NotificationsWrapper,
  NotificationsContent,
  ContactText,
} from './NotificationsPAgeStyle'
import { PetOwner } from '../../domain/PetOwner'
import { Vet } from '../../domain/Vet'
export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<NotificationModel[]>([])
  const user = useOutletContext<Vet | PetOwner>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return

        let fetchedNotifications: NotificationModel[] = []

        if (user instanceof PetOwner) {
          const petOwnerService = PetOwnerServiceManager.getInstance()
          fetchedNotifications = await petOwnerService.getNotificationsByPetOwnerId(user.id)
        } else {
          const vetService = VetServiceManager.getInstance()
          fetchedNotifications = await vetService.getNotificationsByVetId(user.id)
        }

        setNotifications(fetchedNotifications)
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    }

    fetchData()
  }, [user])

  return (
    <NotificationsWrapper>
      <NotificationsContent>
        {notifications.length === 0 ? (
          <ContactText>No hay notificaciones</ContactText>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} style={{
              background: '#f8f8f8',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              <ContactText>
                {notification.type === 'SHIFT_DELETE' && 'Appointment cancelled'}
                {notification.type === 'SHIFT_UPDATE' && 'Appointment updated'}
                {notification.type === 'SHIFT_CREATE' && 'New appointment created'}
                {notification.type === 'SHIFT_REMINDER' && 'Appointment reminder'}
              </ContactText>
              <ContactText>
                {AuthServiceManager.getIntance().isVet()
                  ? `Pet Owner: ${notification.petOwnerName}`
                  : `Vet: ${notification.vetName}`}
              </ContactText>
              <ContactText>
                Date: {new Date(notification.date).toLocaleDateString()}
              </ContactText>
            </div>
          ))
        )}
      </NotificationsContent>
    </NotificationsWrapper>
  )
}