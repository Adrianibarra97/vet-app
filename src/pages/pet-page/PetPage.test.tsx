// import { render, screen } from '@testing-library/react'
// import { describe, test, vi } from 'vitest'
// import { PetPage } from './PetPage'
// import PetServiceManager from '../../services/pet-service/PetServiceManager'
// import { AuthServiceStub } from '../../services/auth-service/AuthServiceStub'
// import { PetServiceStub } from '../../services/pet-service/PetServiceStub'
// import { PetFilterValues } from '../../domain/PetFilterValues'
// import { Pet } from '../../domain/Pet'
// import { AuthCredentialsLoginDTO } from '../../domain/User'
// import '@testing-library/jest-dom'


// // Users
// const petOwner: AuthCredentialsLoginDTO = { username: 'Eche', password: '1234' }
// const vet: AuthCredentialsLoginDTO = { username: 'Adrian', password: '123' }

// // Filters
// const petFilter: PetFilterValues = new PetFilterValues('', false, false)

// // Services
// const authService: AuthServiceStub = new AuthServiceStub()
// const petService: PetServiceStub = new PetServiceStub()

// // Pets
// const petsToPetOwner: Pet[] = await petService.getAllByFilter(petFilter)

// Mockear el servicio de mascotas
// vi.spyOn(PetServiceManager.getIntance(), 'getAllByFilter').mockResolvedValue(petsToPetOwner)

describe('Test Pet Page Pet Owner Flow', () => {
	// authService.login(petOwner)

  test('renders the title correctly', () => {
    // render(<PetPage />)
    // expect(screen.getByText(/Mascotas|Pacientes/i)).toBe('Mascotas')
  })

  // test('displays pet data when filter is applied', async () => {
  //   render(<PetPage />)
  //   expect(await screen.findByText('Nala')).toBe(petsToPetOwner[0])
  //   expect(await screen.findByText('Owie')).toBe(petsToPetOwner[2])
  // })
})

// describe('Test Pet Page Vet Flow', () => {
// 	authService.login(vet)

//   test('renders the title correctly', () => {
//     render(<PetPage />)
//     expect(screen.getByText(/Mascotas|Pacientes/i)).toBe('Pacientes')
//   })

//   test('displays pet data when filter is applied', async () => {
//     render(<PetPage />)
//     expect(await screen.findByText('Nala')).toBe(petsToPetOwner[0])
//     expect(await screen.findByText('Owie')).toBe(petsToPetOwner[2])
//   })
// })