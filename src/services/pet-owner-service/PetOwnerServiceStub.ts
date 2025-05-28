import { NotificationModel } from '../../domain/Notification'
import { PetOwner } from '../../domain/PetOwner'
import { PetOwnerServiceInter } from './PetOwnerServiceInter'
import { USER_ID_TOKEN } from '../config'
import NotificationServiceManager from '../notification-service/NotificationServiceManager'
import { AuthCredentialsLoginDTO, AuthCredentialsResponseDTO } from '../../domain/User'
import AuthServiceManager from '../auth-service/AuthServiceManager'

const petOwnerMockNotifications: NotificationModel[] = [
  // eze
  new NotificationModel(
    1,
    'SHIFT_TODAY',
    'Tenés un turno hoy con Rocky',
    new Date().toISOString(),
    true,
    'Rocky',
    'Ezequiel',
    'Adrián Ibarra',
    new Date().toISOString(),
  ),
  new NotificationModel(
    2,
    'vaccine',
    'La vacuna contra moquillo de Oli vence pronto',
    new Date().toISOString(),
    false,
    'Oli',
    'Ezequiel',
  ),
  new NotificationModel(
    3,
    'SHIFT_UPDATE',
    'El turno de Rocky fue reprogramado',
    new Date().toISOString(),
    false,
    'Rocky',
    'Ezequiel',
    'Adrián Ibarra',
    '2025-05-23T13:00:00Z',
  ),
  new NotificationModel(
    4,
    'appointment',
    'Nuevo turno asignado para Oli',
    new Date().toISOString(),
    false,
    'Oli',
    'Ezequiel',
    'Adrián Ibarra',
    '2025-06-01T10:00:00Z',
  ),

  // caro
  new NotificationModel(
    5,
    'SHIFT_TODAY',
    'Tenés un turno hoy con Mileva',
    new Date().toISOString(),
    true,
    'Mileva',
    'Caroline',
    'Adrián Ibarra',
    new Date().toISOString(),
  ),
  new NotificationModel(
    6,
    'vaccine',
    'La vacuna antirrábica de Pipi está por vencer',
    new Date().toISOString(),
    false,
    'Pipi',
    'Caroline',
  ),
  new NotificationModel(
    7,
    'SHIFT_DELETE',
    'Tu turno con Owie fue cancelado',
    new Date().toISOString(),
    true,
    'Owie',
    'Caroline',
    'Adrián Ibarra',
    '2025-05-25T14:00:00Z',
  ),
  new NotificationModel(
    8,
    'SHIFT_UPDATE',
    'Reprogramaron el turno de Mileva',
    new Date().toISOString(),
    false,
    'Mileva',
    'Caroline',
    'Adrián Ibarra',
    '2025-05-26T12:00:00Z',
  ),

  // tamara
  new NotificationModel(
    9,
    'SHIFT_TODAY',
    'Tenés un turno hoy con Cleopatra',
    new Date().toISOString(),
    true,
    'Cleopatra',
    'Tamara',
    'Lucas Cejas',
    new Date().toISOString(),
  ),
  new NotificationModel(
    10,
    'vaccine',
    'La vacuna de Burpee vence esta semana',
    new Date().toISOString(),
    false,
    'Burpee',
    'Tamara',
  ),
  new NotificationModel(
    11,
    'SHIFT_UPDATE',
    'Napoleón tiene nuevo horario',
    new Date().toISOString(),
    false,
    'Napoleón',
    'Tamara',
    'Lucas Cejas',
    '2025-06-03T11:00:00Z',
  ),
  new NotificationModel(
    12,
    'appointment',
    'Turno nuevo creado para Freya',
    new Date().toISOString(),
    false,
    'Freya',
    'Tamara',
    'Lucas Cejas',
    '2025-06-05T09:30:00Z',
  ),

  // para lucas
  new NotificationModel(
    13,
    'SHIFT_TODAY',
    'Tenés un turno hoy con Morena',
    new Date().toISOString(),
    true,
    'Morena',
    'Lucas',
    'Adrián Ibarra',
    new Date().toISOString(),
  ),
  new NotificationModel(
    14,
    'vaccine',
    'Vacuna contra parainfluenza de Morena próxima a vencer',
    new Date().toISOString(),
    false,
    'Morena',
    'Lucas',
  ),
  new NotificationModel(
    15,
    'SHIFT_DELETE',
    'Tu turno con Morena fue cancelado',
    new Date().toISOString(),
    true,
    'Morena',
    'Lucas',
    'Adrián Ibarra',
    '2025-05-20T11:00:00Z',
  ),
  new NotificationModel(
    16,
    'SHIFT_UPDATE',
    'Reprogramaron el turno de Morena',
    new Date().toISOString(),
    false,
    'Morena',
    'Lucas',
    'Adrián Ibarra',
    '2025-06-01T10:00:00Z',
  ),
]

export class PetOwnerServiceStub implements PetOwnerServiceInter {
  private petOwners: PetOwner[] = [
    new PetOwner(
      1,
      'Eche',
      '1234',
      'Ezequiel',
      'Iozzia',
      36594529,
      'eche@gmail.com',
      '1144556677',
      'src/assets/eche.jfif',
      'Belgrano 123',
      '1870',
      'Avellaneda',
      'Buenos Aires',
      'Argentina',
      1,
      1,
      'Lucas Cejas',
      '1142334411',
    ),
    new PetOwner(
      2,
      'Caro',
      '1234',
      'Caro',
      'Coronel',
      40567890,
      'caro@gmail.com',
      '1144556677',
      'src/assets/caro.jfif',
      'Av. Santa Fe 456',
      '1642',
      'San Isidro',
      'Buenos Aires',
      'Argentina',
      2,
      2,
      'Adrián Ibarra',
      '1142334411',
    ),
    new PetOwner(
      3,
      'Tami',
      '1234',
      'Tamara',
      'Mecozzi',
      37567890,
      'tami@gmail.com',
      '1144556677',
      'src/assets/tam.jfif',
      'Rivadavia 789',
      '1870',
      'Avellaneda',
      'Buenos Aires',
      'Argentina',
      3,
      3,
      'Lucas Cejas',
      '1142334411',
    ),
    new PetOwner(
      4,
      'LuckR',
      '1234',
      'Lucas',
      'Rodriguez',
      44567890,
      'luckr@gmail.com',
      '1144556677',
      'src/assets/LuckR.jfif',
      'Mitre 1010',
      '1642',
      'San Isidro',
      'Buenos Aires',
      'Argentina',
      4,
      4,
      'Adrián Ibarra',
      '1142334411',
    ),
  ]

  private getCurrentUser(): PetOwner {
    const id = parseInt(localStorage.getItem(USER_ID_TOKEN) || '-1')
    const owner = this.petOwners.find((p) => p.id === id)
    if (!owner) throw new Error('PetOwner not found in stub')
    return owner
  }

  async getAll(): Promise<PetOwner[]> {
    return this.petOwners
  }

  async getOneById(): Promise<PetOwner> {
    return this.getCurrentUser()
  }

  async create(petOwner: PetOwner): Promise<void> {
    petOwner.idAuthCredentials = this.petOwners.length + 1
    this.petOwners.push(petOwner)
    const loginUser: [AuthCredentialsLoginDTO, AuthCredentialsResponseDTO] = [
      { username: petOwner.username, password: petOwner.password },
      { authCredentialsID: petOwner.idAuthCredentials, typeOfUser: 'VET' }
    ]
    AuthServiceManager.getIntance().addSystemUser(loginUser)
  }

  async update(petOwner: PetOwner): Promise<void> {
    const index = this.petOwners.findIndex((p) => p.id === petOwner.id)
    if (index !== -1) this.petOwners[index] = petOwner
  }

  async delete(id: number): Promise<void> {
    this.petOwners = this.petOwners.filter((p) => p.id !== id)
  }
  async getNotificationsByPetOwnerId(): Promise<NotificationModel[]> {
    const current = this.getCurrentUser()
    const dynamic =
      await NotificationServiceManager.getInstance().getAllNotifications()

    const staticList = petOwnerMockNotifications.filter(
      (n) => n.petOwnerName?.toLowerCase() === current.name.toLowerCase(),
    )
    const filtered = dynamic.filter(
      (n) => n.petOwnerName?.toLowerCase() === current.name.toLowerCase(),
    )

    return [...staticList, ...filtered]
  }
}
