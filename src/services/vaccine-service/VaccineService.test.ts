import { describe, it, expect, beforeEach } from 'vitest'
import { VaccineServiceStub } from './VaccineServiceStub'
import { Vaccine } from '../../domain/Vaccine'

describe('VaccineServiceStub', () => {
	let service: VaccineServiceStub

	beforeEach(() => {
		service = new VaccineServiceStub()
	})

	it('Should return all vaccines', async () => {
		const vaccines = await service.getAll()
		expect(vaccines.length).toBe(2)
		expect(vaccines[0]).toBeInstanceOf(Vaccine)
		expect(vaccines[1].type).toBe('DISTEMPER')
	})

	it('Should return vaccine by id', async () => {
		const vaccine0 = await service.getVaccineById(0)
		expect(vaccine0.id).toBe(0)
		expect(vaccine0.type).toBe('ANTIRABIES')
	})

	it('Should return vaccines by medicalHistoryId', async () => {
		const vaccines = await service.getVaccineByMedicalHistoryId(0)
		expect(vaccines.length).toBe(1)
		expect(vaccines[0].medicalHistoryId).toBe(0)
	})

	it('Should return empty array when no vaccines for medicalHistoryId', async () => {
		const vaccines = await service.getVaccineByMedicalHistoryId(999)
		expect(vaccines.length).toBe(0)
	})

	it('Should create a new vaccine', async () => {
		const newVaccine = new Vaccine(
			0, 'PARVOVIRUS', 'Vacuna contra parvovirus', 123, '2025-06-01', '2026-06-01', false, 2
		)
		await service.createNewVaccine(newVaccine, 2)
		const vaccines = await service.getAll()
		expect(vaccines.length).toBe(3)
		const created = vaccines.find(v => v.id === 2)
		expect(created).toBeDefined()
		expect(created?.type).toBe('PARVOVIRUS')
	})

	it('Should edit an existing vaccine', async () => {
		const vaccine = await service.getVaccineById(0)
		vaccine.description = 'Actualizada'
		await service.editExistVaccine(vaccine, 5)
		const updated = await service.getVaccineById(0)
		expect(updated.description).toBe('Actualizada')
		expect(updated.medicalHistoryId).toBe(5)
	})

	it('Should throw when editing non-existent vaccine', async () => {
		const fakeVaccine = new Vaccine(
			999, 'FAKE', 'none', 0, '2025-01-01', '2026-01-01', false, 0
		)
		await expect(service.editExistVaccine(fakeVaccine, 0)).rejects.toThrow(/No se encontro la vacuna/)
	})

	it('Should delete an existing vaccine', async () => {
		await service.deleteExistVaccine(0)
		const vaccines = await service.getAll()
		expect(vaccines.length).toBe(1)
		expect(vaccines[0].id).toBe(1)
		expect(vaccines.find(v => v.id === 0)).toBeUndefined()
	})

	it('Should do nothing when deleting non-existent vaccine', async () => {
		await service.deleteExistVaccine(999)
		const vaccines = await service.getAll()
		expect(vaccines.length).toBe(2)
	})
})