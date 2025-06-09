import { NotificationServiceInter } from './NotificationServiceInter'
import { NotificationService } from './NotificationService'
import { NotificationServiceStub } from './NotificationServiceStub'
import { NOTIFICATION_SERVICE_USE_STUB } from '../config'

export class NotificationServiceManager {
  private static instance: NotificationServiceManager
  private notificationService: NotificationServiceInter

  private constructor() {
    this.notificationService = NOTIFICATION_SERVICE_USE_STUB 
      ? new NotificationServiceStub() 
      : new NotificationService()
  }

  public static getInstance(): NotificationServiceManager {
    if (!NotificationServiceManager.instance) {
      NotificationServiceManager.instance = new NotificationServiceManager()
    }
    return NotificationServiceManager.instance
  }

  public getNotificationService(): NotificationServiceInter {
    return this.notificationService
  }
}
