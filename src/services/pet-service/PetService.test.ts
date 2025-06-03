import { Pet } from "../../domain/Pet"
import { PetFilterValues } from "../../domain/PetFilterValues"
import { PetServiceStub } from "./PetServiceStub"

describe('Pet Service', () => {
	let service: PetServiceStub

	beforeEach(() => {
		service = new PetServiceStub()
	})

	it('It should return all pet when there is no active filter', async () => {
		const pets = await service.getAllByFilter(new PetFilterValues('', false, false))
		expect(pets.length).toBe(11)
	})

	it('We filter pets by a specific name.', async () => {
		const pets = await service.getAllByFilter(new PetFilterValues('Nala', false, false))
		expect(pets.length).toBe(1)
		expect(pets[0].name).toBe('Nala')
	})

	it('We filter the pets by those who have an appointment.', async () => {
		const pets = await service.getAllByFilter(new PetFilterValues('', true, false))
		expect(pets.length).toBe(4)
		expect(pets[0].name).toBe('Nala')
	})

	it('We filter pets by those that have pending vaccinations', async () => {
		const pets = await service.getAllByFilter(new PetFilterValues('', false, true))
		expect(pets.length).toBe(4)
	})

	it('We filter with all the filters at the same time.', async () => {
		const pets = await service.getAllByFilter(new PetFilterValues('C', true, true))
		expect(pets.length).toBe(1)
	})

	it('We filter pets by those who have an appointment and pending vaccinations.', async () => {
		const pets = await service.getAllByFilter(new PetFilterValues('', true, true))
		expect(pets.length).toBe(6)
	})

	it('We filter pets by name and those who have an appointment.', async () => {
		const pets = await service.getAllByFilter(new PetFilterValues('na', true, false))
		expect(pets.length).toBe(2)
	})

	it('We filter pets by name and those that have pending vaccinations.', async () => {
		const pets = await service.getAllByFilter(new PetFilterValues('na', false, true))
		expect(pets.length).toBe(2)
	})

	it('We edit a pet.', async () => {
		const updatedPet = await service.getPetById(1)
		updatedPet.name = 'Oli123'

		await service.update(updatedPet)
		const pet = await service.getPetById(1)
		expect(pet.name).toBe('Oli123')
	})

	it('We create a pet.', async () => {
		const createdPet = new Pet()
		await service.create(createdPet)
		const pets = await service.getAllByFilter(new PetFilterValues('', false, false))
		expect(pets.length).toBe(12)
	})
})