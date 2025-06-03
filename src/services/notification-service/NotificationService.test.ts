import { NotificationServiceStub } from './NotificationServiceStub'

describe('Notification Service', () => {
  let service: NotificationServiceStub

  beforeEach(() => {
    service = new NotificationServiceStub()
  })

  it('should return vet notifications by ID 2 (Lucas Cejas)', async () => {
    const notifications = await service.getNotificationsByVetId(2)
    expect(notifications.length).toBe(2)

    const types = notifications.map(n => n.type)
    expect(types).toContain('SHIFT_REMINDER')
    expect(types).toContain('SHIFT_DELETE')
    expect(notifications.every(n => n.vetName === 'Lucas Cejas')).toBe(true)
  })

  it('should return vet notifications by ID 1 (Adrián Ibarra)', async () => {
    const notifications = await service.getNotificationsByVetId(1)
    expect(notifications.length).toBe(0) 
  })

  it('should return pet owner notifications by ID 3 (Tamara)', async () => {
    const notifications = await service.getNotificationsByPetOwnerId(3)
    expect(notifications.length).toBe(4)

    const types = notifications.map(n => n.type)
    expect(types).toEqual(
      expect.arrayContaining(['SHIFT_REMINDER', 'SHIFT_UPDATE', 'SHIFT_CREATE', 'SHIFT_DELETE'])
    )

    expect(notifications.every(n => n.petOwnerName === 'Tamara')).toBe(true)
  })

  it('should return pet owner notifications by ID 1 (Ezequiel)', async () => {
    const notifications = await service.getNotificationsByPetOwnerId(1)
    expect(notifications.length).toBe(0)
  })

  it('should return pet owner notifications by ID 2 (Caroline)', async () => {
    const notifications = await service.getNotificationsByPetOwnerId(2)
    expect(notifications.length).toBe(0)
  })
}) 