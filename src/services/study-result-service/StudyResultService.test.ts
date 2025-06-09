import { describe, it, expect, beforeEach } from 'vitest'
import { StudyResultServiceStub } from './StudyResultServiceStub'
import { Study } from '../../domain/Study'

describe('StudysResultServiceStub', () => {
	let service: StudyResultServiceStub

	beforeEach(() => {
		service = new StudyResultServiceStub()
	})

	it('Should return all studys result', async () => {
		const studys = await service.getAll()
		expect(studys.length).toBe(2)
		expect(studys[0]).toBeInstanceOf(Study)
		expect(studys[0].type).toBe("PHYSIOLOGICAL")
		expect(studys[1].type).toBe("PHARMACOLOGICAL")
	})

	it('Should return studys result by id', async () => {
		const study = await service.getStudyResultById(2)
		expect(study).toBeInstanceOf(Study)
		expect(study.type).toBe("PHARMACOLOGICAL")
		expect(study.id).toBe(1)
	})

	it('Should return studys results by medicalHistoryId', async () => {
		const studys = await service.getStudyResultByMedicalHistoryId(0)
		expect(studys.length).toBe(1)
		expect(studys[0].type).toBe("PHYSIOLOGICAL")
		expect(studys[0].medicalHistoryId).toBe(0)
	})

	it('Should return empty array when no studys results for medicalHistoryId', async () => {
		const studys = await service.getStudyResultByMedicalHistoryId(999)
		expect(studys.length).toBe(0)
	})

	it('Should create a new study result', async () => {
		const newStudy = new Study(
			-1, 
			"GENETIC",
			'2025-06-10',
			'Nueva estudio para la mascota',
			2
		)
		await service.createNewStudyResult(newStudy, 2)
		const studys = await service.getAll()
		expect(studys.length).toBe(3)
		const created = studys.find(s => s.id === 2)
		expect(created).toBeDefined()
		expect(created?.medicalHistoryId).toBe(2)
	})

	it('Should edit an existing study result', async () => {
		const study = await service.getStudyResultById(1)
		study.description = 'Descripción actualizada'
		await service.editExistStudyResult(study, 0)
		const updated = await service.getStudyResultById(1)
		expect(updated.description).toBe('Descripción actualizada')
	})

	it('Should throw when editing non-existent study result', async () => {
		const fakeStudy = new Study(
			999, 'FakeVet', 'none', '2025-01-01', 0
		)
		await expect(service.editExistStudyResult(fakeStudy, 0)).rejects.toThrow(/No se encontro el resultado del estudio/)
	})

	it('Should delete an existing study result', async () => {
		await service.deleteExistStudyResult(1)
		const studys = await service.getAll()
		expect(studys.length).toBe(1)
		expect(studys.find(s => s.id === 1)).toBeUndefined()
	})

	it('Should do nothing when deleting non-existent study result', async () => {
		await service.deleteExistStudyResult(999)
		const recipes = await service.getAll()
		expect(recipes.length).toBe(2)
	})
})