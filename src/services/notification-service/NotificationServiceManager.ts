
import { NotificationServiceInter } from './NotificationServiceInter'
import { NotificationServiceStub } from './NotificationServiceStub'
import { NotificationService } from './NotificationService'
import { NOTIFICATION_SERVICE_USE_STUB } from '../config'

class NotificationServiceManager {
  private static instance: NotificationServiceInter

  public static getInstance(): NotificationServiceInter {
    if (!NotificationServiceManager.instance) {
      NotificationServiceManager.instance = NOTIFICATION_SERVICE_USE_STUB
        ? new NotificationServiceStub()
        : new NotificationService()
    }
    return NotificationServiceManager.instance
  }
}

export default NotificationServiceManager
