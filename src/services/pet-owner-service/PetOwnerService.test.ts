import { PetOwnerServiceStub } from './PetOwnerServiceStub'
import { PetOwner } from '../../domain/PetOwner'
import { USER_ID_TOKEN } from '../config'

describe('Pet Owner Service', () => {
  let service: PetOwnerServiceStub

  beforeEach(() => {
    service = new PetOwnerServiceStub()
    localStorage.clear()
  })

  it('should return all pet owners when getting all', async () => {
    const result = await service.getAll()
    expect(result.length).toBe(4)
    expect(result[0].name).toBe('Ezequiel')
    expect(result[0].surname).toBe('Iozzia')
    expect(result[1].name).toBe('Caro')
    expect(result[1].surname).toBe('Coronel')
  })

  it('should return current pet owner when getting by id', async () => {
    localStorage.setItem(USER_ID_TOKEN, '3')
    const result = await service.getOneById()
    expect(result.name).toBe('Tamara')
    expect(result.surname).toBe('Mecozzi')
    expect(result.dni).toBe(37567890)
    expect(result.email).toBe('tami@gmail.com')
  })

  it('should throw error when pet owner not found in stub', async () => {
    localStorage.setItem(USER_ID_TOKEN, '999')
    await expect(service.getOneById()).rejects.toThrow('PetOwner not found in stub')
  })

  it('should create a new pet owner successfully', async () => {
    const newPetOwner = new PetOwner(
      5,
      'juanperez',
      'pass123',
      'Juan',
      'Pérez',
      28765432,
      'juan.perez@gmail.com',
      '1122334455',
      'src/assets/pet-owner.jpg',
      'Av. Corrientes 1234',
      '1040',
      'Almagro',
      'Buenos Aires',
      'Argentina',
      5,
      5,
      'Lucas Cejas',
      '1142334411'
    )

    await service.create(newPetOwner)
    const result = await service.getAll()
    expect(result.length).toBe(5)
    expect(result[4].name).toBe('Juan')
    expect(result[4].surname).toBe('Pérez')
    expect(result[4].dni).toBe(28765432)
  })

  it('should update an existing pet owner successfully', async () => {
    const updatedPetOwner = new PetOwner(
      2,
      'caro.c',
      'updatedpass',
      'Carolina',
      'Coronel',
      40567890,
      'carolina.coronel@gmail.com',
      '1144556677',
      'src/assets/caro-updated.jpg',
      'Av. Santa Fe 456',
      '1642',
      'San Isidro',
      'Buenos Aires',
      'Argentina',
      2,
      2,
      'Adrián Ibarra',
      '1142334411'
    )

    await service.update(updatedPetOwner)
    const result = await service.getAll()
    const owner = result.find(p => p.id === 2)
    expect(owner?.username).toBe('caro.c')
    expect(owner?.name).toBe('Carolina')
    expect(owner?.email).toBe('carolina.coronel@gmail.com')
  })

  it('should not update a non-existent pet owner', async () => {
    const nonExistent = new PetOwner(999)
    await service.update(nonExistent)
    const result = await service.getAll()
    expect(result.length).toBe(4)
  })

  it('should delete a pet owner successfully', async () => {
    await service.delete(4)
    const result = await service.getAll()
    expect(result.length).toBe(3)
    const deleted = result.find(p => p.id === 4)
    expect(deleted).toBeUndefined()
  })

  it('should not affect stub when deleting non-existent pet owner', async () => {
    await service.delete(999)
    const result = await service.getAll()
    expect(result.length).toBe(4)
  })
})
