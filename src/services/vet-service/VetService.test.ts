import { VetServiceStub } from './VetServiceStub'
import { Vet } from '../../domain/Vet'
import { USER_ID_TOKEN } from '../config'

describe('VetServiceStub', () => {
  let service: VetServiceStub

  beforeEach(() => {
    service = new VetServiceStub()
    localStorage.clear()
  })

  it('should return all vets', async () => {
    const result = await service.getAll()
    expect(result.length).toBe(2)
    expect(result[0].name).toBe('Lucas')
    expect(result[0].surname).toBe('Cejas')
    expect(result[1].name).toBe('Adrián')
    expect(result[1].surname).toBe('Ibarra')
  })

  it('should return vet by id from localStorage', async () => {
    localStorage.setItem(USER_ID_TOKEN, '6')
    const vet = await service.getOneById()
    expect(vet.name).toBe('Lucas')
    expect(vet.surname).toBe('Cejas')
    expect(vet.licence).toBe('MP101')
  })

  it('should throw error when vet not found', async () => {
    localStorage.setItem(USER_ID_TOKEN, '999')
    await expect(service.getOneById()).rejects.toThrow('Vet not found in stub')
  })

  it('should create a new vet', async () => {
    const newVet = new Vet(
      7,
      'maria.perez',
      'securepass',
      'María',
      'Pérez',
      32145678,
      'maria.perez@vetba.com.ar',
      '1167894321',
      'src/assets/maria-perez.jpg',
      'Calle Falsa 123',
      '1425',
      'Palermo',
      'Buenos Aires',
      'Argentina',
      7,
      7,
      'MP205',
      'Oncología veterinaria',
      'Lunes a viernes de 10 a 18 hs',
      'maria.p@vetba.com.ar',
      '1167894321',
      'Clínica Animal Buenos Aires',
      'Palermo',
      '1425'
    )

    await service.create(newVet)
    const result = await service.getAll()
    expect(result.length).toBe(3)
    const vet = result.find(v => v.id === 7)
    expect(vet?.name).toBe('María')
    expect(vet?.surname).toBe('Pérez')
    expect(vet?.licence).toBe('MP205')
  })

  it('should update an existing vet', async () => {
    const updatedVet = new Vet(
      6,
      'lucas.cejas',
      'newpassword',
      'Lucas',
      'Cejas',
      12345678,
      'lucas.cejas@gmail.com',
      '1122334455',
      'src/assets/vet.jfif',
      'Av. Mitre 123',
      '1870',
      'Avellaneda',
      'Buenos Aires',
      'Argentina',
      6,
      6,
      'MP101',
      'Clínico general y cirugía menor',
      'Lunes a viernes de 8 a 16 hs',
      'lucas.cejas@vetavellaneda.com',
      '1144556677',
      'Centro Vet Avellaneda',
      'Avellaneda',
      '1870'
    )

    await service.update(updatedVet)
    const result = await service.getAll()
    const vet = result.find(v => v.id === 6)
    expect(vet?.speciality).toBe('Clínico general y cirugía menor')
  })
})
