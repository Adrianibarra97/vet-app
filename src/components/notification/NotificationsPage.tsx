import { useEffect, useState } from 'react'
import { NotificationModel } from '../../domain/Notification'
import { useOutletContext } from 'react-router-dom'
import {
  NotificationsWrapper,
  NotificationsContent,
  ContactText,
} from './NotificationsPAgeStyle'
import { PetOwner } from '../../domain/PetOwner'
import { Vet } from '../../domain/Vet'
import { NotificationCard } from '../notification-card/NotificationCard'
import { NotificationServiceManager } from '../../services/notification-service/NotificationServiceManager'
export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<NotificationModel[]>([])
  const user = useOutletContext<Vet | PetOwner>()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const [hasFetched, setHasFetched] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      if (!user || hasFetched) return

      const notificationService =
        NotificationServiceManager.getInstance().getNotificationService()

      let fetchedNotifications: NotificationModel[] = []

      if (user instanceof PetOwner) {
        fetchedNotifications =
          await notificationService.getNotificationsByPetOwnerId(user.id)
      } else {
        fetchedNotifications =
          await notificationService.getNotificationsByVetId(user.id)
      }

      setNotifications(fetchedNotifications)
      setHasFetched(true)
    }

    fetchData()
  }, [user, hasFetched])

  const handleToggleExpand = (id: string) => {
    setExpandedId((prev: string | null) => (prev === id ? null : id))
  }

  return (
    <NotificationsWrapper>
      <NotificationsContent>
        {notifications.length === 0 ? (
          <ContactText>No hay notificaciones</ContactText>
        ) : (
          notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              expanded={expandedId === notification.id.toString()}
              onToggleExpand={() =>
                handleToggleExpand(notification.id.toString())
              }
              vetEmail={notification.professionalEmail}
              vetPhone={notification.professionalTelephone}
            />
          ))
        )}
      </NotificationsContent>
    </NotificationsWrapper>
  )
}
